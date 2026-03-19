import React from 'react';
import { loginWithWix } from '../services/wixAuth';

export function WixLoginButton() {
  return (
    <button
      onClick={loginWithWix}
      className="w-full py-4 rounded-2xl font-medium text-white transition-all transform hover:scale-[1.02]"
      style={{
        background: 'linear-gradient(135deg, #1b5f56 0%, #247d70 100%)'
      }}
    >
      Login with Wix
    </button>
  );
}
