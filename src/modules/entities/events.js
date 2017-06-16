import { createAction, handleActions } from 'redux-actions'
import { createSelector } from 'reselect'
import rootSelector from './rootSelector'

/**********
 * Actions
 */
export const actions = {
  add: createAction(Symbol('add event')),
  reset: createAction(Symbol('reset evens'))
}

/****************
 * Initial state
 */
export const initialState = {
  byId: {}
}

/**********
 * Reducer
 */
export const reducer = handleActions({
  [actions.add]: (state, action) => {
    const id = action.payload.id || Math.max(0, ...Object.keys(state.byId)) + 1
    return {
      ...state,
      byId: {
        ...state.byId,
        [id]: { ...action.payload, id }
      }
    }
  },
  [actions.reset]: () => initialState
}, initialState)

/************
 * Selectors
 */
const events = createSelector(rootSelector, state => state.events)

export const selectors = {
  getAll: createSelector(events, events => Object.values(events.byId)),
  get: createSelector(events, (_, id) => id, (events, id) => id && events.byId[id])
}
