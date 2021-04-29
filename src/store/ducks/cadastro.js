import { createReducer, createActions } from "reduxsauce";
import update from "immutability-helper";

/* Types & Action Creators */

const { Types, Creators } = createActions({
  cadastroRequest: ["data"],
  cadastroSuccess: ["data"],
  cadastroFailure: ["error"],
});

export const CadastroTypes = Types;
export default Creators;

/* Initial State */

export const INITIAL_STATE = {
  data: null,
  loading: false,
  error: null,
  logado: false,
};

/* Reducers */

export const requestCadastro = (state) =>
  update(state, { loading: { $set: true }, error: { $set: null } });

export const successCadastro = (state, action) =>
  update(state, {
    loading: { $set: false },
    logado: { $set: true },
    data: { $set: action.data },
  });

export const failureCadastro = (state, action) =>
  update(state, {
    loading: { $set: false },
    logado: { $set: false },
    error: { $set: action.error },
  });

/* Reducers to types */

export const reducer = createReducer(INITIAL_STATE, {
  [Types.CADASTRO_REQUEST]: requestCadastro,
  [Types.CADASTRO_SUCCESS]: successCadastro,
  [Types.CADASTRO_FAILURE]: failureCadastro,
});
