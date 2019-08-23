import Vue from 'vue'
import App from './App.vue'

import router from '@/routers'

import Axios from 'axios'

// 引入element-ui模块和CSS文件
import ElementUi from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'

Vue.use(ElementUi)
Axios.defaults.baseURL = 'http://ttapi.research.itcast.cn/'
Vue.prototype.$http = Axios

Vue.config.productionTip = false

new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
