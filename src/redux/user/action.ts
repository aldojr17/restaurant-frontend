import { Dispatch } from "react";
import instance from "../../api/config/axios";
import { IFilterPayload } from "../menu/types";
import {
  IAddReviewPayload,
  IApiPayload,
  IChangeProfilePayload,
  ILoginPayload,
  IOrderPagination,
  IUserCoupons,
  IUserFavoritePayload,
  IUserPayload,
  UserActions,
  UserActionTypes,
} from "./types";

export const setUser = (payload: IUserPayload): UserActions => {
  return {
    type: UserActionTypes.SET_USER,
    payload,
  };
};

export const setStatus = (payload: IApiPayload): UserActions => {
  return {
    type: UserActionTypes.SET_STATUS,
    payload,
  };
};

export const addToFavoritesRedux = (
  payload: IUserFavoritePayload
): UserActions => {
  return {
    type: UserActionTypes.ADD_TO_FAVORITES,
    payload,
  };
};

export const deleteFromFavoritesRedux = (
  payload: IUserFavoritePayload
): UserActions => {
  return {
    type: UserActionTypes.DELETE_FROM_FAVORITES,
    payload,
  };
};

export const setCoupons = (payload: IUserCoupons[]): UserActions => {
  return {
    type: UserActionTypes.FETCH_COUPONS,
    payload,
  };
};

export const setOrders = (payload: IOrderPagination): UserActions => {
  return {
    type: UserActionTypes.FETCH_ORDERS,
    payload,
  };
};

export const login = (payload: ILoginPayload) => {
  return async (dispatch: Dispatch<UserActions>) => {
    await instance
      .post("/login", payload)
      .then((response) => {
        dispatch(setUser(response.data.user));
        dispatch(
          setStatus({
            error: response.data.error,
            isSuccess: response.data.isSuccess,
          })
        );
      })
      .catch((error) => {
        dispatch(
          setStatus({
            error: error.error,
            isSuccess: false,
          })
        );
      });
  };
};

export const getProfile = () => {
  return async (dispatch: Dispatch<UserActions>) => {
    await instance
      .get("/users/profile")
      .then((response) => {
        dispatch(setUser(response.data.data));
      })
      .catch((error) => error);
  };
};

export const addToFavorites = (payload: IUserFavoritePayload) => {
  return async (dispatch: Dispatch<UserActions>) => {
    await instance
      .post("/users/favorites", { menu_id: payload.menu_id })
      .then((response) => {
        dispatch(addToFavoritesRedux(payload));
      })
      .catch((error) => error);
  };
};

export const deleteFromFavorites = (payload: IUserFavoritePayload) => {
  return async (dispatch: Dispatch<UserActions>) => {
    await instance
      .post("/users/favorites", { menu_id: payload.menu_id })
      .then((response) => {
        dispatch(deleteFromFavoritesRedux(payload));
      })
      .catch((error) => error);
  };
};

export const fetchCoupons = () => {
  return async (dispatch: Dispatch<UserActions>) => {
    await instance
      .get("/users/coupons")
      .then((response) => {
        dispatch(setCoupons(response.data.data));
      })
      .catch((error) => error);
  };
};

export const fetchOrders = (filter?: IFilterPayload) => {
  return async (dispatch: Dispatch<UserActions>) => {
    await instance
      .get("/users/orders", { params: filter })
      .then((response) => {
        dispatch(setOrders(response.data));
      })
      .catch((error) => error);
  };
};

export const changeProfile = (payload: IChangeProfilePayload) => {
  return async (dispatch: Dispatch<UserActions>) => {
    await instance
      .put("/users/change-profile", payload)
      .then((response) => {
        dispatch(setUser(response.data));
      })
      .catch((error) => error);
  };
};

export const addReview = (payload: IAddReviewPayload) => {
  return async (dispatch: Dispatch<UserActions>) => {
    await instance
      .post("/users/reviews", payload)
      .then((response) => {
        return response;
      })
      .catch((error) => error);
  };
};
