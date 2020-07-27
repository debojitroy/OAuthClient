import React, { useState } from "react";
import { CredentialsStore } from "../store/CredentialsStore";
import { v4 as uuid } from "uuid";

const CredentialsProvider = ({ children }) => {
  const [githubClientId] = useState(process.env.REACT_APP_github_client_id);
  const [githubClientSecret] = useState(process.env.REACT_APP_github_client_secret);
  const [githubRedirectionUrl] = useState(process.env.REACT_APP_github_redirect_uri);
  const [githubSecretState, setGithubSecretState] = useState(sessionStorage.getItem('github_state'));

  const generateGithubSecretState = () => {
    const newSecret = uuid();
    // Persist across reloads
    sessionStorage.setItem('github_state', newSecret);
    setGithubSecretState(newSecret);
    return newSecret;
  };

  return (
    <CredentialsStore.Provider
      value={{
        github: {
          clientId: githubClientId,
          clientSecret: githubClientSecret,
          redirectUri: githubRedirectionUrl,
          state: githubSecretState,
          generateGithubSecretState,
        },
      }}
    >
      {children}
    </CredentialsStore.Provider>
  );
};

export default CredentialsProvider;
