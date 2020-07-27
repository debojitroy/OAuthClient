import React from "react";

export const AuthStore = React.createContext({
  isAuthenticated: false,
  authType: null,
  userTokens: {
    accessToken: null,
    expiryTime: Date.now(),
    refreshToken: null,
  },
  userDetails: null,
  scopes: [],
});
