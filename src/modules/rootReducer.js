import { combineReducers } from 'redux'
import { reducer as formReducer } from 'redux-form'
import entitiesRootReducer from './entities/rootReducer'

export default combineReducers({
  form: formReducer,
  entities: entitiesRootReducer
})
