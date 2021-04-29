import { createReducer, createActions } from "reduxsauce";
import update from "immutability-helper";

/* Types & Action Creators */

const { Types, Creators } = createActions({
  cadastroBannerRequest: ["data"],
  cadastroBannerSuccess: [],
  cadastroBannerFailure: ["error"],
  deleteBannerRequest: ["id"],
  deleteBannerSuccess: [],
  deleteBannerFailure: ["error"],
  editBannerRequest: ["data"],
  editBannerSuccess: [],
  editBannerFailure: ["error"],
});

export const CadastroBannerTypes = Types;
export default Creators;

/* Initial State */

export const INITIAL_STATE = {
  data: null,
  loading: false,
  error: null,
  success: null,
  successDelete: null,
  successEdit: null,
};

/* Reducers */

export const requestCadastroBanner = (state) =>
  update(state, { loading: { $set: true }, error: { $set: null } });

export const successCadastroBanner = (state, action) =>
  update(state, {
    loading: { $set: false },
    success: { $set: true },
  });

export const failureCadastroBanner = (state, action) =>
  update(state, {
    loading: { $set: false },
    error: { $set: action.error },
  });

export const requestDeleteBanner = (state) =>
  update(state, { loading: { $set: true }, error: { $set: null } });

export const successDeleteBanner = (state, action) =>
  update(state, {
    loading: { $set: false },
    successDelete: { $set: true },
  });

export const failureDeleteBanner = (state, action) =>
  update(state, {
    loading: { $set: false },
    error: { $set: action.error },
  });

export const requestEditBanner = (state) =>
  update(state, { loading: { $set: true }, error: { $set: null } });

export const successEditBanner = (state, action) =>
  update(state, {
    loading: { $set: false },
    successEdit: { $set: true },
  });

export const failureEditBanner = (state, action) =>
  update(state, {
    loading: { $set: false },
    error: { $set: action.error },
  });

/* Reducers to types */

export const reducer = createReducer(INITIAL_STATE, {
  [Types.CADASTRO_BANNER_REQUEST]: requestCadastroBanner,
  [Types.CADASTRO_BANNER_SUCCESS]: successCadastroBanner,
  [Types.CADASTRO_BANNER_FAILURE]: failureCadastroBanner,
  [Types.DELETE_BANNER_REQUEST]: requestDeleteBanner,
  [Types.DELETE_BANNER_SUCCESS]: successDeleteBanner,
  [Types.DELETE_BANNER_FAILURE]: failureDeleteBanner,
  [Types.EDIT_BANNER_REQUEST]: requestEditBanner,
  [Types.EDIT_BANNER_SUCCESS]: successEditBanner,
  [Types.EDIT_BANNER_FAILURE]: failureEditBanner,
});
