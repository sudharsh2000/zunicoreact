// Interceptor.js
import axios from "axios"
import { refreshapi, homeapi } from "./api"

const api = axios.create({
  baseURL: homeapi,
  withCredentials: true,
})

let isRefreshing = false
let failedQueue = []

const processQueue = (error, token = null) => {
  failedQueue.forEach(prom => {
    if (error) prom.reject(error)
    else prom.resolve(token)
  })
  failedQueue = []
}

export const setupInterceptors = (auth) => {

  api.interceptors.request.use(config => {
    const token = auth.accessTokenRef.current; // ✅ read LIVE value
    console.log("Interceptor request token:", auth); // ✅ read LIVE value
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  });

  api.interceptors.response.use(
    console.log("Interceptor response called"),
    response => response,
    async error => {
      const originalRequest = error.config;

      console.log("Interceptor error:", error.response?.status);

      if (error.response?.status === 401 && !originalRequest._retry) {
        originalRequest._retry = true;

        if (isRefreshing) {
          return new Promise((resolve, reject) => {
            failedQueue.push({ resolve, reject });
          }).then(token => {
            originalRequest.headers.Authorization = `Bearer ${token}`;
            return api(originalRequest);
          });
        }

        isRefreshing = true;

        try {
          console.log("Calling refresh API");

          const res = await axios.post(
            refreshapi,
            {},
            { withCredentials: true }
          );

          const newAccess = res.data.access_token;
          const user = res.data.user;

          login(newAccess, user);

          processQueue(null, newAccess);

          originalRequest.headers.Authorization = `Bearer ${newAccess}`;
          return api(originalRequest);

        } catch (err) {
          processQueue(err, null);
          logout();
          return Promise.reject(err);
        } finally {
          isRefreshing = false;
        }
      }

      return Promise.reject(error);
    }
  );
};


export default api
