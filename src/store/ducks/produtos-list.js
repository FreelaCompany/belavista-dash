import { createReducer, createActions } from "reduxsauce";
import update from "immutability-helper";

/* Types & Action Creators */

const { Types, Creators } = createActions({
  listRequest: ["data"],
  listSuccess: ["data"],
  listFailure: ["error"],
});

export const ListTypes = Types;
export default Creators;

/* Initial State */

export const INITIAL_STATE = {
  data: null,
  loading: false,
  error: null,
};

/* Reducers */

export const requestList = (state) =>
  update(state, { loading: { $set: true }, error: { $set: null } });

export const successList = (state, action) =>
  update(state, {
    loading: { $set: false },
    data: { $set: action.data },
  });

export const failureList = (state, action) =>
  update(state, {
    loading: { $set: false },
    error: { $set: action.error },
  });

/* Reducers to types */

export const reducer = createReducer(INITIAL_STATE, {
  [Types.LIST_REQUEST]: requestList,
  [Types.LIST_SUCCESS]: successList,
  [Types.LIST_FAILURE]: failureList,
});
