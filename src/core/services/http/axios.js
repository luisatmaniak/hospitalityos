import * as axios from 'axios'

const createAxiosInstance = baseURL => {
  return axios.create({
    baseURL,
    headers: {
      Accept: 'application/json',
    },
  })
}

export default createAxiosInstance
