import { AnyAction } from "redux";
import { ThunkDispatch } from "redux-thunk";
import { IMenuPayload } from "../menu/types";

export interface IOrderDetailPayload {
  menu_id: number;
  order_id: number;
  qty: number;
  option_id: number;
}

export interface ICartState {
  cart: IOrderDetailPayload[];
}

export enum CartActionTypes {
  ADD_TO_CART = "ADD_TO_CART",
}

export interface IAddToCart {
  type: CartActionTypes.ADD_TO_CART;
  payload: IOrderDetailPayload;
}

export type CartActions = IAddToCart;
export type CartDispatch = ThunkDispatch<ICartState, any, AnyAction>;
