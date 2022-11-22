import {
  legacy_createStore as createStore,
  applyMiddleware,
  combineReducers,
} from "redux";
import logger from "redux-logger";
import thunk from "redux-thunk";
import menuReducer from "./menu/reducer";
import { IMenuState } from "./menu/types";

export interface RootState {
  menuReducer: IMenuState;
}

const store = createStore(
  combineReducers<RootState>({
    menuReducer,
  }),
  applyMiddleware(logger, thunk)
);

export default store;
