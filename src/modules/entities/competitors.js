import { createAction, handleActions } from 'redux-actions'
import { createSelector } from 'reselect'
import rootSelector from './rootSelector'

export const actions = {
  add: createAction(Symbol('add competitor'))
}

export const initialState = {
  byId: {
    1: { id: 1, name: 'Dave' },
    2: { id: 2, name: 'Sarah' },
    3: { id: 3, name: 'Rob' }
  }
}

export const reducer = handleActions({
  [actions.add]: (state, action) => {
    const nextId = Math.max(...Object.keys(state.byId)) + 1
    return {
      ...state,
      byId: {
        ...state.byId,
        [nextId]: {
          ...action.payload,
          id: nextId
        }
      }
    }
  }
}, initialState)

export const selectors = {
  getAll: createSelector(rootSelector, state => Object.values(state.competitors.byId))
}
