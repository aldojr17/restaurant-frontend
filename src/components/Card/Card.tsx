import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { IMenuPayload } from "../../redux/menu/types";
import useIsLogged from "../../util/useIsLogged";
import { formatCurrency } from "../../util/util";
import { HeartIcon, StarIcon } from "../Icon";
import "./card.scss";
import CardImg, { DivFavorite } from "./style";

const Card = ({ ...props }: IMenuPayload) => {
  const [clicked, setClicked] = useState(false);
  const navigate = useNavigate();

  return (
    <div className="col-lg-3 mb-4 d-flex justify-content-center">
      <div className="position-relative">
        {useIsLogged() ? (
          <DivFavorite
            role={"button"}
            className="rounded-circle border border-1 border-dark p-2 position-absolute top-0 end-0 m-1 bg-light"
            onClick={() => setClicked(true)}
          >
            {clicked ? <HeartIcon fill /> : <HeartIcon fill={false} />}
          </DivFavorite>
        ) : (
          ""
        )}
        <div
          className="card rounded rounded-4 shadow"
          role={"button"}
          onClick={() => navigate(`/menu/${props.id}`, { replace: true })}
        >
          <CardImg
            src={`https://plus.unsplash.com/premium_photo-1667682209935-b6c87cced668?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80`}
            className="card-img-top"
            alt="menu"
          />
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
