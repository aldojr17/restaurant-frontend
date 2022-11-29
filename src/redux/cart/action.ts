import { IOrderDetailPayload } from "../order/types";
import { CartActions, CartActionTypes } from "./types";

export const addToCart = (payload: IOrderDetailPayload): CartActions => {
  return {
    type: CartActionTypes.ADD_TO_CART,
    payload,
  };
};

export const updateCart = (
  payload: boolean,
  data: IOrderDetailPayload
): CartActions => {
  return {
    type: CartActionTypes.UPDATE_CART,
    isAdd: payload,
    data,
  };
};

export const deleteAllFromCart = () => {
  return {
    type: CartActionTypes.DELETE_ALL_FROM_CART,
  };
};

export const deleteFromCart = (payload: IOrderDetailPayload) => {
  return {
    type: CartActionTypes.DELETE_FROM_CART,
    payload,
  };
};
