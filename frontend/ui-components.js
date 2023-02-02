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

function Post({
  post: { title, owner_id, description, media, users_who_liked, tags },
}) {
  return (
    <div>
      <h3>{title}</h3>
      <p>Posted by {owner_id}</p>
      <img src={media} width='500' />
      <p>{description}</p>
      {tags.map((tag, idx) => (
        <i key={idx}>#{tag}&nbsp;</i>
      ))}
      <p>Likes: {users_who_liked.length}</p>
      <br />
    </div>
  );
}

export function AllPosts({ allPosts }) {
  console.dir(allPosts);
  return (
    <>
      <h2>All Posts</h2>
      {allPosts
        ? allPosts.map(([idx, post]) => <Post key={idx} post={post} />)
        : 'No Posts'}
      <br />
    </>
  );
}
