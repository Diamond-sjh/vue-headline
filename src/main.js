import Vue from 'vue'
import App from './App.vue'

// @为src文件夹的绝对路径   在Vue-cli项目中才可以使用
// 目录默认的索引文件  index文件   .js .vue .json 优先级按照现在的顺序
import router from '@/routers'

import Axios from '@/api'

import '@/styles/index.less'

// 引入element-ui模块和CSS文件
import ElementUi from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'

// 引入自定义插件
import MyPlugin from '@/components'

Vue.use(ElementUi)
Vue.use(MyPlugin)
Vue.prototype.$http = Axios

// 产品级别提示  不开启  开发阶段 提示越详细越好  开发级别提示
Vue.config.productionTip = false

new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
