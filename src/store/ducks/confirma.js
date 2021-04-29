import { createReducer, createActions } from "reduxsauce";
import update from "immutability-helper";

/* Types & Action Creators */

const { Types, Creators } = createActions({
  confirmaRequest: ["data"],
  confirmaSuccess: ["data"],
  confirmaFailure: ["error"],
});

export const ConfirmaTypes = Types;
export default Creators;

/* Initial State */

export const INITIAL_STATE = {
  data: null,
  loading: false,
  error: null,
};

/* Reducers */

export const requestConfirma = (state) =>
  update(state, { loading: { $set: true }, error: { $set: null } });

export const successConfirma = (state, action) =>
  update(state, {
    loading: { $set: false },
    data: { $set: action.data },
  });

export const failureConfirma = (state, action) =>
  update(state, {
    loading: { $set: false },
    error: { $set: action.error },
  });

/* Reducers to types */

export const reducer = createReducer(INITIAL_STATE, {
  [Types.CONFIRMA_REQUEST]: requestConfirma,
  [Types.CONFIRMA_SUCCESS]: successConfirma,
  [Types.CONFIRMA_FAILURE]: failureConfirma,
});
