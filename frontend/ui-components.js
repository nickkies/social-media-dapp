import React from 'react';

export function SignInPrompt({ onClick }) {
  return (
    <main>
      <h1>Social Media Dapp</h1>
      <br />
      <p style={{ textAlign: 'center' }}>
        <button onClick={onClick}>Sign in with NEAR Wallet</button>
      </p>
    </main>
  );
}

export function SignOutButton({ accountId, onClick }) {
  return (
    <button style={{ float: 'right' }} onClick={onClick}>
      Sign out {accountId}
    </button>
  );
}
