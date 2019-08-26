import Vue from 'vue'
import App from './App.vue'

import router from '@/routers'

import Axios from '@/api'

// 引入element-ui模块和CSS文件
import ElementUi from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'

// 引入自定义插件
import MyPlugin from '@/components'

Vue.use(ElementUi)
Vue.use(MyPlugin)
Vue.prototype.$http = Axios

Vue.config.productionTip = false

new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
