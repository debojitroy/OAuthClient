import React from "react";

export const CredentialsStore = React.createContext({
  github: {
    clientId: null,
    clientSecret: null,
    redirectUri: null,
    state: null,
  }
});
