import { useSignIn, useSignUp } from "@clerk/clerk-react";
import { FcGoogle } from "react-icons/fc";
import { useState } from "react";
import toast from "react-hot-toast";

export const SocialAuth = ({ mode = "signin" }) => {
  const { signIn } = useSignIn();
  const { signUp } = useSignUp();
  const [isLoading, setIsLoading] = useState(false);

  const handleGoogleAuth = async () => {
    try {
      setIsLoading(true);
      
      if (mode === "signin") {
        // Sign in with Google via Clerk
        await signIn.authenticateWithRedirect({
          strategy: "oauth_google",
          redirectUrl: window.location.origin + "/oauth-callback-handler",
        });
      } else {
        // Sign up with Google via Clerk
        await signUp.authenticateWithRedirect({
          strategy: "oauth_google",
          redirectUrl: window.location.origin + "/oauth-callback-handler",
        });
      }
    } catch (error) {
      console.error("Social auth error:", error);
      toast.error("Authentication failed. Please try again.");
      setIsLoading(false);
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
    </div>
  );
};

export default SocialAuth; 