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
    console.log("OAuthCallbackHandler: Auth state changed");
    console.log("Auth state:", { isLoaded, isSignedIn, userId, sessionId });
    
    if (user) {
      console.log("User data:", { 
        id: user.id,
        email: user.primaryEmailAddress?.emailAddress,
        firstName: user.firstName,
        lastName: user.lastName,
        hasImage: !!user.imageUrl
      });
    } else {
      console.log("User data not available yet");
    }

    setDebugInfo({
      isAuthLoaded: isLoaded,
      isSignedIn,
      userId,
      isUserLoaded,
      hasUserData: !!user,
      timestamp: new Date().toISOString()
    });

    // If user is signed in but we're still waiting, let's redirect
    if (isLoaded && isSignedIn && !redirectAttempted) {
      console.log("User is signed in with Clerk - redirecting to main page");
      setRedirectAttempted(true);
      setIsProcessing(false);
      
      // Store Clerk user info directly in local storage
      // This avoids the network call to our backend which may be failing
      if (user) {
        const userInfo = {
          id: user.id,
          email: user.primaryEmailAddress?.emailAddress,
          name: `${user.firstName || ''} ${user.lastName || ''}`.trim(),
          imageUrl: user.imageUrl
        };
        
        localStorage.setItem("clerkUser", JSON.stringify(userInfo));
        Cookies.set("clerkUserId", user.id, { expires: 1 });
        
        console.log("Stored clerk user data:", userInfo);
      }
      
      toast.success("Successfully signed in with Google!");
      
      // Add small delay to ensure the toast message is seen
      setTimeout(() => {
        navigate("/main");
      }, 1000);
    }

    // Auto-redirect after 10 seconds if stuck (safety measure)
    const timeout = setTimeout(() => {
      if (isProcessing && !redirectAttempted) {
        console.log("Auth processing timeout - redirecting to login");
        setIsProcessing(false);
        setError("Authentication is taking too long");
        toast.error("Authentication is taking too long. Please try again.");
        navigate("/login");
      }
    }, 10000);

    return () => clearTimeout(timeout);
  }, [isLoaded, isUserLoaded, isSignedIn, userId, user, isProcessing, navigate, redirectAttempted]);

  // Backend sync attempt - only if we haven't redirected
  useEffect(() => {
    const saveUserToDatabase = async () => {
      // If we've already redirected, don't try to save
      if (redirectAttempted) return;
      
      // Wait for Clerk auth to be loaded and user to be available
      if (!isLoaded || !isUserLoaded) {
        console.log("Auth or user not loaded yet, waiting...");
        return;
      }
      
      if (!isSignedIn || !user) {
        console.log("Authentication failed: No sign-in or user data");
        setIsProcessing(false);
        setError("Authentication failed. Please try again.");
        toast.error("Authentication failed. Please try again.");
        navigate("/login");
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
        const username = `${primaryEmail?.split("@")[0].replace(/[^a-zA-Z0-9]/g, "")}_${Math.floor(Math.random() * 1000)}`;
        
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
              
              setIsProcessing(false);
              toast.success("Successfully signed in!");
              navigate("/main");
            } catch (loginError) {
              console.error("Login request failed:", loginError);
              // Fall back to Clerk-only auth
              performFallbackAuth();
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
                
                setIsProcessing(false);
                toast.success("Account created and signed in!");
                navigate("/main");
              } else {
                throw new Error(registerResponse.data.message || "Registration failed");
              }
            } catch (registerError) {
              console.error("Registration failed:", registerError);
              // Fall back to Clerk-only auth
              performFallbackAuth();
            }
          }
        } catch (checkError) {
          console.error("Error checking if user exists:", checkError);
          // Fall back to Clerk-only auth
          performFallbackAuth();
        }
      } catch (error) {
        console.error("Error in OAuth processing:", error);
        // Fall back to Clerk-only auth if we have user data
        if (isSignedIn && user) {
          performFallbackAuth();
        } else {
          setError(error.message);
          setIsProcessing(false);
          toast.error(error.message || "Authentication error");
          navigate("/login");
        }
      }
    };
    
    // Helper function for fallback authentication when backend fails
    const performFallbackAuth = () => {
      console.log("Falling back to Clerk-only authentication");
      if (user) {
        const userInfo = {
          id: user.id,
          email: user.primaryEmailAddress?.emailAddress,
          name: `${user.firstName || ''} ${user.lastName || ''}`.trim(),
          imageUrl: user.imageUrl
        };
        
        localStorage.setItem("clerkUser", JSON.stringify(userInfo));
        Cookies.set("clerkUserId", user.id, { expires: 1 });
      }
      
      setIsProcessing(false);
      toast.success("Signed in with Google (Limited mode)");
      navigate("/main");
    };

    if (isSignedIn && user && isProcessing && !redirectAttempted) {
      console.log("User is authenticated, trying to save to database...");
      saveUserToDatabase();
    }
  }, [isLoaded, isUserLoaded, isSignedIn, user, navigate, isProcessing, redirectAttempted]);

  if (error) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-base-200 p-4">
        <div className="card bg-base-100 shadow-xl p-8 max-w-md w-full">
          <h2 className="text-2xl font-bold text-center mb-4">Authentication Error</h2>
          <p className="text-error text-center mb-4">{error}</p>
          <button 
            className="btn btn-primary w-full" 
            onClick={() => navigate("/login")}
          >
            Back to Login
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-base-200">
      <div className="card bg-base-100 shadow-xl p-8">
        <h2 className="text-2xl font-bold text-center mb-4">Processing Authentication</h2>
        <div className="flex justify-center my-4">
          <div className="loading loading-spinner loading-lg"></div>
        </div>
        <p className="text-center">Almost there! We're completing your sign-in...</p>
      </div>
    </div>
  );
};

export default OAuthCallbackHandler; 