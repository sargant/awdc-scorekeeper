import { createSelector } from 'reselect'
import rootSelector from './rootSelector'

export const initialState = 'Hello world!'

export const reducer = (state = initialState) => state

export const selectors = {
  test: createSelector(rootSelector, _ => _.test)
}
