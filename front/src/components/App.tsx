import React from "react";
import Profile from "./Profile";
import Alert from "./Alert";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

function App() {
  return (
    <>
      <Router>
        <Switch>
          <Route path="/edit">
            <Profile />
          </Route>
        </Switch>
      </Router>
      <Alert />
    </>
  );
}

export default App;
