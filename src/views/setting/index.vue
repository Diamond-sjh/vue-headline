<template>
  <div class="setting">
    <el-card>
      <!-- 头部面包屑 -->
      <div slot="header">
        <my-bread>个人设置</my-bread>
      </div>
      <!-- 栅格布局 -->
      <el-row>
        <el-col :span="12">
          <!-- form表单 -->
          <el-form label-width="120px" :rules="rules">
            <el-form-item label="编号：">{{userInfo.id}}</el-form-item>
            <el-form-item label="手机：">{{userInfo.mobile}}</el-form-item>
            <el-form-item label="媒体名称：" prop="name">
              <el-input v-model="userInfo.name"></el-input>
            </el-form-item>
            <el-form-item label="媒体介绍：">
              <el-input type="textarea" rows="3" v-model="userInfo.intro"></el-input>
            </el-form-item>
            <el-form-item label="邮箱：">
              <el-input v-model="userInfo.email"></el-input>
            </el-form-item>
            <el-form-item>
              <el-button type="primary" @click="saveSetting">保存设置</el-button>
            </el-form-item>
          </el-form>
        </el-col>
        <el-col :span="12">
          <!-- 上传组件 -->
          <el-upload class="avatar-uploader" action :show-file-list="false" :http-request="upload">
            <img v-if="imageUrl" :src="imageUrl" class="avatar" />
            <i v-else class="el-icon-plus avatar-uploader-icon"></i>
          </el-upload>
          <p style="text-align:center;font-size:14px">修改头像</p>
        </el-col>
      </el-row>
    </el-card>
  </div>
</template>

<script>
import store from '@/store'
import eventBus from '@/components/eventBus'
export default {
  data () {
    return {
      userInfo: {
        name: '',
        intro: '',
        email: '',
        id: null,
        mobile: null
      },
      imageUrl: null,
      rules: {
        name: [
          {
            min: 1,
            max: 7,
            message: '长度在 1 到 7 个字符',
            trigger: 'change'
          },
          { min: 1, max: 7, message: '长度在 1 到 7 个字符', trigger: 'blur' }
        ]
      }
    }
  },
  created () {
    this.getUserInfo()
  },
  methods: {
    // -------------------------------验证用户名长度
    nameLength () {},
    // -----------------------------获取用户信息
    async getUserInfo () {
      const {
        data: { data }
      } = await this.$http.get('/user/profile')
      this.userInfo = data
      this.imageUrl = data.photo
    },
    // -----------------------------修改用户的信息
    async saveSetting () {
      const { name, intro, email } = this.userInfo
      const {
        data: { data }
      } = await this.$http.patch('/user/profile', { name, intro, email })
      // this.userInfo = data
      // 修改成功进行提示
      this.$message.success('信息修改成功')
      // 修改本地存储
      const user = store.getUser()
      user.name = data.name
      store.setUser(user)
      // 更改HOME组件的用户名
      eventBus.$emit('updateName', data.name)
    },
    // -----------------------------修改头像!!!!!!!!!!!!
    async upload (res) {
      // 选择了图片后 执行当前函数
      // console.log(result.file) 就是选中的图片
      // axios + formdata 提交图片
      const formdata = new FormData()
      formdata.append('photo', res.file)
      const { data: { data } } = await this.$http.patch('user/photo', formdata)
      // 上传成功进行提示
      this.$message.success('修改头像成功')
      // 预览
      this.imageUrl = data.photo
      // 更新本地存储的头像
      const user = store.getUser()
      user.photo = data.photo
      store.setUser(user)
      // 更新Home组件的头像
      eventBus.$emit('updatePhoto', data.photo)
    }
  }
}
</script>

<style lang="less" scoped>
</style>
