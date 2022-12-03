import moment from "moment";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { fetchPayment, IPayment } from "../../api/api";
import Filter from "../../components/Filter/Filter";
import Navbar from "../../components/Navbar/Navbar";
import { RootState } from "../../redux";
import { IFilterPayload } from "../../redux/menu/types";
import useIsLogged from "../../util/useIsLogged";
import { formatCurrency } from "../../util/util";
import Title from "../Cart/style";
import { OrderStatusWrapper } from "../Order/style";

const Dashboard = () => {
  const { orders } = useSelector((state: RootState) => state.orderReducer);
  const [filter, setFilter] = useState<IFilterPayload>({
    category: 0,
    sortBy: "order_date",
    name: "",
    sort: "desc",
    limit: 5,
  });
  const [pagination, setPagination] = useState<string[]>([]);
  const [payments, setPayments] = useState<IPayment[]>([]);
  const navigate = useNavigate();

  const getAllPayment = async () => {
    setPayments(await fetchPayment());
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
    handlePagination(orders.total_page, orders.current_page);
  }, [orders]);

  useEffect(() => {
    getAllPayment();
  }, []);

  return (
    <>
      <Navbar isAdmin isLogged={useIsLogged()} />
      <div className="container mb-4">
        <Title>DASHBOARD</Title>
      </div>
      <div className="container px-lg-3 row flex-column mx-auto gap-4 align-items-center align-items-lg-start">
        <Filter
          filter={filter}
          setFilter={setFilter}
          type={"orders"}
          pagination={{
            current_page: orders.current_page,
            limit: orders.limit,
            total: orders.total,
          }}
          isAdmin
        />
      </div>
      <div className="container">
        <div className="mx-1 my-3 row gap-3 flex-column">
          {orders.data.map((order) => (
            <div
              key={order.id}
              className="col row border border-1 border-dark rounded rounded-4 p-3"
            >
              <div className=" col-lg-4 d-flex flex-column">
                <span className="fs-5">
                  {order.user?.full_name} - {order.user?.email}
                </span>
                <span className="fw-bold fs-5">
                  {moment(order.order_date).format("DD MMM YYYY")}
                </span>
                <span className="fs-5">
                  Rp.{formatCurrency(order.total_price!)}{" "}
                  <span className="text-muted">
                    ({order.order_details?.length} menu) -{" "}
                  </span>
                  {
                    payments.find((payment) => payment.id === order.payment_id)
                      ?.description
                  }
                </span>
              </div>
              <div className="col-lg-4 d-flex justify-content-center align-items-center">
                <OrderStatusWrapper
                  className={`px-3 py-1 rounded-4 delivery-${order.status
                    .replaceAll(" ", "-")
                    .toLowerCase()}`}
                >
                  <span>{order.status}</span>
                </OrderStatusWrapper>
              </div>
              <div className="col-lg-4 d-flex justify-content-end align-items-center">
                <button
                  className="btn btn-dark"
                  onClick={() => navigate(`/${order.id}`)}
                >
                  Detail
                </button>
              </div>
            </div>
            // ))
            // <div
            //   key={order.id}
            //   className="col d-flex flex-column gap-3 border border-2 rounded rounded-4 p-3"
            // >
            //   <div>
            //     <span>{order.user_id}</span>
            //   </div>
            //   <div className="d-flex justify-content-between">
            //     <span>{moment(order.order_date).format("DD MMM YYYY")}</span>
            //     <span>{order.status}</span>
            //   </div>
            //   <div>
            //     <span>
            //       Rp.{formatCurrency(order.total_price)} (
            //       {order.order_details?.length} menu)
            //     </span>
            //   </div>
            // </div>
          ))}
        </div>
        <div className="my-3 mx-3 d-flex justify-content-end gap-1">
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

export default Dashboard;
