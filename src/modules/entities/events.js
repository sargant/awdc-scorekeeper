import { createAction, handleActions } from 'redux-actions'
import { createSelector } from 'reselect'
import rootSelector from './rootSelector'

/**********
 * Actions
 */
export const actions = {
  add: createAction(Symbol('add event'))
}

/****************
 * Initial state
 */
export const initialState = {
  byId: {
    1: { id: 1, name: 'First event', date: '2017-01-01' }
  }
}

/**********
 * Reducer
 */
export const reducer = handleActions({
  [actions.add]: (state, action) => {
    const nextId = Math.max(0, ...Object.keys(state.byId)) + 1
    return {
      ...state,
      byId: {
        ...state.byId,
        [nextId]: { ...action.payload, id: nextId }
      }
    }
  }
}, initialState)

/************
 * Selectors
 */
const eventsById = createSelector(rootSelector, state => state.events.byId)

export const selectors = {
  count: createSelector(eventsById, events => Object.keys(events).length),
  getAll: createSelector(eventsById, events => Object.values(events))
}
