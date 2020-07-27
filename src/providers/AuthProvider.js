import React, { useState } from "react";
import { AuthStore } from "../store/AuthStore";

const AuthProvider = ({ children }) => {
  const [isUserAuthenticated, setIsUserAuthenticated] = useState(false);
  const [userAuthType, setUserAuthType] = useState(null);
  const [userTokens, setUserTokens] = useState(null);
  const [userScopes, setUserScopes] = useState([]);
  const [userDetails, setUserDetails] = useState([]);

  return (
    <AuthStore.Provider
      value={{
        isAuthenticated: isUserAuthenticated,
        authType: userAuthType,
        userTokens,
        scopes: userScopes,
        userDetails,
        setIsUserAuthenticated,
        setUserAuthType,
        setUserTokens,
        setUserScopes,
        setUserDetails,
      }}
    >
      {children}
    </AuthStore.Provider>
  );
};

export default AuthProvider;
