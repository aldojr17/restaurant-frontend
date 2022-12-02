import { FormEvent, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { fetchPayment, IPayment } from "../api/api";
import { StarIcon } from "../components/Icon";
import UnfillStarIcon from "../components/Icon/UnfillStarIcon";
import Navbar from "../components/Navbar/Navbar";
import { RootState } from "../redux";
import { IMenuPayload } from "../redux/menu/types";
import { IOrderPayload } from "../redux/order/types";
import { addReview, fetchOrders } from "../redux/user/action";
import { IAddReviewPayload, UserDispatch } from "../redux/user/types";
import { formatCurrency } from "../util/util";
import Title from "./Cart/style";
import { OrderStatusWrapper } from "./Order/style";

const OrderDetail = () => {
  const { id } = useParams();
  const { orders } = useSelector((state: RootState) => state.userReducer);
  const [order, setOrder] = useState<IOrderPayload>();
  const dispatch: UserDispatch = useDispatch();
  const [payments, setPayments] = useState<IPayment[]>([]);
  const [menu, setMenu] = useState<IMenuPayload>();
  const [fillUnfill, setFillUnfill] = useState(0);
  const [review, setReview] = useState<IAddReviewPayload>({
    description: "",
    menu_id: 0,
    rating: 0,
  });

  const getPayments = async () => {
    setPayments(await fetchPayment());
  };

  const handleChange = (event: FormEvent<HTMLTextAreaElement>) => {
    setReview({
      ...review,
      description: event.currentTarget.value,
    });
  };

  const handleAddReview = () => {
    dispatch(addReview(review));
  };

  useEffect(() => {
    setOrder(orders.data.find((o) => o.id === Number(id)));
  }, [orders]);

  useEffect(() => {
    dispatch(fetchOrders());
    getPayments();
  }, []);

  return (
    <>
      <Navbar active="orders" isLogged />
      <div className="container">
        <Title>ORDER DETAIL</Title>
        <OrderStatusWrapper
          className={`col-lg-2 d-flex justify-content-center px-3 py-1 rounded-4 delivery-${order?.status
            .replaceAll(" ", "-")
            .toLowerCase()}`}
        >
          <span>{order?.status}</span>
        </OrderStatusWrapper>

        <div className="row flex-column-reverse flex-lg-row gap-5 gap-lg-0 mt-5">
          <div className="col-lg-10 d-flex flex-column gap-5">
            {order?.order_details?.map((val, index) => (
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
                <div className="col-lg-4 d-flex flex-column gap-2">
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
                  <span>Qty: {val.qty}</span>
                  <span className="fw-bold">
                    Rp.{formatCurrency(val.menu_detail?.price!)}
                  </span>
                </div>
                <div className="col-lg-3 d-flex flex-column gap-2">
                  <span className="fs-4">
                    Rp.
                    {formatCurrency(
                      (val.option_id! !== 0
                        ? val.menu_detail?.price! +
                          val.menu_detail?.menu_option.find(
                            (opt) => opt.id === val.option_id
                          )?.price!
                        : val.menu_detail?.price!) * val.qty
                    )}
                  </span>
                </div>
                <div className="col-lg-2 d-flex justify-content-end">
                  <button className="btn btn-outline-dark">Add Review</button>
                </div>
              </div>
            ))}
          </div>
          {order?.order_details?.length !== 0 ? (
            <div className="col-lg-2">
              <div className="shadow row flex-column border border-1 gap-3 justify-content-between py-3">
                <div className="col-12 d-flex gap-3 flex-column">
                  <span className="fs-3 text-center fw-bold">
                    Order Summary
                  </span>
                  <div className="d-flex flex-column gap-2">
                    <div className="d-flex justify-content-between">
                      <span className="fw-bold">Items</span>
                      <span>
                        {order?.order_details?.reduce(
                          (acc, val) => acc + val.qty,
                          0
                        )}
                      </span>
                    </div>
                    <div className="d-flex justify-content-between">
                      <span className="fw-bold">Subtotal</span>
                      <span>Rp.{formatCurrency(order?.subtotal!)}</span>
                    </div>
                    <div className="my-3 d-flex justify-content-between">
                      <span className="fw-bold">Coupon</span>
                      <span>
                        {order?.coupon_id === "" || order?.coupon_id === null
                          ? "-"
                          : order?.coupon?.code!}
                      </span>
                    </div>
                    <div className="d-flex justify-content-between">
                      <span className="fw-bold">Discount</span>
                      <span>
                        Rp.
                        {formatCurrency(
                          order?.coupon_id === "" || order?.coupon_id === null
                            ? 0
                            : order?.coupon?.discount!
                        )}
                      </span>
                    </div>
                    <div className="d-flex justify-content-between">
                      <span className="fw-bold">Total</span>
                      <span>
                        Rp.
                        {formatCurrency(order?.total_price!)}
                      </span>
                    </div>
                    <div className="my-3 d-flex justify-content-between gap-2">
                      <span className="fw-bold">Payment</span>
                      <span>
                        {
                          payments.find(
                            (payment) => payment.id == order?.payment_id
                          )?.description
                        }
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ) : (
            ""
          )}
        </div>
      </div>

      <div
        className="modal fade"
        id="reviewModal"
        tabIndex={-1}
        aria-labelledby="reviewModalLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog modal-dialog-centered">
          <div className="modal-content">
            <div className="modal-header">
              <h1 className="modal-title fs-5" id="reviewModalLabel">
                Add Review
              </h1>
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
              ></button>
            </div>
            <div className="modal-body">
              <div className="d-flex flex-column gap-3">
                <div className="d-flex flex-column gap-1">
                  <label htmlFor="menuName" className="form-label">
                    Name
                  </label>
                  <input
                    type="text"
                    defaultValue={menu?.name}
                    id="menuName"
                    readOnly
                    disabled
                    className="form-control"
                  />
                </div>
                <div className="d-flex flex-column gap-1">
                  <label htmlFor="description" className="form-label">
                    Description
                  </label>
                  <textarea
                    id="description"
                    name="description"
                    className="form-control"
                    onChange={handleChange}
                  />
                </div>
                <div className="d-flex align-items-center gap-2">
                  <span>Rating : </span>
                  <div className="d-flex align-items-center">
                    {Array.from(Array(5).keys(), (value) => {
                      return value < fillUnfill ? (
                        <button
                          key={value}
                          type="button"
                          className="btn"
                          onClick={() => {
                            setFillUnfill(value + 1);
                            setReview({
                              ...review,
                              rating: value + 1,
                            });
                          }}
                        >
                          <StarIcon size={24} key={value} />
                        </button>
                      ) : (
                        <button
                          key={value}
                          type="button"
                          className="btn"
                          onClick={() => {
                            setFillUnfill(value + 1);
                            setReview({
                              ...review,
                              rating: value + 1,
                            });
                          }}
                        >
                          <UnfillStarIcon key={value} />
                        </button>
                      );
                    })}
                  </div>
                </div>
              </div>
            </div>
            <div className="modal-footer">
              <button
                type="button"
                className="btn btn-outline-dark"
                data-bs-dismiss="modal"
              >
                Close
              </button>
              <button
                type="button"
                className="btn btn-dark"
                onClick={handleAddReview}
              >
                Add Review
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default OrderDetail;
