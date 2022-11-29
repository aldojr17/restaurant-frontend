import {
  IFetchCategories,
  IFetchMenu,
  IMenuState,
  ISetError,
  ISetLoading,
  ISetMenu,
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
  menu: {
    category: {
      id: 0,
      name: "",
    },
    description: "",
    id: 0,
    is_available: false,
    name: "",
    menu_option: [],
    photo: "",
    price: 0,
    rating: 0,
    total_review: 0,
    reviews: [],
  },
  status: {
    error: null,
    isLoading: false,
  },
};

const fetchMenu = (state: IMenuState, action: IFetchMenu) => ({
  ...state,
  menus: action.payload,
});

const fetchCategories = (state: IMenuState, action: IFetchCategories) => ({
  ...state,
  categories: action.payload,
});

const setMenu = (state: IMenuState, action: ISetMenu) => ({
  ...state,
  menu: action.payload,
});

const setLoading = (state: IMenuState, action: ISetLoading) => ({
  ...state,
  status: {
    ...state.status,
    isLoading: action.payload,
  },
});

const setError = (state: IMenuState, action: ISetError) => ({
  ...state,
  status: {
    ...state.status,
    error: action.payload,
  },
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
    case MenuActionTypes.SET_ERROR:
      return setError(state, action);
    case MenuActionTypes.SET_LOADING:
      return setLoading(state, action);
    case MenuActionTypes.SET_MENU:
      return setMenu(state, action);
    default:
      return state;
  }
};

export default menuReducer;
