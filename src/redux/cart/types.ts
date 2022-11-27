import { AnyAction } from "redux";
import { ThunkDispatch } from "redux-thunk";
import { IOrderDetailPayload } from "../order/types";

export interface ICartState {
  cart: IOrderDetailPayload[];
}

export enum CartActionTypes {
  ADD_TO_CART = "ADD_TO_CART",
  UPDATE_CART = "UPDATE_CART",
  DELETE_ALL_FROM_CART = "DELETE_ALL_FROM_CART",
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

export interface IDeleteAllFromCart {
  type: CartActionTypes.DELETE_ALL_FROM_CART;
}

export type CartActions = IAddToCart | IUpdateCart | IDeleteAllFromCart;
export type CartDispatch = ThunkDispatch<ICartState, any, AnyAction>;
