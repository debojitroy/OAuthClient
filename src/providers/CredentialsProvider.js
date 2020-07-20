import React, { useState } from "react";
import { CredentialsStore } from "../store/CredentialsStore";
import { v4 as uuid } from "uuid";

const CredentialsProvider = ({ children }) => {
  const [githubClientId] = useState(process.env.REACT_APP_github_client_id);
  const [githubRedirectionUrl] = useState(process.env.REACT_APP_github_redirect_uri);
  const [githubSecretState, setGithubSecretState] = useState(null);

  const generateGithubSecretState = () => {
    const newSecret = uuid();
    setGithubSecretState(newSecret);
    return newSecret;
  };

  return (
    <CredentialsStore.Provider
      value={{
        github: {
          clientId: githubClientId,
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
