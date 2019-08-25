import Vue from 'vue'
import VueRouter from 'vue-router'

import Login from '@/views/login'
import Home from '@/views/home'
import Welcome from '@/views/welcome'

import NotFound from '@/views/404'
import Store from '@/store'

Vue.use(VueRouter)

const router = new VueRouter({
  routes: [
    { path: '/login', name: 'login', component: Login },
    {
      path: '/',
      component: Home,
      children: [
        { path: '/', name: 'welcome', component: Welcome }
      ]
    },
    { path: '*', name: '404', component: NotFound }
  ]
})

// 设置导航守卫，控制访问权限
router.beforeEach((to, from, next) => {
  // 获取用户信息token
  const userInfo = Store.getUser()
  // 判断：如果访问的页面不是登录页面 而且 没有用户信息token 跳转到登录页面(path为'/login')
  if (to.path !== '/login' && !userInfo.token) next('/login')
  next()
})

export default router
