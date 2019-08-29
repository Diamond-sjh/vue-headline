// 封装插件
// 规则：模块向外暴露一个对象，对象中选项install，指向的是函数，函数传参Vue 。
// 功能：函数内去实现 插件逻辑业务。
import MyBread from './my-bread.vue'
import MyChannel from './my-channel.vue'

export default {
  install (Vue) {
    Vue.component(MyBread.name, MyBread)
    Vue.component(MyChannel.name, MyChannel)
  }
}
