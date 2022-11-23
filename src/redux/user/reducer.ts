import {
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

const userReducer = (
  state: IUserState = initialState,
  action: UserActions
): IUserState => {
  switch (action.type) {
    case UserActionTypes.SET_USER:
      return setUser(state, action);
    case UserActionTypes.SET_STATUS:
      return setStatus(state, action);
    default:
      return state;
  }
};

export default userReducer;
