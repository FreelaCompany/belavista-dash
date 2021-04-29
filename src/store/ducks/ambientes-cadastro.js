import { createReducer, createActions } from "reduxsauce";
import update from "immutability-helper";

/* Types & Action Creators */

const { Types, Creators } = createActions({
  cadastroAmbienteRequest: ["data"],
  cadastroAmbienteSuccess: [],
  cadastroAmbienteFailure: ["error"],
  deleteAmbienteRequest: ["id"],
  deleteAmbienteSuccess: [],
  deleteAmbienteFailure: ["error"],
  editAmbienteRequest: ["data"],
  editAmbienteSuccess: [],
  editAmbienteFailure: ["error"],
  initialState: [],
});

export const CadastroAmbienteTypes = Types;
export default Creators;

/* Initial State */

export const INITIAL_STATE = {
  data: null,
  loading: false,
  error: null,
  success: null,
  successDelete: null,
  successEdit: null,
};

/* Reducers */

export const requestCadastroAmbientes = (state) =>
  update(state, { loading: { $set: true }, error: { $set: null } });

export const successCadastroAmbientes = (state, action) =>
  update(state, {
    loading: { $set: false },
    success: { $set: true },
  });

export const failureCadastroAmbientes = (state, action) =>
  update(state, {
    loading: { $set: false },
    error: { $set: action.error },
  });

export const requestDeleteAmbientes = (state) =>
  update(state, { loading: { $set: true }, error: { $set: null } });

export const successDeleteAmbientes = (state, action) =>
  update(state, {
    loading: { $set: false },
    successDelete: { $set: true },
  });

export const failureDeleteAmbientes = (state, action) =>
  update(state, {
    loading: { $set: false },
    error: { $set: action.error },
  });

export const requestEditAmbientes = (state) =>
  update(state, { loading: { $set: true }, error: { $set: null } });

export const successEditAmbientes = (state, action) =>
  update(state, {
    loading: { $set: false },
    successEdit: { $set: true },
  });

export const failureEditAmbientes = (state, action) =>
  update(state, {
    loading: { $set: false },
    error: { $set: action.error },
  });

export const initialState = (state, action) =>
  update(state, {
    data: { $set: null },
    loading: { $set: false },
    error: { $set: null },
    success: { $set: null },
    successDelete: { $set: null },
    successEdit: { $set: null },
  });

/* Reducers to types */

export const reducer = createReducer(INITIAL_STATE, {
  [Types.CADASTRO_AMBIENTE_REQUEST]: requestCadastroAmbientes,
  [Types.CADASTRO_AMBIENTE_SUCCESS]: successCadastroAmbientes,
  [Types.CADASTRO_AMBIENTE_FAILURE]: failureCadastroAmbientes,
  [Types.DELETE_AMBIENTE_REQUEST]: requestDeleteAmbientes,
  [Types.DELETE_AMBIENTE_SUCCESS]: successDeleteAmbientes,
  [Types.DELETE_AMBIENTE_FAILURE]: failureDeleteAmbientes,
  [Types.EDIT_AMBIENTE_REQUEST]: requestEditAmbientes,
  [Types.EDIT_AMBIENTE_SUCCESS]: successEditAmbientes,
  [Types.EDIT_AMBIENTE_FAILURE]: failureEditAmbientes,
  [Types.INITIAL_STATE]: initialState,
});
