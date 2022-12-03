import { Dispatch } from "react";
import instance from "../../api/config/axios";
import { IFilterPayload } from "../menu/types";
import { IOrderPagination } from "../user/types";
import {
  IOrderDetailPayload,
  IOrderPayload,
  IUpdateStatusPayload,
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

export const setOrders = (payload: IOrderPagination): OrderActions => {
  return {
    type: OrderActionTypes.FETCH_ALL_ORDER,
    payload,
  };
};

export const updateOrderStatus = (
  payload: IUpdateStatusPayload
): OrderActions => {
  return {
    type: OrderActionTypes.UPDATE_ORDER_STATUS,
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
      .catch((error) => dispatch(setError(error.error)))
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

export const fetchAllOrder = (filter?: IFilterPayload) => {
  return async (dispatch: Dispatch<OrderActions>) => {
    await instance
      .get("/admin/orders", { params: filter })
      .then((response) => {
        dispatch(setOrders(response.data));
      })
      .catch((error) => error);
  };
};

export const updateOrder = (payload: IUpdateStatusPayload) => {
  return async (dispatch: Dispatch<OrderActions>) => {
    await instance
      .put(`/admin/orders/${payload.id}`, {
        status: payload.status,
      })
      .then((response) => {
        dispatch(updateOrderStatus(payload));
      })
      .catch((error) => error);
  };
};
