import { useState } from "react";
import { IMenuPayload } from "../../redux/menu/types";
import { HeartIcon, StarIcon } from "../Icon";
import "./card.scss";

const Card = ({ ...props }: IMenuPayload) => {
  const [clicked, setClicked] = useState(false);

  return (
    <div className="col-lg-3 mb-4 d-flex justify-content-center">
      <div className="card rounded rounded-4 shadow">
        <div className="position-relative">
          <img src="/assets/register.svg" className="card-img-top" alt="menu" />
          <div
            role={"button"}
            className="rounded-circle border border-1 border-dark p-2 position-absolute top-0 m-1 bg-light"
            onClick={() => setClicked(true)}
          >
            {clicked ? <HeartIcon fill /> : <HeartIcon fill={false} />}
          </div>
        </div>
        <div className="card-body">
          <h5 className="card-title">{props.name}</h5>
          <div className="d-flex justify-content-between align-items-center">
            <span>Rp.{props.price}</span>
            <div className="d-flex align-items-center gap-2">
              <StarIcon />
              <span>
                {props.rating} ({props.total_review})
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Card;
