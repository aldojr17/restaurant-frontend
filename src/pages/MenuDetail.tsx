import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { menuDetailApi } from "../api/menu";
import { HeartIcon } from "../components/Icon";
import Navbar from "../components/Navbar/Navbar";
import { IMenuPayload } from "../redux/menu/types";
import useIsLogged from "../util/useIsLogged";
import { formatCurrency } from "../util/util";
import NotFound from "./NotFound";

const MenuDetail = () => {
  const { id } = useParams();
  const [option, setOption] = useState<number>(0);
  const [clicked, setClicked] = useState(false);
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

  const getMenuDetail = async () => {
    const status = await menuDetailApi(parseInt(id!));
    if (status.isSuccess) {
      setMenu(status.data);
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
                    Rp.{formatCurrency(menu.price)}{" "}
                    {option !== 0 ? `+ ${formatCurrency(option)}` : ""}
                  </span>
                  <span className="fs-4 d-block mt-3">{menu.description}</span>
                </div>
                <div className="d-flex flex-column">
                  <span className="form-label">Select Options</span>
                  <select
                    name="options"
                    id="options"
                    className="form-select"
                    onChange={(e) => setOption(parseInt(e.currentTarget.value))}
                  >
                    <option value={0}>None</option>
                    {menu.menu_option.map((option) => (
                      <option key={option.id} value={option.price}>
                        {option.name}
                      </option>
                    ))}
                  </select>
                </div>
                <div className="d-flex flex-column gap-3">
                  <button className="btn btn-dark">Add To Cart</button>
                  <button
                    className="btn btn-outline-dark"
                    onClick={() => setClicked(true)}
                  >
                    Favorite{" "}
                    {clicked ? (
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
