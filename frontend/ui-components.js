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

export function AddPost({ setUiPleaseWait, contract, setAllPosts }) {
  const titleRef = React.useRef(null);
  const descriptionRef = React.useRef(null);
  const tagsRef = React.useRef(null);
  const mediaRef = React.useRef(null);

  const onSubmit = (e) => {
    e.preventDefault();
    setUiPleaseWait(true);
    contract
      .add_post({
        title: titleRef.current.value,
        description: descriptionRef.current.value,
        tags: tagsRef.current.value,
        media: mediaRef.current.value,
      })
      .then(async () => contract.get_all_posts())
      .then(setAllPosts)
      .finally(() => {
        setUiPleaseWait(false);
      });
  };

  return (
    <>
      <h2>Add Post</h2>
      <form onSubmit={onSubmit}>
        <label htmlFor='title'>Title</label>
        <br />
        <input ref={titleRef} id='title' placeholder='title' />
        <br />
        <label htmlFor='description'>Description</label>
        <br />
        <input
          ref={descriptionRef}
          id='description'
          placeholder='description'
        />
        <br />
        <label htmlFor='tags'>Tags</label>
        <br />
        <input ref={tagsRef} id='tags' placeholder='tag1,tag2' />
        <br />
        <label htmlFor='media'>Media</label>
        <br />
        <input ref={mediaRef} id='media' placeholder='media' />
        <br />
        <button>Upload Post</button>
      </form>
    </>
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
