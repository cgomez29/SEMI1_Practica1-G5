import { combineReducers } from 'redux';
import { authReducer } from './autReducer';

export const rootReducer = combineReducers({
  auth: authReducer,
});
