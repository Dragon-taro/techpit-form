import React, { Fragment } from "react";
import {
  TextField,
  Grid,
  InputLabel,
  Typography,
  Button,
} from "@material-ui/core";
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "../domain/entity/rootState";

import { Career as ICareer } from "../domain/entity/career";
import { profileActions } from "../store/profile/actions";
import { exitEmptyCareers } from "../domain/services/career";
import { PROFILE } from "../domain/services/profile";

import useStyles from "./styles";

export const Career = () => {
  const classes = useStyles();

  const dispatch = useDispatch();
  const careers = useSelector((state: RootState) => state.profile.careers);

  const isAbleToAddCarrer = exitEmptyCareers(careers);

  const handleChange = (member: Partial<ICareer>, index: number) => {
    dispatch(profileActions.setCareer({ career: member, index: index }));
  };

  const handleAddCareer = () => {
    dispatch(profileActions.addCareer({}));
  };

  const handleDeleteCareer = (index: number) => {
    dispatch(profileActions.deleteCareer(index));
  };

  return (
    <>
      {careers.map((career, index) => (
        <Fragment key={index}>
          <Typography variant="h5" component="h3" className={classes.title}>
            職歴 {index + 1}
          </Typography>
          <TextField
            className={classes.formField}
            fullWidth
            label={PROFILE.CAREERS.COMPANY}
            value={career.company}
            onChange={(e) => handleChange({ company: e.target.value }, index)}
          />
          <TextField
            className={classes.formField}
            fullWidth
            label={PROFILE.CAREERS.POSITION}
            value={career.position}
            onChange={(e) => handleChange({ position: e.target.value }, index)}
          />
          <div className={classes.careerSpan}>
            <InputLabel shrink>{PROFILE.CAREERS.SPAN}</InputLabel>
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
                    shrink: true,
                  }}
                  value={career.startAt}
                  onChange={(e) =>
                    handleChange({ startAt: e.target.value }, index)
                  }
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
                    shrink: true,
                  }}
                  value={career.endAt}
                  onChange={(e) =>
                    handleChange({ endAt: e.target.value }, index)
                  }
                />
              </Grid>
            </Grid>
          </div>
          <Button
            className={classes.button}
            onClick={() => handleDeleteCareer(index)}
            fullWidth
            variant="outlined"
            color="secondary"
          >
            職歴 {index + 1}を削除
          </Button>
        </Fragment>
      ))}
      <Button
        className={classes.button}
        onClick={handleAddCareer}
        fullWidth
        variant="outlined"
        disabled={isAbleToAddCarrer}
      >
        職歴を追加
      </Button>
    </>
  );
};
