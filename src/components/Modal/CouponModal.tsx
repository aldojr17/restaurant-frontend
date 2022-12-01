import moment from "moment";
import React, { ChangeEvent, FormEvent, useState } from "react";
import { ICoupon } from "../../redux/user/types";
import { ModalWrapper } from "./style";

interface IModalProps {
  show: boolean;
  handleClose: () => void;
  isUpdate: boolean;
  input: ICoupon;
  handleChange: (event: FormEvent<HTMLInputElement>) => void;
  handleAddCoupon: () => void;
  handleUpdateCoupon: () => void;
}

const CouponModal = ({
  show,
  handleClose,
  isUpdate,
  handleChange,
  input,
  handleAddCoupon,
  handleUpdateCoupon,
}: IModalProps) => {
  return (
    <ModalWrapper
      className={`modal fade ${show ? "show" : ""}`}
      ModalStyle={{ display: show ? "block" : "" }}
      id="couponModal"
      tabIndex={-1}
      aria-labelledby="couponModalLabel"
      aria-hidden="true"
    >
      <div className="modal-dialog modal-dialog-centered">
        <div className="modal-content">
          <div className="modal-header">
            <h1 className="modal-title fs-5" id="couponModalLabel">
              {isUpdate ? "Update Coupon" : "Add Coupon"}
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
                <label htmlFor="code" className="form-label">
                  Code
                </label>
                <input
                  type="text"
                  id="code"
                  name="code"
                  className="form-control"
                  disabled={isUpdate}
                  onChange={handleChange}
                  value={input.code}
                />
              </div>
              <div className="d-flex flex-column gap-1">
                <label htmlFor="discount" className="form-label">
                  Discount
                </label>
                <input
                  type="number"
                  id="discount"
                  className="form-control"
                  name="discount"
                  onChange={handleChange}
                  value={input.discount}
                />
              </div>
              <div className="d-flex flex-column gap-1">
                <label htmlFor="valid_until" className="form-label">
                  Valid Until
                </label>
                <input
                  type="date"
                  id="valid_until"
                  className="form-control"
                  name="valid_until"
                  onChange={handleChange}
                  value={
                    input.valid_until
                      ? moment(input.valid_until).format("yyyy-MM-DD")
                      : ""
                  }
                />
              </div>
            </div>
            <div className={`modal-footer px-0`}>
              <div className="d-flex gap-3">
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
                  onClick={isUpdate ? handleUpdateCoupon : handleAddCoupon}
                >
                  {isUpdate ? "Update Coupon" : "Add Coupon"}
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </ModalWrapper>
  );
};

export default CouponModal;
