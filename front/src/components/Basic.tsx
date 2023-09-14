import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { 
    TextField,
    FormControl,
    FormLabel,
    RadioGroup,
    FormControlLabel,
    Radio
} from "@material-ui/core";

import useStyles from "./styles";
import { RootState } from "../domain/entity/rootState";
import { Profile } from "../domain/entity/profile";
import { Gender } from "../domain/entity/gender";
import { PROFILE } from "../domain/services/profile";
import profileActions from "../store/profile/actions";

const Basic = () => {
    const classes = useStyles();
    const dispatch = useDispatch();
    const profile = useSelector((state: RootState) => state.profile);

    const handleChange = (member: Partial<Profile>) => {
        dispatch(profileActions.setProfile(member));
    };

    return (
        <>
            <TextField 
                fullWidth 
                label={PROFILE.NAME}
                className={classes.formField} 
                value={profile.name}
                onChange={e => handleChange({name: e.target.value})}
            />
            <TextField
                fullWidth
                multiline
                className={classes.formField}
                rows={5}
                label={PROFILE.DESCRIPTION}
                value={profile.description}
                onChange={e => handleChange({description: e.target.value})}
            />
            <FormControl className={classes.formField}>
                <FormLabel>{PROFILE.GENDER}</FormLabel>
                <RadioGroup
                    value={profile.gender}
                    onChange={e => handleChange({gender: e.target.value as Gender})}
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
        </>
    );
};

export default Basic;
