import {
  IFetchCategories,
  IFetchMenu,
  IMenuState,
  MenuActions,
  MenuActionTypes,
} from "./types";

const initialState: IMenuState = {
  menus: {
    current_page: 0,
    data: [],
    limit: 0,
    total: 0,
    total_page: 0,
  },
  categories: [],
};

const fetchMenu = (state: IMenuState, action: IFetchMenu) => ({
  ...state,
  menus: action.payload,
});

const fetchCategories = (state: IMenuState, action: IFetchCategories) => ({
  ...state,
  categories: action.payload,
});

const menuReducer = (
  state: IMenuState = initialState,
  action: MenuActions
): IMenuState => {
  switch (action.type) {
    case MenuActionTypes.FETCH_MENU:
      return fetchMenu(state, action);
    case MenuActionTypes.FETCH_CATEGORIES:
      return fetchCategories(state, action);
    default:
      return state;
  }
};

export default menuReducer;
