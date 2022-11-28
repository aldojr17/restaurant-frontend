import { useState } from "react";
import { useSelector } from "react-redux";
import Filter from "../components/Filter/Filter";
import MenuList from "../components/MenuList/MenuList";
import Navbar from "../components/Navbar/Navbar";
import { RootState } from "../redux";
import { IFilterPayload } from "../redux/menu/types";
import useIsLogged from "../util/useIsLogged";

const Menu = () => {
  const { menus } = useSelector((state: RootState) => state.menuReducer);
  const [filter, setFilter] = useState<IFilterPayload>({
    category: 0,
    sortBy: "price",
    name: "",
    sort: "asc",
    limit: 12,
  });

  return (
    <>
      <Navbar active="menu" isLogged={useIsLogged()} />
      <div className="container px-lg-5 row flex-column mx-auto gap-4 align-items-center align-items-lg-start">
        <Filter filter={filter} setFilter={setFilter} type={"menu"} />
      </div>
      <MenuList data={menus.data} />
    </>
  );
};

export default Menu;
