import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import CardImg from "../../components/Card/style";
import Filter from "../../components/Filter/Filter";
import { StarIcon } from "../../components/Icon";
import UserReviewModal from "../../components/Modal/UserReviewModal";
import Navbar from "../../components/Navbar/Navbar";
import { RootState } from "../../redux";
import { IFilterPayload, IReviewPayload } from "../../redux/menu/types";
import useIsLogged from "../../util/useIsLogged";
import { formatCurrency } from "../../util/util";
import Title from "../Cart/style";

const Review = () => {
  const { menus } = useSelector((state: RootState) => state.menuReducer);
  const [filter, setFilter] = useState<IFilterPayload>({
    category: 0,
    sortBy: "price",
    name: "",
    sort: "asc",
    limit: 8,
  });
  const [pagination, setPagination] = useState<string[]>([]);
  const [showModal, setShowModal] = useState(false);
  const [reviews, setReviews] = useState<IReviewPayload[]>([]);
  const [name, setName] = useState("");

  const handleClick = (page: number) => {
    setFilter({
      ...filter,
      page,
    });
  };

  const handleCloseModal = () => {
    setShowModal(false);
    setReviews([]);
    setName("");
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

  return (
    <>
      <Navbar isAdmin isLogged={useIsLogged()} active={"review"} />
      <div className="container px-lg-5 mb-4">
        <Title>Review</Title>
      </div>
      <div className="container px-lg-5 row flex-column mx-auto gap-4 align-items-center align-items-lg-start">
        <Filter
          pagination={menus}
          filter={filter}
          setFilter={setFilter}
          type={"menu"}
          isAdmin={true}
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
                setReviews(menu.reviews);
                setName(menu.name);
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

      <UserReviewModal
        handleClose={handleCloseModal}
        reviews={reviews}
        show={showModal}
        name={name}
      />
    </>
  );
};

export default Review;
