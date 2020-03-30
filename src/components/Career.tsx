import React, { Fragment } from "react";
import {
  TextField,
  Button,
  Grid,
  InputLabel,
  Typography
} from "@material-ui/core";
import { useSelector, useDispatch } from "react-redux";

import useStyles from "./styles";
import { RootState } from "../domain/entity/rootState";
import { Career as ICareer } from "../domain/entity/career";
import profileActions from "../store/profile/actions";

const Career = () => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const careers = useSelector((state: RootState) => state.profile.career);

  const handleChange = (member: Partial<ICareer>, i: number) => {
    dispatch(profileActions.setCareer({ career: member, index: i }));
  };

  const handleAddCareer = () => {
    dispatch(profileActions.addCareer({}));
  };

  return (
    <>
      {careers.map((c, i) => (
        <Fragment key={i}>
          <Typography variant="h5" component="h3" className={classes.title}>
            職歴 {i + 1}
          </Typography>
          <TextField
            className={classes.textField}
            fullWidth
            label="会社名"
            value={c.company}
            onChange={e => handleChange({ company: e.target.value }, i)}
          />
          <TextField
            className={classes.textField}
            fullWidth
            label="役職"
            value={c.position}
            onChange={e => handleChange({ position: e.target.value }, i)}
          />
          <div className={classes.careerSpan}>
            <InputLabel shrink>期間</InputLabel>
            <Grid
              container
              spacing={1}
              alignContent="space-between"
              alignItems="center"
            >
              <Grid item xs={5}>
                <TextField
                  fullWidth
                  type="month"
                  InputLabelProps={{
                    shrink: true
                  }}
                  value={c.startAt}
                  onChange={e => handleChange({ startAt: e.target.value }, i)}
                />
              </Grid>
              <Grid item xs={2}>
                <Typography align="center">〜</Typography>
              </Grid>
              <Grid item xs={5}>
                <TextField
                  fullWidth
                  type="month"
                  InputLabelProps={{
                    shrink: true
                  }}
                  value={c.endAt}
                  onChange={e => handleChange({ endAt: e.target.value }, i)}
                />
              </Grid>
            </Grid>
          </div>
        </Fragment>
      ))}
      <Button
        className={classes.button}
        onClick={handleAddCareer}
        fullWidth
        variant="outlined"
      >
        職歴を追加
      </Button>
    </>
  );
};

export default Career;
