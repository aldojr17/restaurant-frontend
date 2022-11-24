import instance from "./config/axios";

export const menuDetailApi = (payload: number) => {
  return instance
    .get(`/menus/${payload}`)
    .then((response) => response.data)
    .catch((error) => error);
};
