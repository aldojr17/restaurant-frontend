import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { loginApi } from "../../api/auth";
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

  const handleChange = (event: React.FormEvent<HTMLInputElement>) => {
    setInput({
      ...input,
      [event.currentTarget.name]: event.currentTarget.value,
    });
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (input.email === "" || input.password === "") {
      setIsError({
        email: input.email === "",
        password: input.password === "",
      });
      return;
    }
    const status = await loginApi(input);

    if (status.isSuccess) {
      navigate("/", { replace: true });
    } else {
      alert(status);
    }
  };

  return (
    <div className="auth-container d-flex flex-column justify-content-center">
      <h1 className="text-center">Login</h1>
      <form
        onSubmit={handleSubmit}
        className="row flex-column align-items-center gy-4"
      >
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
            Login
          </button>
        </div>
      </form>
      <p className="text-center">
        You don't have an account?
        <Link to="/register" className="ms-2 text-decoration-none">
          <span>Sign Up</span>
        </Link>
      </p>
    </div>
  );
};

export default Login;
