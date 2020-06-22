import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

const routes = [
  { path: '/', redirect: '/login' },
  { path: '/login', component: () => import('../components/Login.vue') },
  { path: '/register', component: () => import('../components/Register.vue') },
  { path: '/home', component: () => import('../components/Home.vue') }
]

const router = new VueRouter({
  routes
})

// 挂载路由导航守卫， 拦截路由是否登录
router.beforeEach((to, from, next) => {
  if (to.path === '/login' || to.path === '/register') return next()
  // 获取token, 如果没有拿到说明没有登录或者过期
  const tokenStr = window.localStorage.getItem('token')
  // if (!tokenStr) return next({ path: '/login', query: { redirect: to.path } })
  if (!tokenStr) return next({ path: '/login' })
  next()
})

export default router
