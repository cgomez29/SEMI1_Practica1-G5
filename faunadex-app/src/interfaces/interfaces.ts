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
  loading: boolean;
}

export type AuthAction =
  | {
      type: ActionType.AUTH_LOGIN;
      payload: Auth;
    }
  | { type: ActionType.AUTH_LOGOUT }
  | { type: ActionType.AUTH_LOADING }
  | { type: ActionType.AUTH_FAIL };
