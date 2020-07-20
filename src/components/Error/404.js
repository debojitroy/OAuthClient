import React from "react";
import Jumbotron from "react-bootstrap/Jumbotron";
import Button from "react-bootstrap/Button";

const NotFound = ({ heading, errorMessage, actionCTA, action }) => {
  return (
    <Jumbotron>
      <h1>{heading}</h1>
      <p>{errorMessage}</p>
      {action ? (
        <Button variant="primary" onClick={action}>
          {actionCTA}
        </Button>
      ) : null}
    </Jumbotron>
  );
};

export default NotFound;
