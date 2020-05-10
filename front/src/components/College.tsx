import React from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  TextField,
  Button,
  Grid,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  FormHelperText
} from "@material-ui/core";

import { RootState } from "../domain/entity/rootState";
import collegesActions from "../store/colleges/actions";
import { searchColleges } from "../store/colleges/effects";
import { College as ICollege } from "../domain/entity/college";
import profileActions from "../store/profile/actions";

import useStyles from "./styles";
import { PROFILE } from "../domain/services/profile";

const College = () => {
  const dispatch = useDispatch();
  const colleges = useSelector((state: RootState) => state.colleges);
  const profile = useSelector((state: RootState) => state.profile);
  const validation = useSelector((state: RootState) => state.validation);
  const classes = useStyles();

  const currentCollege = colleges.result.filter(
    c => c.name === profile.college.name
  )[0];
  const currentFaculty = currentCollege?.faculty.filter(
    f => f.name === profile.college.faculty
  )[0];

  const handleChange = (name: string) => {
    dispatch(collegesActions.setSearchWord(name));
  };

  const handleSearch = () => {
    dispatch(searchColleges(colleges.search));
  };

  const handleCollegeChange = (member: Partial<ICollege>) => {
    dispatch(profileActions.setCollege(member));
  };

  const handleReset = () => {
    handleCollegeChange({ name: "", faculty: "", department: "" });
    dispatch(collegesActions.setSearchWord(""));
    dispatch(collegesActions.searchCollege.done({ result: [], params: {} }));
  };

  return (
    <>
      {!profile.college.name && (
        <>
          <TextField
            className={classes.formField}
            fullWidth
            label="大学名を検索"
            value={colleges.search}
            onChange={e => handleChange(e.target.value)}
          />
          <Button
            fullWidth
            variant="outlined"
            color="primary"
            className={classes.button}
            onClick={handleSearch}
            disabled={!colleges.search}
          >
            検索
          </Button>
          <Grid spacing={1} container>
            {colleges.result.map(c => (
              <Grid key={c.name} item>
                <Button
                  variant="outlined"
                  color="primary"
                  onClick={() => handleCollegeChange({ name: c.name })}
                >
                  {c.name}
                </Button>
              </Grid>
            ))}
          </Grid>
        </>
      )}
      {profile.college.name && (
        <>
          <TextField
            className={classes.formField}
            label={PROFILE.COLLEGE.NAME}
            fullWidth
            value={profile.college.name}
            disabled
          />
          <FormControl
            error={!!validation.message.college.faculty}
            fullWidth
            className={classes.formField}
          >
            <InputLabel>{PROFILE.COLLEGE.FACULTY}</InputLabel>
            <Select
              value={profile.college.faculty}
              onChange={e =>
                handleCollegeChange({
                  faculty: e.target.value as string,
                  // 学科はリセットしないとwarnning
                  department: ""
                })
              }
            >
              {currentCollege?.faculty.map(f => (
                <MenuItem key={f.name} value={f.name}>
                  {f.name}
                </MenuItem>
              ))}
            </Select>
            <FormHelperText>
              {validation.message.college.faculty}
            </FormHelperText>
          </FormControl>
          {currentFaculty?.department.length > 0 && (
            <FormControl required fullWidth className={classes.formField}>
              <InputLabel>{PROFILE.COLLEGE.DEPARTMENT}</InputLabel>
              <Select
                value={profile.college.department}
                onChange={e =>
                  handleCollegeChange({ department: e.target.value as string })
                }
              >
                {currentFaculty.department.map(d => (
                  <MenuItem key={d} value={d}>
                    {d}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          )}
          <Button
            fullWidth
            className={classes.button}
            onClick={handleReset}
            variant="outlined"
            color="secondary"
          >
            学歴の入力情報をリセット
          </Button>
        </>
      )}
    </>
  );
};

export default College;
