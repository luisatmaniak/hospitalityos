import mapKeys from 'lodash-es/mapKeys'
import Vue from 'vue'

// Getters
export const pagesById = 'pagesById'
export const pageById = 'pageById'
export const pageBySlug = 'pageBySlug'

// Actions
export const requestPageBySlug = 'requestPageBySlug'

// Mutations
export const requestPageStarted = 'requestPageStarted'
export const requestPageFinished = 'requestPageFinished'

const pages = {
  state() {
    return {
      bySlug: {},
      loading: {},
    }
  },

  getters: {
    [pagesById]: ({ bySlug }) => mapKeys(bySlug, page => page.id),

    [pageById]: (state, { pagesById }) => id => pagesById[id],

    [pageBySlug]: ({ bySlug }) => slug => bySlug[slug],
  },

  actions: {
    async [requestPageBySlug]({ commit }, params) {
      commit(requestPageStarted, params)

      try {
        const res = await this.$http.get(`/wp/v2/pages`, { params: { slug: params.slug } })
        if (!res.data || res.data.length < 1) {
          commit(requestPageFinished, { error: { code: 404 }, params })
        } else {
          commit(requestPageFinished, { page: res.data[0], params })
        }
      } catch (error) {
        console.error(error)
        commit(requestPageFinished, { error, params })
      }
    },
  },

  mutations: {
    [requestPageStarted]({ loading }, { slug }) {
      Vue.set(loading, slug, {
        isLoading: true,
        error: null,
      })
    },

    [requestPageFinished]({ bySlug, loading }, { params: { slug }, page, error }) {
      if (page) {
        Vue.set(bySlug, slug, Object.freeze(page))
        Vue.delete(loading, slug)
      } else if (error) {
        Vue.set(loading, slug, {
          isLoading: false,
          error: error,
        })
      }
    },
  },
}

export default pages
