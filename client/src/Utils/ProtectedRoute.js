import React from "react";
import { Route, Redirect } from "react-router-dom";
import { getToken } from "./Utils";

export const ProtectedRoute = ({
  component: Component,
  children: Children,
  ...rest
}) => {
  return (
    <Route
      {...rest}
      render={props => {
        if (getToken()) {
          console.log(props);
          return (
            <>
              <Children />
              <Component {...props} />
            </>
          );
        } else {
          return <Redirect to={{ pathname: "/" }} />;
        }
      }}
    />
  );
};
