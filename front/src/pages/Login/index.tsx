import * as React from "react";
import { Button } from "@material-ui/core";
import { useDispatch } from "react-redux";
import { login } from "../../store/auth/effects";
import { useHistory } from "react-router-dom";

const Login: React.FC = () => {
  const dispatch = useDispatch();
  const history = useHistory();

  const handleClick = () => {
    dispatch(
      login(() => {
        history.push("/edit");
      })
    );
  };

  return (
    <Button variant="outlined" fullWidth onClick={handleClick}>
      ログイン
    </Button>
  );
};

export default Login;
