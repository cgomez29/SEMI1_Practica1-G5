import { combineReducers } from 'redux';

import { authReducer } from './authReducer';
import { uiReducer } from './uiReducer';
import { userReducer } from './userReducer';
import { albumReducer } from './albumReducer';
import { photoReducer } from './photoReducer';

export const rootReducer = combineReducers({
  auth: authReducer,
  ui: uiReducer,
  user: userReducer,
  album: albumReducer,
  photo: photoReducer,
});
