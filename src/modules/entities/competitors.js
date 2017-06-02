import { createSelector } from 'reselect'
import rootSelector from './rootSelector'

export const initialState = {
  byId: {
    1: { id: 1, name: 'Dave' },
    2: { id: 2, name: 'Sarah' },
    3: { id: 3, name: 'Rob' }
  }
}

export const reducer = (state = initialState) => {
  return state
}

export const selectors = {
  getAll: createSelector(rootSelector, state => Object.values(state.competitors.byId))
}
