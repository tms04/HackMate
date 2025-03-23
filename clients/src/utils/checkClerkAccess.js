/**
 * Utility function to check if the Clerk API is accessible.
 * This helps diagnose if there are network issues or if the API key is incorrect.
 */
export const checkClerkAccess = async () => {
  try {
    const publishableKey = import.meta.env.VITE_CLERK_PUBLISHABLE_KEY;
    
    if (!publishableKey) {
      console.error('Missing Clerk publishable key');
      return { 
        success: false, 
        error: 'Missing Clerk publishable key' 
      };
    }
    
    // Extract the domain from the publishable key
    // Format: pk_test_<domain>
    const keyParts = publishableKey.split('_');
    if (keyParts.length < 3) {
      console.error('Invalid publishable key format');
      return { 
        success: false, 
        error: 'Invalid publishable key format' 
      };
    }
    
    // Extract domain from the key (this is a best-effort approach)
    const encodedDomain = keyParts[2];
    let domain;
    
    try {
      // Try to decode if it looks like base64
      if (encodedDomain.includes('.')) {
        domain = encodedDomain;
      } else {
        domain = atob(encodedDomain);
      }
    } catch (e) {
      // If decoding fails, use as-is
      domain = encodedDomain;
    }
    
    // Construct the Clerk frontend API URL
    let frontendApi = `https://${domain}.clerk.accounts.dev`;
    
    console.log(`Checking Clerk API access at: ${frontendApi}`);
    
    // Attempt to fetch the Clerk frontend API
    const response = await fetch(`${frontendApi}/v1/environment`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Origin': window.location.origin,
      },
    });
    
    if (response.ok) {
      const data = await response.json();
      console.log('Clerk API is accessible:', data);
      return { 
        success: true, 
        data, 
        frontendApi 
      };
    } else {
      const error = await response.text();
      console.error('Clerk API returned an error:', error);
      return { 
        success: false, 
        status: response.status, 
        error,
        frontendApi
      };
    }
  } catch (error) {
    console.error('Error checking Clerk API access:', error);
    return { 
      success: false, 
      error: error.message 
    };
  }
};

export default checkClerkAccess; 