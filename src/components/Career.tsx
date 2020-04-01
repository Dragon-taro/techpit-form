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
import { exitEmptyCareers } from "../domain/services/career";
import { calculateValidation } from "../domain/services/validation";
import validationActions from "../store/validation/actions";

const Career = () => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const profile = useSelector((state: RootState) => state.profile);
  const careers = useSelector((state: RootState) => state.profile.career);
  const { message, ...validation } = useSelector(
    (state: RootState) => state.validation
  );

  const handleChange = (member: Partial<ICareer>, i: number) => {
    dispatch(profileActions.setCareer({ career: member, index: i }));

    if (!validation.isStartValidation) return;

    const newProfile = {
      ...profile,
      career: profile.career.map((c, _i) =>
        _i === i ? { ...c, ...member } : c
      )
    };
    const message = calculateValidation(newProfile);
    dispatch(validationActions.setValidation(message));
  };

  const nonaddableCareer = exitEmptyCareers(careers);

  const handleAddCareer = () => {
    if (nonaddableCareer) return;

    dispatch(profileActions.addCareer({}));
  };

  const handleDeleteCareer = (i: number) => {
    dispatch(profileActions.deleteCareer(i));
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
            error={!!message.career[i]?.company}
            helperText={message.career[i]?.company}
            label="会社名"
            value={c.company}
            onChange={e => handleChange({ company: e.target.value }, i)}
          />
          <TextField
            className={classes.textField}
            fullWidth
            error={!!message.career[i]?.position}
            helperText={message.career[i]?.position}
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
                  error={!!message.career[i]?.startAt}
                  helperText={message.career[i]?.startAt}
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
                  error={!!message.career[i]?.endAt}
                  helperText={message.career[i]?.endAt}
                  InputLabelProps={{
                    shrink: true
                  }}
                  value={c.endAt}
                  onChange={e => handleChange({ endAt: e.target.value }, i)}
                />
              </Grid>
            </Grid>
          </div>
          <Button
            className={classes.button}
            onClick={() => handleDeleteCareer(i)}
            fullWidth
            variant="outlined"
            color="secondary"
          >
            職歴 {i + 1} を削除
          </Button>
        </Fragment>
      ))}
      <Button
        className={classes.button}
        onClick={handleAddCareer}
        fullWidth
        variant="outlined"
        disabled={nonaddableCareer}
      >
        職歴を追加
      </Button>
    </>
  );
};

export default Career;
