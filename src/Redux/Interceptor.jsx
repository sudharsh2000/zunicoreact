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

  // REQUEST
  api.interceptors.request.use(config => {
    const token = auth.accessTokenRef.current
    console.log("Request token:", token)

    if (token) {
      config.headers.Authorization = `Bearer ${token}`
    }
    return config
  })

  // RESPONSE
api.interceptors.response.use(
  response => {
    console.log("Interceptor response called")
    return response
  },
  async error => {
    const originalRequest = error.config
    console.log("Interceptor error:", error.response?.status)
    console.log(error.response.status )
    // 🚨 refresh API itself failed
    if (
      error.response?.status === 401 &&
      originalRequest.url.includes("refresh")
    ) {
      auth.logout()
      return Promise.reject(error)
    }

    if (error.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true

      if (isRefreshing) {
        return new Promise((resolve, reject) => {
          failedQueue.push({ resolve, reject })
        }).then(token => {
          originalRequest.headers.Authorization = `Bearer ${token}`
          return api(originalRequest)
        })
      }

      isRefreshing = true

      try {
        console.log("Calling refresh API")

        const res = await axios.post(
          refreshapi,
          {},
          { withCredentials: true }
        )
          console.log("Refresh API response:", res.data)
        const newAccess = res.data.access_token
        const decode = res.data.user

        auth.login(newAccess, {
          username: decode.username,
          userid: decode.userid,
          email: decode.email,
          mobile: decode.mobile,
          superuser: decode.is_superuser
        })

        processQueue(null, newAccess)

        originalRequest.headers.Authorization = `Bearer ${newAccess}`
        return api(originalRequest)

      } catch (err) {
        processQueue(err, null)
        auth.logout()
        return Promise.reject(err)
      } finally {
        isRefreshing = false
      }
    }

    return Promise.reject(error)
  }
)

}

export default api
