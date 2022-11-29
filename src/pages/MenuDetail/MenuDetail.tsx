import { FormEvent, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { HeartIcon } from "../../components/Icon";
import Navbar from "../../components/Navbar/Navbar";
import Quantity from "../../components/Quantity/Quantity";
import { RootState } from "../../redux";
import { addToCart } from "../../redux/cart/action";
import { CartDispatch } from "../../redux/cart/types";
import { getMenuDetail } from "../../redux/menu/action";
import { MenuDispatch } from "../../redux/menu/types";
import { IOrderDetailPayload } from "../../redux/order/types";
import { addToFavorites, deleteFromFavorites } from "../../redux/user/action";
import { UserDispatch } from "../../redux/user/types";
import useIsLogged from "../../util/useIsLogged";
import { formatCurrency } from "../../util/util";
import { LoadingWrapper } from "./style";

const MenuDetail = () => {
  const { id } = useParams();

  const { user } = useSelector((state: RootState) => state.userReducer);
  const { menu, status } = useSelector((state: RootState) => state.menuReducer);

  const dispatch: CartDispatch = useDispatch();
  const dispatchUser: UserDispatch = useDispatch();
  const dispatchMenu: MenuDispatch = useDispatch();

  const isLogged = useIsLogged();
  const navigate = useNavigate();

  const [input, setInput] = useState<IOrderDetailPayload>({
    menu_id: 0,
    option_id: null,
    order_id: 0,
    qty: 1,
    menu_detail: menu,
  });

  const handleAddToFavorites = () => {
    user.favorites.findIndex((fav) => fav.menu_id === parseInt(id!)) !== -1
      ? dispatchUser(
          deleteFromFavorites({
            menu_id: parseInt(id!),
            user_id: user.id,
            menu: menu,
          })
        )
      : dispatchUser(
          addToFavorites({
            menu_id: parseInt(id!),
            user_id: user.id,
            menu: menu,
          })
        );
  };

  const handleChange = (e: FormEvent<HTMLInputElement | HTMLSelectElement>) => {
    setInput({
      ...input,
      [e.currentTarget.name]: parseInt(e.currentTarget.value),
    });
  };

  const handleAddToCart = () => {
    if (!isLogged) {
      navigate("/login", { replace: true });
    } else {
      dispatch(addToCart(input));
    }
  };

  useEffect(() => {
    dispatchMenu(getMenuDetail(parseInt(id!)));
  }, []);

  useEffect(() => {
    if (status.error === null) {
      setInput({
        ...input,
        menu_id: menu.id,
        menu_detail: menu,
      });
    }
  }, [menu]);

  return (
    <>
      <Navbar isLogged={isLogged} />
      {status.isLoading ? (
        <LoadingWrapper className="d-flex justify-content-center align-items-center">
          <div className="spinner-border" role="status">
            <span className="visually-hidden">Loading...</span>
          </div>
        </LoadingWrapper>
      ) : status.error !== null ? (
        <LoadingWrapper className="d-flex justify-content-center align-items-center">
          <span>{status.error}</span>
        </LoadingWrapper>
      ) : (
        <>
          <div className="container py-5">
            <div className="row gap-4 gap-lg-0">
              <img
                src={`https://plus.unsplash.com/premium_photo-1667682209935-b6c87cced668?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80`}
                alt="menu"
                className="col-lg-7"
              />
              <div className="col d-flex flex-column gap-5">
                <div>
                  <h1>{menu.name}</h1>
                  <span className="fs-4 d-block">{menu.category.name}</span>
                  <span className="fs-2 d-block">
                    Rp.{formatCurrency(menu.price)}
                  </span>
                  <div className="d-flex flex-column mt-3">
                    <span className="fs-4">Description:</span>
                    <span className="fs-6">{menu.description}</span>
                  </div>
                </div>
                <div className="d-flex flex-column gap-3">
                  <div className="d-flex flex-column">
                    <span className="form-label">Select Options</span>
                    <select
                      name="option_id"
                      id="option_id"
                      className="form-select"
                      onChange={handleChange}
                    >
                      <option value={input.option_id!}>None</option>
                      {menu.menu_option.map((option) => (
                        <option key={option.id} value={option.id}>
                          {option.name}
                        </option>
                      ))}
                    </select>
                  </div>
                  <div className="d-flex flex-column">
                    <span className="form-label">Quantity</span>
                    <div className="row gap-3 mx-1">
                      <Quantity input={input} setInput={setInput} />
                    </div>
                  </div>
                </div>
                <div className="d-flex flex-column gap-3">
                  <button
                    className="btn btn-dark"
                    onClick={() => handleAddToCart()}
                  >
                    Add To Cart
                  </button>
                  {isLogged ? (
                    <button
                      className="btn btn-outline-dark"
                      onClick={() => handleAddToFavorites()}
                    >
                      Favorite{" "}
                      {user.favorites.findIndex(
                        (fav) => fav.menu_id === menu.id
                      ) !== -1 ? (
                        <HeartIcon fill size={16} />
                      ) : (
                        <HeartIcon size={16} fill={false} />
                      )}
                    </button>
                  ) : (
                    ""
                  )}
                </div>
              </div>
            </div>
          </div>
        </>
      )}
    </>
  );
};

export default MenuDetail;
