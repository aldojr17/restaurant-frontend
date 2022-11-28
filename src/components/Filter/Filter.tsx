import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import useDebounce from "../../hooks/useDebounce";
import { RootState } from "../../redux";
import { fetchCategory, fetchMenu } from "../../redux/menu/action";
import { IFilterPayload, MenuDispatch } from "../../redux/menu/types";
import { OrderDispatch } from "../../redux/order/types";
import { fetchOrders } from "../../redux/user/action";

interface IFilterProps {
  filter: IFilterPayload;
  setFilter: React.Dispatch<React.SetStateAction<IFilterPayload>>;
  type: string;
}

const Filter = ({ filter, setFilter, type }: IFilterProps) => {
  const [searchText, setSearchText] = useState("");
  const dispatch: MenuDispatch = useDispatch();
  const dispatchOrder: OrderDispatch = useDispatch();
  const debounce = useDebounce(searchText, 800);
  const { categories } = useSelector((state: RootState) => state.menuReducer);

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
    dispatch(fetchCategory());
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
      dispatchOrder(
        fetchOrders({
          ...filter,
          name: searchText,
        })
      );
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
            >
              <option value="price">Price</option>
              <option value="name">Name</option>
              <option value="rating">Rating</option>
              <option value="is_available">Available</option>
            </select>
            <select
              className="form-select col"
              name="sort"
              id="sort"
              onChange={handleChangeFilter}
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
    </>
  );
};

export default Filter;
