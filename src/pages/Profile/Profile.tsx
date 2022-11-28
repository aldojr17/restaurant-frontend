import { FormEvent, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Navbar from "../../components/Navbar/Navbar";
import { RootState } from "../../redux";
import useIsLogged from "../../util/useIsLogged";
import moment from "moment";
import { CouponWrapper } from "./style";
import instance from "../../api/config/axios";
import axios from "axios";
import { UserDispatch } from "../../redux/user/types";
import { changeProfile } from "../../redux/user/action";

const Profile = () => {
  const { user, coupons } = useSelector(
    (state: RootState) => state.userReducer
  );
  const [input, setInput] = useState(user);
  const [isDisabled, setIsDisabled] = useState(true);
  const dispatch: UserDispatch = useDispatch();
  const [file, setFile] = useState<Blob>();
  const reader = new FileReader();

  const handleChange = (event: FormEvent<HTMLInputElement>) => {
    setInput({
      ...input,
      [event.currentTarget.name]: event.currentTarget.value,
    });
  };

  const handleChangeImage = async (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files || e.target.files.length === 0) {
      return;
    }
    setFile(e.target.files[0]);
  };

  const handleClick = async () => {
    const formData = new FormData();
    formData.append("file", file!);
    formData.append("upload_preset", "final-project");
    const uploadPost = await axios.post(
      "https://api.cloudinary.com/v1_1/dcdexrr4n/image/upload",
      formData
    );

    dispatch(
      changeProfile({
        address: input.address,
        full_name: input.full_name,
        phone: input.phone,
        profile_picture: uploadPost.data.secure_url,
      })
    );
    setIsDisabled(true);
  };

  useEffect(() => {
    setInput(user);
  }, [user, isDisabled]);

  return (
    <>
      <Navbar isLogged={useIsLogged()} active={"profile"} />
      <div className="container">
        <div className="row d-none d-lg-flex">
          <h1 className="col-lg-6">Profile</h1>
          <h1 className="col-lg-6">Coupons</h1>
        </div>
        <div className="row gap-4 gap-lg-0">
          <div className="col-lg-6 d-flex flex-column gap-3">
            <h1 className="d-block d-lg-none">Profile</h1>
            <div className="d-flex flex-column gap-3">
              <div className="col-lg-6">
                <img
                  className="w-100"
                  src={
                    input.profile_picture === "" ||
                    input.profile_picture === null
                      ? "/assets/default-profile-picture.png"
                      : input.profile_picture
                  }
                  alt="profile"
                />
              </div>
              <div className="d-flex flex-column">
                <label htmlFor="photo" className="form-label">
                  Change Profile Picture
                </label>
                <input
                  type="file"
                  name="photo"
                  id="photo"
                  onChange={handleChangeImage}
                  disabled={isDisabled}
                  className="form-control"
                  accept="image/*"
                />
              </div>
            </div>
            <div className="d-flex flex-column">
              <label className="form-label" htmlFor="full_name">
                Fullname
              </label>
              <input
                className="form-control"
                type="text"
                name="full_name"
                id="full_name"
                value={input.full_name ? input.full_name : ""}
                onChange={handleChange}
                disabled={isDisabled}
              />
            </div>
            <div className="d-flex flex-column">
              <label className="form-label" htmlFor="email">
                Email
              </label>
              <input
                className="form-control"
                type="email"
                name="email"
                id="email"
                value={input.email}
                onChange={handleChange}
                disabled={isDisabled}
              />
            </div>
            <div className="d-flex flex-column">
              <label className="form-label" htmlFor="address">
                Address
              </label>
              <input
                className="form-control"
                type="text"
                name="address"
                id="address"
                value={input.address ? input.address : ""}
                onChange={handleChange}
                disabled={isDisabled}
              />
            </div>
            <div className="d-flex flex-column">
              <label className="form-label" htmlFor="phone">
                Phone
              </label>
              <input
                className="form-control"
                type="text"
                name="phone"
                id="phone"
                value={input.phone ? input.phone : ""}
                onChange={handleChange}
                disabled={isDisabled}
              />
            </div>
            <div className="mt-3">
              {isDisabled ? (
                <button
                  className="btn btn-dark"
                  onClick={() => setIsDisabled(false)}
                >
                  Edit Profile
                </button>
              ) : (
                <div className="d-flex gap-3">
                  <button
                    className="btn btn-outline-dark"
                    onClick={() => setIsDisabled(true)}
                  >
                    Cancel
                  </button>
                  <button className="btn btn-dark" onClick={handleClick}>
                    Save Profile
                  </button>
                </div>
              )}
            </div>
          </div>
          <h1 className="d-block d-lg-none">Coupons</h1>
          <CouponWrapper className="col-lg-6 row gap-3">
            {coupons.map((coupon) => (
              <div className="col-lg-12" key={coupon.coupon.id}>
                <div className="col d-flex flex-row justify-content-between border border-2 rounded rounded-3 p-3">
                  <div className="d-flex flex-column">
                    <span className="fs-3">{coupon.coupon.code}</span>
                    <span className="fs-4">{coupon.coupon.discount}</span>
                  </div>
                  <div className="d-flex flex-column align-items-end justify-content-between">
                    <span className="fs-5">
                      {moment(coupon.expired_at).fromNow()}
                    </span>
                    <span className="fs-5">x{coupon.qty}</span>
                  </div>
                </div>
              </div>
            ))}
            {coupons.map((coupon) => (
              <div className="col-lg-12" key={coupon.coupon.id}>
                <div className="col d-flex flex-row justify-content-between border border-2 rounded rounded-3 p-3">
                  <div className="d-flex flex-column">
                    <span className="fs-3">{coupon.coupon.code}</span>
                    <span className="fs-4">{coupon.coupon.discount}</span>
                  </div>
                  <div className="d-flex flex-column align-items-end justify-content-between">
                    <span className="fs-5">
                      {moment(coupon.expired_at).fromNow()}
                    </span>
                    <span className="fs-5">x{coupon.qty}</span>
                  </div>
                </div>
              </div>
            ))}
            {coupons.map((coupon) => (
              <div className="col-lg-12" key={coupon.coupon.id}>
                <div className="col d-flex flex-row justify-content-between border border-2 rounded rounded-3 p-3">
                  <div className="d-flex flex-column">
                    <span className="fs-3">{coupon.coupon.code}</span>
                    <span className="fs-4">{coupon.coupon.discount}</span>
                  </div>
                  <div className="d-flex flex-column align-items-end justify-content-between">
                    <span className="fs-5">
                      {moment(coupon.expired_at).fromNow()}
                    </span>
                    <span className="fs-5">x{coupon.qty}</span>
                  </div>
                </div>
              </div>
            ))}
            {coupons.map((coupon) => (
              <div className="col-lg-12" key={coupon.coupon.id}>
                <div className="col d-flex flex-row justify-content-between border border-2 rounded rounded-3 p-3">
                  <div className="d-flex flex-column">
                    <span className="fs-3">{coupon.coupon.code}</span>
                    <span className="fs-4">{coupon.coupon.discount}</span>
                  </div>
                  <div className="d-flex flex-column align-items-end justify-content-between">
                    <span className="fs-5">
                      {moment(coupon.expired_at).fromNow()}
                    </span>
                    <span className="fs-5">x{coupon.qty}</span>
                  </div>
                </div>
              </div>
            ))}
          </CouponWrapper>
        </div>
      </div>
    </>
  );
};

export default Profile;
