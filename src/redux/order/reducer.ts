import {
  ICreateOrder,
  IFetchAllOrder,
  IOrderState,
  ISetError,
  ISetLoading,
  IUpdateOrderStatus,
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
    total_price: 0,
    subtotal: 0,
    user: {
      full_name: "",
      email: "",
    },
  },
  status: {
    error: null,
    isLoading: false,
  },
  orders: {
    current_page: 0,
    data: [],
    limit: 0,
    total: 0,
    total_page: 0,
  },
};

const setOrder = (state: IOrderState, action: ICreateOrder) => ({
  ...state,
  order: action.payload,
});

const setLoading = (state: IOrderState, action: ISetLoading) => ({
  ...state,
  status: {
    ...state.status,
    isLoading: action.payload,
  },
});

const setError = (state: IOrderState, action: ISetError) => ({
  ...state,
  status: {
    ...state.status,
    error: action.payload,
  },
});

const setOrders = (state: IOrderState, action: IFetchAllOrder) => ({
  ...state,
  orders: action.payload,
});

const updateOrdeStatus = (state: IOrderState, action: IUpdateOrderStatus) => ({
  ...state,
  orders: {
    ...state.orders,
    data: state.orders.data.map((val) =>
      val.id === action.payload.id
        ? { ...val, status: action.payload.status }
        : val
    ),
  },
});

const orderReducer = (
  state: IOrderState = initialState,
  action: OrderActions
): IOrderState => {
  switch (action.type) {
    case OrderActionTypes.CREATE_ORDER:
      return setOrder(state, action);
    case OrderActionTypes.SET_ERROR:
      return setError(state, action);
    case OrderActionTypes.SET_LOADING:
      return setLoading(state, action);
    case OrderActionTypes.FETCH_ALL_ORDER:
      return setOrders(state, action);
    case OrderActionTypes.UPDATE_ORDER_STATUS:
      return updateOrdeStatus(state, action);
    default:
      return state;
  }
};

export default orderReducer;
