import { ActionType } from '../redux/types/types';

export interface UserRegister {
  username: string;
  name: string;
  lastname: string;
  password1: string;
  password2: string;
  photo?: any;
}

export interface AlbumUpdate {
  name: string;
  selected: number;

  option: string[];
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
  | { type: ActionType.UI_REMOVE_ERROR }
  | { type: ActionType.UI_START_LOADING }
  | { type: ActionType.UI_FINISH_LOADING }
  | { type: ActionType.UI_SET_ERROR; payload: string };

export interface User {
  folders: number;
  name: string;
  photos: number;
  uId: number;
  urlFoto: string;
  userName: string;
}

export type UserAction =
  | { type: ActionType.USER_RESET_PROFILE }
  | { type: ActionType.USER_MORE_ONE_ALBUMS }
  | { type: ActionType.USER_LESS_ONE_ALBUMS }
  | { type: ActionType.USER_MORE_ONE_PHOTOS }
  | { type: ActionType.USER_CUSTOM_COUNT_PHOTO; payload: number }
  | { type: ActionType.USER_GET_PROFILE; payload: User };

export interface Album {
  id: number;
  name: string;
  // created: Date;
}

export interface Albums {
  albums: Album[];
  active: Album | null;
}

export type AlbumAction =
  | { type: ActionType.ALBUM_LOAD; payload: Album[] }
  | { type: ActionType.ALBUM_ACTIVE; payload: Album }
  | { type: ActionType.ALBUM_ADD_NEW; payload: Album }
  | { type: ActionType.ALBUM_UPDATED; payload: Album }
  | { type: ActionType.ALBUM_DELETE; payload: number }
  | { type: ActionType.ALBUM_LOGOUT_CLEANING };

export interface Photo {
  id: number;
  url: string;
  name: string;
}

export interface PhotoUpload {
  image?: File;
  name: string;
  folderId: number;
  url?: string;
}
export interface Photos {
  active: Photo | null;
  photos: Photo[];
}
export type PhotoAction =
  | { type: ActionType.PHOTO_LOAD; payload: Photo[] }
  | { type: ActionType.PHOTO_ADD_NEW; payload: Photo }
  | { type: ActionType.PHOTO_ACTIVE; payload: Photo }
  | { type: ActionType.PHOTO_LOGOUT_CLEANING };
