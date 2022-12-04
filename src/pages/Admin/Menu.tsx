import axios from "axios";
import { ChangeEvent, FormEvent, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import CardImg from "../../components/Card/style";
import FilterAdmin from "../../components/Filter/FilterAdmin";
import { StarIcon } from "../../components/Icon";
import Modal from "../../components/Modal/Modal";
import Navbar from "../../components/Navbar/Navbar";
import { RootState } from "../../redux";
import { createMenu, deleteMenu, updateMenu } from "../../redux/menu/action";
import {
  ICreateUpdateMenuPayload,
  IFilterPayload,
  IMenuOptions,
} from "../../redux/menu/types";
import { OrderDispatch } from "../../redux/order/types";
import useIsLogged from "../../util/useIsLogged";
import { formatCurrency } from "../../util/util";
import Title from "../Cart/style";

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
    options: [],
  });
  const [selectedFile, setSelectedFile] = useState<File>();
  const [previewImage, setPreviewImage] = useState<string | undefined>();
  const dispatch: OrderDispatch = useDispatch();
  const [showModal, setShowModal] = useState(false);
  const [isUpdate, setIsUpdate] = useState(false);
  const [id, setId] = useState(0);
  const [options, setOptions] = useState<IMenuOptions[]>([]);

  const handleAddOption = () => {
    setOptions([
      ...options,
      {
        index:
          options.length !== 0
            ? options.at(options.length - 1 > 0 ? options.length - 1 : 0)
                ?.index! + 1
            : 1,
        id: 0,
        menu_id: 0,
        name: "",
        price: 0,
      },
    ]);
  };

  const handleDeleteOption = (index: number) => {
    setOptions(options.filter((opt) => opt.index !== index));
  };

  const handleChangeOption = (
    event: FormEvent<HTMLInputElement>,
    index: number
  ) => {
    setOptions(
      options.map((opt) =>
        opt.index === index
          ? {
              ...opt,
              [event.currentTarget.name]: event.currentTarget.value,
            }
          : opt
      )
    );
  };

  const handleCloseModal = () => {
    setShowModal(false);
    setPreviewImage(undefined);
    setInput({
      category_id: 0,
      is_available: true,
      name: "",
      photo: "",
      price: 0,
      description: "",
      options: [],
    });
  };

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
      [event.currentTarget.name]: event.currentTarget.value,
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
    let uploadPost;
    if (selectedFile) {
      const formData = new FormData();
      formData.append("file", selectedFile!);
      formData.append("upload_preset", "final-project");
      uploadPost = await axios.post(
        "https://api.cloudinary.com/v1_1/dcdexrr4n/image/upload",
        formData
      );
    }

    dispatch(
      createMenu({
        ...input,
        photo: selectedFile ? uploadPost?.data.secure_url : "",
        price: parseInt(String(input.price)),
        category_id: parseInt(String(input.category_id)),
        options: options.map((opt) => ({
          name: opt.name,
          price: parseInt(String(opt.price)),
        })),
      })
    );
    setShowModal(false);
    setOptions([]);
  };

  const handleUpdateMenu = async () => {
    let uploadPost;
    if (selectedFile) {
      const formData = new FormData();
      formData.append("file", selectedFile!);
      formData.append("upload_preset", "final-project");
      uploadPost = await axios.post(
        "https://api.cloudinary.com/v1_1/dcdexrr4n/image/upload",
        formData
      );
    }

    dispatch(
      updateMenu(
        {
          ...input,
          photo: selectedFile ? uploadPost?.data.secure_url : input.photo,
          price: parseInt(String(input.price)),
          category_id: parseInt(String(input.category_id)),
          options: options.map((val) => ({
            id: val.id,
            name: val.name,
            menu_id: val.menu_id,
            price: parseInt(String(val.price)),
          })),
        },
        id
      )
    );
    setShowModal(false);
    setOptions([]);
  };

  const handleDelete = () => {
    dispatch(deleteMenu(id));
    setShowModal(false);
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
      <div className="container px-lg-5 mb-4">
        <Title>MENU</Title>
      </div>
      <div className="container px-lg-5 row flex-column mx-auto gap-4 align-items-center">
        <FilterAdmin
          filter={filter}
          setFilter={setFilter}
          type={"menu"}
          setShowModal={setShowModal}
          setIsUpdate={setIsUpdate}
        />
      </div>
      <div className="container mx-auto row mt-4">
        <div className="d-flex mx-auto gap-4 gap-lg-0 flex-wrap justify-content-center justify-content-lg-start">
          {menus.data.map((menu) => (
            <div
              key={menu.id}
              className="col-lg-3 mb-4 d-flex justify-content-center"
              onClick={() => {
                setShowModal(true);
                setIsUpdate(true);
                setInput({
                  category_id: menu.category.id,
                  description: menu.description,
                  is_available: menu.is_available,
                  name: menu.name,
                  photo: menu.photo,
                  price: menu.price,
                  options: [],
                });
                setId(menu.id);
                setOptions(
                  menu.menu_option.map((val) => ({
                    ...val,
                    index: val.id,
                  }))
                );
              }}
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

      <Modal
        categories={categories}
        handleAddMenu={handleAddMenu}
        handleChange={handleChange}
        handleClose={handleCloseModal}
        handleOnSelect={handleOnSelect}
        previewImage={previewImage}
        show={showModal}
        isUpdate={isUpdate}
        input={input}
        handleUpdateMenu={handleUpdateMenu}
        handleDelete={handleDelete}
        handleAddOption={handleAddOption}
        handleChangeOption={handleChangeOption}
        handleDeleteOption={handleDeleteOption}
        options={options}
      />
    </>
  );
};

export default Menu;
