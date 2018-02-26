import { $http, API_URL } from '../catalog'
import { $req } from '../catalog.server'
import createAxiosInstance from './axios'

const http = (baseUrl, req) => {
  const http = createAxiosInstance(baseUrl)

  http.defaults.headers.common = {
    Cookie: req.headers.cookie,
  }

  return http
}

Object.assign(http, {
  $name: $http,
  $inject: [API_URL, $req],
})

export default http
