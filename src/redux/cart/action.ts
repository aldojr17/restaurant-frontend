import { CartActions, CartActionTypes, IOrderDetailPayload } from "./types";

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
