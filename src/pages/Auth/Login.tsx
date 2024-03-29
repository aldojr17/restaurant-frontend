import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import Navbar from "../../components/Navbar/Navbar";
import { RootState } from "../../redux";
import { login, setStatus } from "../../redux/user/action";
import { UserDispatch } from "../../redux/user/types";
import "./auth.scss";

const Login = () => {
  const [input, setInput] = useState({
    email: "",
    password: "",
  });
  const [isError, setIsError] = useState({
    email: false,
    password: false,
  });
  const navigate = useNavigate();
  const dispatch: UserDispatch = useDispatch();
  const { status, user } = useSelector((state: RootState) => state.userReducer);

  const handleChange = (event: React.FormEvent<HTMLInputElement>) => {
    setInput({
      ...input,
      [event.currentTarget.name]: event.currentTarget.value,
    });
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (input.email === "" || input.password === "") {
      setIsError({
        email: input.email === "",
        password: input.password === "",
      });
      return;
    }
    dispatch(login(input));

    setIsError({
      email: false,
      password: false,
    });
  };

  useEffect(() => {
    dispatch(
      setStatus({
        error: "",
        isSuccess: false,
      })
    );
  }, []);

  return (
    <>
      <Navbar active="auth" />
      <div className="auth-container row gap-5 gap-lg-0">
        <div className="col-12 col-lg-6 my-auto">
          <div className="mb-5">
            <h1 className="text-center">Welcome Back!</h1>
            <p className="text-center fs-4">We are happy to have you back</p>
          </div>
          <form
            onSubmit={handleSubmit}
            className="row flex-column align-items-center gy-4"
          >
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
              {!status.isSuccess ? (
                <div className="text-danger mt-3">{status.error}</div>
              ) : (
                ""
              )}
            </div>
            <div className="col-lg-5 col-8 text-center">
              <button type="submit" className="btn btn-dark w-75">
                Login
              </button>
            </div>
          </form>
        </div>
        <div className="col-12 col-lg-6 my-auto p-0 pb-5 pb-lg-0">
          <div className="border border-1 w-75 mx-auto shadow py-5">
            <div className="row flex-column align-items-center text-center justify-content-center gap-5">
              <img
                src="/assets/login.svg"
                alt="login image"
                className="img-thumbnail border-0 col-lg-7 col-8"
              />
              <div className="col-lg-10 d-flex flex-column gap-3">
                <h1>Don't have an account?</h1>
                <span className="fs-4">
                  Get started by creating your new account
                </span>
                <Link to="/register" className="mt-3 text-decoration-none">
                  <button className="btn btn-outline-dark w-50">
                    Register
                  </button>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Login;
