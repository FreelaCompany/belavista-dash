import { call, put } from "redux-saga/effects";
import api from "../../services/api";
import CadastroActions from "../ducks/cadastro";

export function* cadastro(action) {
  try {
    const { data: post } = action;
    const { data } = yield call(api.post, "/cadastro", post);
    yield put(CadastroActions.cadastroSuccess(data));
  } catch (err) {
    yield put(CadastroActions.cadastroFailure(err.response.data.error.message));
  }
}
