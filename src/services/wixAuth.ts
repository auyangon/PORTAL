import { createClient, OAuthStrategy } from "@wix/sdk";
import { members } from "@wix/members";
import Cookies from "js-cookie";

const WIX_CLIENT_ID = import.meta.env.VITE_WIX_CLIENT_ID || "YOUR_WIX_CLIENT_ID";

export const createWixClient = () => {
  return createClient({
    modules: { members },
    auth: OAuthStrategy({
      clientId: WIX_CLIENT_ID,
      tokens: JSON.parse(Cookies.get("wixSession") || "null"),
    }),
  });
};

export const isWixAuthenticated = async (): Promise<boolean> => {
  const session = Cookies.get("wixSession");
  if (!session) return false;
  
  try {
    const wixClient = createWixClient();
    const { member } = await wixClient.members.getCurrentMember();
    return !!member;
  } catch {
    return false;
  }
};

export const logoutFromWix = async () => {
  Cookies.remove("wixSession");
};