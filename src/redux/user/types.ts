import { AnyAction } from "redux";
import { ThunkDispatch } from "redux-thunk";

export interface IUserPayload {
  id: string;
  email: string;
  address: string;
  full_name: string;
  phone: string;
  profile_picture: string;
  role: number;
}

export interface ILoginPayload {
  email: string;
  password: string;
}

export interface IApiPayload {
  isSuccess: boolean;
  error: string;
}

export interface IUserState {
  user: IUserPayload;
  status: IApiPayload;
}

export enum UserActionTypes {
  SET_USER = "SET_USER",
  SET_STATUS = "SET_STATUS",
}

export interface ISetUser {
  type: UserActionTypes.SET_USER;
  payload: IUserPayload;
}

export interface ISetStatus {
  type: UserActionTypes.SET_STATUS;
  payload: IApiPayload;
}

export type UserActions = ISetUser | ISetStatus;
export type UserDispatch = ThunkDispatch<IUserState, any, AnyAction>;
