import 'regenerator-runtime/runtime';
import React from 'react';

import './assets/global.css';

import { SignInPrompt, SignOutButton } from './ui-components';

export default function App({ isSignedIn, contractId, wallet }) {
  const [valueFromBlockchain, setValueFromBlockchain] = React.useState();
  const [uiPleaseWait, setUiPleaseWait] = React.useState(true);

  if (!isSignedIn) {
    return (
      <SignInPrompt
        greeting={valueFromBlockchain}
        onClick={() => wallet.signIn()}
      />
    );
  }

  return (
    <>
      <SignOutButton
        accountId={wallet.accountId}
        onClick={() => wallet.signOut()}
      />
      <main className={uiPleaseWait ? 'please-wait' : ''}>
        Social Media NEAR Dapp
      </main>
    </>
  );
}
