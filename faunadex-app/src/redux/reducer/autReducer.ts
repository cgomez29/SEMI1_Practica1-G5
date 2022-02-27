import { Auth, AuthAction } from '../../interfaces/interfaces';
import { ActionType } from '../types/types';

const intialState: Auth = {
  userName: '',
  logged: false,
  loading: false,
};

export const authReducer = (state: Auth = intialState, action: AuthAction): Auth => {
  switch (action.type) {
    case ActionType.AUTH_LOGIN:
      return {
        ...state,
        logged: true,
        userName: action.payload.userName,
        loading: false,
      };
    case ActionType.AUTH_LOGOUT:
      return {
        ...state,
        logged: false,
        userName: '',
      };
    case ActionType.AUTH_LOADING:
      return {
        ...state,
        loading: true,
      };
    case ActionType.AUTH_FAIL:
      return {
        ...state,
        logged: false,
        userName: '',
        loading: false,
      };

    default:
      return state;
  }
};
