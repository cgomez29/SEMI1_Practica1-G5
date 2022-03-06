export enum ActionType {
  AUTH_LOGIN = '[AUTH] login',
  AUTH_LOGOUT = '[AUTH] logout',
  AUTH_REGISTER = '[AUTH] register',

  UI_START_LOADING = '[UI] Start loading',
  UI_FINISH_LOADING = '[UI] Finish loading',
  UI_SET_ERROR = '[UI] Set error',
  UI_REMOVE_ERROR = '[UI] Remove error',

  USER_GET_PROFILE = '[USER] GET profile',
  USER_MORE_ONE_ALBUMS = '[USER] Update count albums more one',
  USER_LESS_ONE_ALBUMS = '[USER] Update count albums less one',
  USER_CUSTOM_COUNT_PHOTO = '[USER] Update count custom photos',
  USER_MORE_ONE_PHOTOS = '[USER] Update count photos more one',
  USER_RESET_PROFILE = '[USER] Reset Profile',

  ALBUM_ADD_NEW = '[ALBUM] New album',
  ALBUM_ACTIVE = '[ALBUM] Set album active',
  ALBUM_LOAD = '[ALBUM] Load album',
  ALBUM_UPDATED = '[ALBUM] Update album',
  ALBUM_DELETE = '[ALBUM] Delete album',
  ALBUM_LOGOUT_CLEANING = '[ALBUM] Logout cleaning',

  PHOTO_LOAD = '[PHOTO] Load Photo',
  PHOTO_ACTIVE = '[ALBUM] Set photo active',
  PHOTO_LOGOUT_CLEANING = '[PHOTO] Logout cleaning',
  PHOTO_ADD_NEW = '[PHOTO] New photo',
}
