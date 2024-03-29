import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { RootState } from "../../redux";
import { IMenuPayload } from "../../redux/menu/types";
import { addToFavorites, deleteFromFavorites } from "../../redux/user/action";
import { UserDispatch } from "../../redux/user/types";
import useIsLogged from "../../util/useIsLogged";
import { formatCurrency } from "../../util/util";
import { HeartIcon, StarIcon } from "../Icon";
import "./card.scss";
import CardImg, { DivFavorite } from "./style";

const Card = ({ ...props }: IMenuPayload) => {
  const { user } = useSelector((state: RootState) => state.userReducer);
  const dispatch: UserDispatch = useDispatch();
  const navigate = useNavigate();

  const handleAddToFavorites = () => {
    user.favorites.findIndex((fav) => fav.menu_id === props.id) !== -1
      ? dispatch(
          deleteFromFavorites({
            menu_id: props.id,
            user_id: user.id,
            menu: props,
          })
        )
      : dispatch(
          addToFavorites({
            menu_id: props.id,
            user_id: user.id,
            menu: props,
          })
        );
  };

  return (
    <div className="col-lg-3 mb-4 d-flex justify-content-center">
      <div className="position-relative">
        {useIsLogged() ? (
          <DivFavorite
            role={"button"}
            className="rounded-circle border border-1 border-dark p-2 position-absolute top-0 end-0 m-1 bg-light"
            onClick={() => handleAddToFavorites()}
          >
            {user.favorites.findIndex((fav) => fav.menu_id === props.id) !==
            -1 ? (
              <HeartIcon fill />
            ) : (
              <HeartIcon fill={false} />
            )}
          </DivFavorite>
        ) : (
          ""
        )}
        <div
          className="card rounded rounded-4 shadow"
          role={"button"}
          onClick={() => navigate(`/menu/${props.id}`, { replace: true })}
        >
          <div className="img-wrapper">
            <CardImg
              src={
                props.photo !== ""
                  ? props.photo
                  : "/assets/no-image-available.png"
              }
              className="card-img-top"
              alt="menu"
            />
          </div>
          <div className="card-body">
            <h5 className="card-title">{props.name}</h5>
            <div className="d-flex justify-content-between align-items-center">
              <span>Rp.{formatCurrency(props.price)}</span>
              <div className="d-flex align-items-center gap-2">
                <StarIcon />
                <span>
                  {props.rating !== 0
                    ? (props.rating / props.total_review).toFixed(2)
                    : 0}{" "}
                  ({props.total_review})
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Card;
