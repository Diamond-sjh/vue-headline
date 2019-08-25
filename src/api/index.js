// 配置axios
import Axios from 'axios'
import Store from '@/store'
import router from '@/routers'

// 配置基准地址
Axios.defaults.baseURL = 'http://ttapi.research.itcast.cn//mp/v1_0/'
// 配置请求头信息(携带token)：main.js入口文件，在页面初始化的时候执行一次，路由跳转不会重新执行main.js的代码，所以token为空
// 解决方案：在每一次请求前，重新获取token，设置给请求头即可。
// Axios.defaults.headers.Authorization = `Bearer ${Store.getUser().token}`

// 添加请求拦截器(config代表配置信息)在每一次请求前，重新获取token，设置给请求头
Axios.interceptors.request.use((config) => {
  // 在发送请求之前重新获取token，设置给请求头
  config.headers.Authorization = `Bearer ${Store.getUser().token}`
  return config
}, (error) => {
  // 对请求错误做些什么
  return Promise.reject(error)
})

// token有效时间两个小时，失效后服务器清除所存储的token，这时候发送axios请求所传递的token值服务器不能识别，返回错误信息，需要重新登录保存token，使用响应拦截器
// 添加响应拦截器
Axios.interceptors.response.use(response => response, error => {
  console.log(error.response)
  // 请求失败的时候，判断状态码是否为401，如果是那么清除本地token，跳转登录页面重新登录保存token
  if (error.response.status === 401) {
    // 清除本地token
    Store.delUser()
    // 跳转登录页面
    router.push('/login')
  }
  // 对响应错误做点什么
  return Promise.reject(error)
})

export default Axios
