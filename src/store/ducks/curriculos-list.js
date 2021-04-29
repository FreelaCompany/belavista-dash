import { createReducer, createActions } from "reduxsauce";
import update from "immutability-helper";

/* Types & Action Creators */

const { Types, Creators } = createActions({
  listCurriculosRequest: ["data"],
  listCurriculosSuccess: ["data"],
  listCurriculosFailure: ["error"],
  deleteCurriculosRequest: ["id"],
  deleteCurriculosSuccess: [""],
  deleteCurriculosFailure: ["error"],
});

export const ListCurriculosTypes = Types;
export default Creators;

/* Initial State */

export const INITIAL_STATE = {
  data: null,
  loading: false,
  error: null,
  successDelete: null,
  loadingDelete: false,
};

/* Reducers */

export const requestListCurriculos = (state) =>
  update(state, { loading: { $set: true }, error: { $set: null } });

export const successListCurriculos = (state, action) =>
  update(state, {
    loading: { $set: false },
    data: { $set: action.data },
  });

export const failureListCurriculos = (state, action) =>
  update(state, {
    loading: { $set: false },
    error: { $set: action.error },
  });

export const requestDeleteCurriculos = (state) =>
  update(state, { loadingDelete: { $set: true }, error: { $set: null } });

export const successDeleteCurriculos = (state, action) =>
  update(state, {
    loadingDelete: { $set: false },
    successDelete: { $set: true },
    data: { $set: action.data },
  });

export const failureDeleteCurriculos = (state, action) =>
  update(state, {
    loadingDelete: { $set: false },
    error: { $set: action.error },
  });

/* Reducers to types */

export const reducer = createReducer(INITIAL_STATE, {
  [Types.LIST_CURRICULOS_REQUEST]: requestListCurriculos,
  [Types.LIST_CURRICULOS_SUCCESS]: successListCurriculos,
  [Types.LIST_CURRICULOS_FAILURE]: failureListCurriculos,
  [Types.DELETE_CURRICULOS_REQUEST]: requestDeleteCurriculos,
  [Types.DELETE_CURRICULOS_SUCCESS]: successDeleteCurriculos,
  [Types.DELETE_CURRICULOS_FAILURE]: failureDeleteCurriculos,
});
