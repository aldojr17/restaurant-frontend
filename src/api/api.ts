import { ICoupon } from "../redux/user/types";
import instance from "./config/axios";

export interface IRegisterPayload {
  fullname: string;
  email: string;
  password: string;
}

export interface IPayment {
  id: number;
  description: string;
}

export const registerApi = (payload: IRegisterPayload) => {
  return instance
    .post("/register", payload)
    .then((response) => response.data)
    .catch((error) => error);
};

export const getAllCoupon = () => {
  return instance
    .get("/admin/coupons")
    .then((response) => response.data.data)
    .catch((error) => error);
};

export const deleteCoupon = (id: string) => {
  return instance
    .delete(`/admin/coupons/${id}`)
    .then((response) => response.data)
    .catch((error) => error);
};

export const addCoupon = (payload: ICoupon) => {
  return instance
    .post(`/admin/coupons`, {
      code: payload.code,
      discount: payload.discount,
      valid_until: payload.valid_until,
    })
    .then((response) => response.data)
    .catch((error) => error);
};

export const getCoupon = (id: string) => {
  return instance
    .get(`/admin/coupons/${id}`)
    .then((response) => response.data.data)
    .catch((error) => error);
};

export const updateCoupon = (payload: ICoupon) => {
  return instance
    .put(`/admin/coupons/${payload.id}`, {
      discount: payload.discount,
      valid_until: payload.valid_until,
    })
    .then((response) => response.data)
    .catch((error) => error);
};

export const fetchPayment = () => {
  return instance
    .get("/payments")
    .then((response) => response.data.data)
    .catch((error) => error);
};

export const fetchQuestion = () => {
  return instance
    .get("/questions")
    .then((response) => response.data.data)
    .catch((error) => error);
};
