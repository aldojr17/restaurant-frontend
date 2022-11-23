import { Dispatch } from "react";
import instance from "../../api/config/axios";
import {
  ICategoryPayload,
  IFilterPayload,
  IMenuPayload,
  MenuActions,
  MenuActionTypes,
} from "./types";

export const setMenu = (payload: IMenuPayload[]): MenuActions => {
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

export const fetchMenu = (filter?: IFilterPayload) => {
  return async (dispatch: Dispatch<MenuActions>) => {
    await instance
      .get("/menus", { params: filter })
      .then((response) => dispatch(setMenu(response.data.data)))
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
