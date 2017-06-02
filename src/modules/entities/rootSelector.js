import { createSelector } from 'reselect'
import parentSelector from '../rootSelector'

export default createSelector(parentSelector, state => state.entities)
