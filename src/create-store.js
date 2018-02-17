import Vue from 'vue'
import Vuex from 'vuex'
import * as api from './api'

Vue.use(Vuex)

const createStore = () => {
  return new Vuex.Store({
    state: {
      pages: {},
    },
    actions: {
      requestPageBySlug: async ({ commit }, { slug }) => {
        commit('REQUEST_PAGE')

        try {
          const page = await api.findPageBySlug(slug)
          commit('REQUEST_PAGE_SUCCESS', { page })
        } catch (error) {
          commit('REQUEST_PAGE_FAIL', { error })
        }
      },
    },
    mutations: {
      REQUEST_PAGE_SUCCESS(state, { page }) {
        state.pages = { ...state.pages, [page.slug]: page }
      },
    },
  })
}

export default createStore
