import { Dispatch } from "react";
import instance from "../../api/config/axios";
import { IMenuPayload, MenuActions, MenuActionTypes } from "./types";

export const setMenu = (payload: IMenuPayload[]): MenuActions => {
  return {
    type: MenuActionTypes.FETCH_MENU,
    payload,
  };
};

export const fetchMenu = () => {
  return async (dispatch: Dispatch<MenuActions>) => {
    await instance
      .get("/menus")
      .then((response) => response)
      .then((data) => {
        dispatch(setMenu(data.data));
      })
      .catch((error) => error);
  };
};
