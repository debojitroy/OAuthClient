/* eslint-disable react-hooks/exhaustive-deps */
import React, { useContext, useEffect, useState } from "react";
import queryString from "query-string";
import { AuthStore } from "../../store/AuthStore";
import { CredentialsStore } from "../../store/CredentialsStore";
import { useHistory } from "react-router-dom";
import { Routes, AuthTypes } from "../../common/constants";
import { getGithubAccessToken } from "../../actions/github";
import AuthError from "../Error/Auth";

const GithubLogin = () => {
  const {
    setIsUserAuthenticated,
    setUserAuthType,
    setUserTokens,
    setUserScopes,
  } = useContext(AuthStore);
  const { github } = useContext(CredentialsStore);
  const history = useHistory();

  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const getAccessToken = async (authorizationCode) => {
      try {
        const accessTokenResponse = await getGithubAccessToken({
          authorizationCode,
          githubClientId: github.githubClientId,
          githubClientSecret: github.githubClientSecret,
          githubRedirectionUri: github.redirectUri,
          githubSecretState: github.state,
        });

        if (
          accessTokenResponse &&
          accessTokenResponse.access_token &&
          accessTokenResponse.scope
        ) {
          console.log(accessTokenResponse);

          setIsUserAuthenticated(true);
          setUserAuthType(AuthTypes.GITHUB);
          setUserTokens({
            accessToken: accessTokenResponse.access_token,
            expiryTime: Date.parse("9999-01-01"),
            refreshToken: null,
          });
          setUserScopes(accessTokenResponse.scope.split(","));

          // All good, redirect to home
          history.push(Routes.HOME);
        }
      } catch (error) {
        console.error("Failed to get access token", error);
        setError("Server Error");
      } finally {
        setIsLoading(false);
      }
    };

    const parsedSearch = queryString.parse(window.location.search);

    if (!parsedSearch.code || !parsedSearch.code === "") {
      setError("Missing Authorization Code");
      setIsLoading(false);
      return;
    }

    if (!parsedSearch.state || parsedSearch.state !== github.state) {
      setError("Invalid State");
      setIsLoading(false);
      return;
    }

    getAccessToken(parsedSearch.code);
  }, []);

  return (
    <div>
      {isLoading && <h2>Please wait....</h2>}
      {error && (
        <AuthError
          heading="Something went wrong"
          errorMessage={error}
          actionCTA="Go Home"
          action={() => {
            history.push(Routes.HOME);
          }}
        />
      )}
    </div>
  );
};

export default GithubLogin;
