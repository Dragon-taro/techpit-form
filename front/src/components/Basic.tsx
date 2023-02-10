import { TextField } from '@material-ui/core'
import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Profile } from '../domain/entity/profile'
import { RootState } from '../domain/entity/rootState'
import { PROFILE } from '../domain/services/profile'
import profileActions from '../store/profile/actions'
import useStyles from './styles'

const Basic = () => {
  const dispatch = useDispatch()
  const profile = useSelector((state: RootState) => state.profile)

  const classes = useStyles()

  const handleChange = (member: Partial<Profile>) => {
    dispatch(profileActions.setProfile(member))
  }

  return (
    <>
      <TextField
        fullWidth
        className={classes.formField}
        label={PROFILE.NAME}
        value={profile.name}
        onChange={(e) => handleChange({ name: e.target.value })}
      />
      <TextField
        fullWidth
        multiline
        className={classes.formField}
        rows={5}
        label={PROFILE.DESCRIPTION}
        value={profile.description}
        onChange={(e) => handleChange({ description: e.target.value })}
      />
    </>
  )
}

export default Basic
