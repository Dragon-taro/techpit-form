import * as React from "react";
import firebase from "firebase";
import { Route, Redirect } from "react-router-dom";

const AuthRoute: React.FC<{ path: string }> = ({ children, path }) => {
  const [authed, setAuthed] = React.useState(false);
  const [isInit, setIsInit] = React.useState(false);

  React.useEffect(() => {
    firebase.auth().onAuthStateChanged(user => {
      if (user) {
        setAuthed(true);
        setIsInit(true);
      } else {
        setAuthed(false);
        setIsInit(true);
      }
    });
  }, []);

  if (!isInit) {
    return <div>loading</div>;
  }

  console.log(`isInit: ${isInit}, authed: ${authed}`);

  if (isInit && !authed) {
    return <Redirect to="/" />;
  }

  return <Route path={path}>{children}</Route>;
};

export default AuthRoute;
