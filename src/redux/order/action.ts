import { Dispatch } from "react";
import instance from "../../api/config/axios";
import {
  IOrderDetailPayload,
  IOrderPayload,
  OrderActions,
  OrderActionTypes,
} from "./types";

export const setOrder = (payload: IOrderPayload): OrderActions => {
  return {
    type: OrderActionTypes.CREATE_ORDER,
    payload,
  };
};

export const setLoading = (payload: boolean): OrderActions => {
  return {
    type: OrderActionTypes.SET_LOADING,
    payload,
  };
};

export const setError = (payload: string | null): OrderActions => {
  return {
    type: OrderActionTypes.SET_ERROR,
    payload,
  };
};

export const createOrder = (payload: IOrderPayload) => {
  return async (dispatch: Dispatch<OrderActions>) => {
    dispatch(setLoading(true));
    dispatch(setError(null));
    await instance
      .post("/orders", payload)
      .then((response) => dispatch(setOrder(response.data.data)))
      .catch((error) => dispatch(setError(error)))
      .finally(() => setLoading(false));
  };
};

export const createOrderDetails = (payload: IOrderDetailPayload[]) => {
  return async (dispatch: Dispatch<OrderActions>) => {
    dispatch(setLoading(true));
    dispatch(setError(null));
    await instance
      .post("/order-details", { orders: payload })
      .then((response) => response)
      .catch((error) => dispatch(setError(error)))
      .finally(() => dispatch(setLoading(false)));
  };
};
