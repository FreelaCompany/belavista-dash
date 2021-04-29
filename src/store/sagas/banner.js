import { call, delay, put } from "redux-saga/effects";
import api from "../../services/api";
import ListBannerActions from "../ducks/banner-list";
import CadastroBannerActions from "../ducks/banner-cadastro";

export function* cadastroBanner(action) {
  try {
    const { data: post } = action;
    yield call(api.post, `/banner`, post);
    yield put(CadastroBannerActions.cadastroBannerSuccess());
  } catch (err) {
    yield put(CadastroBannerActions.cadastroBannerFailure(err));
  }
}

export function* deleteBanner(action) {
  try {
    const { id } = action;
    yield call(api.delete, `/banner/${id}`);
    if (yield delay(2000)) {
      yield put(CadastroBannerActions.deleteBannerSuccess());
    }
  } catch (err) {
    yield put(CadastroBannerActions.deleteBannerFailure(err));
  }
}

export function* editBanner(action) {
  try {
    const { data: post } = action;
    yield call(api.put, `/banner`, post);
    yield put(CadastroBannerActions.editBannerSuccess());
  } catch (err) {
    yield put(CadastroBannerActions.editBannerFailure(err));
  }
}

export function* listBanner() {
  try {
    const { data } = yield call(api.get, `/banner`);
    yield put(ListBannerActions.listBannerSuccess(data));
  } catch (err) {
    yield put(
      ListBannerActions.listBannerFailure(err.response.data.error.message)
    );
  }
}
