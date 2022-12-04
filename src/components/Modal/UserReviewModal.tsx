import { IReviewPayload } from "../../redux/menu/types";
import { StarIcon, TrashIcon } from "../Icon";
import UnfillStarIcon from "../Icon/UnfillStarIcon";
import { ModalWrapper } from "./style";

interface IModalProps {
  show: boolean;
  handleClose: () => void;
  reviews: IReviewPayload[];
  name: string;
}

const UserReviewModal = ({ show, handleClose, reviews, name }: IModalProps) => {
  return (
    <ModalWrapper
      className={`modal fade ${show ? "show" : ""}`}
      ModalStyle={{ display: show ? "block" : "" }}
      id="reviewModal"
      tabIndex={-1}
      aria-labelledby="reviewModalLabel"
      aria-hidden="true"
    >
      <div className="modal-dialog modal-dialog-centered modal-dialog-scrollable">
        <div className="modal-content">
          <div className="modal-header">
            <h1 className="modal-title fs-5" id="reviewModalLabel">
              Review for {name}
            </h1>
            <button
              type="button"
              className="btn-close"
              aria-label="Close"
              onClick={handleClose}
            ></button>
          </div>
          <div className="modal-body mb-3">
            <div className="row gap-3 flex-column px-2">
              {reviews.length === 0 ? (
                <span className="fs-4 px-1">No Review</span>
              ) : (
                reviews.map((val) => (
                  <div
                    key={val.id}
                    className="col d-flex justify-content-between align-items-center border border-2 rounded-3 border-dark p-3"
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
            <div className={`modal-footer px-0}`}>
              <div className="d-flex gap-3">
                <button
                  type="button"
                  className="btn btn-outline-dark"
                  onClick={handleClose}
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </ModalWrapper>
  );
};

export default UserReviewModal;
