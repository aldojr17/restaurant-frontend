import { Dispatch } from "react";
import instance from "../../api/config/axios";
import {
  ILoginPayload,
  IUserPayload,
  UserActions,
  UserActionTypes,
} from "./types";

export const setUser = (payload: IUserPayload): UserActions => {
  return {
    type: UserActionTypes.SET_USER,
    payload,
  };
};

export const login = (payload: ILoginPayload) => {
  return async (dispatch: Dispatch<UserActions>) => {
    await instance
      .post("/login", payload)
      .then((response) => {
        dispatch(setUser(response.data.user));
      })
      .catch((error) => error);
  };
};
