import {
  CartActions,
  CartActionTypes,
  IAddToCart,
  ICartState,
  IUpdateCart,
} from "./types";

const initialState: ICartState = {
  cart: [],
};

const addToCart = (state: ICartState, action: IAddToCart) => ({
  ...state,
  cart: [...state.cart, action.payload],
});

const updateCartItem = (state: ICartState, action: IAddToCart) => ({
  ...state,
  cart: state.cart.map((value) =>
    value.menu_id === action.payload.menu_id &&
    value.option_id === action.payload.option_id
      ? { ...value, qty: value.qty + action.payload.qty }
      : value
  ),
});

const addQty = (state: ICartState, action: IUpdateCart) => ({
  ...state,
  cart: state.cart.map((value) =>
    value.menu_id === action.data.menu_id &&
    value.option_id === action.data.option_id
      ? { ...value, qty: value.qty + 1 }
      : value
  ),
});

const reduceQty = (state: ICartState, action: IUpdateCart) => ({
  ...state,
  cart: state.cart.map((value) =>
    value.menu_id === action.data.menu_id &&
    value.option_id === action.data.option_id
      ? { ...value, qty: value.qty - 1 }
      : value
  ),
});

const cartReducer = (
  state: ICartState = initialState,
  action: CartActions
): ICartState => {
  switch (action.type) {
    case CartActionTypes.ADD_TO_CART:
      if (
        state.cart.find(
          (value) =>
            value.menu_id === action.payload.menu_id &&
            value.option_id === action.payload.option_id
        )
      ) {
        return updateCartItem(state, action);
      } else {
        return addToCart(state, action);
      }
    case CartActionTypes.UPDATE_CART:
      if (action.isAdd) {
        return addQty(state, action);
      } else {
        return reduceQty(state, action);
      }
    default:
      return state;
  }
};

export default cartReducer;
