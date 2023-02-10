import { combineReducers, createStore } from 'redux'
import { RootState } from '../domain/entity/rootState'
import profileReducer from './profile/reducer'

const store = createStore(
  combineReducers<RootState>({
    profile: profileReducer
  }),
  (window as any).__REDUX_DEVTOOLS_EXTENSION__ &&
    (window as any).__REDUX_DEVTOOLS_EXTENSION__()
)

export default store
