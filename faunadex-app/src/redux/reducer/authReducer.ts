import { Auth, AuthAction } from '../../interfaces/interfaces';
import { ActionType } from '../types/types';

const INITIAL_STATE: Auth = {
  userName: '',
  logged: false,
};

export const authReducer = (state: Auth = INITIAL_STATE, action: AuthAction): Auth => {
  switch (action.type) {
    case ActionType.AUTH_LOGIN:
      return {
        ...state,
        logged: true,
        userName: action.payload.userName,
      };
    case ActionType.AUTH_LOGOUT:
      return {
        ...state,
        logged: false,
        userName: '',
      };
    default:
      return state;
  }
};
