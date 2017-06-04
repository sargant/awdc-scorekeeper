import { combineReducers } from 'redux'
import entitiesRootReducer from './entities/rootReducer'

export default combineReducers({
  entities: entitiesRootReducer
})
