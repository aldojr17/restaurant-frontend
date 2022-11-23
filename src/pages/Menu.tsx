import { useSelector } from "react-redux";
import Filter from "../components/Filter/Filter";
import MenuList from "../components/MenuList/MenuList";
import Navbar from "../components/Navbar/Navbar";
import { RootState } from "../redux";

const Menu = () => {
  const { menus } = useSelector((state: RootState) => state.menuReducer);

  return (
    <>
      <Navbar active="menu" />
      <Filter />
      <MenuList data={menus} />
    </>
  );
};

export default Menu;
