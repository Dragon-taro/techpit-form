import React from "react";
import { TextField, Container, Typography } from "@material-ui/core";
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "../entity/rootState";
import { Profile as IProfile } from "../entity/profile";
import profileActions from "../store/profile/actions";

const Profile = () => {
  const profile = useSelector((state: RootState) => state.profile);
  const dispatch = useDispatch();

  const handleChange = (member: Partial<IProfile>) => {
    dispatch(profileActions.updateProfile(member));
  };

  return (
    <Container maxWidth="sm">
      <Typography variant="h4" component="h2">
        基本情報
      </Typography>
      <TextField
        fullWidth
        label="名前"
        value={profile.name}
        onChange={e => handleChange({ name: e.target.value })}
      />
    </Container>
  );
};

export default Profile;
