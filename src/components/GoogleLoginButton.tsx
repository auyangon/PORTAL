import React from 'react';
import { GoogleLogin } from '@react-oauth/google';
import { useStudent } from '../context/StudentContext';
import { decodeGoogleCredential } from '../services/googleAuth';

export function GoogleLoginButton() {
  const { loginWithGoogle } = useStudent();

  return (
    <GoogleLogin
      onSuccess={async (credentialResponse) => {
        if (credentialResponse.credential) {
          const user = decodeGoogleCredential(credentialResponse.credential);
          if (user?.email) {
            await loginWithGoogle(user.email);
          }
        }
      }}
      onError={() => {
        console.error('Google Login Failed');
      }}
      theme="outline"
      size="large"
      text="continue_with"
      shape="rectangular"
      width="100%"
    />
  );
}