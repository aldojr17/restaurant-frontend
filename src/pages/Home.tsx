import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import Card from "../components/Card/Card";
import Navbar from "../components/Navbar/Navbar";
import { RootState } from "../redux";
import { fetchMenu } from "../redux/menu/action";
import { MenuDispatch } from "../redux/menu/types";

const Home = () => {
  const dispatch: MenuDispatch = useDispatch();
  const { menus } = useSelector((state: RootState) => state.menuReducer);

  useEffect(() => {
    dispatch(fetchMenu());
  }, []);

  return (
    <>
      <Navbar />
      <div className="container mx-auto row mt-5">
        <div className="d-flex mx-auto gap-5 flex-wrap justify-content-center justify-content-lg-start">
          {menus.map((menu) => (
            <Card key={menu.id} {...menu} />
          ))}
        </div>
      </div>
    </>
  );
};

export default Home;
