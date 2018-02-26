import Vue from 'vue'
import { sync } from 'vuex-router-sync'
import App from './App'
import AppProvider from './core/components/AppProvider'
import createStore from './create-store'
import createRouter from './routes'

Vue.config.optionMergeStrategies.asyncData = Vue.config.optionMergeStrategies.method

const createApp = diContainer => {
  const store = createStore(diContainer)
  const router = createRouter(diContainer)

  sync(store, router)

  const app = new Vue({
    router,
    store,
    render() {
      return (
        <AppProvider container={diContainer}>
          <App />
        </AppProvider>
      )
    },
  })

  return { app, store, router }
}

export default createApp
