import { AlbumAction, Albums } from '../../interfaces/interfaces';
import { ActionType } from '../types/types';

const INITIAL_STATE: Albums = {
  active: null,
  albums: [],
};
export const albumReducer = (
  state: Albums = INITIAL_STATE,
  action: AlbumAction
): Albums => {
  switch (action.type) {
    case ActionType.ALBUM_ACTIVE:
      return {
        ...state,
        active: action.payload,
      };
    case ActionType.ALBUM_LOAD:
      return {
        ...state,
        albums: [...action.payload],
      };
    case ActionType.ALBUM_ADD_NEW:
      return {
        ...state,
        albums: [action.payload, ...state.albums],
      };

    case ActionType.ALBUM_UPDATED:
      console.log(action.payload);
      return {
        ...state,
        albums: state.albums.map((album) =>
          album.id.toString() === action.payload.id.toString() ? action.payload : album
        ),
        active: action.payload,
      };
    case ActionType.ALBUM_DELETE:
      return {
        ...state,
        active: null,
        albums: state.albums.filter(
          (album) => album.id.toString() !== action.payload.toString()
        ),
      };
    case ActionType.ALBUM_LOGOUT_CLEANING:
      return {
        ...state,
        active: null,
        albums: [],
      };

    default:
      return state;
  }
};
