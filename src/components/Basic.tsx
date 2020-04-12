import React from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  TextField,
  FormControl,
  FormLabel,
  RadioGroup,
  FormControlLabel,
  Radio,
  FormHelperText
} from "@material-ui/core";

import { RootState } from "../domain/entity/rootState";
import { Profile } from "../domain/entity/profile";
import { Gender } from "../domain/entity/gender";
import { PROFILE } from "../domain/services/profile";
import { calculateValidation } from "../domain/services/validation";

import profileActions from "../store/profile/actions";
import validationActions from "../store/validation/actions";

import useStyles from "./styles";

const Basic = () => {
  const dispatch = useDispatch();
  const profile = useSelector((state: RootState) => state.profile);
  const { message, ...validation } = useSelector(
    (state: RootState) => state.validation
  );
  const classes = useStyles();

  const handleChange = (member: Partial<Profile>) => {
    dispatch(profileActions.setProfile(member));

    recalculateValidation(member);
  };

  const recalculateValidation = (member: Partial<Profile>) => {
    // バリデーションのエラーを表示し始めてたらメッセージを計算して更新
    if (!validation.isStartValidation) return;

    // profileだと一つ前のstateになってしまう
    // とはいえこの実装はまずい
    // → 新しいstate生成をserviceにまとめる or side effectsとして扱う
    // これはadvance的な扱いにして紹介ぐらいにするのが楽そうう
    const newProfile = {
      ...profile,
      ...member
    };
    const message = calculateValidation(newProfile);
    dispatch(validationActions.setValidation(message));
  };

  return (
    <>
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
    </>
  );
};

export default Basic;
