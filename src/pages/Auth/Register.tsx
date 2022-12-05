import React, { useState } from "react";
import { Link } from "react-router-dom";
import { registerApi } from "../../api/api";
import AuthModal from "../../components/Modal/AuthModal";
import Navbar from "../../components/Navbar/Navbar";
import "./auth.scss";

const Register = () => {
  const [input, setInput] = useState({
    fullname: "",
    email: "",
    password: "",
    confirmPassword: "",
  });
  const [isError, setIsError] = useState({
    fullname: false,
    email: false,
    password: false,
    confirmPassword: false,
    matchPassword: false,
  });
  const [apiError, setApiError] = useState({
    error: false,
    message: "",
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

    if (
      input.fullname === "" ||
      input.email === "" ||
      input.password === "" ||
      input.confirmPassword === ""
    ) {
      setIsError({
        fullname: input.fullname === "",
        email: input.email === "",
        password: input.password === "",
        confirmPassword: input.confirmPassword === "",
        matchPassword: false,
      });
      return;
    }

    if (input.password !== input.confirmPassword) {
      setIsError({
        ...isError,
        confirmPassword: input.confirmPassword === "",
        matchPassword: true,
      });
      return;
    }

    const status = await registerApi(input);

    if (status.isSuccess) {
      setIsShowModal(true);
    } else {
      setApiError({
        error: true,
        message: status.error,
      });
    }

    setIsError({
      fullname: input.fullname === "",
      email: input.email === "",
      password: input.password === "",
      confirmPassword: input.confirmPassword === "",
      matchPassword: input.password !== input.confirmPassword,
    });
  };

  return (
    <>
      <Navbar active="auth" />
      <div className="auth-container row gap-5 gap-lg-0 flex-lg-row-reverse">
        <div className="col-12 col-lg-6 my-auto">
          <div className="mb-5">
            <h1 className="text-center">Create Account</h1>
            <p className="text-center fs-4">
              Get started by creating your new account
            </p>
          </div>
          <form
            onSubmit={handleSubmit}
            className="row flex-column align-items-center gy-4"
          >
            <div className="col-lg-5 col-8 text-start">
              <input
                className="form-control p-3"
                type="text"
                name="fullname"
                id="fullname"
                placeholder="Full Name"
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
            <div className="col-lg-5 col-8 text-start">
              <input
                className="form-control p-3"
                type="email"
                name="email"
                id="email"
                placeholder="Email"
                onChange={handleChange}
              />
              {isError.email ? (
                <div className="text-danger mt-3">
                  Email should not be empty
                </div>
              ) : (
                ""
              )}
            </div>
            <div className="col-lg-5 col-8 text-start">
              <input
                className="form-control p-3"
                type="password"
                name="password"
                id="password"
                placeholder="Password"
                minLength={6}
                onChange={handleChange}
              />
              {isError.password ? (
                <div className="text-danger mt-3">
                  Password should not be empty
                </div>
              ) : (
                ""
              )}
            </div>
            <div className="col-lg-5 col-8 text-start">
              <input
                className="form-control p-3"
                type="password"
                name="confirmPassword"
                id="confirmPassword"
                placeholder="Confirm Password"
                minLength={6}
                onChange={handleChange}
              />
              {isError.confirmPassword ? (
                <div className="text-danger mt-3">
                  Confirm Password should not be empty
                </div>
              ) : (
                ""
              )}
              {isError.matchPassword ? (
                <div className="text-danger mt-3">
                  Password and Confirm Password doesn't match
                </div>
              ) : (
                ""
              )}
            </div>
            <div className="col-lg-5 col-8 text-start">
              {apiError.error ? (
                <div className="text-danger mt-3">{apiError.message}</div>
              ) : (
                ""
              )}
            </div>
            <div className="col-lg-5 col-8 text-center">
              <button type="submit" className="btn btn-dark w-75">
                Register
              </button>
            </div>
          </form>
          {isShowModal ? <AuthModal /> : ""}
        </div>

        <div className="col-12 col-lg-6 my-auto p-0 pb-5 pb-lg-0">
          <div className="border border-1 w-75 mx-auto shadow py-5">
            <div className="row flex-column align-items-center text-center justify-content-center gap-5">
              <img
                src="/assets/register.svg"
                alt="register image"
                className="img-thumbnail border-0 col-lg-7 col-8"
              />
              <div className="col-lg-10 d-flex flex-column gap-3">
                <h1>Already have an account?</h1>
                <span className="fs-4">We are happy to have you back</span>
                <Link to="/login" className="mt-3 text-decoration-none">
                  <button className="btn btn-outline-dark w-50">Login</button>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Register;
