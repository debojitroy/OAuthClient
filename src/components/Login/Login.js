import React, { useLayoutEffect, useContext } from "react";
import { useHistory } from "react-router-dom";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Button from "react-bootstrap/Button";
import { AuthStore } from "../../store/AuthStore";
import { CredentialsStore } from "../../store/CredentialsStore";
import { Routes } from "../../common/constants";
import { redirectToGithubAuthorization } from "../../actions/github";

const LoginPage = () => {
  const authContext = useContext(AuthStore);
  const credentialsContext = useContext(CredentialsStore);
  const history = useHistory();

  const redirectToGithub = () => {
    if (credentialsContext && credentialsContext.github) {
      const {
        clientId,
        redirectUri,
        generateGithubSecretState,
      } = credentialsContext.github;

      const secretState = generateGithubSecretState();

      redirectToGithubAuthorization({
        githubClientId: clientId,
        githubRedirectionUri: redirectUri,
        githubSecretState: secretState,
        scopes: "",
      });
    }
  };

  useLayoutEffect(() => {
    if (authContext && authContext.isAuthenticated) {
      console.log('User is already authenticated... Redirecting to Home...')
      history.push(Routes.HOME);
    }
  });

  return (
    <section>
      <Row className="justify-content-md-center">
        <Col xs="12" className="mb-3">
          <h1>Please login to continue</h1>
        </Col>
        <Col xs="12" className="mb-3">
          <Button variant="primary" onClick={redirectToGithub}>
            Login with Github
          </Button>
        </Col>
        <Col xs="12" className="mb-3">
          <Button variant="primary">Login with Google</Button>
        </Col>
      </Row>
    </section>
  );
};

export default LoginPage;
