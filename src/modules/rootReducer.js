import { combineReducers } from 'redux'
import { reducer as formReducer } from 'redux-form'
import { reducer as testReducer } from './test'

export default combineReducers({
  form: formReducer,
  test: testReducer
})
