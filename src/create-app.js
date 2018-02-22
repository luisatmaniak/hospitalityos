import Vue from 'vue'
import { sync } from 'vuex-router-sync'
import App from './App'
import createStore from './create-store'
import createRouter from './routes'

const createApp = () => {
  const store = createStore()
  const router = createRouter()

  sync(store, router)

  const app = new Vue({
    router,
    store,
    render: h => h(App),
  })

  return { app, store, router }
}

export default createApp
