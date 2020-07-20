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
