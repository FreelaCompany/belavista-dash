import { createReducer, createActions } from "reduxsauce";
import update from "immutability-helper";

/* Types & Action Creators */

const { Types, Creators } = createActions({
  listContatosRequest: [""],
  listContatosSuccess: ["data"],
  listContatosFailure: ["error"],
  deleteContatosRequest: ["id"],
  deleteContatosSuccess: [""],
  deleteContatosFailure: ["error"],
});

export const ListContatosTypes = Types;
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

export const requestListContatos = (state) =>
  update(state, { loading: { $set: true }, error: { $set: null } });

export const successListContatos = (state, action) =>
  update(state, {
    loading: { $set: false },
    data: { $set: action.data },
  });

export const failureListContatos = (state, action) =>
  update(state, {
    loading: { $set: false },
    error: { $set: action.error },
  });

export const requestDeleteContatos = (state) =>
  update(state, { loadingDelete: { $set: true }, error: { $set: null } });

export const successDeleteContatos = (state, action) =>
  update(state, {
    loadingDelete: { $set: false },
    successDelete: { $set: true },
    data: { $set: action.data },
  });

export const failureDeleteContatos = (state, action) =>
  update(state, {
    loadingDelete: { $set: false },
    error: { $set: action.error },
  });

/* Reducers to types */

export const reducer = createReducer(INITIAL_STATE, {
  [Types.LIST_CONTATOS_REQUEST]: requestListContatos,
  [Types.LIST_CONTATOS_SUCCESS]: successListContatos,
  [Types.LIST_CONTATOS_FAILURE]: failureListContatos,
  [Types.DELETE_CONTATOS_REQUEST]: requestDeleteContatos,
  [Types.DELETE_CONTATOS_SUCCESS]: successDeleteContatos,
  [Types.DELETE_CONTATOS_FAILURE]: failureDeleteContatos,
});
