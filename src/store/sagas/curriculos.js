import { call, put } from "redux-saga/effects";
import api from "../../services/api";
import ListCurriculosActions from "../ducks/curriculos-list";

export function* listCurriculos() {
  try {
    const { data } = yield call(api.get, `/curriculos`);
    yield put(ListCurriculosActions.listCurriculosSuccess(data));
  } catch (err) {
    yield put(
      ListCurriculosActions.listCurriculosFailure(
        err.response.data.error.message
      )
    );
  }
}

export function* deleteCurriculos(action) {
  try {
    const { id } = action;
    yield call(api.delete, `/curriculos/${id}`);
    yield put(ListCurriculosActions.deleteCurriculosSuccess());
  } catch (err) {
    yield put(ListCurriculosActions.deleteCurriculosFailure(err));
  }
}
