import { CartActions, CartActionTypes, IAddToCart, ICartState } from "./types";

const initialState: ICartState = {
  cart: [],
};

const addToCart = (state: ICartState, action: IAddToCart) => ({
  ...state,
  cart: [...state.cart, action.payload],
});

const updateCart = (state: ICartState, action: IAddToCart) => ({
  ...state,
  cart: state.cart.map((value) =>
    value.menu_id === action.payload.menu_id &&
    value.option_id === action.payload.option_id
      ? { ...value, qty: value.qty + action.payload.qty }
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
        return updateCart(state, action);
      } else {
        return addToCart(state, action);
      }
    default:
      return state;
  }
};

export default cartReducer;
