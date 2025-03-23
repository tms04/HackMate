import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { ClerkProvider } from "@clerk/clerk-react";

// Import the publishable key from environment variables
const publishableKey = import.meta.env.VITE_CLERK_PUBLISHABLE_KEY;

// Ensure the key is available
if (!publishableKey) {
  throw new Error("Missing Clerk Publishable Key");
}

// Log environment variables
console.log("Environment:", {
  environment: import.meta.env.MODE,
  backendUrl: import.meta.env.VITE_BACKEND_URL,
  origin: window.location.origin
});

// Clerk configuration
const clerkOptions = {
  // Set this to the base URL of your application
  baseUrl: window.location.origin,
  // Use navigation helpers to fine-tune the behavior of clerk
  navigate: (to) => {
    console.log("Clerk navigation to:", to);
    window.location.href = to;
  },
  // Redirect URLs for OAuth
  redirectUrl: `${window.location.origin}/oauth-callback-handler`,
  redirectUrlComplete: `${window.location.origin}/oauth-callback-handler`,
  // Sign in configuration
  signInUrl: import.meta.env.VITE_CLERK_SIGN_IN_URL || "/login",
  signUpUrl: import.meta.env.VITE_CLERK_SIGN_UP_URL || "/signup",
  afterSignInUrl: import.meta.env.VITE_CLERK_AFTER_SIGN_IN_URL || "/main",
  afterSignUpUrl: import.meta.env.VITE_CLERK_AFTER_SIGN_UP_URL || "/userdetails",
  // Debug mode for development
  debug: true,
  // Allow all origins for OAuth
  allowedRedirectOrigins: [window.location.origin],
  touchSession: true,
  appearance: {
    // Add light/dark theme compatibility
    variables: { colorPrimary: '#3b82f6' },
    layout: {
      socialButtonsVariant: 'iconButton',
      socialButtonsPlacement: 'bottom',
    },
  }
};

console.log("Clerk initialized with:", {
  publishableKey: publishableKey ? "Key is available" : "Missing key",
  baseUrl: clerkOptions.baseUrl,
  redirectUrl: clerkOptions.redirectUrl,
  signInUrl: clerkOptions.signInUrl,
  signUpUrl: clerkOptions.signUpUrl,
  afterSignInUrl: clerkOptions.afterSignInUrl,
  afterSignUpUrl: clerkOptions.afterSignUpUrl
});

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <ClerkProvider 
      publishableKey={publishableKey}
      {...clerkOptions}
    >
      <App />
    </ClerkProvider>
  </StrictMode>,
)
