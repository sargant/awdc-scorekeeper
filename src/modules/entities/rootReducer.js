import { combineReducers } from 'redux'
import { reducer as competitorsReducer } from './competitors'

export default combineReducers({
  competitors: competitorsReducer
})
