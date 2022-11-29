import { AnyAction } from "redux";
import { ThunkDispatch } from "redux-thunk";
import { IMenuPayload, IStatusPayload } from "../menu/types";

export interface IOrderDetailPayload {
  menu_detail?: IMenuPayload;
  menu_id: number;
  order_id: number;
  qty: number;
  option_id: number | null;
}

export interface IOrderPayload {
  id: number;
  coupon_id: string | null;
  notes: string | null;
  payment_id: number;
  status: string;
  order_date?: string;
  order_details?: IOrderDetailPayload[];
  total_price: number;
}

export interface IOrderState {
  order: IOrderPayload;
  status: IStatusPayload;
}

export enum OrderActionTypes {
  CREATE_ORDER = "CREATE_ORDER",
  CREATE_ORDER_DETAILS = "CREATE_ORDER_DETAILS",

  SET_LOADING = "SET_LOADING",
  SET_ERROR = "SET_ERROR",
}

export interface ICreateOrder {
  type: OrderActionTypes.CREATE_ORDER;
  payload: IOrderPayload;
}

export interface ISetLoading {
  type: OrderActionTypes.SET_LOADING;
  payload: boolean;
}

export interface ISetError {
  type: OrderActionTypes.SET_ERROR;
  payload: string | null;
}

export interface ICreateOrderDetails {
  type: OrderActionTypes.CREATE_ORDER_DETAILS;
  payload: IOrderDetailPayload[];
}

export type OrderActions =
  | ICreateOrder
  | ICreateOrderDetails
  | ISetError
  | ISetLoading;
export type OrderDispatch = ThunkDispatch<ICreateOrder, any, AnyAction>;
