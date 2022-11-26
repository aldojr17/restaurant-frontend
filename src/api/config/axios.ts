import axios from "axios";

const instance = axios.create({
  baseURL: "http://localhost:8080",
  timeout: 60000,
});

instance.interceptors.request.use(
  (config) => {
    const newConfig = {
      ...config,
      headers: {
        ...config.headers,
        Authorization: localStorage.getItem("sessionId"),
      },
    };
    return newConfig;
  },
  (error) => {
    Promise.reject(error);
  }
);

export const handleHttpResponse = (status: string, message?: string) => {
  switch (status) {
    case "0": {
      return "Network Error";
    }
    case "404": {
      return "Data Not Found";
    }
    case "400": {
      return message;
    }
    case "500": {
      return new Error("Internal Server Error");
    }
    default: {
      return new Error(`${message || ""}`);
    }
  }
};

instance.interceptors.response.use(
  (res) => {
    if (res.data.token) {
      localStorage.setItem("sessionId", `Bearer ${res.data.token}`);
    }
    return res;
  },
  (err) => {
    const error = err && err.response && err.response.data;
    if (error && error.error === "unauthorized") {
      localStorage.clear();
      window.location.replace("/");
      throw "Invalid credential";
    } else {
      if (err.code === "ERR_NETWORK") {
        throw handleHttpResponse("0");
      } else {
        throw error;
      }
    }
  }
);

export default instance;
