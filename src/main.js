import Vue from 'vue'
import axios from 'axios'
import App from './App.vue'
import router from './router'
import './plugins/element.js'

// 设置默认请求路径
axios.defaults.baseURL = 'http://127.0.0.1:7000/'
// 请求超时时间
axios.defaults.timeout = 10000
// 把axios请求挂载到Vue的实例上
Vue.prototype.$http = axios
// 设置请求拦截器
axios.interceptors.request.use(config => {
  // 获取token
  const token = localStorage.getItem('token')
  // 如果令牌存在, 添加token请求头
  token && (config.headers.Authorization = 'Bearer ' + token)
  return config
})
// 响应拦截器
axios.interceptors.response.use(null, err => {
  // console.log(this.$router)
  if (err.response.status === 401) { // 没有登录、令牌过期、清除令牌
    localStorage.setItem('token', '')
    // this.$router.push('/login')
  }
  return Promise.reject(err)
})
// 阻止显示生产信息
Vue.config.productionTip = false

new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
