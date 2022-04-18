import Vue from 'vue'
import VueRouter from 'vue-router'
import { getToken } from '@/helpers/helpers'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    redirect: '/pages/login',
  },
  {
    path: '/dashboard',
    name: 'dashboard',
    meta: { layout: 'main', auth: true },
    component: () => import('../views/dashboard/Dashboard'),
  },
  {
    path: '/GSKO-dashboard',
    name: 'GSKO-dashboard',
    meta: { layout: 'main', auth: true },
    component: () => import('../views/GSKO/Dashboard.vue'),
  },
  {
    path: '/GSKO-dashboard/detail',
    name: 'Detaile',
    meta: { layout: 'main', auth: true },
    component: () => import('../views/GSKO/Detaile.vue'),
  },
  {
    path: '/detaile',
    name: 'detaile',
    meta: { layout: 'main', auth: true },
    component: () => import('../views/dashboard/DashboardDetaile.vue'),
  },
  {
    path: '/typography',
    name: 'typography',
    meta: { layout: 'main', auth: true },
    component: () => import('../views/typography/Typography.vue'),
  },
  {
    path: '/icons',
    name: 'icons',
    meta: { layout: 'main', auth: true },
    component: () => import('../views/icons/Icons.vue'),
  },
  {
    path: '/cards',
    name: 'cards',
    meta: { layout: 'main', auth: true },
    component: () => import('../views/cards/Card.vue'),
  },
  {
    path: '/simple-table',
    name: 'simple-table',
    meta: { layout: 'main', auth: true },
    component: () => import('../views/simple-table/SimpleTable.vue'),
  },
  {
    path: '/form-layouts',
    name: 'form-layouts',
    meta: { layout: 'main', auth: true },
    component: () => import('../views/form-layouts/FormLayouts.vue'),
  },
  {
    path: '/pages/account-settings',
    name: 'pages-account-settings',
    meta: { layout: 'main', auth: true },
    component: () => import('../views/pages/account-settings/AccountSettings.vue'),
  },
  {
    path: '/pages/login',
    name: 'pages-login',
    component: () => import('../views/pages/Login.vue'),
    meta: {
      layout: 'blank',
    },
  },
  {
    path: '/pages/register',
    name: 'pages-register',
    component: () => import('../views/pages/Register.vue'),
    meta: {
      layout: 'blank',
    },
  },
  {
    path: '/error-404',
    name: 'error-404',
    component: () => import('../views/Error.vue'),
    meta: {
      layout: 'blank',
    },
  },
  {
    path: '*',
    redirect: 'error-404',
  },
]

const router = new VueRouter({
  // mode: 'history',
  base: process.env.BASE_URL,
  routes,
})

router.beforeEach((to, from, next) => {
  const requireAuth = to.matched.some(record => record.meta.auth)
  const currentUser = getToken()

  if (requireAuth && !currentUser) {
    next('/pages/login')
  } else {
    next()
  }
})

export default router
