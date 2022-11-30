import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import MenuList from "../../components/MenuList/MenuList";
import Navbar from "../../components/Navbar/Navbar";
import useIsLogged from "../../util/useIsLogged";
import { RootState } from "../../redux";
import {
  fetchCategory,
  fetchMenu,
  fetchNewMenu,
} from "../../redux/menu/action";
import { IFilterPayload, MenuDispatch } from "../../redux/menu/types";
import DivCategory, {
  AddToCartButton,
  ButtonWrapper,
  HomeImg,
  HomeWrapper,
  MenuTitle,
} from "./style";
import { formatCurrency } from "../../util/util";
import LeftIcon from "../../components/Icon/LeftIcon";
import RightIcon from "../../components/Icon/RightIcon";
import { CartDispatch } from "../../redux/cart/types";
import { addToCart } from "../../redux/cart/action";
import { useNavigate } from "react-router-dom";

const Home = () => {
  const dispatch: MenuDispatch = useDispatch();
  const dispatchCart: CartDispatch = useDispatch();
  const { menus, categories, newMenus } = useSelector(
    (state: RootState) => state.menuReducer
  );
  const [filter, setFilter] = useState<IFilterPayload>({
    category: 1,
    limit: 4,
  });
  const [index, setIndex] = useState(0);
  const navigate = useNavigate();

  useEffect(() => {
    dispatch(fetchCategory());
    dispatch(fetchNewMenu());
  }, []);

  useEffect(() => {
    dispatch(fetchMenu(filter));
  }, [filter]);

  const handleClick = (id: number) => {
    setFilter({ ...filter, category: id });
  };

  const handleAddToCart = () => {
    dispatchCart(
      addToCart({
        menu_id: newMenus.at(index)?.id!,
        option_id: null,
        order_id: 0,
        qty: 1,
        menu_detail: newMenus.at(index),
      })
    );
  };

  return (
    <div className="pb-5">
      <Navbar isLogged={useIsLogged()} />
      <HomeWrapper className="container px-5 mx-auto">
        <div className="row align-items-center">
          <div className="col-lg-6 pt-5">
            <h3>NEW IN MENU</h3>
            {newMenus
              .at(index)
              ?.name.toUpperCase()
              .split(" ")
              .map((word) => (
                <MenuTitle key={word}>{word}</MenuTitle>
              ))}
          </div>
          <div className="col-lg-6 pt-5">
            <HomeImg
              src={newMenus.at(index)?.photo}
              className="w-100"
              alt="menu"
            />
          </div>
        </div>
        <ButtonWrapper className="bg-dark text-white d-flex position-relative align-items-center col-lg-4">
          <div className="px-3">
            <span className="fs-3">Only</span>
            <h2>Rp.{formatCurrency(newMenus.at(index)?.price!)}</h2>
          </div>
          <AddToCartButton
            className="btn border-2 border border-dark rounded-circle fs-1 p-0 d-flex justify-content-center align-items-center position-absolute btn-light pb-1"
            onClick={handleAddToCart}
          >
            +
          </AddToCartButton>
        </ButtonWrapper>
        <div className="d-flex align-items-center mt-4 gap-3">
          <button
            className="btn p-0"
            onClick={() => {
              index - 1 < 0 ? setIndex(2) : setIndex((index) => index - 1);
            }}
          >
            <LeftIcon />
          </button>
          <span className="pt-1">0{index + 1} / 03</span>
          <button
            className="btn p-0"
            onClick={() => {
              index + 1 > 2 ? setIndex(0) : setIndex((index) => index + 1);
            }}
          >
            <RightIcon />
          </button>
        </div>
      </HomeWrapper>
      <div className="container">
        <DivCategory className="d-flex flex-column flex-wrap justify-content-center">
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
      <MenuList data={menus.data} />
      <div className="container mx-auto d-flex justify-content-center mt-3">
        <button
          className="btn btn-dark"
          onClick={() => {
            navigate("/menu", { replace: true });
          }}
        >
          See All Menu
        </button>
      </div>
    </div>
  );
};

export default Home;
