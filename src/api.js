import axios from 'axios'

const apiBase = 'http://hospitalityos.test/wp-json'

export const findPageBySlug = async slug => {
  const res = await axios.get(`${apiBase}/hospitalityos/v1/page`, {
    params: { slug },
  })

  return res.data
}
