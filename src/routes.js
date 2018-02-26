import Vue from 'vue'
import VueRouter from 'vue-router'
import HosPageRoute from './core/pages/HosPageRoute'

Vue.use(VueRouter)

const createRouter = () =>
  new VueRouter({
    mode: 'history',
    routes: [{ path: '/:slug', component: HosPageRoute }],
  })

export default createRouter
