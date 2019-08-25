// 1. 定义存储用户信息(token)的函数
// 2. 定义获取用户信息(token)的函数
// 3. 定义清除用户信息(token)的函数
// -- 定义key的值
const key = 'token'
export default {
  // 把user对象存储到sessionStorage
  setUser (user) {
    // sessionStorage.setItem(key,value)
    const userData = JSON.stringify(user)
    sessionStorage.setItem(key, userData)
  },
  // 把sessionStorage获取出来，转换对象。
  getUser () {
    const userData = sessionStorage.getItem(key) || '{}'
    return JSON.parse(userData)
  },
  // 删除 KEY 对应的数据
  delUser () {
    sessionStorage.removeItem(key)
  }
}
