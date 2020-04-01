import React from "react";
import {
  TextField,
  Container,
  Typography,
  FormControl,
  FormLabel,
  RadioGroup,
  FormControlLabel,
  Radio,
  Button,
  FormHelperText
} from "@material-ui/core";
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "../domain/entity/rootState";
import { Profile as IProfile } from "../domain/entity/profile";
import profileActions from "../store/profile/actions";
import { Gender } from "../domain/entity/gender";
import { Address } from "../domain/entity/address";
import { isPostalcode } from "../domain/services/address";
import { searchAddressFromPostalcode } from "../store/profile/effects";
import College from "./College";
import useStyles from "./styles";
import Career from "./Career";
import { PROFILE } from "../domain/services/profile";
import { calculateValidation, isValid } from "../domain/services/validation";
import validationActions from "../store/validation/actions";

const Profile = () => {
  const profile = useSelector((state: RootState) => state.profile);
  const dispatch = useDispatch();
  const { message, ...validation } = useSelector(
    (state: RootState) => state.validation
  );
  const classes = useStyles();

  const handleChange = (member: Partial<IProfile>) => {
    dispatch(profileActions.setProfile(member));

    // バリデーションのエラーを表示し始めてたらメッセージを計算して更新
    if (!validation.isStartValidation) return;
    const message = calculateValidation(profile);
    dispatch(validationActions.setValidation(message));
  };

  const handleAddressChange = (member: Partial<Address>) => {
    dispatch(profileActions.setAddress(member));

    if (!validation.isStartValidation) return;
    const message = calculateValidation(profile);
    dispatch(validationActions.setValidation(message));
  };

  const handlePostalcodeChange = (code: string) => {
    if (!isPostalcode(code)) return;

    dispatch(searchAddressFromPostalcode(code));
    dispatch(profileActions.setAddress({ postalcode: code }));

    if (!validation.isStartValidation) return;
    const message = calculateValidation(profile);
    dispatch(validationActions.setValidation(message));
  };

  const handleSave = () => {
    const message = calculateValidation(profile);
    if (isValid(message)) return;

    dispatch(validationActions.setValidation(message));
    dispatch(validationActions.setIsStartvalidation(true));
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
      <TextField
        fullWidth
        label={PROFILE.NAME}
        required
        error={!!message.name}
        helperText={message.name}
        className={classes.textField}
        value={profile.name}
        onChange={e => handleChange({ name: e.target.value })}
      />
      <TextField
        fullWidth
        multiline
        error={!!message.description}
        helperText={message.description}
        className={classes.textField}
        rows={5}
        label={PROFILE.DESCRIPTION}
        value={profile.description}
        onChange={e => handleChange({ description: e.target.value })}
      />
      <FormControl
        error={!!message.gender}
        required
        className={classes.textField}
      >
        <FormLabel>{PROFILE.GENDER}</FormLabel>
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
        <FormHelperText>{message.gender}</FormHelperText>
      </FormControl>
      <TextField
        fullWidth
        required
        error={!!message.birthday}
        helperText={message.birthday}
        className={classes.textField}
        label={PROFILE.BIRTHDAY}
        type="date"
        value={profile.birthday}
        onChange={e => handleChange({ birthday: e.target.value })}
        InputLabelProps={{
          shrink: true
        }}
      />
      <Typography
        variant="h4"
        component="h2"
        className={classes.title}
        color="primary"
      >
        住所
      </Typography>
      <TextField
        fullWidth
        required
        error={!!message.address.postalcode}
        helperText={message.address.postalcode}
        className={classes.textField}
        label={PROFILE.ADDRESS.POSTALCODE}
        value={profile.address.postalcode}
        onChange={e => handlePostalcodeChange(e.target.value)}
      />
      <TextField
        fullWidth
        required
        error={!!message.address.prefecture}
        helperText={message.address.prefecture}
        className={classes.textField}
        label={PROFILE.ADDRESS.PREFECTURE}
        value={profile.address.prefecture}
        onChange={e => handleAddressChange({ prefecture: e.target.value })}
      />
      <TextField
        fullWidth
        required
        error={!!message.address.town}
        helperText={message.address.town}
        className={classes.textField}
        label={PROFILE.ADDRESS.TOWN}
        value={profile.address.town}
        onChange={e => handleAddressChange({ town: e.target.value })}
      />
      <TextField
        fullWidth
        className={classes.textField}
        error={!!message.address.restAddress}
        helperText={message.address.restAddress}
        label={PROFILE.ADDRESS.RESTADDRES}
        value={profile.address.restAddress}
        onChange={e => handleAddressChange({ restAddress: e.target.value })}
      />
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
