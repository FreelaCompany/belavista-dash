import { call, delay, put } from "redux-saga/effects";
import api from "../../services/api";
import ListArquitetoActions from "../ducks/arquitetos-list";
import CadastroArquitetosActions from "../ducks/arquitetos-cadastro";

export function* cadastroArquiteto(action) {
  try {
    const { data: post } = action;
    const { data } = yield call(api.post, `/arquiteto`, post);

    console.log(data);
    if (yield delay(2000)) {
      yield put(CadastroArquitetosActions.cadastroArquitetoSuccess(data.id));
    }
  } catch (err) {
    yield put(CadastroArquitetosActions.cadastroArquitetoFailure(err));
  }
}

export function* editArquiteto(action) {
  try {
    const { data: post } = action;
    yield call(api.put, `/arquiteto`, post);
    if (yield delay(2000)) {
      yield put(CadastroArquitetosActions.editArquitetoSuccess());
    }
  } catch (err) {
    yield put(CadastroArquitetosActions.editArquitetoFailure(err));
  }
}

export function* deleteArquiteto(action) {
  try {
    const { id } = action;
    yield call(api.delete, `/arquiteto/${id}`);
    if (yield delay(2000)) {
      yield put(CadastroArquitetosActions.deleteArquitetoSuccess());
    }
  } catch (err) {
    yield put(CadastroArquitetosActions.deleteArquitetoFailure(err));
  }
}

export function* listArquiteto() {
  try {
    const { data } = yield call(api.get, `/arquiteto`);
    yield put(ListArquitetoActions.listArquitetoSuccess(data.data));
  } catch (err) {
    yield put(
      ListArquitetoActions.listArquitetoFailure(err.response.data.error.message)
    );
  }
}
