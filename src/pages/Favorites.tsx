import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import Card from "../components/Card/Card";
import Navbar from "../components/Navbar/Navbar";
import { RootState } from "../redux";
import { getProfile } from "../redux/user/action";
import { UserDispatch } from "../redux/user/types";
import Title from "./Cart/style";
import { LoadingWrapper } from "./MenuDetail/style";

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
        <Title className="my-4">FAVORITES</Title>
        <div className="d-flex flex-wrap">
          {user.favorites.length !== 0 ? (
            user.favorites.map((fav) => (
              <Card key={fav.menu_id} {...fav.menu!} />
            ))
          ) : (
            <LoadingWrapper className="container d-flex justify-content-center align-items-center">
              <span className="fs-3">You don't have any favorite menu.</span>
            </LoadingWrapper>
          )}
        </div>
      </div>
    </>
  );
};

export default Favorites;
