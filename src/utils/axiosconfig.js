// 统一处理请求拦截---到达后台之前---为了解决每次axios访问时都要携带token
import axios from 'axios'
import router from '../router'
import { Message } from 'element-ui' // 为了弹出对于异常数据的显示信息
import JSONBig from 'json-bigint'
axios.defaults.baseURL = 'http://ttapi.research.itcast.cn/mp/v1_0'
// 后台返回数据之后，axios的默认处理
axios.defaults.transformResponse = [function (data) {
  // console.log(data, 12)
  // console.log(data)
  // return JSONBig.parse(data)
  return data ? JSONBig.parse(data) : {}
}]
// 在发送请求到达后台之前，给各个接口塞个token
axios.interceptors.request.use(function (config) {
  let token = window.localStorage.getItem('user-token')
  config.headers['Authorization'] = `Bearer ${token}`
  return config
}, function (err) {
  return Promise.reject(err)
})

// 统一处理响应拦截--到达then之前，可对后台返回的数据进行处理
axios.interceptors.response.use(function (response) {
  return response.data ? response.data : {}
}, function (err) {
  let status = err.response.status
  let message = '未知错误'
  switch (status) {
    case 400:
      message = '请求参数错误'
      break
    case 507:
      message = '403 refresh_token未携带或已过期'
      break
    case 403:
      message = '服务器数据库异常'
      break
    case 401:
      message = 'token过期或未出'
      window.localStorage.clear()
      //   this.$router==router
      router.push('/login')
      break

    default:
      break
  }
  Message({ message })
  // 为了对统一的请求失败，进行响应，不会再进入catch中
  return new Promise(function () {})
})
export default {
  install (Vue) {
    Vue.prototype.$http = axios // 将axios共享给所有实例
  }
}
