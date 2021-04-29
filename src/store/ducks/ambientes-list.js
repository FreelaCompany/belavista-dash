import { createReducer, createActions } from "reduxsauce";
import update from "immutability-helper";

/* Types & Action Creators */

const { Types, Creators } = createActions({
  listAmbienteRequest: ["data"],
  listAmbienteSuccess: ["data"],
  listAmbienteFailure: ["error"],
});

export const ListAmbienteTypes = Types;
export default Creators;

/* Initial State */

export const INITIAL_STATE = {
  data: null,
  loading: false,
  error: null,
};

/* Reducers */

export const requestAmbienteList = (state) =>
  update(state, { loading: { $set: true }, error: { $set: null } });

export const successAmbienteList = (state, action) =>
  update(state, {
    loading: { $set: false },
    data: { $set: action.data },
  });

export const failureAmbienteList = (state, action) =>
  update(state, {
    loading: { $set: false },
    error: { $set: action.error },
  });

/* Reducers to types */

export const reducer = createReducer(INITIAL_STATE, {
  [Types.LIST_AMBIENTE_REQUEST]: requestAmbienteList,
  [Types.LIST_AMBIENTE_SUCCESS]: successAmbienteList,
  [Types.LIST_AMBIENTE_FAILURE]: failureAmbienteList,
});
