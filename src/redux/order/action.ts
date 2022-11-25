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

export const createOrder = (payload: IOrderPayload) => {
  return async (dispatch: Dispatch<OrderActions>) => {
    await instance
      .post("/orders", payload)
      .then((response) => dispatch(setOrder(response.data.data)))
      .catch((error) => error);
  };
};

export const createOrderDetails = (payload: IOrderDetailPayload[]) => {
  return async (dispatch: Dispatch<OrderActions>) => {
    await instance
      .post("/order-details", { orders: payload })
      .then((response) => response)
      .catch((error) => error);
  };
};
