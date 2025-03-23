import { useSignIn, useSignUp } from "@clerk/clerk-react";
import { FcGoogle } from "react-icons/fc";
import { useState } from "react";
import toast from "react-hot-toast";

export const SocialAuth = ({ mode = "signin" }) => {
  const { signIn } = useSignIn();
  const { signUp } = useSignUp();
  const [isLoading, setIsLoading] = useState(false);
  const [errorDetails, setErrorDetails] = useState(null);

  const handleGoogleAuth = async () => {
    try {
      setIsLoading(true);
      setErrorDetails(null);
      
      // Log clerk instance status
      console.log(`Starting ${mode} with Google via Clerk...`);
      console.log("Clerk instance:", mode === "signin" ? signIn : signUp);
      
      // Prepare the redirect URL
      const redirectUrl = window.location.origin + "/oauth-callback-handler";
      console.log("Using redirect URL:", redirectUrl);
      
      // Add current timestamp to avoid caching issues
      const redirectParams = new URLSearchParams();
      redirectParams.append('ts', Date.now());
      const redirectWithParams = `${redirectUrl}?${redirectParams.toString()}`;
      
      const options = {
        strategy: "oauth_google",
        redirectUrl: redirectWithParams,
        redirectUrlComplete: redirectWithParams
      };
      
      console.log("Authentication options:", options);
      
      if (mode === "signin") {
        // Sign in with Google via Clerk
        console.log("Authenticating with Google sign-in via Clerk");
        await signIn.authenticateWithRedirect(options);
      } else {
        // Sign up with Google via Clerk
        console.log("Authenticating with Google sign-up via Clerk");
        await signUp.authenticateWithRedirect(options);
      }
    } catch (error) {
      console.error("Social auth error:", error);
      
      // Log detailed error information
      let errorMessage = "Authentication failed. Please try again.";
      const errorDetails = {};
      
      if (error.errors) {
        error.errors.forEach(err => {
          console.error(`Clerk error: ${err.code} - ${err.message}`);
          errorDetails[err.code] = err.message;
          
          // Update error message with more specific information
          if (err.code === "form_identifier_not_found") {
            errorMessage = "Google account not found. Please sign up first.";
          } else if (err.code === "form_password_incorrect") {
            errorMessage = "Incorrect password for this Google account.";
          } else if (err.code.includes("oauth")) {
            errorMessage = `OAuth error: ${err.message}`;
          }
        });
      }
      
      // For network errors
      if (error.message && error.message.includes("Network")) {
        errorMessage = "Network error. Please check your internet connection.";
        errorDetails.network = error.message;
      }
      
      setErrorDetails(errorDetails);
      toast.error(errorMessage);
      setIsLoading(false);
      
      // Log to console for debugging
      console.error("Authentication error details:", errorDetails);
    }
  };

  return (
    <div className="w-full">
      <div className="relative flex items-center justify-center my-4">
        <div className="absolute border-t border-gray-400 w-full"></div>
        <div className="absolute text-center text-gray-500 bg-base-100 px-2">or</div>
      </div>
      
      <button
        onClick={handleGoogleAuth}
        disabled={isLoading}
        className="btn btn-outline w-full normal-case flex items-center justify-center gap-2 mt-4"
      >
        <FcGoogle className="text-xl" />
        {isLoading ? "Processing..." : (mode === "signin" ? "Sign in with Google" : "Sign up with Google")}
      </button>
      
      {errorDetails && (
        <div className="mt-2 text-xs text-error">
          <p>Error occurred during authentication. Please try again or contact support.</p>
        </div>
      )}
    </div>
  );
};

export default SocialAuth; 