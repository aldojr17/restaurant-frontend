import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import Card from "../components/Card/Card";
import Navbar from "../components/Navbar/Navbar";
import { RootState } from "../redux";
import { getProfile } from "../redux/user/action";
import { UserDispatch } from "../redux/user/types";

const Favorites = () => {
  const { user } = useSelector((state: RootState) => state.userReducer);
  const dispatch: UserDispatch = useDispatch();

  useEffect(() => {
    dispatch(getProfile());
  }, []);

  return (
    <>
      <Navbar isLogged />
      <div className="container">
        <h1 className="my-4">Favorites</h1>
        <div className="d-flex flex-wrap">
          {user.favorites.map((fav) => (
            <Card key={fav.menu_id} {...fav.menu!} />
          ))}
        </div>
      </div>
    </>
  );
};

export default Favorites;
