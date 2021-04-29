import { createReducer, createActions } from "reduxsauce";
import update from "immutability-helper";

/* Types & Action Creators */

const { Types, Creators } = createActions({
  cadastroProdutoRequest: ["data"],
  cadastroProdutoSuccess: [],
  cadastroProdutoFailure: ["error"],
  deleteProdutoRequest: ["id"],
  deleteProdutoSuccess: [],
  deleteProdutoFailure: ["error"],
  editProdutoRequest: ["data"],
  editProdutoSuccess: [],
  editProdutoFailure: ["error"],
  initialState: [],
});

export const CadastroProdutoTypes = Types;
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

export const requestCadastroProdutos = (state) =>
  update(state, { loading: { $set: true }, error: { $set: null } });

export const successCadastroProdutos = (state, action) =>
  update(state, {
    loading: { $set: false },
    success: { $set: true },
  });

export const failureCadastroProdutos = (state, action) =>
  update(state, {
    loading: { $set: false },
    error: { $set: action.error },
  });

export const requestDeleteProdutos = (state) =>
  update(state, { loading: { $set: true }, error: { $set: null } });

export const successDeleteProdutos = (state, action) =>
  update(state, {
    loading: { $set: false },
    successDelete: { $set: true },
  });

export const failureDeleteProdutos = (state, action) =>
  update(state, {
    loading: { $set: false },
    error: { $set: action.error },
  });

export const requestEditProdutos = (state) =>
  update(state, { loading: { $set: true }, error: { $set: null } });

export const successEditProdutos = (state, action) =>
  update(state, {
    loading: { $set: false },
    successEdit: { $set: true },
  });

export const failureEditProdutos = (state, action) =>
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
  [Types.CADASTRO_PRODUTO_REQUEST]: requestCadastroProdutos,
  [Types.CADASTRO_PRODUTO_SUCCESS]: successCadastroProdutos,
  [Types.CADASTRO_PRODUTO_FAILURE]: failureCadastroProdutos,
  [Types.DELETE_PRODUTO_REQUEST]: requestDeleteProdutos,
  [Types.DELETE_PRODUTO_SUCCESS]: successDeleteProdutos,
  [Types.DELETE_PRODUTO_FAILURE]: failureDeleteProdutos,
  [Types.EDIT_PRODUTO_REQUEST]: requestEditProdutos,
  [Types.EDIT_PRODUTO_SUCCESS]: successEditProdutos,
  [Types.EDIT_PRODUTO_FAILURE]: failureEditProdutos,
  [Types.INITIAL_STATE]: initialState,
});
