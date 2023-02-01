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

export function AllPosts({ allPosts }) {
  return allPosts.map(({}) => (
    <>
      <h2>All Posts</h2>
      {allPosts.map(([idx, { title }]) => (
        <h3 key={idx}>{title}</h3>
      ))}
    </>
  ));
}
