import { call, put } from "redux-saga/effects";
import api from "../../services/api";
import ListNewsActions from "../ducks/newsletter-list";

export function* listNews() {
  try {
    const { data } = yield call(api.get, `/newsletter`);
    yield put(ListNewsActions.listNewsSuccess(data));
  } catch (err) {
    yield put(ListNewsActions.listNewsFailure(err.response.data.error.message));
  }
}

export function* deleteNews(action) {
  try {
    const { id } = action;
    yield call(api.delete, `/newsletter/${id}`);
    yield put(ListNewsActions.deleteNewsSuccess());
  } catch (err) {
    yield put(ListNewsActions.deleteNewsFailure(err));
  }
}
