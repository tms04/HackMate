import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth, useUser } from "@clerk/clerk-react";
import axios from "axios";
import toast from "react-hot-toast";
import Cookies from "js-cookie";

const OAuthCallbackHandler = () => {
  const navigate = useNavigate();
  const { isLoaded, userId, sessionId, isSignedIn } = useAuth();
  const { user, isLoaded: isUserLoaded } = useUser();
  const [isProcessing, setIsProcessing] = useState(true);
  const [error, setError] = useState(null);
  const [debugInfo, setDebugInfo] = useState({});
  const [redirectAttempted, setRedirectAttempted] = useState(false);

  // Debug effect to monitor auth state
  useEffect(() => {
    console.log("Auth state:", { isLoaded, isSignedIn, userId, sessionId });
    console.log("User state:", { isUserLoaded, user: user ? "exists" : "null" });

    setDebugInfo({
      isAuthLoaded: isLoaded,
      isSignedIn,
      userId,
      isUserLoaded,
      hasUserData: !!user
    });

    // If user is signed in but we're not processing, redirect directly to main page
    if (isLoaded && isSignedIn && !isProcessing && !redirectAttempted) {
      console.log("User is signed in with Clerk but not processing - redirecting to main page");
      setRedirectAttempted(true);
      
      // Set a local flag to indicate we have a Google authenticated user
      localStorage.setItem("googleAuthenticated", "true");
      
      // Try to get the user's info directly from Clerk
      if (user) {
        console.log("User data from Clerk:", {
          id: user.id,
          email: user.primaryEmailAddress?.emailAddress,
          name: `${user.firstName} ${user.lastName}`.trim()
        });
      }
      
      // Direct redirect to main page without going through the backend
      toast.success("Successfully signed in with Google!");
      navigate("/main");
    }

    // Auto-redirect after 10 seconds if stuck (safety measure)
    const timeout = setTimeout(() => {
      if (isProcessing) {
        console.log("Auth processing timeout - redirecting to login");
        setIsProcessing(false);
        toast.error("Authentication is taking too long. Please try again.");
        navigate("/login");
      }
    }, 10000);

    return () => clearTimeout(timeout);
  }, [isLoaded, isUserLoaded, isSignedIn, userId, user, isProcessing, navigate, redirectAttempted]);

  useEffect(() => {
    const saveUserToDatabase = async () => {
      // Wait for Clerk auth to be loaded and user to be available
      if (!isLoaded || !isSignedIn || !user) {
        if (isLoaded && !isSignedIn) {
          console.log("Auth loaded but not signed in - redirecting to login");
          setIsProcessing(false);
          navigate("/login");
        }
        return;
      }

      try {
        console.log("Processing OAuth login for user:", user.id);
        
        // Get user data from Clerk
        const primaryEmail = user.primaryEmailAddress?.emailAddress;
        if (!primaryEmail) {
          throw new Error("Could not retrieve email from authenticated user");
        }

        const firstName = user.firstName || "";
        const lastName = user.lastName || "";
        const fullName = `${firstName} ${lastName}`.trim();
        const imageUrl = user.imageUrl;
        
        // Create a unique username based on email (remove special chars)
        const username = primaryEmail?.split("@")[0].replace(/[^a-zA-Z0-9]/g, "") || "";
        
        console.log("Checking if user exists:", primaryEmail);
        
        try {
          // Check if user exists in our database
          const checkResponse = await axios.post(
            `${import.meta.env.VITE_BACKEND_URL}/api/users/check-email`,
            { email: primaryEmail }
          );
          
          console.log("User exists check response:", checkResponse.data);
          
          if (checkResponse.data.exists) {
            console.log("User exists, performing login");
            // User exists, perform login
            try {
              const loginResponse = await axios.post(
                `${import.meta.env.VITE_BACKEND_URL}/api/users/oauth-login`,
                { 
                  email: primaryEmail,
                  clerkUserId: user.id 
                }
              );
              
              console.log("Login successful, setting cookies");
              // Store token in cookies
              Cookies.set("token", loginResponse.data.token, { expires: 1 });
              Cookies.set("userId", loginResponse.data.userId, { expires: 1 });
              
              toast.success("Successfully signed in!");
              navigate("/main");
            } catch (loginError) {
              console.error("Login request failed:", loginError);
              // If backend login fails, still redirect to main since Clerk auth succeeded
              console.log("Falling back to Clerk authentication");
              Cookies.set("clerkUserId", user.id, { expires: 1 });
              toast.success("Signed in with Google");
              navigate("/main");
            }
          } else {
            console.log("User doesn't exist, registering new user");
            // User doesn't exist, register new user
            try {
              const registerResponse = await axios.post(
                `${import.meta.env.VITE_BACKEND_URL}/api/users/register-oauth`,
                {
                  name: fullName,
                  username: username,
                  email: primaryEmail,
                  profilePic: imageUrl,
                  clerkUserId: user.id
                }
              );
              
              if (registerResponse.data.success) {
                console.log("Registration successful");
                // Set tokens and cookies
                Cookies.set("token", registerResponse.data.token, { expires: 1 });
                Cookies.set("userId", registerResponse.data.userId, { expires: 1 });
                
                toast.success("Account created successfully!");
                // Redirect to profile form to complete the profile
                navigate("/userdetails");
              } else {
                console.error("Registration failed:", registerResponse.data);
                // If backend registration fails, still redirect to main since Clerk auth succeeded
                Cookies.set("clerkUserId", user.id, { expires: 1 });
                toast.success("Signed in with Google");
                navigate("/main");
              }
            } catch (registerError) {
              console.error("Register request failed:", registerError);
              // If backend registration fails, still redirect to main since Clerk auth succeeded
              Cookies.set("clerkUserId", user.id, { expires: 1 });
              toast.success("Signed in with Google");
              navigate("/main");
            }
          }
        } catch (backendError) {
          console.error("Backend request failed:", backendError);
          // If backend is unreachable, still redirect to main since Clerk auth succeeded
          Cookies.set("clerkUserId", user.id, { expires: 1 });
          toast.success("Signed in with Google");
          navigate("/main");
        }
      } catch (error) {
        console.error("Error processing OAuth login:", error);
        setError(error.message || "Authentication failed");
        // Even if there's an error, if we have Clerk authentication, redirect to main
        if (isSignedIn) {
          Cookies.set("clerkUserId", userId, { expires: 1 });
          toast.success("Signed in with Google");
          navigate("/main");
        } else {
          toast.error("Authentication failed. Please try again.");
          navigate("/login");
        }
      } finally {
        setIsProcessing(false);
      }
    };

    if (isLoaded && isSignedIn && user && isProcessing) {
      saveUserToDatabase();
    }
  }, [isLoaded, isSignedIn, user, navigate, isProcessing, userId]);

  if (!isLoaded || isProcessing) {
    return (
      <div className="flex flex-col justify-center items-center min-h-screen bg-base-200">
        <div className="text-center">
          <div className="loading loading-spinner loading-lg"></div>
          <p className="mt-4 text-white">Processing your sign in...</p>
          {error && (
            <div className="mt-4 text-error">
              <p>Error: {error}</p>
            </div>
          )}
          
          {/* Debug information in development */}
          {import.meta.env.DEV && (
            <div className="mt-8 text-xs text-left bg-base-300 p-4 rounded w-96">
              <h3 className="font-bold">Debug Info:</h3>
              <pre className="overflow-auto">{JSON.stringify(debugInfo, null, 2)}</pre>
              <button 
                className="btn btn-sm btn-primary mt-2"
                onClick={() => {
                  setIsProcessing(false);
                  if (isSignedIn) {
                    navigate("/main");
                  } else {
                    navigate("/login");
                  }
                }}
              >
                Force Redirect
              </button>
            </div>
          )}
        </div>
      </div>
    );
  }

  return null;
};

export default OAuthCallbackHandler; 