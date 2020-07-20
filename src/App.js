import React, { Suspense, lazy } from "react";
import { Route, Switch, useHistory } from "react-router-dom";
import Container from "react-bootstrap/Container";
import { Routes } from "./common/constants";
import CredentialsProvider from "./providers/CredentialsProvider";

const Home = lazy(() => import("./components/Home"));

const Login = lazy(() => import("./components/Login/Login"));

const GithubRedirection = lazy(() => import("./components/Login/Github"));

const NotFound = lazy(() => import("./components/Error/404"));

const App = () => {
  const history = useHistory();

  return (
    <CredentialsProvider>
      <Container>
        <Suspense fallback={<div>Please wait...</div>}>
          <Switch>
            <Route exact path={Routes.HOME} component={Home} />
            <Route exact path={Routes.LOGIN} component={Login} />
            <Route exact path={Routes.GITHUB_LOGIN} component={GithubRedirection} />
            <Route
              render={() => (
                <NotFound
                  heading="Oops !!!"
                  errorMessage="Sorry you have reached a broken link..."
                  actionCTA="Go Home"
                  action={() => {
                    history.push(Routes.HOME);
                  }}
                />
              )}
            />
          </Switch>
        </Suspense>
      </Container>
    </CredentialsProvider>
  );
};

export default App;
