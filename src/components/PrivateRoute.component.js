import React from "react";
import { Route, Redirect } from "react-router-dom";

const PrivateRoute = ({ component: Component, path, ...rest }) => (
  <Route
    {...rest}
    render={(props) =>
      !localStorage.getItem("access") ? (
        <Redirect to="/auth" />
      ) : (
        <Component {...props} />
      )
    }
  />
);
export default PrivateRoute;
