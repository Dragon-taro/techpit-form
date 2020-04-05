import React from "react";
import { Container, Typography, Button } from "@material-ui/core";
import { useSelector, useDispatch } from "react-redux";

import { RootState } from "../domain/entity/rootState";
import { calculateValidation, isValid } from "../domain/services/validation";

import validationActions from "../store/validation/actions";
import alertActions from "../store/alert/actions";

import College from "./College";
import Career from "./Career";
import Basic from "./Basic";
import Address from "./Address";
import useStyles from "./styles";

const Profile = () => {
  const dispatch = useDispatch();
  const profile = useSelector((state: RootState) => state.profile);
  const classes = useStyles();

  const handleSave = () => {
    const message = calculateValidation(profile);
    if (isValid(message)) {
      dispatch(
        alertActions.openAlert({
          severity: "success",
          message: "保存に成功しました！"
        })
      );

      // dispatch(サーバーに保存するための非同期アクション)

      return;
    }

    dispatch(validationActions.setValidation(message));
    dispatch(validationActions.setIsStartvalidation(true));
    dispatch(
      alertActions.openAlert({
        severity: "error",
        message: "入力に誤りがあります。"
      })
    );
  };

  return (
    <Container maxWidth="sm">
      <Typography
        variant="h4"
        component="h2"
        className={classes.title}
        color="primary"
      >
        基本情報
      </Typography>
      <Basic />
      <Typography
        variant="h4"
        component="h2"
        className={classes.title}
        color="primary"
      >
        住所
      </Typography>
      <Address />
      <Typography
        variant="h4"
        component="h2"
        className={classes.title}
        color="primary"
      >
        学歴
      </Typography>
      <College />
      <Typography
        variant="h4"
        component="h2"
        className={classes.title}
        color="primary"
      >
        職歴
      </Typography>
      <Career />
      <Button
        fullWidth
        className={classes.button}
        onClick={handleSave}
        variant="outlined"
        color="primary"
      >
        保存
      </Button>
    </Container>
  );
};

export default Profile;
