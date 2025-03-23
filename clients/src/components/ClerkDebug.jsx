import { useAuth, useUser, useClerk } from "@clerk/clerk-react";
import { useState, useEffect } from "react";
import { checkClerkAccess } from "../utils/checkClerkAccess";

const ClerkDebug = () => {
  const { isLoaded, userId, sessionId, isSignedIn } = useAuth();
  const { user, isLoaded: isUserLoaded } = useUser();
  const clerk = useClerk();
  const [showDetails, setShowDetails] = useState(false);
  const [apiAccessResult, setApiAccessResult] = useState(null);
  const [checking, setChecking] = useState(false);
  
  const testGoogleAuth = async () => {
    try {
      const authUrl = `${clerk.frontendApi}/oauth_google`;
      console.log("Testing Google OAuth URL:", authUrl);
      
      // Open in a new window to test connection
      window.open(authUrl, "_blank", "width=600,height=700");
    } catch (error) {
      console.error("Error testing Google auth:", error);
    }
  };
  
  const checkApi = async () => {
    try {
      setChecking(true);
      const result = await checkClerkAccess();
      setApiAccessResult(result);
      console.log("API access check result:", result);
    } catch (error) {
      console.error("Error checking API access:", error);
      setApiAccessResult({ success: false, error: error.message });
    } finally {
      setChecking(false);
    }
  };
  
  // Check API access on mount
  useEffect(() => {
    checkApi();
  }, []);

  if (!isLoaded) {
    return <div className="text-center p-4">Loading Clerk...</div>;
  }

  return (
    <div className="p-4 bg-base-200 rounded-lg my-4 text-sm">
      <div className="flex justify-between items-center">
        <h3 className="font-bold">Authentication Debug Panel</h3>
        <button 
          className="btn btn-xs"
          onClick={() => setShowDetails(!showDetails)}
        >
          {showDetails ? "Hide Details" : "Show Details"}
        </button>
      </div>
      
      {/* API access status */}
      <div className="mt-2 text-xs">
        <p>
          <span className="font-semibold">Clerk API Status:</span> 
          {checking ? (
            <span className="loading loading-spinner loading-xs ml-2"></span>
          ) : apiAccessResult ? (
            apiAccessResult.success ? (
              <span className="text-success ml-2">✓ Connected</span>
            ) : (
              <span className="text-error ml-2">✗ Connection Error</span>
            )
          ) : (
            <span className="text-warning ml-2">Not checked</span>
          )}
        </p>
        
        {apiAccessResult && !apiAccessResult.success && (
          <p className="text-error mt-1">Error: {apiAccessResult.error}</p>
        )}
      </div>
      
      {showDetails && (
        <div className="mt-2">
          <div className="grid grid-cols-2 gap-2">
            <div className="bg-base-300 p-2 rounded">
              <p><span className="font-semibold">Auth Status:</span> {isSignedIn ? "Signed In" : "Not Signed In"}</p>
              <p><span className="font-semibold">User ID:</span> {userId || "None"}</p>
              <p><span className="font-semibold">Session ID:</span> {sessionId || "None"}</p>
            </div>
            
            <div className="bg-base-300 p-2 rounded">
              <p><span className="font-semibold">User Loaded:</span> {isUserLoaded ? "Yes" : "No"}</p>
              <p><span className="font-semibold">User Email:</span> {user?.primaryEmailAddress?.emailAddress || "None"}</p>
              <p><span className="font-semibold">User Name:</span> {user ? `${user.firstName} ${user.lastName}` : "None"}</p>
            </div>
          </div>
          
          {apiAccessResult && apiAccessResult.success && (
            <div className="mt-2 bg-base-300 p-2 rounded">
              <p><span className="font-semibold">API URL:</span> {apiAccessResult.frontendApi || "Unknown"}</p>
              <p><span className="font-semibold">Environment:</span> {apiAccessResult.data?.environment || "Unknown"}</p>
            </div>
          )}
          
          <div className="mt-2 flex gap-2 flex-wrap">
            <button 
              className="btn btn-xs btn-info"
              onClick={() => {
                console.log("Clerk object:", clerk);
                console.log("User object:", user);
                console.log("Auth state:", { isLoaded, userId, sessionId, isSignedIn });
              }}
            >
              Log Details
            </button>
            
            <button 
              className="btn btn-xs btn-warning"
              onClick={testGoogleAuth}
            >
              Test Google Auth
            </button>
            
            <button 
              className="btn btn-xs btn-primary"
              onClick={checkApi}
              disabled={checking}
            >
              {checking ? "Checking..." : "Check API Access"}
            </button>
            
            <button 
              className="btn btn-xs btn-error"
              onClick={() => {
                try {
                  clerk.signOut();
                  console.log("Signed out");
                } catch (error) {
                  console.error("Error signing out:", error);
                }
              }}
            >
              Sign Out
            </button>
          </div>
          
          <div className="mt-2 text-xs">
            <p><span className="font-semibold">Clerk Version:</span> {clerk?.version || "Unknown"}</p>
            <p><span className="font-semibold">Frontend API:</span> {clerk?.frontendApi || "Unknown"}</p>
            <p><span className="font-semibold">Publishable Key:</span> {import.meta.env.VITE_CLERK_PUBLISHABLE_KEY ? "✓ Set" : "✗ Missing"}</p>
          </div>
        </div>
      )}
    </div>
  );
};

export default ClerkDebug; 