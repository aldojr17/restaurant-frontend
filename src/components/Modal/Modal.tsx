import { ChangeEvent, Dispatch, FormEvent, SetStateAction } from "react";
import {
  ICategoryPayload,
  ICreateUpdateMenuPayload,
  IMenuOptions,
} from "../../redux/menu/types";
import { TrashIcon } from "../Icon";
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
  handleDelete: () => void;
  isUpdate: boolean;
  input: ICreateUpdateMenuPayload;
  options: IMenuOptions[];
  handleAddOption: () => void;
  handleDeleteOption: (id: number) => void;
  handleChangeOption: (event: FormEvent<HTMLInputElement>, id: number) => void;
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
  handleDelete,
  options,
  handleAddOption,
  handleChangeOption,
  handleDeleteOption,
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
      <div className="modal-dialog modal-dialog-centered modal-lg modal-dialog-scrollable">
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
          <div className="modal-body mb-3">
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
                  value={input.name}
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
                  value={input.price}
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
                  value={input.category_id}
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
                  value={input.description}
                />
              </div>
            </div>
            <div
              className={`modal-footer px-0 ${
                isUpdate ? "justify-content-between" : ""
              }`}
            >
              {isUpdate ? (
                <div>
                  <button className="btn btn-danger" onClick={handleDelete}>
                    Delete
                  </button>
                </div>
              ) : (
                ""
              )}
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
                  onClick={isUpdate ? handleUpdateMenu : handleAddMenu}
                >
                  {isUpdate ? "Update Menu" : "Add Menu"}
                </button>
              </div>
            </div>
            <div>
              <div className="d-flex justify-content-between">
                <span className="fs-5 fw-bold">Menu Options</span>
                <button
                  className="btn btn-outline-dark"
                  onClick={handleAddOption}
                >
                  Add Option
                </button>
              </div>
              {options.length !== 0 ? (
                <div className="row mt-3 mb-2">
                  <div className="col-lg-7">
                    <span className="fs-5">Name</span>
                  </div>
                  <div className="col-lg-5">
                    <span className="fs-5">Price</span>
                  </div>
                </div>
              ) : (
                ""
              )}
              {options.map((val) => (
                <div className="row mb-3" key={val.id}>
                  <div className="col-lg-6">
                    <input
                      type="text"
                      name="name"
                      id="name"
                      className="form-control"
                      onChange={(e) => handleChangeOption(e, val.id)}
                      value={val.name}
                    />
                  </div>
                  <div className="col-lg-5">
                    <input
                      type="number"
                      name="price"
                      id="price"
                      className="form-control"
                      onChange={(e) => handleChangeOption(e, val.id)}
                      value={val.price}
                    />
                  </div>
                  <div className="col-lg-1">
                    <button
                      className="btn"
                      onClick={() => handleDeleteOption(val.id)}
                    >
                      <TrashIcon />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </ModalWrapper>
  );
};

export default Modal;
