import { streamsReducer } from './streamsDuck'
import { combineReducers } from 'redux'

export const rootReducer = combineReducers({
  streams: streamsReducer
})
