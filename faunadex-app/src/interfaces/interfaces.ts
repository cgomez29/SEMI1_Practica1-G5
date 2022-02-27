import { ActionType } from '../redux/types/types';

export interface UserRegister {
  username: string;
  name: string;
  lastname: string;
  password1: string;
  password2: string;
  photo?: File;
}

export interface Auth {
  userName: string;
  logged: boolean;
}

export type AuthAction =
  | {
      type: ActionType.AUTH_LOGIN;
      payload: Auth;
    }
  | { type: ActionType.AUTH_LOGOUT };

export interface UI {
  loading: boolean;
  msgError: string;
}

export type UiAction =
  | {
      type: ActionType.UI_SET_ERROR;
      payload: string;
    }
  | {
      type: ActionType.UI_REMOVE_ERROR;
    }
  | {
      type: ActionType.UI_START_LOADING;
    }
  | { type: ActionType.UI_FINISH_LOADING };
