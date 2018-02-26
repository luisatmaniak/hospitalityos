import Vue from 'vue'
import Vuex from 'vuex'
import inject from './core/store/inject-plugin'
import pages from './core/pages/pages'

Vue.use(Vuex)

const createStore = diContainer => {
  return new Vuex.Store({
    strict: process.env.NODE_ENV !== 'production',
    modules: {
      pages,
    },
    plugins: [inject(diContainer)],
  })
}

export default createStore
