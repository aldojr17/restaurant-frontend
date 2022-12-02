import moment from "moment";
import { FormEvent, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchPayment, IPayment } from "../../api/api";
import Filter from "../../components/Filter/Filter";
import { StarIcon } from "../../components/Icon";
import UnfillStarIcon from "../../components/Icon/UnfillStarIcon";
import Navbar from "../../components/Navbar/Navbar";
import { RootState } from "../../redux";
import { IFilterPayload, IMenuPayload } from "../../redux/menu/types";
import { addReview, fetchOrders } from "../../redux/user/action";
import { IAddReviewPayload, UserDispatch } from "../../redux/user/types";
import { formatCurrency } from "../../util/util";
import Title, { LoadingWrapper } from "../Cart/style";
import { OrderStatusWrapper } from "./style";

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
  const [review, setReview] = useState<IAddReviewPayload>({
    description: "",
    menu_id: 0,
    rating: 0,
  });
  const [menu, setMenu] = useState<IMenuPayload>();
  const [fillUnfill, setFillUnfill] = useState(0);
  const dispatch: UserDispatch = useDispatch();
  const [payments, setPayments] = useState<IPayment[]>([]);

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

  const handleChange = (event: FormEvent<HTMLTextAreaElement>) => {
    setReview({
      ...review,
      description: event.currentTarget.value,
    });
  };

  const handleAddReview = () => {
    dispatch(addReview(review));
  };

  const getAllPayment = async () => {
    setPayments(await fetchPayment());
  };

  useEffect(() => {
    dispatch(fetchOrders(filter));
    getAllPayment();
  }, []);

  return (
    <>
      <Navbar active="orders" isLogged />
      <div className="container">
        <Title>ORDERS</Title>
        {orders.data.length !== 0 ? (
          <div className="my-4 row flex-column mx-auto gap-4 align-items-center align-items-lg-start">
            <Filter
              filter={filter}
              setFilter={setFilter}
              type={"orders"}
              pagination={{
                current_page: orders.current_page,
                limit: orders.limit,
                total: orders.total,
              }}
            />
          </div>
        ) : (
          ""
        )}
        <div className="row gap-3 align-items-center px-2 flex-column">
          {orders.data.length !== 0 ? (
            orders.data.map((order) => (
              <div
                key={order.id}
                className="col row border border-2 rounded rounded-4 p-3"
              >
                <div className=" col-lg-4 d-flex flex-column">
                  <span className="fw-bold fs-5">
                    {moment(order.order_date).format("DD MMM YYYY")}
                  </span>
                  <span className="fs-5">
                    Rp.{formatCurrency(order.total_price)}{" "}
                    <span className="text-muted">
                      ({order.order_details?.length} menu) -{" "}
                    </span>
                    {
                      payments.find(
                        (payment) => payment.id === order.payment_id
                      )?.description
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
                  <button className="btn btn-dark">Detail</button>
                </div>
              </div>
            ))
          ) : (
            <LoadingWrapper className="container d-flex justify-content-center align-items-center">
              <span className="fs-3">You don't have any order.</span>
            </LoadingWrapper>
          )}
        </div>
        {orders.data.length !== 0 ? (
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
        ) : (
          ""
        )}
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

export default Order;
