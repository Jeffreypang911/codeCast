import { combineReducers } from 'redux'

import { chatReducer }  from './chatDuck'
import { directoryReducer } from './directoryDuck'
import { fileReducer } from './fileDuck'
import { streamsReducer } from './streamsDuck'


export const rootReducer = combineReducers({
  chat: chatReducer,
  directory: directoryReducer,
  file: fileReducer,
  streams: streamsReducer
})
