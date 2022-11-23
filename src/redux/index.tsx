import {
  legacy_createStore as createStore,
  applyMiddleware,
  combineReducers,
} from "redux";
import logger from "redux-logger";
import thunk from "redux-thunk";
import menuReducer from "./menu/reducer";
import userReducer from "./user/reducer";
import { IMenuState } from "./menu/types";
import { IUserState } from "./user/types";

export interface RootState {
  menuReducer: IMenuState;
  userReducer: IUserState;
}

const store = createStore(
  combineReducers<RootState>({
    menuReducer,
    userReducer,
  }),
  applyMiddleware(logger, thunk)
);

export default store;
