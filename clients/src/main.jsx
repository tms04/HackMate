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

// Clerk configuration
const clerkOptions = {
  // Set this to the base URL of your application
  baseUrl: window.location.origin,
  // Use navigation helpers to fine-tune the behavior of clerk
  navigate: (to) => {
    console.log("Clerk navigation to:", to);
    window.location.href = to;
  },
  // Debug mode for development
  debug: import.meta.env.DEV
};

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
