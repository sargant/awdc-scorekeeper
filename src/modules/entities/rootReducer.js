import { combineReducers } from 'redux'
import { reducer as competitorsReducer } from './competitors'
import { reducer as eventsReducer } from './events'

export default combineReducers({
  competitors: competitorsReducer,
  events: eventsReducer
})
