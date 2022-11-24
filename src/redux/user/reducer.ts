import {
  IAddToFavorites,
  IDeleteFromFavorites,
  ISetStatus,
  ISetUser,
  IUserState,
  UserActions,
  UserActionTypes,
} from "./types";

const initialState: IUserState = {
  user: {
    address: "",
    email: "",
    full_name: "",
    id: "",
    phone: "",
    profile_picture: "",
    role: -1,
    favorites: [],
  },
  status: {
    error: "",
    isSuccess: false,
  },
};

const setUser = (state: IUserState, action: ISetUser) => ({
  ...state,
  user: action.payload,
});

const setStatus = (state: IUserState, action: ISetStatus) => ({
  ...state,
  status: action.payload,
});

const addToFavorites = (state: IUserState, action: IAddToFavorites) => ({
  ...state,
  user: {
    ...state.user,
    favorites: [...state.user.favorites, action.payload],
  },
});

const deleteFromFavorites = (
  state: IUserState,
  action: IDeleteFromFavorites
) => ({
  ...state,
  user: {
    ...state.user,
    favorites: state.user.favorites.filter(
      (fav) => fav.menu_id !== action.payload.menu_id
    ),
  },
});

const userReducer = (
  state: IUserState = initialState,
  action: UserActions
): IUserState => {
  switch (action.type) {
    case UserActionTypes.SET_USER:
      return setUser(state, action);
    case UserActionTypes.SET_STATUS:
      return setStatus(state, action);
    case UserActionTypes.ADD_TO_FAVORITES:
      return addToFavorites(state, action);
    case UserActionTypes.DELETE_FROM_FAVORITES:
      return deleteFromFavorites(state, action);
    default:
      return state;
  }
};

export default userReducer;
