import { Auth, AuthAction } from '../../interfaces/interfaces';
import { ActionType } from '../types/types';

const INITIAL_STATE: Auth = {
  logged: false,
  token: '',
  uId: 0,
  userName: '',
};

export const authReducer = (state: Auth = INITIAL_STATE, action: AuthAction): Auth => {
  switch (action.type) {
    case ActionType.AUTH_LOGIN:
      return {
        ...state,
        logged: true,
        token: action.payload.token,
        uId: action.payload.uId,
        userName: action.payload.userName,
      };
    case ActionType.AUTH_LOGOUT:
      return {
        ...state,
        logged: false,
        token: '',
        uId: 0,
        userName: '',
      };
    default:
      return state;
  }
};
