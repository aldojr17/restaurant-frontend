import { Dispatch } from "react";
import instance from "../../api/config/axios";
import {
  IApiPayload,
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

export const setStatus = (payload: IApiPayload): UserActions => {
  return {
    type: UserActionTypes.SET_STATUS,
    payload,
  };
};

export const login = (payload: ILoginPayload) => {
  return async (dispatch: Dispatch<UserActions>) => {
    await instance
      .post("/login", payload)
      .then((response) => {
        dispatch(setUser(response.data.user));
        dispatch(
          setStatus({
            error: response.data.error,
            isSuccess: response.data.isSuccess,
          })
        );
      })
      .catch((error) => {
        dispatch(
          setStatus({
            error: error.error,
            isSuccess: false,
          })
        );
      });
  };
};
