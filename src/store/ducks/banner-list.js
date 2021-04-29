import { createReducer, createActions } from "reduxsauce";
import update from "immutability-helper";

/* Types & Action Creators */

const { Types, Creators } = createActions({
  listBannerRequest: ["data"],
  listBannerSuccess: ["data"],
  listBannerFailure: ["error"],
});

export const ListBannerTypes = Types;
export default Creators;

/* Initial State */

export const INITIAL_STATE = {
  data: null,
  loading: false,
  error: null,
};

/* Reducers */

export const requestListBanner = (state) =>
  update(state, { loading: { $set: true }, error: { $set: null } });

export const successListBanner = (state, action) =>
  update(state, {
    loading: { $set: false },
    data: { $set: action.data },
  });

export const failureListBanner = (state, action) =>
  update(state, {
    loading: { $set: false },
    error: { $set: action.error },
  });

/* Reducers to types */

export const reducer = createReducer(INITIAL_STATE, {
  [Types.LIST_BANNER_REQUEST]: requestListBanner,
  [Types.LIST_BANNER_SUCCESS]: successListBanner,
  [Types.LIST_BANNER_FAILURE]: failureListBanner,
});
