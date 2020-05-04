import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { TextField } from "@material-ui/core";

import { RootState } from "../domain/entity/rootState";
import collegesActions from "../store/colleges/actions";

import useStyles from "./styles";

const College = () => {
  const dispatch = useDispatch();
  const colleges = useSelector((state: RootState) => state.colleges);
  const classes = useStyles();

  const handleChange = (name: string) => {
    dispatch(collegesActions.setSearchWord(name));
  };

  return (
    <>
      <TextField
        className={classes.formField}
        fullWidth
        label="大学名を検索"
        value={colleges.search}
        onChange={e => handleChange(e.target.value)}
      />
    </>
  );
};

export default College;
