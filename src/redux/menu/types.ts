import { AnyAction } from "redux";
import { ThunkDispatch } from "redux-thunk";

export interface IMenuPayload {
  id: number;
  name: string;
  price: number;
  photo: string;
  category: ICategoryPayload;
  rating: number;
  total_review: number;
  is_available: boolean;
  description: string;
  menu_option: IMenuOptions[];
}

export interface IMenuOptions {
  id: number;
  menu_id: number;
  name: string;
  price: number;
}

export interface ICategoryPayload {
  id: number;
  name: string;
}

export interface IFilterPayload {
  category?: number;
  sortBy?: string;
  name?: string;
  limit?: number;
  sort?: string;
  page?: number;
}

export interface IMenuState {
  menus: IMenuPayload[];
  categories: ICategoryPayload[];
}

export enum MenuActionTypes {
  FETCH_MENU = "FETCH_MENU",
  FETCH_CATEGORIES = "FETCH_CATEGORIES",
}

export interface IFetchMenu {
  type: MenuActionTypes.FETCH_MENU;
  payload: IMenuPayload[];
}

export interface IFetchCategories {
  type: MenuActionTypes.FETCH_CATEGORIES;
  payload: ICategoryPayload[];
}

export type MenuActions = IFetchMenu | IFetchCategories;
export type MenuDispatch = ThunkDispatch<IMenuState, any, AnyAction>;
