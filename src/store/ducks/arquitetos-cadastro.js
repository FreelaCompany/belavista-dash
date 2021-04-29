import { createReducer, createActions } from "reduxsauce";
import update from "immutability-helper";

/* Types & Action Creators */

const { Types, Creators } = createActions({
  cadastroArquitetoRequest: ["data"],
  cadastroArquitetoSuccess: ["id"],
  cadastroArquitetoFailure: ["error"],
  deleteArquitetoRequest: ["id"],
  deleteArquitetoSuccess: [],
  deleteArquitetoFailure: ["error"],
  editArquitetoRequest: ["data"],
  editArquitetoSuccess: [],
  editArquitetoFailure: ["error"],
  initialState: [],
});

export const CadastroArquitetoTypes = Types;
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

export const requestCadastroArquitetos = (state) =>
  update(state, { loading: { $set: true }, error: { $set: null } });

export const successCadastroArquitetos = (state, action) =>
  update(state, {
    data: { $set: action.id },
    loading: { $set: false },
    success: { $set: true },
  });

export const failureCadastroArquitetos = (state, action) =>
  update(state, {
    loading: { $set: false },
    error: { $set: action.error },
  });

export const requestDeleteArquitetos = (state) =>
  update(state, { loading: { $set: true }, error: { $set: null } });

export const successDeleteArquitetos = (state, action) =>
  update(state, {
    loading: { $set: false },
    successDelete: { $set: true },
  });

export const failureDeleteArquitetos = (state, action) =>
  update(state, {
    loading: { $set: false },
    error: { $set: action.error },
  });

export const requestEditArquitetos = (state) =>
  update(state, { loading: { $set: true }, error: { $set: null } });

export const successEditArquitetos = (state, action) =>
  update(state, {
    loading: { $set: false },
    successEdit: { $set: true },
  });

export const failureEditArquitetos = (state, action) =>
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
  [Types.CADASTRO_ARQUITETO_REQUEST]: requestCadastroArquitetos,
  [Types.CADASTRO_ARQUITETO_SUCCESS]: successCadastroArquitetos,
  [Types.CADASTRO_ARQUITETO_FAILURE]: failureCadastroArquitetos,
  [Types.DELETE_ARQUITETO_REQUEST]: requestDeleteArquitetos,
  [Types.DELETE_ARQUITETO_SUCCESS]: successDeleteArquitetos,
  [Types.DELETE_ARQUITETO_FAILURE]: failureDeleteArquitetos,
  [Types.EDIT_ARQUITETO_REQUEST]: requestEditArquitetos,
  [Types.EDIT_ARQUITETO_SUCCESS]: successEditArquitetos,
  [Types.EDIT_ARQUITETO_FAILURE]: failureEditArquitetos,
  [Types.INITIAL_STATE]: initialState,
});
