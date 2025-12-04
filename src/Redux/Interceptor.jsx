import axios from "axios";
import { jwtDecode } from "jwt-decode";
import { refreshapi, homeapi } from "./api";

const api = axios.create({ baseURL: homeapi, withCredentials: true });
const plainAxios = axios.create({ withCredentials: true }); // retry without interceptor

export const setupInterceptors = (auth) => {
  const { accesstoken, login, logout } = auth;

  api.interceptors.request.use(
    (config) => {
      if(auth?.access_token){
      if (accesstoken) config.headers.Authorization = `Bearer ${accesstoken}`;
      }
      return config;
    },
    (error) => Promise.reject(error)
  );

  api.interceptors.response.use(
    (res) => res,
    async (error) => {
      const originalRequest = error.config;

      if (error.response?.status === 401 && !originalRequest._retry) {
        originalRequest._retry = true;

        try {
          const res = await plainAxios.post(refreshapi, { withCredentials: true });
       
          const newAccess = res.data.access_token;

          const decode = jwtDecode(newAccess);
          
          login(newAccess, {
            'username':decode.username,
        'userid':decode.user_id,
        
        'mobile':decode.mobile,
        'email':decode.Email_address,
        'superuser':decode.superuser
            
          });
        

          originalRequest.headers.Authorization = `Bearer ${newAccess}`;
    
          return api(originalRequest); // ✅ retry without interceptor
        } catch (err) {
          console.log('refresh error')
          logout();
          return Promise.reject(err);
        }
      }

      return Promise.reject(error);
    }
  );
};

export default api;
