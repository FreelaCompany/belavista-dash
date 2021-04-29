import { createReducer, createActions } from "reduxsauce";
import update from "immutability-helper";

/* Types & Action Creators */

const { Types, Creators } = createActions({
  loginRequest: ["data", "history"],
  loginSuccess: ["data"],
  loginFailure: ["error"],
  logoutRequest: ["history"],
  logoutSuccess: null,
  logoutFailure: ["error"],
});

export const AuthTypes = Types;
export default Creators;

/* Initial State */

export const INITIAL_STATE = {
  data: null,
  loading: false,
  error: null,
  logado: false,
};

/* Reducers */

export const requestLogin = (state) =>
  update(state, { loading: { $set: true }, error: { $set: null } });

export const successLogin = (state, action) =>
  update(state, {
    loading: { $set: false },
    logado: { $set: true },
    data: { $set: action.data },
  });

export const failureLogin = (state, action) =>
  update(state, {
    loading: { $set: false },
    logado: { $set: false },
    error: { $set: action.error },
  });

export const requestLogout = (state) =>
  update(state, { loading: { $set: true }, error: { $set: null } });

export const successLogout = (state) =>
  update(state, {
    loading: { $set: false },
    logado: { $set: false },
    error: { $set: null },
  });

export const failureLogout = (state, action) =>
  update(state, {
    loading: { $set: false },
    logado: { $set: false },
    error: { $set: action.error },
  });

/* Reducers to types */

export const reducer = createReducer(INITIAL_STATE, {
  [Types.LOGIN_REQUEST]: requestLogin,
  [Types.LOGIN_SUCCESS]: successLogin,
  [Types.LOGIN_FAILURE]: failureLogin,
  [Types.LOGOUT_REQUEST]: requestLogout,
  [Types.LOGOUT_SUCCESS]: successLogout,
  [Types.LOGOUT_FAILURE]: failureLogout,
});
