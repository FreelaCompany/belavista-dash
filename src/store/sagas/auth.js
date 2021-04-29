import { call, delay, put } from "redux-saga/effects";
import api from "../../services/api";
import AuthActions from "../ducks/auth";

export function* login(action) {
  try {
    const { data: post } = action;
    const { data } = yield call(api.post, "/login", post);
    if (yield delay(2000)) {
      yield put(AuthActions.loginSuccess(data));
    }
  } catch (err) {
    yield put(AuthActions.loginFailure(err.response.data.error.message));
  }
}

export function* logout(action) {
  try {
    const { history } = action;
    if (yield delay(2000)) {
      yield put(AuthActions.logoutSuccess());
      history.push("/login");
    }
  } catch (err) {
    yield put(
      AuthActions.logoutFailure("Ops! algo deu errado, tente novamente")
    );
  }
}
