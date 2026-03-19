import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { createWixClient } from "../services/wixAuth";
import Cookies from "js-cookie";

export function LoginCallback() {
  const navigate = useNavigate();

  useEffect(() => {
    const handleCallback = async () => {
      try {
        const wixClient = createWixClient();
        const savedData = JSON.parse(localStorage.getItem("wixOAuthData")!);
        
        // Exchange code for tokens
        const { code } = wixClient.auth.parseFromUrl();
        const tokens = await wixClient.auth.getMemberTokens(code, savedData);
        
        // Store tokens
        Cookies.set("wixSession", JSON.stringify(tokens));
        localStorage.removeItem("wixOAuthData");
        
        // Redirect to dashboard
        navigate("/dashboard");
      } catch (error) {
        console.error("Login failed:", error);
      }
    };
    
    handleCallback();
  }, []);

  return <div>Completing login...</div>;
}