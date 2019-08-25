<template>
  <div class="container">
    <el-card class="box-card">
      <img src="../../assets/images/logo_index.png" alt />
      <el-form ref="loginForm" :rules="rules" status-icon :model="loginForm">
        <el-form-item prop="mobile">
          <el-input placeholder="请输入手机号" v-model="loginForm.mobile"></el-input>
        </el-form-item>
        <el-form-item prop="code">
          <el-input
            placeholder="请输入验证码"
            v-model="loginForm.code"
            style="width:65%;margin-right:30px"
          ></el-input>
          <el-button>发送验证码</el-button>
        </el-form-item>
        <el-form-item>
          <el-checkbox :value="true">我已阅读并同意用户协议和隐私条款</el-checkbox>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="login()" style="width:100%;">登录</el-button>
        </el-form-item>
      </el-form>
    </el-card>
  </div>
</template>

<script>
import Store from '@/store'
export default {
  data () {
    // 定义验证手机号码格式的规则
    const checkMobile = (rule, value, callback) => {
      if (!/^1[3-9][0-9]{9}$/.test(value)) {
        return callback(new Error('手机号码格式错误'))
      }
      callback()
    }
    return {
      loginForm: {
        mobile: '18311111111',
        code: '246810'
      },
      // 根据element示例定义校验规则
      rules: {
        mobile: [
          { required: true, message: '请输入手机号码', trigger: 'blur' },
          // 自定义手机号码的规则验证
          { validator: checkMobile, trigger: 'change' }
        ],
        code: [
          { required: true, message: '请输入验证码', trigger: 'blur' },
          { len: 6, message: '请输入6位数字', trigger: 'blur' }
        ]
      }
    }
  },
  methods: {
    login () {
      this.$refs.loginForm.validate((valid) => {
        if (valid) {
          this.$http.post('/mp/v1_0/authorizations', this.loginForm)
            .then((result) => {
              // 调用store/index.js封装的函数存储用户信息
              Store.setUser(result.data.data)
              this.$router.push('/')
            })
            .catch(() => {
              this.$message.error('手机号或者验证码错误')
            })
        }
      })
    }
  }

}
</script>

<style lang="less" scoped>
.container {
  width: 100%;
  height: 100%;
  position: absolute;
  top: 0;
  left: 0;
  background: url(../../assets/images/login_bg.jpg) no-repeat center / cover;
  .box-card {
    width: 450px;
    height: 380px;
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    img {
      display: block;
      width: 60%;
      margin: 0 auto 25px;
    }
  }
}
</style>
