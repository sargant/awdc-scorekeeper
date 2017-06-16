import { createAction, handleActions } from 'redux-actions'
import { createSelector } from 'reselect'
import rootSelector from './rootSelector'

export const actions = {
  add: createAction(Symbol('add competitor')),
  reset: createAction(Symbol('reset competitors'))
}

export const initialState = {
  byId: {}
}

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

const competitors = createSelector(rootSelector, state => state.competitors)

export const selectors = {
  getAll: createSelector(competitors, competitors => Object.values(competitors.byId)),
  get: createSelector(competitors, (_, id) => id, (competitors, id) => id && competitors.byId[id])
}
