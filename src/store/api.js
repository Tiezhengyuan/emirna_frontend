import axios from "axios";

export const endpoint = axios.create({
  // baseURL: process.env.VUE_APP_ROOT_API,
  auth: {
    username: "admin",
    password: "admin",
  },
});

export const api = axios.create({
  // baseURL: process.env.VUE_APP_ROOT_API,
  auth: {
    username: "admin",
    password: "admin",
  },
  transformResponse(res) {
    try {
      return JSON.parse(res);
    } catch (e) {
      return res;
    }
  },
});

export const test_api = axios.create({
  baseURL: "https://yesno.wtf/api",
  transformResponse(res) {
    res = JSON.parse(res);
    return res;
  },
});

export const smartscope_api = axios.create({
  baseURL: "https://viewer.smartscope.org/api/",
  headers: {
    Authorization: "token 9e857ca09d2498f1a10231eb5a9dddd186c95dcf",
  },
  transformResponse(res) {
    res = JSON.parse(res);
    return res;
  },
});
