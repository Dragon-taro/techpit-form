import React, { useMemo } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../domain/entity/rootState";
import {
  TextField,
  Button,
  Grid,
  FormControl,
  InputLabel,
  MenuItem,
  Select
} from "@material-ui/core";
import collegesActions from "../store/colleges/actions";
import { searchColleges } from "../store/colleges/effects";
import { College as ICollege } from "../domain/entity/colleges";
import profileActions from "../store/profile/actions";

const College = () => {
  const dispatch = useDispatch();
  const colleges = useSelector((state: RootState) => state.colleges);
  const profile = useSelector((state: RootState) => state.profile);

  const currentCollege = useMemo(
    () => colleges.result.filter(c => c.name === profile.college.name)[0],
    [profile.college.name]
  );
  const currentFaculty = useMemo(
    () =>
      currentCollege?.faculty.filter(
        f => f.name === profile.college.faculty
      )[0],
    [profile.college.faculty]
  );

  const handleChange = (name: string) => {
    dispatch(collegesActions.setSearchWord(name));
  };

  const handleSearch = () => {
    dispatch(searchColleges(colleges.search));
  };

  const handleCollegeChange = (member: Partial<ICollege>) => {
    dispatch(profileActions.setCollege(member));
  };

  console.log(profile);

  return (
    <div>
      {!profile.college.name && (
        <>
          <TextField
            fullWidth
            label="大学名を検索"
            value={colleges.search}
            onChange={e => handleChange(e.target.value)}
          />
          <Button fullWidth onClick={handleSearch} disabled={!colleges.search}>
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
            label="大学名"
            fullWidth
            value={profile.college.name}
            disabled
          />
          <FormControl fullWidth>
            <InputLabel>学部</InputLabel>
            <Select
              value={profile.college.faculty}
              onChange={e =>
                handleCollegeChange({ faculty: e.target.value as string })
              }
            >
              {currentCollege?.faculty.map(f => (
                <MenuItem key={f.name} value={f.name}>
                  {f.name}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
          {currentFaculty?.department?.length > 0 && (
            <FormControl fullWidth>
              <InputLabel>学科・コース等</InputLabel>
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
        </>
      )}
    </div>
  );
};

export default College;
