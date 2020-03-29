import React from "react";
import {
  TextField,
  Container,
  Typography,
  FormControl,
  FormLabel,
  RadioGroup,
  FormControlLabel,
  Radio
} from "@material-ui/core";
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "../domain/entity/rootState";
import { Profile as IProfile } from "../domain/entity/profile";
import profileActions from "../store/profile/actions";
import { Gender } from "../domain/entity/gender";
import { Address } from "../domain/entity/address";
import { isPostalcode } from "../domain/services/address";
import { searchAddressFromPostalcode } from "../store/profile/effects";

const Profile = () => {
  const profile = useSelector((state: RootState) => state.profile);
  const dispatch = useDispatch();

  const handleChange = (member: Partial<IProfile>) => {
    dispatch(profileActions.updateProfile(member));
  };

  const handleAddressChange = (member: Partial<Address>) => {
    dispatch(profileActions.updateAddress(member));
  };

  const handlePostalcodeChange = (code: string) => {
    if (!isPostalcode(code)) return;

    dispatch(searchAddressFromPostalcode(code));

    dispatch(profileActions.updateAddress({ postalcode: code }));
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
      <TextField
        fullWidth
        multiline
        rows={5}
        label="自己紹介"
        value={profile.description}
        onChange={e => handleChange({ description: e.target.value })}
      />
      <FormControl>
        <FormLabel>性別</FormLabel>
        <RadioGroup
          onChange={e => handleChange({ gender: e.target.value as Gender })}
        >
          <FormControlLabel
            value="male"
            label="男性"
            control={<Radio color="primary" />}
          />
          <FormControlLabel
            value="female"
            label="女性"
            control={<Radio color="primary" />}
          />
        </RadioGroup>
      </FormControl>
      <TextField
        fullWidth
        label="生年月日"
        type="date"
        value={profile.birthday}
        onChange={e => handleChange({ birthday: e.target.value })}
        InputLabelProps={{
          shrink: true
        }}
      />
      <Typography variant="h5" component="h3">
        住所
      </Typography>
      <TextField
        fullWidth
        label="郵便番号"
        value={profile.address.postalcode}
        onChange={e => handlePostalcodeChange(e.target.value)}
      />
      <TextField
        fullWidth
        label="都道府県"
        value={profile.address.prefecture}
        onChange={e => handleAddressChange({ prefecture: e.target.value })}
      />
      <TextField
        fullWidth
        label="市区町村"
        value={profile.address.town}
        onChange={e => handleAddressChange({ town: e.target.value })}
      />
      <TextField
        fullWidth
        label="番地以下"
        value={profile.address.restAddress}
        onChange={e => handleAddressChange({ restAddress: e.target.value })}
      />
    </Container>
  );
};

export default Profile;
