import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import MenuList from "../../components/MenuList/MenuList";
import Navbar from "../../components/Navbar/Navbar";
import { RootState } from "../../redux";
import { fetchCategory, fetchMenu } from "../../redux/menu/action";
import { IFilterPayload, MenuDispatch } from "../../redux/menu/types";
import DivCategory from "./style";

const Home = () => {
  const dispatch: MenuDispatch = useDispatch();
  const { menus, categories } = useSelector(
    (state: RootState) => state.menuReducer
  );
  const [filter, setFilter] = useState<IFilterPayload>({
    category: 1,
    limit: 8,
  });

  useEffect(() => {
    dispatch(fetchCategory());
  }, []);

  useEffect(() => {
    dispatch(fetchMenu(filter));
  }, [filter]);

  const handleClick = (id: number) => {
    setFilter({ category: id, limit: 8 });
  };

  return (
    <>
      <Navbar />
      <div className="container">
        <DivCategory className=" d-flex flex-column flex-wrap justify-content-center">
          {categories.map((category) => (
            <div className="px-3 col-lg-2 d-flex" key={category.id}>
              <button
                className={`btn btn-outline-dark w-100 ${
                  filter.category === category.id ? "active" : ""
                }`}
                onClick={() => handleClick(category.id)}
              >
                {category.name}
              </button>
            </div>
          ))}
        </DivCategory>
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
