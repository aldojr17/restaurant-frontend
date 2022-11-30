import { Dispatch } from "react";
import instance from "../../api/config/axios";
import {
  ICategoryPayload,
  ICreateUpdateMenuPayload,
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

export const setNewMenu = (payload: IMenuPayload[]): MenuActions => {
  return {
    type: MenuActionTypes.FETCH_NEW_MENU,
    payload,
  };
};

export const addMenu = (payload: ICreateUpdateMenuPayload): MenuActions => {
  return {
    type: MenuActionTypes.CREATE_MENU,
    payload,
  };
};

export const updateMenuDetail = (
  payload: ICreateUpdateMenuPayload,
  id: number
): MenuActions => {
  return {
    type: MenuActionTypes.UPDATE_MENU,
    payload,
    id,
  };
};

export const deleteMenuDetail = (payload: number): MenuActions => {
  return {
    type: MenuActionTypes.DELETE_MENU,
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

export const fetchNewMenu = () => {
  return async (dispatch: Dispatch<MenuActions>) => {
    await instance
      .get("/menus", {
        params: {
          sortBy: "date",
          limit: 3,
        },
      })
      .then((response) => dispatch(setNewMenu(response.data.data)))
      .catch((error) => error);
  };
};

export const createMenu = (payload: ICreateUpdateMenuPayload) => {
  return async (dispatch: Dispatch<MenuActions>) => {
    await instance
      .post("/admin/menus", payload)
      .then((response) => dispatch(addMenu(response.data.data)))
      .catch((error) => error);
  };
};

export const updateMenu = (payload: ICreateUpdateMenuPayload, id: number) => {
  return async (dispatch: Dispatch<MenuActions>) => {
    await instance
      .put(`/admin/menus/${id}`, payload)
      .then((response) => dispatch(updateMenuDetail(response.data.data, id)))
      .catch((error) => error);
  };
};

export const deleteMenu = (payload: number) => {
  return async (dispatch: Dispatch<MenuActions>) => {
    await instance
      .delete(`/admin/menus/${payload}`)
      .then((response) => dispatch(deleteMenuDetail(payload)))
      .catch((error) => error);
  };
};
