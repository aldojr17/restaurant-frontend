import moment from "moment";
import { FormEvent, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Filter from "../components/Filter/Filter";
import Navbar from "../components/Navbar/Navbar";
import { RootState } from "../redux";
import { IFilterPayload } from "../redux/menu/types";
import { fetchOrders } from "../redux/user/action";
import { UserDispatch } from "../redux/user/types";
import { formatCurrency } from "../util/util";

const Order = () => {
  const { orders } = useSelector((state: RootState) => state.userReducer);
  const [filter, setFilter] = useState<IFilterPayload>({
    category: 0,
    sortBy: "order_date",
    name: "",
    sort: "desc",
    limit: 5,
  });
  const [pagination, setPagination] = useState<string[]>([]);
  const dispatch: UserDispatch = useDispatch();

  const handleChange = (event: FormEvent<HTMLSelectElement>) => {
    setFilter({
      ...filter,
      limit: parseInt(event.currentTarget.value),
    });
  };

  const handleClick = (page: number) => {
    setFilter({
      ...filter,
      page,
    });
  };

  const handlePagination = (totalPage: number, currentPage: number) => {
    let element: string[] = [];
    const actualPage = currentPage + 1;

    if (totalPage <= 10) {
      element = Array.from(Array(orders.total_page).keys(), (index) =>
        String(index + 1)
      );
    } else {
      if (actualPage <= 4) {
        element = ["1", "2", "3", "...", String(totalPage)];
      } else if (actualPage < 6) {
        element = [
          "1",
          "...",
          String(actualPage - 2),
          String(actualPage - 1),
          String(actualPage),
          "...",
          String(totalPage),
        ];
      } else if (actualPage < totalPage && actualPage > 4) {
        element = [
          "1",
          "...",
          String(actualPage - 3),
          String(actualPage - 2),
          String(actualPage - 1),
          "...",
          String(totalPage),
        ];
      } else if (actualPage > totalPage - 4) {
        element = [
          "1",
          "...",
          String(totalPage - 2),
          String(totalPage - 1),
          String(totalPage),
        ];
      } else {
        element = [
          "1",
          "...",
          String(actualPage - 1),
          String(actualPage),
          String(actualPage + 1),
          "...",
          String(totalPage),
        ];
      }
    }

    setPagination(element);
  };

  useEffect(() => {
    dispatch(fetchOrders(filter));
  }, [filter]);

  useEffect(() => {
    handlePagination(orders.total_page, orders.current_page);
  }, [orders]);

  return (
    <>
      <Navbar active="orders" isLogged />
      <div className="container">
        <h1>Orders</h1>
        <div className="my-4 row flex-column mx-auto gap-4 align-items-center align-items-lg-start">
          <Filter filter={filter} setFilter={setFilter} type={"orders"} />
          <div className="d-flex align-items-center p-0">
            <div className="col">
              <span>
                Showing {orders.limit * orders.current_page - orders.limit + 1}{" "}
                to{" "}
                {orders.limit * orders.current_page + 1 <= orders.total
                  ? orders.limit * orders.current_page
                  : orders.total}{" "}
                of {orders.total}
              </span>
            </div>
            <div className="col d-flex align-items-center gap-3 justify-content-end">
              <span>Row per page</span>
              <div className="col-lg-2">
                <select
                  name="limit"
                  id="limit"
                  className="form-select"
                  value={filter.limit}
                  onChange={handleChange}
                >
                  <option value={5}>5</option>
                  <option value={10}>10</option>
                  <option value={20}>20</option>
                  <option value={50}>50</option>
                </select>
              </div>
            </div>
          </div>
        </div>
        <div className="row gap-3 flex-column">
          {orders.data.map((order) => (
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
        <div className="my-3 d-flex justify-content-end gap-1">
          <button
            className="btn"
            onClick={() => handleClick(orders.current_page - 1)}
          >
            Previous
          </button>
          {pagination.map((item, index) => (
            <button
              key={index}
              className={`btn btn-outline-dark ${
                orders.current_page === Number(item) ? "active" : ""
              }`}
              onClick={() => {
                if (item !== "...") {
                  handleClick(Number(item));
                }
              }}
            >
              {item}
            </button>
          ))}
          <button
            className="btn"
            onClick={() => handleClick(orders.current_page + 1)}
          >
            Next
          </button>
        </div>
      </div>
    </>
  );
};

export default Order;
