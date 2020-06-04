import actionCreatorFactory from "typescript-fsa"
import { Profile } from '../../domain/entity/profile'

const actionCreator = actionCreatorFactory()

export const profileActions = {
  setProfile: actionCreator<Partial<Profile>>("SET_PROFILE")
}
