import { FormEvent, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { HeartIcon, StarIcon } from "../../components/Icon";
import UnfillStarIcon from "../../components/Icon/UnfillStarIcon";
import Navbar from "../../components/Navbar/Navbar";
import Quantity from "../../components/Quantity/Quantity";
import Toast from "../../components/Toast/Toast";
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

  const [showToast, setShowToast] = useState(false);
  const [input, setInput] = useState<IOrderDetailPayload>({
    menu_id: 0,
    option_id: 0,
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
      setShowToast(true);
      setTimeout(() => {
        setShowToast(false);
      }, 2000);
      dispatch(addToCart(input));
      setInput({
        ...input,
        option_id: 0,
        qty: 1,
      });
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
          <div className="position-relative">
            <div className="toast-container position-absolute end-0">
              {showToast ? (
                <Toast type="Cart" message="Item added to cart!" />
              ) : (
                ""
              )}
            </div>
          </div>
          <div className="container py-5">
            <div className="row gap-4 gap-lg-0">
              <img
                src={
                  menu.photo !== ""
                    ? menu.photo
                    : "/assets/no-image-available.png"
                }
                alt="menu"
                className="col-lg-7"
              />
              <div className="col d-flex flex-column gap-5">
                <div>
                  <h1>{menu.name}</h1>
                  <span className="fs-4 d-block">{menu.category.name}</span>
                  <span className="fs-2 d-block">
                    Rp.{formatCurrency(menu.price)}{" "}
                    {input.option_id !== 0
                      ? " + " +
                        formatCurrency(
                          menu.menu_option.find(
                            (opt) => opt.id === input.option_id
                          )?.price!
                        )
                      : ""}
                  </span>
                  <div className="d-flex flex-column mt-3">
                    <span className="fs-4">Description:</span>
                    <span className="fs-6">
                      {menu.description !== "" && menu.description !== null
                        ? menu.description
                        : "-"}
                    </span>
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
                      value={input.option_id!}
                    >
                      <option value={0}>None</option>
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
          <div className="container">
            <h2>Reviews</h2>
            <div className="row flex-column gap-3 px-2">
              {menu.reviews.length === 0 ? (
                <span className="fs-4 px-1">No Review</span>
              ) : (
                menu.reviews.map((val) => (
                  <div
                    key={val.id}
                    className="col-lg-6 d-flex justify-content-between align-items-center border border-2 rounded-3 border-dark p-3"
                  >
                    <div className="d-flex flex-column">
                      <span className="fs-4 fw-bold">{val.user.full_name}</span>
                      {val.description !== null ? (
                        <span>{val.description}</span>
                      ) : (
                        ""
                      )}
                    </div>
                    <div>
                      {Array.from(Array(val.rating).keys(), (index) => (
                        <StarIcon key={index} size={24} />
                      ))}
                      {Array.from(Array(5 - val.rating).keys(), (index) => (
                        <UnfillStarIcon key={index} />
                      ))}
                    </div>
                  </div>
                ))
              )}
            </div>
          </div>
        </>
      )}
    </>
  );
};

export default MenuDetail;
