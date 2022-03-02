export enum ActionType {
  AUTH_LOGIN = '[AUTH] login',
  AUTH_LOGOUT = '[AUTH] logout',
  AUTH_REGISTER = '[AUTH] register',

  UI_START_LOADING = '[UI] Start loading',
  UI_FINISH_LOADING = '[UI] Finish loading',
  UI_SET_ERROR = '[UI] Set error',
  UI_REMOVE_ERROR = '[UI] Remove error',

  USER_GET_PROFILE = '[USER] GET profile',
  USER_RESET_PROFILE = '[USER] Reset Profile',
}
