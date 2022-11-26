import { AnyAction } from "redux";
import { ThunkDispatch } from "redux-thunk";

export interface IUserPayload {
  id: string;
  email: string;
  address: string;
  full_name: string;
  phone: string;
  profile_picture: string;
  role: number;
  favorites: IUserFavoritePayload[];
}

export interface ILoginPayload {
  email: string;
  password: string;
}

export interface IApiPayload {
  isSuccess: boolean;
  error: string;
}

export interface IUserFavoritePayload {
  user_id: string;
  menu_id: number;
}

export interface ICoupon {
  id: string;
  code: string;
  discount: number;
  valid_until: string;
}

export interface IUserCoupons {
  user_id: string;
  expired_at: string;
  qty: number;
  coupon: ICoupon;
}

export interface IUserState {
  user: IUserPayload;
  status: IApiPayload;
  coupons: IUserCoupons[];
}

export enum UserActionTypes {
  SET_USER = "SET_USER",
  SET_STATUS = "SET_STATUS",

  ADD_TO_FAVORITES = "ADD_TO_FAVORITES",
  DELETE_FROM_FAVORITES = "DELETE_FROM_FAVORITES",

  FETCH_COUPONS = "FETCH_COUPONS",
}

export interface ISetUser {
  type: UserActionTypes.SET_USER;
  payload: IUserPayload;
}

export interface ISetStatus {
  type: UserActionTypes.SET_STATUS;
  payload: IApiPayload;
}

export interface IAddToFavorites {
  type: UserActionTypes.ADD_TO_FAVORITES;
  payload: IUserFavoritePayload;
}

export interface IDeleteFromFavorites {
  type: UserActionTypes.DELETE_FROM_FAVORITES;
  payload: IUserFavoritePayload;
}

export interface IFetchCoupons {
  type: UserActionTypes.FETCH_COUPONS;
  payload: IUserCoupons[];
}

export type UserActions =
  | ISetUser
  | ISetStatus
  | IAddToFavorites
  | IDeleteFromFavorites
  | IFetchCoupons;
export type UserDispatch = ThunkDispatch<IUserState, any, AnyAction>;
