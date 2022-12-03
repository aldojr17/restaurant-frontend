import { FormEvent, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { fetchPayment, IPayment } from "../../api/api";
import Navbar from "../../components/Navbar/Navbar";
import { RootState } from "../../redux";
import { fetchAllOrder, updateOrder } from "../../redux/order/action";
import { DeliveryStatus, IOrderPayload } from "../../redux/order/types";
import { UserDispatch } from "../../redux/user/types";
import useIsLogged from "../../util/useIsLogged";
import { formatCurrency } from "../../util/util";
import Title from "../Cart/style";
import { OrderStatusWrapper } from "../Order/style";

const OrderDetail = () => {
  const { id } = useParams();
  const { orders } = useSelector((state: RootState) => state.orderReducer);
  const [order, setOrder] = useState<IOrderPayload>();
  const dispatch: UserDispatch = useDispatch();
  const [payments, setPayments] = useState<IPayment[]>([]);

  const getPayments = async () => {
    setPayments(await fetchPayment());
  };

  const handleUpdateStatus = () => {
    dispatch(
      updateOrder({
        id: order?.id!,
        status:
          order?.status === DeliveryStatus.PREPARING
            ? DeliveryStatus.ON_THE_WAY
            : DeliveryStatus.RECEIVED,
      })
    );
  };

  useEffect(() => {
    setOrder(orders.data.find((o) => o.id === Number(id)));
  }, [orders]);

  useEffect(() => {
    dispatch(fetchAllOrder());
    getPayments();
  }, []);

  return (
    <>
      <Navbar isAdmin isLogged={useIsLogged()} />
      <div className="container">
        <Title>ORDER DETAIL</Title>
        <div className="d-flex gap-2">
          <OrderStatusWrapper
            className={`col-lg-2 d-flex justify-content-center px-3 py-1 rounded-4 delivery-preparing ${
              order?.status !== DeliveryStatus.PREPARING
                ? "bg-secondary text-white"
                : ""
            }`}
          >
            <span>{DeliveryStatus.PREPARING}</span>
          </OrderStatusWrapper>
          <OrderStatusWrapper
            className={`col-lg-2 d-flex justify-content-center px-3 py-1 rounded-4 delivery-on-the-way ${
              order?.status !== DeliveryStatus.ON_THE_WAY
                ? "bg-secondary text-white"
                : ""
            }`}
          >
            <span>{DeliveryStatus.ON_THE_WAY}</span>
          </OrderStatusWrapper>
          <OrderStatusWrapper
            className={`col-lg-2 d-flex justify-content-center px-3 py-1 rounded-4 delivery-received ${
              order?.status !== DeliveryStatus.RECEIVED
                ? "bg-secondary text-white"
                : ""
            }`}
          >
            <span>{DeliveryStatus.RECEIVED}</span>
          </OrderStatusWrapper>
        </div>

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
                    Rp.
                    {formatCurrency(
                      val.option_id! !== 0
                        ? val.menu_detail?.price! +
                            val.menu_detail?.menu_option.find(
                              (opt) => opt.id === val.option_id
                            )?.price!
                        : val.menu_detail?.price!
                    )}
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
                  {order?.status !== DeliveryStatus.RECEIVED ? (
                    <div className="d-flex justify-content-center">
                      <button
                        className="btn btn-dark"
                        onClick={handleUpdateStatus}
                      >
                        Update Order Status
                      </button>
                    </div>
                  ) : (
                    ""
                  )}
                </div>
              </div>
            </div>
          ) : (
            ""
          )}
        </div>
      </div>
    </>
  );
};

export default OrderDetail;
