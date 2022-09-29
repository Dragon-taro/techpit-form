import React from 'react'
import { useDispatch, useSelector } from 'react-redux'

import { TextField } from '@material-ui/core'

import useStyles from './styles'

import { RootState } from '../domain/entity/rootState'
import { Profile } from '../domain/entity/profile'
import { PROFILE } from '../domain/services/profile'
import profileActions from '../store/profile/actions'

const Basic = () => {
    const dispatch = useDispatch()
    const profile  = useSelector((state: RootState) => state.profile)
    const classes = useStyles()

    const handleChange = (member: Partial<Profile>) => {
        dispatch(profileActions.setProfile(member))
    }
    return (
        <>
            <TextField 
                fullWidth 
                className={classes.formField}
                value={profile.name}
                onChange={e => handleChange({ name: e.target.value })}
                label={PROFILE.NAME} 
            />
            <TextField
                fullWidth
                multiline
                className={classes.formField}
                rows={5}
                value={profile.description}
                onChange={e => handleChange({ description: e.target.value })}
                label={PROFILE.DESCRIPTION}
            />
        </>
    )
}


export default Basic