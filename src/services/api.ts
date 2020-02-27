import axios, { AxiosRequestConfig } from "axios";
import qs from "qs";
import { history } from "../store/configureStore";
import { store } from "../index";

// let requestName: string; // 每次发起请求都会携带这个参数，用于标识这次请求，如果值相等，则取消重复请求

switch (process.env.NODE_ENV) {
  case "development":
    // axios.defaults.baseURL = "http://localhost:8083/rest-api/";
    axios.defaults.baseURL = "http://123.56.115.20:8083/rest-api/";
    break;
  case "production":
    axios.defaults.baseURL = "http://report.carryon.top/rest-api/";
    break;
  default:
    axios.defaults.baseURL = "rest-api/";
    break;
}

// axios.defaults.headers.post["Content-Type"] = "application/x-www-form-urlencoded";
// axios.defaults.headers.post["Content-Type"] = "application/x-www-form-urlencoded";

axios.interceptors.request.use(
  (config: AxiosRequestConfig) => {
    // config.headers["X-Requested-With"] = "XMLHttpRequest";
    const regex = /.*csrftoken=([^;.]*).*$/; // 用于从cookies中匹配csrftoken值
    config.headers["X-CSRFToken"] =
      document.cookie.match(regex) === null ? null : document.cookie.match(regex)![1];
    const token = store.getState().token;
    if (token) {
      // console.log("Token " + token);
      config.headers.Authorization = "Token " + token;
    }
    if (config.method === "post") {
      config.data = qs.stringify(config.data)
    }
    return config;
  },
  (error: any) => {
    return Promise.reject(error);
  },
);

// 自定义响应成功的HTTP状态码
axios.defaults.validateStatus = (status): boolean => {
  // console.log(status);
  // console.log(/^(2|3)\d{2}$/.test(status.toString()));
  return /^(2|3)\d{2}$/.test(status.toString());
};

// 响应拦截
axios.interceptors.response.use(
  (response: any) => {
    // 服务器返回了结果，有前面的validateStatus保证，这里接收的只会是2和3开着的状态
    // console.log(response);
    return response;
  },
  (error: any) => {
    // 两种错误返回类型
    console.log(error);
    if (error && error.response && error.response.status) {
      // console.log(error.response.status);
      switch (error.response.status) {
        case 400:
          return Promise.reject(error);
        case 401: // 当前请求用户需要验证，未登录；
          console.log("401");
          history.push("/login");
          return Promise.reject(error);
        case 403: // 服务器拒绝执行，通常是token过期；
          history.push("/login");
          return Promise.reject(error);
        case 404: // 资源找不到；
          history.push("/");
          return Promise.reject(error);
      }
    } else {
      if (!window.navigator.onLine) {
        // 断网处理：可以跳转到断网页面
        history.push("/offline");
        return Promise.reject(error);
      }
      // 服务器无响应又没断网，返回报错
      // history.push("/error");
      return Promise.reject(error);
    }
  },
);

export const baseURL = axios.defaults.baseURL;
export default axios;
