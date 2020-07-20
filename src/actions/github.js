import axios from "axios";

export const redirectToGithubAuthorization = ({
  githubClientId,
  githubRedirectionUri,
  githubSecretState,
  scopes,
}) => {
  const queryString = `?client_id=${githubClientId}&redirect_uri=${encodeURIComponent(
    githubRedirectionUri
  )}&scope=${encodeURIComponent(
    scopes
  )}&state=${githubSecretState}&allow_signup=true`;

  window.location = `https://github.com/login/oauth/authorize${queryString}`;
};

// This is blocked as Github doesnt client side applications to generate auth token
// https://stackoverflow.com/questions/42150075/cors-issue-on-github-oauth#:~:text=1%20Answer&text=While%20all%20the%20actual%20GitHub,CORS%20requests%20from%20Web%20applications.
export const getGithubAccessToken = async ({
  authorizationCode,
  githubClientId,
  githubClientSecret,
  githubRedirectionUri,
  githubSecretState,
}) => {
  const response = await axios.post(
    "https://github.com/login/oauth/access_token",
    {
      client_id: githubClientId,
      client_secret: githubClientSecret,
      code: authorizationCode,
      redirect_uri: githubRedirectionUri,
      state: githubSecretState,
    },
    {
      headers: {
        "content-type": "application/json",
        Accept: "application/json",
      },
    }
  );

  return response.data;
};
