import React, { useMemo, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  TextField,
  Button,
  Grid,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  FormHelperText
} from "@material-ui/core";

import { RootState } from "../domain/entity/rootState";
import { College as ICollege } from "../domain/entity/colleges";
import { PROFILE } from "../domain/services/profile";
import { calculateValidation } from "../domain/services/validation";

import collegesActions from "../store/colleges/actions";
import { searchColleges } from "../store/colleges/effects";
import profileActions from "../store/profile/actions";
import validationActions from "../store/validation/actions";

import useStyles from "./styles";

const College = () => {
  const dispatch = useDispatch();
  const colleges = useSelector((state: RootState) => state.colleges);
  const profile = useSelector((state: RootState) => state.profile);
  const {
    message: { college: message },
    ...validation
  } = useSelector((state: RootState) => state.validation);
  const classes = useStyles();

  useEffect(() => {
    // 初期ロード = collegesが未ロード && 大学名が入力されてる
    // college.nameを設定するタイミングですでにcollegesを取得しているから初期ロード以外このifを超えない
    if (colleges.result.length !== 0 || !profile.college.name) return;

    dispatch(searchColleges(profile.college.name));
  }, [profile.college.name]);

  // 演算するようにしたのは、そうしないとリロードのタイミングでバグるから
  const currentCollege = useMemo(
    () => colleges.result.filter(c => c.name === profile.college.name)[0],
    // collegesを忘れてるとせっかくロードしたのに更新されない
    [profile.college.name, colleges]
  );
  const currentFaculty = useMemo(
    () =>
      currentCollege?.faculty.filter(
        f => f.name === profile.college.faculty
      )[0],
    [currentCollege, profile.college.faculty, colleges]
  );

  const handleChange = (name: string) => {
    dispatch(collegesActions.setSearchWord(name));
  };

  const handleSearch = () => {
    dispatch(searchColleges(colleges.search));
  };

  const handleCollegeChange = (member: Partial<ICollege>) => {
    dispatch(profileActions.setCollege(member));

    if (!validation.isStartValidation) return;
    const newProfile = {
      ...profile,
      college: { ...profile.college, ...member }
    };
    const message = calculateValidation(newProfile);
    dispatch(validationActions.setValidation(message));
  };

  const handleReset = () => {
    handleCollegeChange({ name: "", faculty: "", department: "" });
    dispatch(collegesActions.setSearchWord(""));
    dispatch(collegesActions.searchCollege.done({ result: [], params: {} }));
  };

  return (
    <div>
      {!profile.college.name && (
        <>
          <TextField
            className={classes.textField}
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
            className={classes.textField}
            label={PROFILE.COLLEGE.NAME}
            fullWidth
            value={profile.college.name}
            disabled
          />
          <FormControl
            error={!!message.faculty}
            fullWidth
            className={classes.textField}
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
            <FormHelperText>{message.faculty}</FormHelperText>
          </FormControl>
          {currentFaculty?.department?.length > 0 && (
            <FormControl required fullWidth className={classes.textField}>
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
    </div>
  );
};

export default College;
