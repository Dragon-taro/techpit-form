import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "../entity/rootState";
import profileActions from "../store/profile/actions";

function App() {
  const profile = useSelector((state: RootState) => state.profile);
  const dispatch = useDispatch();
  console.log(profile);

  useEffect(() => {
    dispatch(profileActions.updateProfile({ name: "ほげ" }));
  }, []);

  return <div className="App">hello</div>;
}

export default App;
