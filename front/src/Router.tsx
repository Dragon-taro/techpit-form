import React from "react";
import Edit from "./pages/Edit";
import Alert from "./commons/Alert";
import { BrowserRouter, Switch, Route } from "react-router-dom";
import Show from "./pages/Show";
import Login from "./pages/Login";

function Router() {
  return (
    <>
      <BrowserRouter>
        <Switch>
          <Route path="/edit">
            <Edit />
          </Route>
          <Route path="/show">
            <Show />
          </Route>
          <Route paht="">
            <Login />
          </Route>
        </Switch>
      </BrowserRouter>
      <Alert />
    </>
  );
}

export default Router;
