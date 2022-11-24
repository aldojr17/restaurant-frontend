import { FormEvent, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { menuDetailApi } from "../../api/menu";
import { HeartIcon } from "../../components/Icon";
import Navbar from "../../components/Navbar/Navbar";
import { RootState } from "../../redux";
import { addToCart } from "../../redux/cart/action";
import { CartDispatch, IOrderDetailPayload } from "../../redux/cart/types";
import { IMenuPayload } from "../../redux/menu/types";
import useIsLogged from "../../util/useIsLogged";
import { formatCurrency } from "../../util/util";
import NotFound from "../NotFound";
import InputNumber from "./style";

const MenuDetail = () => {
  const { id } = useParams();
  const [clicked, setClicked] = useState(false);
  const dispatch: CartDispatch = useDispatch();
  const navigate = useNavigate();
  const isLogged = useIsLogged();
  const { favorites } = useSelector(
    (state: RootState) => state.userReducer.user
  );
  const [input, setInput] = useState<IOrderDetailPayload>({
    menu_id: 0,
    options: 0,
    order_id: 0,
    qty: 1,
  });
  const [menu, setMenu] = useState<IMenuPayload>({
    category: {
      id: 0,
      name: "",
    },
    description: "",
    id: 0,
    is_available: false,
    name: "",
    menu_option: [],
    photo: "",
    price: 0,
    rating: 0,
    total_review: 0,
  });

  const handleChange = (e: FormEvent<HTMLInputElement | HTMLSelectElement>) => {
    setInput({
      ...input,
      [e.currentTarget.name]: parseInt(e.currentTarget.value),
    });
  };

  const getMenuDetail = async () => {
    const status = await menuDetailApi(parseInt(id!));
    if (status.isSuccess) {
      setMenu(status.data);
      setInput({ ...input, menu_id: status.data.id });
    }
  };

  const handleAddToCart = () => {
    if (!isLogged) {
      navigate("/login", { replace: true });
    } else {
      dispatch(addToCart(input));
    }
  };

  useEffect(() => {
    getMenuDetail();
  }, []);

  return (
    <>
      <Navbar isLogged={useIsLogged()} />
      {menu.id === 0 ? (
        <NotFound />
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
                  <span className="fs-4 d-block mt-3">{menu.description}</span>
                </div>
                <div className="d-flex flex-column gap-3">
                  <div className="d-flex flex-column">
                    <span className="form-label">Select Options</span>
                    <select
                      name="options"
                      id="options"
                      className="form-select"
                      onChange={handleChange}
                    >
                      <option value={input.options}>None</option>
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
                      <button
                        className="btn btn-outline-dark col-lg-1 col-2"
                        onClick={() =>
                          setInput({ ...input, qty: input.qty - 1 })
                        }
                      >
                        -
                      </button>
                      <div className="col-lg-2 col">
                        <InputNumber
                          type="number"
                          className="form-control text-center"
                          name="qty"
                          value={input.qty}
                          readOnly
                        />
                      </div>
                      <button
                        className="btn btn-outline-dark col-lg-1 col-2"
                        onClick={() =>
                          setInput({ ...input, qty: input.qty + 1 })
                        }
                      >
                        +
                      </button>
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
                  <button
                    className="btn btn-outline-dark"
                    onClick={() => setClicked(true)}
                  >
                    Favorite{" "}
                    {clicked ||
                    favorites.findIndex((fav) => fav.menu_id === menu.id) !==
                      -1 ? (
                      <HeartIcon fill size={16} />
                    ) : (
                      <HeartIcon size={16} fill={false} />
                    )}
                  </button>
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
