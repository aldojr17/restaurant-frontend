import {
  legacy_createStore as createStore,
  applyMiddleware,
  combineReducers,
} from "redux";
import logger from "redux-logger";
import thunk from "redux-thunk";
import menuReducer from "./menu/reducer";
import userReducer from "./user/reducer";
import cartReducer from "./cart/reducer";
import { IMenuState } from "./menu/types";
import { IUserState } from "./user/types";
import { ICartState } from "./cart/types";

export interface RootState {
  menuReducer: IMenuState;
  userReducer: IUserState;
  cartReducer: ICartState;
}

const store = createStore(
  combineReducers<RootState>({
    menuReducer,
    userReducer,
    cartReducer,
  }),
  applyMiddleware(logger, thunk)
);

export default store;
