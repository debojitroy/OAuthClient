import React from "react";

export const CredentialsStore = React.createContext({
  github: {
    clientId: null,
    redirectUri: null,
    state: null,
  }
});
