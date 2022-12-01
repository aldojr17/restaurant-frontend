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
import orderReducer from "./order/reducer";
import { IMenuState } from "./menu/types";
import { IUserState } from "./user/types";
import { ICartState } from "./cart/types";
import { IOrderState } from "./order/types";
import storage from "redux-persist/lib/storage";
import persistReducer from "redux-persist/lib/persistReducer";
import persistStore from "redux-persist/lib/persistStore";

export interface RootState {
  menuReducer: IMenuState;
  userReducer: IUserState;
  cartReducer: ICartState;
  orderReducer: IOrderState;
}

const persistConfig = {
  key: "persistedRedux",
  storage,
  whitelist: ["cartReducer"],
};

const persistedReducer = persistReducer(
  persistConfig,
  combineReducers<RootState>({
    menuReducer,
    userReducer,
    cartReducer,
    orderReducer,
  })
);

const store = createStore(persistedReducer, applyMiddleware(logger, thunk));

export const persistor = persistStore(store);

export default store;
