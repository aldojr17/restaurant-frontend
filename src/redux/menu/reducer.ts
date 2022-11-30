import {
  ICreateMenu,
  IDeleteMenu,
  IFetchCategories,
  IFetchMenu,
  IFetchNewMenu,
  IMenuState,
  ISetError,
  ISetLoading,
  ISetMenu,
  IUpdateMenu,
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
  newMenus: [],
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

const setNewMenu = (state: IMenuState, action: IFetchNewMenu) => ({
  ...state,
  newMenus: action.payload,
});

const addMenu = (state: IMenuState, action: ICreateMenu) => ({
  ...state,
  menus: {
    ...state.menus,
    data: [
      ...state.menus.data,
      {
        category: {
          id: action.payload.category_id,
          name: "",
        },
        description: action.payload.description,
        id: 0,
        is_available: action.payload.is_available,
        name: action.payload.name,
        menu_option: [],
        photo: action.payload.photo,
        price: action.payload.price,
        rating: 0,
        total_review: 0,
        reviews: [],
      },
    ],
  },
});

const updateMenuDetail = (state: IMenuState, action: IUpdateMenu) => ({
  ...state,
  menus: {
    ...state.menus,
    data: state.menus.data.map((menu) =>
      menu.id === action.id
        ? {
            ...menu,
            category: {
              ...menu.category,
              id: action.payload.category_id,
            },
            description: action.payload.description,
            is_available: action.payload.is_available,
            name: action.payload.name,
            photo: action.payload.photo,
            price: action.payload.price,
          }
        : menu
    ),
  },
});

const deleteMenu = (state: IMenuState, action: IDeleteMenu) => ({
  ...state,
  menus: {
    ...state.menus,
    data: state.menus.data.filter((menu) => menu.id !== action.payload),
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
    case MenuActionTypes.FETCH_NEW_MENU:
      return setNewMenu(state, action);
    case MenuActionTypes.CREATE_MENU:
      return addMenu(state, action);
    case MenuActionTypes.UPDATE_MENU:
      return updateMenuDetail(state, action);
    case MenuActionTypes.DELETE_MENU:
      return deleteMenu(state, action);

    default:
      return state;
  }
};

export default menuReducer;
