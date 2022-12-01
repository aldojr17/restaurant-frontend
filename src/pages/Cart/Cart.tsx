import { FormEvent, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { TrashIcon } from "../../components/Icon";
import Navbar from "../../components/Navbar/Navbar";
import { RootState } from "../../redux";
import {
  deleteAllFromCart,
  deleteFromCart,
  updateCart,
} from "../../redux/cart/action";
import { CartDispatch } from "../../redux/cart/types";
import {
  createOrder,
  createOrderDetails,
  setOrder,
} from "../../redux/order/action";
import { IOrderDetailPayload, OrderDispatch } from "../../redux/order/types";
import useIsLogged from "../../util/useIsLogged";
import { formatCurrency } from "../../util/util";
import InputNumber from "../MenuDetail/style";
import Title, { DivOrder, LoadingWrapper, SpanHeader } from "./style";

const Cart = () => {
  const { cart } = useSelector((state: RootState) => state.cartReducer);
  const { order, status } = useSelector(
    (state: RootState) => state.orderReducer
  );
  const { coupons } = useSelector((state: RootState) => state.userReducer);

  const dispatch: CartDispatch = useDispatch();
  const dispatchOrder: OrderDispatch = useDispatch();

  const [subtotal, setSubtotal] = useState(
    cart.reduce((acc, val) => acc + val.menu_detail?.price! * val.qty, 0)
  );
  const [total, setTotal] = useState(subtotal);
  const [coupon, setCoupon] = useState("");

  useEffect(() => {
    setSubtotal(
      cart.reduce((acc, val) => acc + val.menu_detail?.price! * val.qty, 0)
    );
  }, [cart]);

  useEffect(() => {
    setTotal(
      coupons.length !== 0 && coupon !== ""
        ? subtotal -
            coupons.find((c) => c.coupon.id === coupon)?.coupon.discount! >=
          0
          ? subtotal -
            coupons.find((c) => c.coupon.id === coupon)?.coupon.discount!
          : 0
        : subtotal
    );
  }, [subtotal, coupon]);

  const handleCheckout = () => {
    dispatchOrder(
      createOrder({
        coupon_id: coupon,
        id: 0,
        notes: null,
        payment_id: 1,
        status: "",
        total_price: total,
      })
    );
  };

  const handleDeleteFromCart = (item: IOrderDetailPayload) => {
    dispatch(deleteFromCart(item));
  };

  const handleCoupon = (event: FormEvent<HTMLSelectElement>) => {
    setCoupon(event.currentTarget.value);
  };

  const handleClearCart = () => {
    dispatch(deleteAllFromCart());
  };

  useEffect(() => {
    if (order.id !== 0) {
      dispatchOrder(
        createOrderDetails(
          cart.map((val) => {
            return {
              menu_id: val.menu_id,
              order_id: order.id,
              option_id: val.option_id !== 0 ? val.option_id : null,
              qty: val.qty,
            };
          })
        )
      );
      dispatchOrder(
        setOrder({
          coupon_id: "",
          id: 0,
          notes: null,
          payment_id: 1,
          status: "",
          total_price: 0,
        })
      );
      dispatch(deleteAllFromCart());
    }
  }, [order]);

  return (
    <>
      <Navbar isLogged={useIsLogged()} />
      {status.isLoading ? (
        <LoadingWrapper className="d-flex justify-content-center align-items-center">
          <div className="spinner-border" role="status">
            <span className="visually-hidden">Loading...</span>
          </div>
        </LoadingWrapper>
      ) : (
        <div className="container">
          <Title>CART</Title>
          {cart.length !== 0 ? (
            <div className="row my-3 d-none d-lg-block">
              <div className="col-lg-10 row me-3">
                <SpanHeader className="col-lg-6 fs-4">ITEMS</SpanHeader>
                <SpanHeader className="col-lg-3 fs-4 px-2">QUANTITY</SpanHeader>
                <SpanHeader className="col-lg-1 fs-4 px-2">PRICE</SpanHeader>
                <button
                  className="col-lg-2 btn text-danger text-end"
                  onClick={handleClearCart}
                >
                  Clear Cart
                </button>
              </div>
            </div>
          ) : (
            <LoadingWrapper className="d-flex justify-content-center align-items-center">
              <span className="fs-3">Your cart is empty</span>
            </LoadingWrapper>
          )}
          <div className="row flex-column-reverse flex-lg-row gap-5 gap-lg-0">
            <div className="col-lg-10 d-flex flex-column gap-5">
              {cart.map((val, index) => (
                <div
                  key={index}
                  className="row border-bottom pb-3 me-lg-3 border-2 align-items-center gap-3 gap-lg-0"
                >
                  <div className="col-lg-3">
                    <img
                      src={`https://plus.unsplash.com/premium_photo-1667682209935-b6c87cced668?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80`}
                      alt="menu"
                      className="w-100"
                    />
                  </div>
                  <div className="col-lg-3 d-flex flex-column gap-2">
                    <span className="text-break">{val.menu_detail?.name}</span>
                    {val.option_id !== -1 ? (
                      <span className="text-muted">
                        {val.option_id
                          ? val.menu_detail?.menu_option.find(
                              (opt) => val.option_id === opt.id
                            )?.name
                          : ""}
                      </span>
                    ) : (
                      ""
                    )}
                  </div>
                  <div className="col-lg-3">
                    <div className="d-flex align-items-end gap-3">
                      <button
                        className="btn btn-outline-dark col-lg-2"
                        onClick={() => {
                          if (val.qty - 1 !== 0) {
                            dispatch(updateCart(false, val));
                          }
                        }}
                      >
                        -
                      </button>
                      <div className="col-lg-5">
                        <InputNumber
                          type="number"
                          className="form-control text-center"
                          name="qty"
                          value={val.qty}
                          readOnly
                        />
                      </div>
                      <button
                        className="btn btn-outline-dark col-lg-2"
                        onClick={() => {
                          dispatch(updateCart(true, val));
                        }}
                      >
                        +
                      </button>
                    </div>
                  </div>
                  <div className="col-lg-2">
                    <span>
                      Rp.{formatCurrency(val.menu_detail?.price! * val.qty)}
                    </span>
                  </div>
                  <div
                    role={"button"}
                    className="col-lg-1 d-flex justify-content-center align-items-center"
                    onClick={() => handleDeleteFromCart(val)}
                  >
                    <TrashIcon />
                  </div>
                </div>
              ))}
            </div>
            {cart.length !== 0 ? (
              <div className="col-lg-2">
                <DivOrder className="shadow row flex-column border border-1 gap-3 justify-content-between py-3">
                  <div className="col-12 d-flex gap-3 flex-column">
                    <span className="fs-4 text-start">Your Order</span>
                    <div className="d-flex flex-column gap-2">
                      <div className="d-flex justify-content-between">
                        <span>Items</span>
                        <span>
                          {cart.reduce((acc, val) => acc + val.qty, 0)}
                        </span>
                      </div>
                      <div className="d-flex justify-content-between">
                        <span>Subtotal</span>
                        <span>Rp.{formatCurrency(subtotal)}</span>
                      </div>
                      <div className="my-3 d-flex flex-column gap-2">
                        <span>Coupon</span>
                        <select
                          name="coupon"
                          id="coupon"
                          className="form-select"
                          onChange={handleCoupon}
                        >
                          <option value="">Select coupon</option>
                          {coupons.length !== 0 &&
                            coupons.map((coupon) => (
                              <option
                                key={coupon.coupon.id}
                                value={coupon.coupon.id}
                              >
                                {coupon.coupon.code}
                              </option>
                            ))}
                        </select>
                      </div>
                      <div className="d-flex justify-content-between">
                        <span>Discount</span>
                        <span>
                          Rp.
                          {formatCurrency(
                            coupons.length !== 0 && coupon !== ""
                              ? coupons.find((c) => c.coupon.id === coupon)
                                  ?.coupon.discount!
                              : 0
                          )}
                        </span>
                      </div>
                      <div className="d-flex justify-content-between">
                        <span>Total</span>
                        <span>
                          Rp.
                          {formatCurrency(total)}
                        </span>
                      </div>
                    </div>
                  </div>
                  <div className="col-12 d-flex justify-content-center">
                    <button className="btn btn-dark" onClick={handleCheckout}>
                      CHECKOUT
                    </button>
                  </div>
                </DivOrder>
              </div>
            ) : (
              ""
            )}
          </div>
        </div>
      )}
    </>
  );
};

export default Cart;
