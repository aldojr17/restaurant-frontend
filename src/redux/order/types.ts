import { AnyAction } from "redux";
import { ThunkDispatch } from "redux-thunk";
import { IMenuPayload } from "../menu/types";

export interface IOrderDetailPayload {
  menu?: IMenuPayload;
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
}

export interface IOrderState {
  order: IOrderPayload;
}

export enum OrderActionTypes {
  CREATE_ORDER = "CREATE_ORDER",
  CREATE_ORDER_DETAILS = "CREATE_ORDER_DETAILS",
}

export interface ICreateOrder {
  type: OrderActionTypes.CREATE_ORDER;
  payload: IOrderPayload;
}

export interface ICreateOrderDetails {
  type: OrderActionTypes.CREATE_ORDER_DETAILS;
  payload: IOrderDetailPayload[];
}

export type OrderActions = ICreateOrder | ICreateOrderDetails;
export type OrderDispatch = ThunkDispatch<ICreateOrder, any, AnyAction>;
