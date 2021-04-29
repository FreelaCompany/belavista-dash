import { createReducer, createActions } from "reduxsauce";
import update from "immutability-helper";

/* Types & Action Creators */

const { Types, Creators } = createActions({
  listArquitetoRequest: ["data"],
  listArquitetoSuccess: ["data"],
  listArquitetoFailure: ["error"],
});

export const ListArquitetoTypes = Types;
export default Creators;

/* Initial State */

export const INITIAL_STATE = {
  data: null,
  loading: false,
  error: null,
};

/* Reducers */

export const requestArquitetoList = (state) =>
  update(state, { loading: { $set: true }, error: { $set: null } });

export const successArquitetoList = (state, action) =>
  update(state, {
    loading: { $set: false },
    data: { $set: action.data },
  });

export const failureArquitetoList = (state, action) =>
  update(state, {
    loading: { $set: false },
    error: { $set: action.error },
  });

/* Reducers to types */

export const reducer = createReducer(INITIAL_STATE, {
  [Types.LIST_ARQUITETO_REQUEST]: requestArquitetoList,
  [Types.LIST_ARQUITETO_SUCCESS]: successArquitetoList,
  [Types.LIST_ARQUITETO_FAILURE]: failureArquitetoList,
});
