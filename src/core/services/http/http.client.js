import { $http, API_URL } from '../catalog'
import createAxiosInstance from './axios'

const http = baseUrl => {
  const http = createAxiosInstance(baseUrl)

  http.interceptors.request.use(
    config => config,
    error => {
      if (process.env.NODE_ENV !== 'production') console.error(error)

      return error
    },
  )

  return http
}

Object.assign(http, {
  $name: $http,
  $inject: [API_URL],
})

export default http
