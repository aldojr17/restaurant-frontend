import React, { useState } from "react";
import { Link } from "react-router-dom";
import { registerApi } from "../api/auth";
import AuthModal from "../components/Modal/AuthModal";

const Register = () => {
  const [input, setInput] = useState({
    fullname: "",
    email: "",
    password: "",
  });
  const [isError, setIsError] = useState({
    fullname: false,
    email: false,
    password: false,
  });
  const [isShowModal, setIsShowModal] = useState(false);

  const handleChange = (event: React.FormEvent<HTMLInputElement>) => {
    setInput({
      ...input,
      [event.currentTarget.name]: event.currentTarget.value,
    });
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (input.fullname === "" || input.email === "" || input.password === "") {
      setIsError({
        fullname: input.fullname === "",
        email: input.email === "",
        password: input.password === "",
      });
      return;
    }

    const status = await registerApi(input);

    if (status.isSuccess) {
      setIsShowModal(true);
    } else {
      alert(status);
    }
  };

  return (
    <>
      <h1 className="text-center">Register</h1>
      <form
        onSubmit={handleSubmit}
        className="row flex-column align-items-center gy-4"
      >
        <div className="col-lg-3 text-start">
          <label htmlFor="fullname" className="fw-bold fs-5 form-label">
            Full Name
          </label>
          <input
            className="form-control p-3"
            type="text"
            name="fullname"
            id="fullname"
            placeholder="John Doe"
            onChange={handleChange}
          />
          {isError.fullname ? (
            <div className="text-danger mt-3">
              Full Name should not be empty
            </div>
          ) : (
            ""
          )}
        </div>
        <div className="col-lg-3 text-start">
          <label htmlFor="email" className="fw-bold fs-5 form-label">
            Email
          </label>
          <input
            className="form-control p-3"
            type="email"
            name="email"
            id="email"
            placeholder="test@test.com"
            onChange={handleChange}
          />
          {isError.email ? (
            <div className="text-danger mt-3">Email should not be empty</div>
          ) : (
            ""
          )}
        </div>
        <div className="col-lg-3 text-start">
          <label htmlFor="password" className="fw-bold fs-5 form-label">
            Password
          </label>
          <input
            className="form-control p-3"
            type="password"
            name="password"
            id="password"
            placeholder="******"
            onChange={handleChange}
          />
          {isError.password ? (
            <div className="text-danger mt-3">Password should not be empty</div>
          ) : (
            ""
          )}
        </div>
        <div className="col-lg-3">
          <button
            type="submit"
            className="btn btn-info form-control text-white"
          >
            Register
          </button>
        </div>
      </form>
      <p className="text-center">
        Already have an account?
        <Link to="/login" className="ms-2 text-decoration-none">
          <span>Login</span>
        </Link>
      </p>
      {isShowModal ? <AuthModal /> : ""}
    </>
  );
};

export default Register;
