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
        <h1 className="my-3">COUPONS</h1>
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
        <div className="row flex-column gap-3">
          {coupons.map((coupon) => (
            <div key={coupon.id} className="row border border-2 p-3">
              <div className="col-lg-10 gap-3 d-flex justify-content-between align-items-center">
                <div className="d-flex flex-column">
                  <span>Code: {coupon.code}</span>
                  <span>Discount: {coupon.discount}</span>
                </div>
                <div>
                  <span>
                    Valid until:{" "}
                    {moment(coupon.valid_until).format("DD MMMM YYYY")} (
                    {moment(coupon.valid_until).fromNow()})
                  </span>
                </div>
              </div>
              <div className="col-lg-2 d-flex justify-content-end gap-3">
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
