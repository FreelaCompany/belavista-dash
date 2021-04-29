import { call, put } from "redux-saga/effects";
import { notify } from "../../services/notification";
import api from "../../services/api";
import ConfirmaActions from "../ducks/confirma";

export function* confirma(action) {
  try {
    const { data: putData } = action;

    const { data } = yield call(
      api.patch,
      `/pecas/reserva/dash?cod_reserva=${putData}`
    );
    yield put(ConfirmaActions.confirmaSuccess(data.message));
    notify("success", "Olá seja bem-vindo!");
  } catch (err) {
    yield put(ConfirmaActions.confirmaFailure(err));
    notify("error", "Erro ao logar");
  }
}
