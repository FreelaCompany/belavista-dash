import { call, delay, put } from "redux-saga/effects";
import api from "../../services/api";
import ListActions from "../ducks/produtos-list";
import CadastroProdutosActions from "../ducks/produtos-cadastro";

export function* cadastroProduto(action) {
  try {
    const { data: post } = action;
    yield call(api.post, `/produtos`, post);
    if (yield delay(2000)) {
      yield put(CadastroProdutosActions.cadastroProdutoSuccess());
    }
  } catch (err) {
    yield put(CadastroProdutosActions.cadastroProdutoFailure(err));
  }
}

export function* editProduto(action) {
  try {
    const { data: post } = action;
    yield call(api.put, `/produtos`, post);
    if (yield delay(2000)) {
      yield put(CadastroProdutosActions.editProdutoSuccess());
    }
  } catch (err) {
    yield put(CadastroProdutosActions.editProdutoFailure(err));
  }
}

export function* deleteProduto(action) {
  try {
    const { id } = action;
    yield call(api.delete, `/produtos/${id}`);
    if (yield delay(2000)) {
      yield put(CadastroProdutosActions.deleteProdutoSuccess());
    }
  } catch (err) {
    yield put(CadastroProdutosActions.deleteProdutoFailure(err));
  }
}

export function* list() {
  try {
    const { data } = yield call(api.get, `/produtos`);
    yield put(ListActions.listSuccess(data.data));
  } catch (err) {
    yield put(ListActions.listFailure(err.response.data.error.message));
  }
}
