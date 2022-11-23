import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Card from "../components/Card/Card";
import MenuList from "../components/MenuList/MenuList";
import Navbar from "../components/Navbar/Navbar";
import { RootState } from "../redux";
import { fetchCategory, fetchMenu } from "../redux/menu/action";
import { IFilterPayload, MenuDispatch } from "../redux/menu/types";

const Home = () => {
  const dispatch: MenuDispatch = useDispatch();
  const { menus, categories } = useSelector(
    (state: RootState) => state.menuReducer
  );
  const [filter, setFilter] = useState<IFilterPayload>({
    category: 1,
  });

  useEffect(() => {
    dispatch(fetchCategory());
  }, []);

  useEffect(() => {
    dispatch(fetchMenu(filter));
  }, [filter]);

  const handleClick = (id: number) => {
    setFilter({ category: id });
  };

  return (
    <>
      <Navbar />
      <div className="row gap-3 justify-content-center">
        {categories.map((category) => (
          <button
            key={category.id}
            className={`col-lg-1 btn btn-outline-dark ${
              filter.category === category.id ? "active" : ""
            }`}
            onClick={() => handleClick(category.id)}
          >
            {category.name}
          </button>
        ))}
      </div>
      <MenuList data={menus} />
      {menus.length !== 0 ? (
        <div className="container mx-auto d-flex justify-content-center mt-3">
          <button className="btn btn-dark">See All</button>
        </div>
      ) : (
        ""
      )}
    </>
  );
};

export default Home;
