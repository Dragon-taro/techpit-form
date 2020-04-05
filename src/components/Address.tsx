import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { TextField } from "@material-ui/core";

import { RootState } from "../domain/entity/rootState";
import { Profile } from "../domain/entity/profile";
import { Address as IAddress } from "../domain/entity/address";
import { isPostalcode } from "../domain/services/address";
import { PROFILE } from "../domain/services/profile";
import { calculateValidation } from "../domain/services/validation";

import profileActions from "../store/profile/actions";
import validationActions from "../store/validation/actions";
import { searchAddressFromPostalcode } from "../store/profile/effects";

import useStyles from "./styles";

const Address = () => {
  const dispatch = useDispatch();
  const profile = useSelector((state: RootState) => state.profile);
  const { message, ...validation } = useSelector(
    (state: RootState) => state.validation
  );
  const classes = useStyles();

  const handleAddressChange = (member: Partial<IAddress>) => {
    dispatch(profileActions.setAddress(member));

    recalculateValidation({ address: { ...profile.address, ...member } });
  };

  const handlePostalcodeChange = (code: string) => {
    if (!isPostalcode(code)) return;

    dispatch(searchAddressFromPostalcode(code));
    dispatch(profileActions.setAddress({ postalcode: code }));

    recalculateValidation({
      address: { ...profile.address, postalcode: code }
    });
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
    </>
  );
};

export default Address;
