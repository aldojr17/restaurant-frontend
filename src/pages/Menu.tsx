import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import Filter from "../components/Filter/Filter";
import MenuList from "../components/MenuList/MenuList";
import Navbar from "../components/Navbar/Navbar";
import { RootState } from "../redux";
import { IFilterPayload } from "../redux/menu/types";
import useIsLogged from "../util/useIsLogged";
import Title from "./Cart/style";

const Menu = () => {
  const { menus } = useSelector((state: RootState) => state.menuReducer);
  const [filter, setFilter] = useState<IFilterPayload>({
    category: 0,
    sortBy: "price",
    name: "",
    sort: "asc",
    limit: 8,
  });
  const [pagination, setPagination] = useState<string[]>([]);

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
      element = Array.from(Array(menus.total_page).keys(), (index) =>
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
    handlePagination(menus.total_page, menus.current_page);
  }, [menus]);

  return (
    <>
      <Navbar active="menu" isLogged={useIsLogged()} />
      <div className="container px-lg-5 my-3">
        <Title>MENU</Title>
      </div>
      <div className="container px-lg-5 row flex-column mx-auto gap-4 align-items-center align-items-lg-start">
        <Filter
          filter={filter}
          setFilter={setFilter}
          type={"menu"}
          pagination={{
            current_page: menus.current_page,
            limit: menus.limit,
            total: menus.total,
          }}
        />
      </div>
      <MenuList data={menus.data} />
      <div className="container px-lg-5">
        <div className="my-3 d-flex justify-content-end gap-1">
          <button
            className="btn"
            onClick={() => handleClick(menus.current_page - 1)}
          >
            Previous
          </button>
          {pagination.map((item, index) => (
            <button
              key={index}
              className={`btn btn-outline-dark ${
                menus.current_page === Number(item) ? "active" : ""
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
            onClick={() => handleClick(menus.current_page + 1)}
          >
            Next
          </button>
        </div>
      </div>
    </>
  );
};

export default Menu;
