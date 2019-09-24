import Vue from 'vue'
import App from './App.vue'

import router from './premission' // 导入权限中得到路由

import ElementUI from 'element-ui'// 导入element-ui
import 'element-ui/lib/theme-chalk/index.css'// 引入样式
import './styles/index.less' // 引入静态资源样式
import axios from './utils/axiosconfig'
import Common from './components/common/common.js'

Vue.config.productionTip = false
Vue.use(ElementUI)// 全局注册element-ui组件
Vue.use(Common)
Vue.use(axios)
new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
