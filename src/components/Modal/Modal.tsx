import React, { ChangeEvent, FormEvent, useState } from "react";
import {
  ICategoryPayload,
  ICreateUpdateMenuPayload,
  IMenuPayload,
} from "../../redux/menu/types";
import { ModalWrapper } from "./style";

interface IModalProps {
  show: boolean;
  handleClose: () => void;
  previewImage: string | undefined;
  handleChange: (
    event: FormEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
  ) => void;
  handleOnSelect: (e: ChangeEvent<HTMLInputElement>) => void;
  categories: ICategoryPayload[];
  handleAddMenu: () => void;
  handleUpdateMenu: () => void;
  isUpdate: boolean;
  input: ICreateUpdateMenuPayload;
}

const Modal = ({
  show,
  handleClose,
  previewImage,
  handleChange,
  handleOnSelect,
  categories,
  handleAddMenu,
  isUpdate,
  handleUpdateMenu,
  input,
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
              {isUpdate ? "Update Menu" : "Add Menu"}
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
              <div className="d-flex flex-column gap-2">
                <div className="col-lg-6 mx-auto">
                  <img
                    src={
                      isUpdate
                        ? previewImage
                          ? previewImage
                          : input.photo
                        : previewImage
                        ? previewImage
                        : "/assets/no-image-available.png"
                    }
                    className="w-100"
                    alt="menu"
                  />
                </div>
                <label htmlFor="photo">Menu Image</label>
                <input
                  type="file"
                  id="photo"
                  name="photo"
                  className="form-control"
                  onChange={(e) => handleOnSelect(e)}
                  accept="image/*"
                />
              </div>
              <div className="d-flex flex-column gap-1">
                <label htmlFor="name" className="form-label">
                  Name
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  className="form-control"
                  onChange={handleChange}
                  value={isUpdate ? input.name : ""}
                />
              </div>
              <div className="d-flex flex-column gap-1">
                <label htmlFor="price" className="form-label">
                  Price
                </label>
                <input
                  type="number"
                  id="price"
                  className="form-control"
                  name="price"
                  onChange={handleChange}
                  value={isUpdate ? input.price : 0}
                />
              </div>
              <div className="d-flex flex-column gap-1">
                <label htmlFor="category_id" className="form-label">
                  Category
                </label>
                <select
                  name="category_id"
                  id="category_id"
                  className="form-select"
                  onChange={handleChange}
                  value={isUpdate ? input.category_id : 0}
                >
                  <option value="0">Select Category</option>
                  {categories.map((category) => (
                    <option key={category.id} value={category.id}>
                      {category.name}
                    </option>
                  ))}
                </select>
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
                  value={isUpdate ? input.description : ""}
                />
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
                onClick={isUpdate ? handleUpdateMenu : handleAddMenu}
              >
                {isUpdate ? "Update Menu" : "Add Menu"}
              </button>
            </div>
          </div>
        </div>
      </div>
    </ModalWrapper>
  );
};

export default Modal;
