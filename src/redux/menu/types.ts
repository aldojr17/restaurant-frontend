import { AnyAction } from "redux";
import { ThunkDispatch } from "redux-thunk";
import { IUserPayload } from "../user/types";

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
  reviews: IReviewPayload[];
}

export interface IReviewPayload {
  id: number;
  user_id: string;
  menu_id: number;
  description: string;
  rating: number;
  user: IUserPayload;
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

export interface IStatusPayload {
  isLoading: boolean;
  error: string | null;
}

export interface IMenuPagination {
  data: IMenuPayload[];
  current_page: number;
  limit: number;
  total: number;
  total_page: number;
}

export interface ICreateUpdateMenuPayload {
  name: string;
  price: number;
  photo: string;
  category_id: number;
  is_available: boolean;
  description: string;
  options: {
    name: string;
    price: number;
  }[];
}

export interface IMenuState {
  menus: IMenuPagination;
  categories: ICategoryPayload[];
  menu: IMenuPayload;
  status: IStatusPayload;
  newMenus: IMenuPayload[];
}

export enum MenuActionTypes {
  FETCH_MENU = "FETCH_MENU",
  FETCH_CATEGORIES = "FETCH_CATEGORIES",

  SET_LOADING = "SET_LOADING",
  SET_ERROR = "SET_ERROR",
  SET_MENU = "SET_MENU",

  FETCH_NEW_MENU = "FETCH_NEW_MENU",

  CREATE_MENU = "CREATE_MENU",
  UPDATE_MENU = "UPDATE_MENU",
  DELETE_MENU = "DELETE_MENU",
}

export interface IFetchMenu {
  type: MenuActionTypes.FETCH_MENU;
  payload: IMenuPagination;
}

export interface IFetchCategories {
  type: MenuActionTypes.FETCH_CATEGORIES;
  payload: ICategoryPayload[];
}

export interface ISetLoading {
  type: MenuActionTypes.SET_LOADING;
  payload: boolean;
}

export interface ISetError {
  type: MenuActionTypes.SET_ERROR;
  payload: string | null;
}

export interface ISetMenu {
  type: MenuActionTypes.SET_MENU;
  payload: IMenuPayload;
}

export interface IFetchNewMenu {
  type: MenuActionTypes.FETCH_NEW_MENU;
  payload: IMenuPayload[];
}

export interface ICreateMenu {
  type: MenuActionTypes.CREATE_MENU;
  payload: ICreateUpdateMenuPayload;
}

export interface IUpdateMenu {
  type: MenuActionTypes.UPDATE_MENU;
  payload: ICreateUpdateMenuPayload;
  id: number;
}

export interface IDeleteMenu {
  type: MenuActionTypes.DELETE_MENU;
  payload: number;
}

export type MenuActions =
  | IFetchMenu
  | IFetchCategories
  | ISetLoading
  | ISetError
  | ISetMenu
  | IFetchNewMenu
  | ICreateMenu
  | IUpdateMenu
  | IDeleteMenu;
export type MenuDispatch = ThunkDispatch<IMenuState, any, AnyAction>;
