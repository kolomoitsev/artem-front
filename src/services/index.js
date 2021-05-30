import axios from "axios";
import createAuthRefreshInterceptor from "axios-auth-refresh";
import { endpoint } from "../config";

const refreshAuthLogic = (failedRequest) =>
  axios
    .post(`${endpoint}/api/session/refresh`, {
      refresh: `${localStorage.getItem("refresh")}`,
    })
    .then((tokenRefreshResponse) => {
      localStorage.setItem("access", tokenRefreshResponse.data.access);
      localStorage.setItem("refresh", tokenRefreshResponse.data.refresh);
      failedRequest.response.config.headers["Authorization"] =
        "Bearer " + tokenRefreshResponse.data.access;
      return Promise.resolve();
    })
    .catch((err) => {
      console.log(err, "refresh expired");
      window.location.href = "/auth";
    });

createAuthRefreshInterceptor(axios, refreshAuthLogic);
