import { Dispatch } from "react";
import instance from "../../api/config/axios";
import {
  ICategoryPayload,
  IFilterPayload,
  IMenuPagination,
  IMenuPayload,
  IStatusPayload,
  MenuActions,
  MenuActionTypes,
} from "./types";

export const setMenu = (payload: IMenuPagination): MenuActions => {
  return {
    type: MenuActionTypes.FETCH_MENU,
    payload,
  };
};

export const setCategory = (payload: ICategoryPayload[]): MenuActions => {
  return {
    type: MenuActionTypes.FETCH_CATEGORIES,
    payload,
  };
};

export const setLoading = (payload: boolean): MenuActions => {
  return {
    type: MenuActionTypes.SET_LOADING,
    payload,
  };
};

export const setError = (payload: string | null): MenuActions => {
  return {
    type: MenuActionTypes.SET_ERROR,
    payload,
  };
};

export const setMenuDetail = (payload: IMenuPayload): MenuActions => {
  return {
    type: MenuActionTypes.SET_MENU,
    payload,
  };
};

export const fetchMenu = (filter?: IFilterPayload) => {
  return async (dispatch: Dispatch<MenuActions>) => {
    await instance
      .get("/menus", { params: filter })
      .then((response) => dispatch(setMenu(response.data)))
      .catch((error) => error);
  };
};

export const fetchCategory = () => {
  return async (dispatch: Dispatch<MenuActions>) => {
    await instance
      .get("/categories")
      .then((response) => dispatch(setCategory(response.data.data)))
      .catch((error) => error);
  };
};

export const getMenuDetail = (payload: number) => {
  return async (dispatch: Dispatch<MenuActions>) => {
    dispatch(setLoading(true));
    dispatch(setError(null));
    await instance
      .get(`/menus/${payload}`)
      .then((response) => dispatch(setMenuDetail(response.data.data)))
      .catch((error) => dispatch(setError(error)))
      .finally(() => dispatch(setLoading(false)));
  };
};
