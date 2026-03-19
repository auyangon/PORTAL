import { createClient, OAuthStrategy } from '@wix/sdk';
import { members } from '@wix/members';
import Cookies from 'js-cookie';

const WIX_CLIENT_ID = 'f6de0076-7759-49a6-975d-5e65138665cf';

export const createWixClient = () => {
  return createClient({
    modules: { members },
    auth: OAuthStrategy({
      clientId: WIX_CLIENT_ID,
      tokens: JSON.parse(Cookies.get('wixSession') || 'null'),
    }),
  });
};

export const loginWithWix = async () => {
  const wixClient = createWixClient();
  
  // FIXED: Use string concatenation instead of template literals
  const redirectUri = window.location.origin + '/login-callback';
  
  const redirectData = wixClient.auth.generateOAuthData(
    redirectUri,
    window.location.href
  );
  
  localStorage.setItem('wixOAuthData', JSON.stringify(redirectData));
  
  const { authUrl } = await wixClient.auth.getAuthUrl(redirectData);
  window.location.href = authUrl;
};

export const handleWixCallback = async () => {
  const wixClient = createWixClient();
  const savedData = JSON.parse(localStorage.getItem('wixOAuthData') || 'null');
  
  if (!savedData) throw new Error('No OAuth data found');
  
  const { code } = wixClient.auth.parseFromUrl();
  const tokens = await wixClient.auth.getMemberTokens(code, savedData);
  
  Cookies.set('wixSession', JSON.stringify(tokens), { expires: 7 });
  localStorage.removeItem('wixOAuthData');
  
  return tokens;
};

export const logoutFromWix = () => {
  Cookies.remove('wixSession');
};

export const isWixAuthenticated = (): boolean => {
  return !!Cookies.get('wixSession');
};
