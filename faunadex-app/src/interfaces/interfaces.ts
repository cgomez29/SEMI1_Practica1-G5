import { ActionType } from '../redux/types/types';

export interface UserRegister {
  username: string;
  name: string;
  lastname: string;
  password1: string;
  password2: string;
  photo?: any;
}

export interface UserProfile {
  username: string;
  name: string;
  password1: string;
  photo?: any;
}

export interface Auth {
  userName: string;
  uId: number;
  token: string;
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

export interface User {
  folders: number;
  name: string;
  photos: number;
  uId: number;
  urlFoto: string;
  userName: string;
}

export type UserAction =
  | { type: ActionType.USER_GET_PROFILE; payload: User }
  | {
      type: ActionType.USER_RESET_PROFILE;
    };

export interface Album {
  albumId: string;
  name: string;
}
