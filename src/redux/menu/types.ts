import { AnyAction } from "redux";
import { ThunkDispatch } from "redux-thunk";

export interface IMenuPayload {
  id: number;
  name: string;
  price: number;
  photo: string;
  category_id: number;
  category_name: string;
  rating: number;
  total_review: number;
  is_available: boolean;
}

export interface IMenuState {
  menus: IMenuPayload[];
}

export enum MenuActionTypes {
  FETCH_MENU = "FETCH_MENU",
}

export interface IFetchMenu {
  type: MenuActionTypes.FETCH_MENU;
  payload: IMenuPayload[];
}

export type MenuActions = IFetchMenu;
export type MenuDispatch = ThunkDispatch<IMenuState, any, AnyAction>;
