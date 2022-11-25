import {
  ICreateOrder,
  IOrderState,
  OrderActions,
  OrderActionTypes,
} from "./types";

const initialState: IOrderState = {
  order: {
    coupon_id: null,
    id: 0,
    notes: null,
    payment_id: 1,
    status: "",
  },
};

const setOrder = (state: IOrderState, action: ICreateOrder) => ({
  ...state,
  order: action.payload,
});

const orderReducer = (
  state: IOrderState = initialState,
  action: OrderActions
): IOrderState => {
  switch (action.type) {
    case OrderActionTypes.CREATE_ORDER:
      return setOrder(state, action);
    default:
      return state;
  }
};

export default orderReducer;
