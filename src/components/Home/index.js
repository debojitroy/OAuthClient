import React, { useContext, useLayoutEffect } from "react";
import { useHistory } from "react-router-dom";
import { AuthStore } from "../../store/AuthStore";
import { Routes } from "../../common/constants";

const Home = () => {
  const authContext = useContext(AuthStore);
  const history = useHistory();

  useLayoutEffect(() => {
    if (!authContext || !authContext.isAuthenticated) {
      console.log("User not logged in... Redirecting to login page...");
      history.push(Routes.LOGIN);
    } else {
      console.log("User is logged in...");
    }
  });

  return <div>Welcome user...</div>;
};

export default Home;
