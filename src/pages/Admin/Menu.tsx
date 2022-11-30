import axios from "axios";
import React, { ChangeEvent, FormEvent, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import CardImg from "../../components/Card/style";
import Filter from "../../components/Filter/Filter";
import FilterAdmin from "../../components/Filter/FilterAdmin";
import { StarIcon } from "../../components/Icon";
import MenuList from "../../components/MenuList/MenuList";
import Navbar from "../../components/Navbar/Navbar";
import { RootState } from "../../redux";
import { addMenu, createMenu } from "../../redux/menu/action";
import {
  ICreateUpdateMenuPayload,
  IFilterPayload,
} from "../../redux/menu/types";
import { OrderDispatch } from "../../redux/order/types";
import useIsLogged from "../../util/useIsLogged";
import { formatCurrency } from "../../util/util";

const Menu = () => {
  const { menus, categories } = useSelector(
    (state: RootState) => state.menuReducer
  );
  const [filter, setFilter] = useState<IFilterPayload>({
    category: 0,
    sortBy: "price",
    name: "",
    sort: "asc",
    limit: 8,
  });
  const [pagination, setPagination] = useState<string[]>([]);
  const [input, setInput] = useState<ICreateUpdateMenuPayload>({
    category_id: 0,
    is_available: true,
    name: "",
    photo: "",
    price: 0,
    description: "",
  });
  const [selectedFile, setSelectedFile] = useState<File>();
  const [previewImage, setPreviewImage] = useState<string | undefined>();
  const dispatch: OrderDispatch = useDispatch();

  const handleClick = (page: number) => {
    setFilter({
      ...filter,
      page,
    });
  };

  const handleChange = (
    event: FormEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
  ) => {
    setInput({
      ...input,
      [event.currentTarget.name]:
        event.currentTarget.name === "price" ||
        event.currentTarget.name === "category_id"
          ? parseInt(event.currentTarget.value)
          : event.currentTarget.value,
    });
  };

  const handleOnSelect = (e: ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files || e.target.files.length === 0) {
      setSelectedFile(undefined);
      return;
    }

    setSelectedFile(e.target.files[0]);
  };

  const handleAddMenu = async () => {
    const formData = new FormData();
    formData.append("file", selectedFile!);
    formData.append("upload_preset", "final-project");
    const uploadPost = await axios.post(
      "https://api.cloudinary.com/v1_1/dcdexrr4n/image/upload",
      formData
    );

    dispatch(
      createMenu({
        ...input,
        photo: uploadPost.data.secure_url,
      })
    );
  };

  const handlePagination = (totalPage: number, currentPage: number) => {
    let element: string[] = [];
    const actualPage = currentPage + 1;

    if (totalPage <= 10) {
      element = Array.from(Array(menus.total_page).keys(), (index) =>
        String(index + 1)
      );
    } else {
      if (actualPage <= 4) {
        element = ["1", "2", "3", "...", String(totalPage)];
      } else if (actualPage < 6) {
        element = [
          "1",
          "...",
          String(actualPage - 2),
          String(actualPage - 1),
          String(actualPage),
          "...",
          String(totalPage),
        ];
      } else if (actualPage < totalPage && actualPage > 4) {
        element = [
          "1",
          "...",
          String(actualPage - 3),
          String(actualPage - 2),
          String(actualPage - 1),
          "...",
          String(totalPage),
        ];
      } else if (actualPage > totalPage - 4) {
        element = [
          "1",
          "...",
          String(totalPage - 2),
          String(totalPage - 1),
          String(totalPage),
        ];
      } else {
        element = [
          "1",
          "...",
          String(actualPage - 1),
          String(actualPage),
          String(actualPage + 1),
          "...",
          String(totalPage),
        ];
      }
    }

    setPagination(element);
  };

  useEffect(() => {
    handlePagination(menus.total_page, menus.current_page);
  }, [menus]);

  useEffect(() => {
    if (!selectedFile) {
      setPreviewImage(undefined);
      return;
    }

    const objectUrl = URL.createObjectURL(selectedFile);
    setPreviewImage(objectUrl);

    // free memory when ever this component is unmounted
    return () => URL.revokeObjectURL(objectUrl);
  }, [selectedFile]);

  return (
    <>
      <Navbar isAdmin isLogged={useIsLogged()} active={"menu"} />
      <div className="container px-lg-5 row flex-column mx-auto gap-4 align-items-center">
        <FilterAdmin
          filter={filter}
          setFilter={setFilter}
          type={"menu"}
          pagination={{
            current_page: menus.current_page,
            limit: menus.limit,
            total: menus.total,
          }}
        />
      </div>
      <div className="container mx-auto row mt-4">
        <div className="d-flex mx-auto gap-4 gap-lg-0 flex-wrap justify-content-center justify-content-lg-start">
          {menus.data.map((menu) => (
            <div
              key={menu.id}
              className="col-lg-3 mb-4 d-flex justify-content-center"
            >
              <div className="position-relative">
                <div className="card rounded rounded-4 shadow" role={"button"}>
                  <CardImg
                    src={`https://plus.unsplash.com/premium_photo-1667682209935-b6c87cced668?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80`}
                    className="card-img-top"
                    alt="menu"
                  />
                  <div className="card-body">
                    <h5 className="card-title">{menu.name}</h5>
                    <div className="d-flex justify-content-between align-items-center">
                      <span>Rp.{formatCurrency(menu.price)}</span>
                      <div className="d-flex align-items-center gap-2">
                        <StarIcon />
                        <span>
                          {menu.rating !== 0
                            ? (menu.rating / menu.total_review).toFixed(2)
                            : 0}{" "}
                          ({menu.total_review})
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
      <div className="container px-lg-5">
        <div className="my-3 d-flex justify-content-end gap-1">
          <button
            className="btn"
            onClick={() => handleClick(menus.current_page - 1)}
          >
            Previous
          </button>
          {pagination.map((item, index) => (
            <button
              key={index}
              className={`btn btn-outline-dark ${
                menus.current_page === Number(item) ? "active" : ""
              }`}
              onClick={() => {
                if (item !== "...") {
                  handleClick(Number(item));
                }
              }}
            >
              {item}
            </button>
          ))}
          <button
            className="btn"
            onClick={() => handleClick(menus.current_page + 1)}
          >
            Next
          </button>
        </div>
      </div>

      <div
        className="modal fade"
        id="addMenuModal"
        tabIndex={-1}
        aria-labelledby="addMenuModalLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog modal-dialog-centered">
          <div className="modal-content">
            <div className="modal-header">
              <h1 className="modal-title fs-5" id="addMenuModalLabel">
                Add Menu
              </h1>
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
              ></button>
            </div>
            <div className="modal-body">
              <div className="d-flex flex-column gap-3">
                <div className="d-flex flex-column gap-2">
                  <div className="col-lg-6 mx-auto">
                    <img src={previewImage} className="w-100" alt="menu" />
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
                  />
                </div>
              </div>
              <div className="modal-footer">
                <button
                  type="button"
                  className="btn btn-outline-dark"
                  data-bs-dismiss="modal"
                >
                  Close
                </button>
                <button
                  type="button"
                  className="btn btn-dark"
                  data-bs-dismiss="modal"
                  onClick={handleAddMenu}
                >
                  Add Menu
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Menu;
