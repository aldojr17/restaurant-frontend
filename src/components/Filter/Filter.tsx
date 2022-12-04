import React, { FormEvent, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import useDebounce from "../../hooks/useDebounce";
import { RootState } from "../../redux";
import { fetchCategory, fetchMenu } from "../../redux/menu/action";
import { IFilterPayload, MenuDispatch } from "../../redux/menu/types";
import { fetchAllOrder } from "../../redux/order/action";
import { OrderDispatch } from "../../redux/order/types";
import { fetchOrders } from "../../redux/user/action";

interface IFilterProps {
  filter: IFilterPayload;
  setFilter: React.Dispatch<React.SetStateAction<IFilterPayload>>;
  type: string;
  pagination: {
    current_page: number;
    limit: number;
    total: number;
  };
  isAdmin?: boolean;
}

const Filter = ({
  filter,
  setFilter,
  type,
  pagination,
  isAdmin,
}: IFilterProps) => {
  const [searchText, setSearchText] = useState("");
  const dispatch: MenuDispatch = useDispatch();
  const dispatchOrder: OrderDispatch = useDispatch();
  const debounce = useDebounce(searchText, 800);
  const { categories } = useSelector((state: RootState) => state.menuReducer);

  const handleChange = (event: FormEvent<HTMLSelectElement>) => {
    setFilter({
      ...filter,
      limit: parseInt(event.currentTarget.value),
    });
  };

  const handleChangeFilter = (event: React.FormEvent<HTMLSelectElement>) => {
    setFilter({
      ...filter,
      [event.currentTarget.name]: event.currentTarget.value,
    });
  };

  const handleSearch = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchText(event.target.value);
  };

  useEffect(() => {
    if (type == "menu") {
      dispatch(fetchCategory());
    }
  }, []);

  useEffect(() => {
    if (type == "menu") {
      dispatch(
        fetchMenu({
          ...filter,
          name: searchText,
        })
      );
    } else if (type == "orders") {
      if (isAdmin) {
        dispatchOrder(
          fetchAllOrder({
            ...filter,
            name: searchText,
          })
        );
      } else {
        dispatchOrder(
          fetchOrders({
            ...filter,
            name: searchText,
          })
        );
      }
    }
  }, [debounce, filter]);

  return (
    <>
      <div className="col d-flex form-control align-items-center gap-2">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="16"
          height="16"
          fill="currentColor"
          className="bi bi-search"
          viewBox="0 0 16 16"
        >
          <path d="M11.742 10.344a6.5 6.5 0 1 0-1.397 1.398h-.001c.03.04.062.078.098.115l3.85 3.85a1 1 0 0 0 1.415-1.414l-3.85-3.85a1.007 1.007 0 0 0-.115-.1zM12 6.5a5.5 5.5 0 1 1-11 0 5.5 5.5 0 0 1 11 0z" />
        </svg>
        <input
          type="search"
          name="search"
          id="search"
          className="border-0 form-control"
          placeholder="Search by menu name"
          value={searchText}
          onChange={handleSearch}
        />
      </div>
      <div className="col row justify-content-between align-items-center gap-3 gap-lg-0 p-0">
        <div className="col-lg-4">
          <div className="row align-items-center gap-2">
            <span className="col-lg-3">Sort By</span>
            <select
              className="form-select col"
              name="sortBy"
              id="sortBy"
              onChange={handleChangeFilter}
              value={filter.sortBy}
            >
              {type === "menu" ? (
                <>
                  <option value="price">Price</option>
                  <option value="name">Name</option>
                  <option value="rating">Rating</option>
                </>
              ) : (
                <>
                  <option value="order_date">Date</option>
                  <option value="total_price">Price</option>
                </>
              )}
            </select>
            <select
              className="form-select col"
              name="sort"
              id="sort"
              onChange={handleChangeFilter}
              value={filter.sort}
            >
              <option value="asc">Ascending</option>
              <option value="desc">Descending</option>
            </select>
          </div>
        </div>
        <div className="col-lg-3 p-lg-0">
          <div className="row align-items-center">
            <span className="col-lg-4">Filter By</span>
            <select
              className="form-select col"
              name="category"
              id="category"
              onChange={handleChangeFilter}
            >
              <option key={0} value={0}>
                All
              </option>
              {categories.map((category) => (
                <option key={category.id} value={category.id}>
                  {category.name}
                </option>
              ))}
            </select>
          </div>
        </div>
      </div>
      {isAdmin ? (
        <div className="col-lg-4 p-lg-0">
          <div className="row align-items-center">
            <span className="col-lg-5">Show Transaction</span>
            <div className="col-lg-5">
              <select
                className="form-select"
                name="date"
                id="date"
                onChange={handleChangeFilter}
              >
                <option value={""}>All</option>
                <option value={"this_week"}>This Week</option>
                <option value={"this_month"}>This Month</option>
                <option value={"last_month"}>Last Month</option>
              </select>
            </div>
          </div>
        </div>
      ) : (
        <div className="d-flex align-items-center p-0">
          <div className="col">
            <span>
              Showing{" "}
              {pagination.limit * pagination.current_page -
                pagination.limit +
                1}{" "}
              to{" "}
              {pagination.limit * pagination.current_page + 1 <=
              pagination.total
                ? pagination.limit * pagination.current_page
                : pagination.total}{" "}
              of {pagination.total}
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
                {type === "menu" ? (
                  <>
                    {" "}
                    <option value={4}>4</option>
                    <option value={8}>8</option>
                    <option value={12}>12</option>
                    <option value={20}>20</option>
                  </>
                ) : (
                  <>
                    <option value={5}>5</option>
                    <option value={10}>10</option>
                    <option value={20}>20</option>
                    <option value={50}>50</option>
                  </>
                )}
              </select>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Filter;
