import { useEffect } from "react";
import { createWixClient } from "../services/wixAuth";

export function WixLoginButton() {
  const handleLogin = async () => {
    const wixClient = createWixClient();
    
    // Generate OAuth data
    const redirectData = wixClient.auth.generateOAuthData(
      `${window.location.origin}/login-callback`,
      window.location.href
    );
    
    localStorage.setItem("wixOAuthData", JSON.stringify(redirectData));
    
    // Redirect to Wix login page
    const { authUrl } = await wixClient.auth.getAuthUrl(redirectData);
    window.location.href = authUrl;
  };

  return (
    <button onClick={handleLogin} className="...">
      Login with Wix
    </button>
  );
}