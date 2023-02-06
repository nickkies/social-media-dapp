import 'regenerator-runtime/runtime';
import React from 'react';

import './assets/global.css';

import {
  SignInPrompt,
  SignOutButton,
  AllPosts,
  AddPost,
} from './ui-components';

export default function App({ isSignedIn, contract, wallet }) {
  const [uiPleaseWait, setUiPleaseWait] = React.useState(true);
  const [allPosts, setAllPosts] = React.useState([]);

  React.useEffect(() => {
    contract
      .get_all_posts()
      .then(setAllPosts)
      .catch(alert)
      .finally(() => {
        setUiPleaseWait(false);
      });
  }, []);

  /// If user not signed-in with wallet - show prompt
  if (!isSignedIn) {
    // Sign-in flow will reload the page later
    return <SignInPrompt onClick={() => wallet.signIn()} />;
  }

  return (
    <>
      <SignOutButton
        accountId={wallet.accountId}
        onClick={() => wallet.signOut()}
      />
      <main className={uiPleaseWait ? 'please-wait' : ''}>
        <h1>Social Media NEAR Dapp</h1>
        <AddPost
          setAllPosts={setAllPosts}
          contract={contract}
          setUiPleaseWait={setUiPleaseWait}
        />
        <AllPosts
          allPosts={allPosts}
          setUiPleaseWait={setUiPleaseWait}
          setAllPosts={setAllPosts}
          contract={contract}
        />
      </main>
    </>
  );
}
