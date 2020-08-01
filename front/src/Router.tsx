import React from "react";
import Edit from "./pages/Edit";
import Alert from "./commons/Alert";
import { BrowserRouter, Switch, Route } from "react-router-dom";
import Show from "./pages/Show";
import Login from "./pages/Login";
import AuthRoute from "./commons/AuthRoute";

function Router() {
  return (
    <>
      <BrowserRouter>
        <Switch>
          <AuthRoute path="/edit">
            <Edit />
          </AuthRoute>
          <AuthRoute path="/show">
            <Show />
          </AuthRoute>
          <Route path="">
            <Login />
          </Route>
        </Switch>
      </BrowserRouter>
      <Alert />
    </>
  );
}

export default Router;
