import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { TrashIcon } from "../../components/Icon";
import Navbar from "../../components/Navbar/Navbar";
import { RootState } from "../../redux";
import { updateCart } from "../../redux/cart/action";
import { CartDispatch } from "../../redux/cart/types";
import useIsLogged from "../../util/useIsLogged";
import { formatCurrency } from "../../util/util";
import InputNumber from "../MenuDetail/style";
import Title, { DivOrder, SpanHeader } from "./style";

const Cart = () => {
  const { cart } = useSelector((state: RootState) => state.cartReducer);
  const dispatch: CartDispatch = useDispatch();
  const [total, setTotal] = useState(
    cart.reduce((acc, val) => acc + val.menu.price * val.qty, 0)
  );

  useEffect(() => {
    setTotal(cart.reduce((acc, val) => acc + val.menu.price * val.qty, 0));
  }, [cart]);

  return (
    <>
      <Navbar isLogged={useIsLogged()} />
      <div className="container">
        <Title>CART</Title>
        <div className="row my-3 d-none d-lg-block">
          <div className="col-lg-10 row me-3">
            <SpanHeader className="col-lg-5 fs-4">ITEMS</SpanHeader>
            <SpanHeader className="col-lg-3 fs-4 px-2">QUANTITY</SpanHeader>
            <SpanHeader className="col-lg-2 fs-4 px-2">PRICE</SpanHeader>
          </div>
        </div>
        <div className="row flex-column-reverse flex-lg-row gap-5 gap-lg-0">
          <div className="col-lg-10 d-flex flex-column gap-5">
            {cart.map((val) => (
              <div className="row border-bottom pb-3 me-lg-3 border-2 align-items-center gap-3 gap-lg-0">
                <div className="col-lg-3">
                  <img
                    src={`https://plus.unsplash.com/premium_photo-1667682209935-b6c87cced668?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80`}
                    alt="menu"
                    className="w-100"
                  />
                </div>
                <div className="col-lg-2 d-flex flex-column gap-2">
                  <span className="text-break">{val.menu.name}</span>
                  {val.option_id !== -1 ? (
                    <span className="text-muted">
                      {val.menu.menu_option[val.option_id].name}
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
                <div className="col-lg-1">
                  <span>Rp.{formatCurrency(val.menu.price * val.qty)}</span>
                </div>
                <div
                  role={"button"}
                  className="col-lg-1 d-flex justify-content-center align-items-center"
                >
                  <TrashIcon />
                </div>
              </div>
            ))}
          </div>
          <div className="col-lg-2">
            <DivOrder className="shadow row flex-column border border-1 gap-3 justify-content-between py-3">
              <div className="col-12 d-flex gap-3 flex-column">
                <span className="fs-4 text-start">Your Order</span>
                <div className="d-flex flex-column gap-2">
                  <div className="d-flex justify-content-between">
                    <span>Items</span>
                    <span>{cart.reduce((acc, val) => acc + val.qty, 0)}</span>
                  </div>
                  <div className="d-flex justify-content-between">
                    <span>Total</span>
                    <span>Rp.{formatCurrency(total)}</span>
                  </div>
                </div>
              </div>
              <div className="col-12 d-flex justify-content-center">
                <button className="btn btn-dark">CHECKOUT</button>
              </div>
            </DivOrder>
          </div>
        </div>
      </div>
    </>
  );
};

export default Cart;
