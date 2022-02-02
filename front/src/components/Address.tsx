import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { TextField } from "@material-ui/core";

import { RootState } from "../domain/entity/rootState";
import { PROFILE } from "../domain/services/profile";
import { Address as IAddress } from "../domain/entity/address";

import { profileActions } from "../store/profile/actions";
import { isPostalcode } from "../domain/services/address";

import { searchAddressFromPostalcode } from "../store/profile/effects";

import useStyes from "./styles";

export const Address = () => {
  const dispatch = useDispatch();
  const profile = useSelector((state: RootState) => state.profile);
  const classes = useStyes();

  const handleAddressChange = (member: Partial<IAddress>) => {
    dispatch(profileActions.setAddress(member));
  };

  const handlePostalcodeChange = (code: string) => {
    if (!isPostalcode(code)) return;
    dispatch(profileActions.setAddress({ postalcode: code }));
    dispatch(searchAddressFromPostalcode(code));
  };

  return (
    <>
      <TextField
        fullWidth
        className={classes.formField}
        label={PROFILE.ADDRESS.POSTALCODE}
        value={profile.address.postalcode}
        onChange={(e) => handlePostalcodeChange(e.target.value)}
      />
      <TextField
        fullWidth
        className={classes.formField}
        label={PROFILE.ADDRESS.PREFECTURE}
        value={profile.address.prefecture}
        onChange={(e) => handleAddressChange({ prefecture: e.target.value })}
      />
      <TextField
        fullWidth
        className={classes.formField}
        label={PROFILE.ADDRESS.CITY}
        value={profile.address.city}
        onChange={(e) => handleAddressChange({ city: e.target.value })}
      />
      <TextField
        fullWidth
        className={classes.formField}
        label={PROFILE.ADDRESS.RESTADDRES}
        value={profile.address.restAddress}
        onChange={(e) => handleAddressChange({ restAddress: e.target.value })}
      />
    </>
  );
};
