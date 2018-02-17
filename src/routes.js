import Vue from 'vue'
import VueRouter from 'vue-router'
import Page from './pages/Page'

Vue.use(VueRouter)

const createRouter = () =>
  new VueRouter({
    mode: 'history',
    routes: [{ path: '/:slug', component: Page }],
  })

export default createRouter
