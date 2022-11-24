import { useSelector } from "react-redux";
import Filter from "../components/Filter/Filter";
import MenuList from "../components/MenuList/MenuList";
import Navbar from "../components/Navbar/Navbar";
import { RootState } from "../redux";
import useIsLogged from "../util/useIsLogged";

const Menu = () => {
  const { menus } = useSelector((state: RootState) => state.menuReducer);

  return (
    <>
      <Navbar active="menu" isLogged={useIsLogged()} />
      <Filter />
      <MenuList data={menus} />
    </>
  );
};

export default Menu;
