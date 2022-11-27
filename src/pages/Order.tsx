import moment from "moment";
import { useSelector } from "react-redux";
import Navbar from "../components/Navbar/Navbar";
import { RootState } from "../redux";
import { formatCurrency } from "../util/util";

const Order = () => {
  const { orders } = useSelector((state: RootState) => state.userReducer);

  return (
    <>
      <Navbar active="orders" isLogged />
      <div className="container">
        <h1>Orders</h1>
        <div className="row gap-3 flex-column">
          {orders.map((order) => (
            <div
              key={order.id}
              className="col d-flex flex-column gap-3 border border-2 rounded rounded-4 p-3"
            >
              <div className="d-flex justify-content-between">
                <span>{moment(order.order_date).format("DD MMM YYYY")}</span>
                <span>{order.status}</span>
              </div>
              <div>
                <span>
                  Rp.{formatCurrency(order.total_price)} (
                  {order.order_details?.length} menu)
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

export default Order;
