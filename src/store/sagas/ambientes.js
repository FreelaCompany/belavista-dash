import { call, delay, put } from "redux-saga/effects";
import api from "../../services/api";
import ListAmbienteActions from "../ducks/ambientes-list";
import CadastroAmbientesActions from "../ducks/ambientes-cadastro";

export function* cadastroAmbiente(action) {
  try {
    const { data: post } = action;
    yield call(api.post, `/ambiente`, post);
    if (yield delay(2000)) {
      yield put(CadastroAmbientesActions.cadastroAmbienteSuccess());
    }
  } catch (err) {
    yield put(CadastroAmbientesActions.cadastroAmbienteFailure(err));
  }
}

export function* editAmbiente(action) {
  try {
    const { data: post } = action;
    yield call(api.put, `/ambiente`, post);
    if (yield delay(2000)) {
      yield put(CadastroAmbientesActions.editAmbienteSuccess());
    }
  } catch (err) {
    yield put(CadastroAmbientesActions.editAmbienteFailure(err));
  }
}

export function* deleteAmbiente(action) {
  try {
    const { id } = action;
    yield call(api.delete, `/ambiente/${id}`);
    if (yield delay(2000)) {
      yield put(CadastroAmbientesActions.deleteAmbienteSuccess());
    }
  } catch (err) {
    yield put(CadastroAmbientesActions.deleteAmbienteFailure(err));
  }
}

export function* listAmbiente() {
  try {
    const { data } = yield call(api.get, `/ambiente/all`);
    yield put(ListAmbienteActions.listAmbienteSuccess(data.data));
  } catch (err) {
    yield put(
      ListAmbienteActions.listAmbienteFailure(err.response.data.error.message)
    );
  }
}
