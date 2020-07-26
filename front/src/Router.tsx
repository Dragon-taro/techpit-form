import React from "react";
import { BrowserRouter, Route, Switch, Link } from "react-router-dom";
import EditProfile from "./pages/EditProfile";
import Alert from "./pages/EditProfile/Alert";
import Profile from "./pages/Profile";

function Router() {
  return (
    <>
      <BrowserRouter>
        <Switch>
          <Route exact path="/edit">
            <EditProfile />
          </Route>
          <Route exact path="/show">
            <Profile />
          </Route>
          <Route>
            <div>Not Found</div>
          </Route>
        </Switch>
      </BrowserRouter>
      <Alert />
    </>
  );
}

export default Router;
