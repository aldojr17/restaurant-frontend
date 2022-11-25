import { AnyAction } from "redux";
import { ThunkDispatch } from "redux-thunk";
import { IOrderDetailPayload } from "../order/types";

export interface ICartState {
  cart: IOrderDetailPayload[];
}

export enum CartActionTypes {
  ADD_TO_CART = "ADD_TO_CART",
  UPDATE_CART = "UPDATE_CART",
}

export interface IAddToCart {
  type: CartActionTypes.ADD_TO_CART;
  payload: IOrderDetailPayload;
}

export interface IUpdateCart {
  type: CartActionTypes.UPDATE_CART;
  data: IOrderDetailPayload;
  isAdd: boolean;
}

export type CartActions = IAddToCart | IUpdateCart;
export type CartDispatch = ThunkDispatch<ICartState, any, AnyAction>;
