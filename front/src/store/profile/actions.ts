import actionCreatorFactory from 'typescript-fsa'
import { Address } from '../../domain/entity/address'
import { Profile } from '../../domain/entity/profile'

const actionCreator = actionCreatorFactory()

const profileActions = {
  setProfile: actionCreator<Partial<Profile>>('SET_PROFILE'),
  setAddress: actionCreator<Partial<Address>>('SET_ADDRESS')
}

export default profileActions
