import instance from "./config/axios";

export interface ILoginPayload {
  email: string;
  password: string;
}

export interface IRegisterPayload {
  name: string;
  email: string;
  password: string;
}

export const loginApi = (payload: ILoginPayload) => {
  return instance
    .post("/login", payload)
    .then((response) => response)
    .then((data) => data)
    .catch((error) => error);
};

export const registerApi = (payload: IRegisterPayload) => {
  return instance
    .post("/register", payload)
    .then((response) => response)
    .then((data) => data)
    .catch((error) => error);
};
