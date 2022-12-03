import moment from "moment";
import { FormEvent, useEffect, useState } from "react";
import {
  addCoupon,
  deleteCoupon,
  getAllCoupon,
  getCoupon,
  updateCoupon,
} from "../../api/api";
import CouponModal from "../../components/Modal/CouponModal";
import Navbar from "../../components/Navbar/Navbar";
import { ICoupon } from "../../redux/user/types";
import { formatCurrency } from "../../util/util";
import Title from "../Cart/style";

const Coupon = () => {
  const [input, setInput] = useState<ICoupon>({
    code: "",
    discount: 0,
    id: "",
    valid_until: "",
  });
  const [showModal, setShowModal] = useState(false);
  const [isUpdate, setIsUpdate] = useState(false);
  const [coupons, setCoupons] = useState<ICoupon[]>([]);

  const handleCloseModal = () => {
    setShowModal(false);
    setInput({
      code: "",
      discount: 0,
      id: "",
      valid_until: "",
    });
  };

  const handleChange = (event: FormEvent<HTMLInputElement>) => {
    setInput({
      ...input,
      [event.currentTarget.name]: event.currentTarget.value,
    });
  };

  const fetchCoupon = async () => {
    setCoupons(await getAllCoupon());
  };

  const handleDeleteCoupon = async (id: string) => {
    const status = await deleteCoupon(id);
    if (status.isSuccess) {
      fetchCoupon();
    }
  };

  const handleAddCoupon = async () => {
    const status = await addCoupon({
      ...input,
      discount: parseInt(String(input.discount)),
    });
    if (status.isSuccess) {
      setShowModal(false);
      fetchCoupon();
    }
  };

  const handleUpdateCoupon = async () => {
    const status = await updateCoupon({
      ...input,
      discount: parseInt(String(input.discount)),
    });
    if (status.isSuccess) {
      setShowModal(false);
      fetchCoupon();
    }
  };

  const handleGetCoupon = async (id: string) => {
    setInput(await getCoupon(id));
  };

  useEffect(() => {
    fetchCoupon();
  }, []);

  return (
    <>
      <Navbar active="coupon" isAdmin isLogged />
      <div className="container">
        <Title>COUPONS</Title>
        <div className="d-flex justify-content-end mb-3">
          <button
            className="btn btn-dark"
            onClick={() => {
              setIsUpdate(false);
              setShowModal(true);
            }}
          >
            Add Coupon
          </button>
        </div>
        <div className="row flex-column gap-3 px-2 mt-4 align-items-center">
          {coupons.map((coupon) => (
            <div
              key={coupon.id}
              className="row border border-1 border-dark rounded-4 p-3 shadow"
            >
              <div className="col-lg-10 gap-3 d-flex justify-content-between align-items-center row">
                <div className="col d-flex flex-column">
                  <span className="fs-4 fw-bold">Code: {coupon.code}</span>
                  <span className="fs-4">
                    Discount: Rp.{formatCurrency(coupon.discount)}
                  </span>
                </div>
                <div className="col d-flex justify-content-between align-items-center gap-3">
                  <span className="fs-4">Valid until:</span>
                  <span className="fs-4">
                    {moment(coupon.valid_until).format("DD MMMM YYYY")} (
                    {moment(coupon.valid_until).fromNow()})
                  </span>
                </div>
              </div>
              <div className="col-lg-2 d-flex align-items-center justify-content-end gap-3">
                <button
                  className="btn btn-outline-dark"
                  onClick={() => {
                    handleGetCoupon(coupon.id);
                    setIsUpdate(true);
                    setShowModal(true);
                  }}
                >
                  Edit
                </button>
                <button
                  className="btn btn-danger"
                  onClick={() => handleDeleteCoupon(coupon.id)}
                >
                  Delete
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      <CouponModal
        handleChange={handleChange}
        handleClose={handleCloseModal}
        input={input}
        isUpdate={isUpdate}
        show={showModal}
        handleAddCoupon={handleAddCoupon}
        handleUpdateCoupon={handleUpdateCoupon}
      />
    </>
  );
};

export default Coupon;
