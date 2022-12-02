import React, { ChangeEvent, FormEvent, useState } from "react";
import { IMenuPayload } from "../../redux/menu/types";
import { IAddReviewPayload } from "../../redux/user/types";
import { StarIcon } from "../Icon";
import UnfillStarIcon from "../Icon/UnfillStarIcon";
import { ModalWrapper } from "./style";

interface IModalProps {
  show: boolean;
  handleClose: () => void;
  setFillUnfill: React.Dispatch<React.SetStateAction<number>>;
  fillUnfill: number;
  setReview: React.Dispatch<React.SetStateAction<IAddReviewPayload>>;
  review: IAddReviewPayload;
  handleChange: (event: FormEvent<HTMLTextAreaElement>) => void;
  handleAddReview: () => void;
  menu: IMenuPayload;
}

const ReviewModal = ({
  show,
  handleClose,
  setFillUnfill,
  fillUnfill,
  setReview,
  review,
  handleChange,
  handleAddReview,
  menu,
}: IModalProps) => {
  return (
    <ModalWrapper
      className={`modal fade ${show ? "show" : ""}`}
      ModalStyle={{ display: show ? "block" : "" }}
      id="menuModal"
      tabIndex={-1}
      aria-labelledby="menuModalLabel"
      aria-hidden="true"
    >
      <div className="modal-dialog modal-dialog-centered">
        <div className="modal-content">
          <div className="modal-header">
            <h1 className="modal-title fs-5" id="menuModalLabel">
              Add Review
            </h1>
            <button
              type="button"
              className="btn-close"
              aria-label="Close"
              onClick={handleClose}
            ></button>
          </div>
          <div className="modal-body">
            <div className="d-flex flex-column gap-3">
              <div className="d-flex flex-column gap-1">
                <label htmlFor="menuName" className="form-label">
                  Name
                </label>
                <input
                  type="text"
                  defaultValue={menu?.name}
                  id="menuName"
                  readOnly
                  disabled
                  className="form-control"
                />
              </div>
              <div className="d-flex flex-column gap-1">
                <label htmlFor="description" className="form-label">
                  Description
                </label>
                <textarea
                  id="description"
                  name="description"
                  className="form-control"
                  onChange={handleChange}
                />
              </div>
              <div className="d-flex align-items-center gap-2">
                <span>Rating : </span>
                <div className="d-flex align-items-center">
                  {Array.from(Array(5).keys(), (value) => {
                    return value < fillUnfill ? (
                      <button
                        key={value}
                        type="button"
                        className="btn"
                        onClick={() => {
                          setFillUnfill(value + 1);
                          setReview({
                            ...review,
                            rating: value + 1,
                          });
                        }}
                      >
                        <StarIcon size={24} key={value} />
                      </button>
                    ) : (
                      <button
                        key={value}
                        type="button"
                        className="btn"
                        onClick={() => {
                          setFillUnfill(value + 1);
                          setReview({
                            ...review,
                            rating: value + 1,
                          });
                        }}
                      >
                        <UnfillStarIcon key={value} />
                      </button>
                    );
                  })}
                </div>
              </div>
            </div>
            <div className="modal-footer">
              <button
                type="button"
                className="btn btn-outline-dark"
                onClick={handleClose}
              >
                Close
              </button>
              <button
                type="button"
                className="btn btn-dark"
                onClick={handleAddReview}
              >
                Add Review
              </button>
            </div>
          </div>
        </div>
      </div>
    </ModalWrapper>
  );
};

export default ReviewModal;
