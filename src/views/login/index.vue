<template>
  <div class="container">
    <el-card class="box-card">
      <img src="../../assets/images/logo_index.png" alt />
      <el-form ref="form" :model="loginForm">
        <el-form-item>
          <el-input placeholder="请输入手机号" v-model="loginForm.mobile"></el-input>
        </el-form-item>
        <el-form-item>
          <el-input
            placeholder="请输入验证码"
            v-model="loginForm.code"
            style="width:70%;margin-right:25px"
          ></el-input>
          <el-button>发送验证码</el-button>
        </el-form-item>
        <el-form-item>
          <el-checkbox :value='true'>我已阅读并同意用户协议和隐私条款</el-checkbox>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" style="width:100%;">登录</el-button>
        </el-form-item>
      </el-form>
    </el-card>
  </div>
</template>

<script>
export default {
  data () {
    return {
      loginForm: {
        mobile: '',
        code: ''
      }
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
    width: 500px;
    height: 400px;
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
