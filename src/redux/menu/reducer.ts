import { IFetchMenu, IMenuState, MenuActions, MenuActionTypes } from "./types";

const initialState: IMenuState = {
  menus: [],
};

const fetchMenu = (state: IMenuState, action: IFetchMenu) => ({
  ...state,
  menus: action.payload,
});

const menuReducer = (
  state: IMenuState = initialState,
  action: MenuActions
): IMenuState => {
  switch (action.type) {
    case MenuActionTypes.FETCH_MENU:
      return fetchMenu(state, action);
    default:
      return state;
  }
};

export default menuReducer;
