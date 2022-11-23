import { IMenuPayload } from "../../redux/menu/types";
import "./card.scss";

const Card = ({ ...props }: IMenuPayload) => {
  return (
    <div className="col-lg-3 mb-4 d-flex justify-content-center">
      <div className="card rounded rounded-4">
        <div className="position-relative">
          <img src="/assets/login.svg" className="card-img-top" alt="menu" />
          <div className="rounded-circle border border-1 border-dark p-2 position-absolute top-0 m-1">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width={24}
              height={24}
              fill="currentColor"
              className="bi bi-heart"
              viewBox="0 0 16 16"
            >
              <path d="m8 2.748-.717-.737C5.6.281 2.514.878 1.4 3.053c-.523 1.023-.641 2.5.314 4.385.92 1.815 2.834 3.989 6.286 6.357 3.452-2.368 5.365-4.542 6.286-6.357.955-1.886.838-3.362.314-4.385C13.486.878 10.4.28 8.717 2.01L8 2.748zM8 15C-7.333 4.868 3.279-3.04 7.824 1.143c.06.055.119.112.176.171a3.12 3.12 0 0 1 .176-.17C12.72-3.042 23.333 4.867 8 15z" />
            </svg>
          </div>
        </div>
        <div className="card-body">
          <h5 className="card-title">{props.name}</h5>
          <div className="d-flex justify-content-between align-items-center">
            <span>Rp.{props.price}</span>
            <div className="d-flex align-items-center gap-2">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width={16}
                fill="orange"
                className="bi bi-star-fill"
                viewBox="0 0 16 16"
              >
                <path d="M3.612 15.443c-.386.198-.824-.149-.746-.592l.83-4.73L.173 6.765c-.329-.314-.158-.888.283-.95l4.898-.696L7.538.792c.197-.39.73-.39.927 0l2.184 4.327 4.898.696c.441.062.612.636.282.95l-3.522 3.356.83 4.73c.078.443-.36.79-.746.592L8 13.187l-4.389 2.256z" />
              </svg>
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
