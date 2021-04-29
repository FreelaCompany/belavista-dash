import { call, put } from "redux-saga/effects";
import api from "../../services/api";
import ListContatosActions from "../ducks/contatos-list";

export function* listContatos() {
  try {
    const { data } = yield call(api.get, `/contato`);
    yield put(ListContatosActions.listContatosSuccess(data.data));
  } catch (err) {
    yield put(
      ListContatosActions.listContatosFailure(err.response.data.error.message)
    );
  }
}

export function* deleteContatos(action) {
  try {
    const { id } = action;
    yield call(api.delete, `/contato/${id}`);
    yield put(ListContatosActions.deleteContatosSuccess());
  } catch (err) {
    yield put(ListContatosActions.deleteContatosFailure(err));
  }
}
