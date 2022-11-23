import instance from "./config/axios";

export interface IRegisterPayload {
  fullname: string;
  email: string;
  password: string;
}

export const registerApi = (payload: IRegisterPayload) => {
  return instance
    .post("/register", payload)
    .then((response) => response.data)
    .catch((error) => error);
};
