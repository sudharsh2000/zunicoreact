import axios from "axios"
import { refreshapi, homeapi } from "./api"

const api = axios.create({
  baseURL: homeapi,
  withCredentials: true,
})


export const setupInterceptors = (auth) => {

  console.log("Interceptor setup complete")

  // REQUEST
api.interceptors.request.use(config => {
  if (!config.headers.Authorization) {
    const token = auth.accessTokenRef.current
    if (token) {
      config.headers.Authorization = `Bearer ${token}`
    }
  }
  return config
})


  // RESPONSE
api.interceptors.response.use(
  response => response,
  async error => {
    console.log("Interceptor error:", error.config)
    const originalRequest = error.config

    if (
      error.response.status === 401 &&
      originalRequest.url.includes("refresh")
    ) {
      auth.logout()
      return Promise.reject(error)
    }

    if (
      error.response?.status === 401 &&
      !originalRequest._retry
    ) {
      originalRequest._retry = true

      try {
        const res = await axios.post(
          refreshapi,
          {},
          { withCredentials: true }
        )

        const newAccess = res.data.access_token
        const decode = res.data.user

        auth.login(newAccess, {
          username: decode.username,
          userid: decode.userid,
          email: decode.email,
          mobile: decode.mobile,
          superuser: decode.is_superuser
        })

        // VERY IMPORTANT
        originalRequest.headers.Authorization =
          `Bearer ${newAccess}`

        return api(originalRequest)

      } catch (err) {
        auth.logout()
        return Promise.reject(err)
      }
    }

    return Promise.reject(error)
  }
)

}

export default api
