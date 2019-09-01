<template>
  <div class="publish">
    <div class="btn_img" @click="openDialog">
      <img :src="value || defaultImage" alt />
    </div>
    <el-dialog :visible.sync="dialogVisible" width="750px">
      <el-tabs v-model="activeName" type="card">
        <!-- 素材库 -->
        <el-tab-pane label="素材库" name="image">
          <!-- 全部与收藏  按钮 -->
          <el-radio-group v-model="reqParams.collect" size="small" @change="changeCollect">
            <el-radio-button label="false">全部</el-radio-button>
            <el-radio-button label="true">收藏</el-radio-button>
          </el-radio-group>
          <!-- 素材列表 -->
          <div class="img_list">
            <div
              :class="{select:item.url === selectedImageUrl}"
              class="img_item"
              v-for="item in image"
              :key="item.id"
              @click="selectImage(item.url)"
            >
              <img :src="item.url" alt />
            </div>
          </div>
          <!-- 分页 -->
          <el-pagination
            background
            layout="prev, pager, next"
            :total="total"
            :current-page="reqParams.page"
            @current-change="changePage"
          ></el-pagination>
        </el-tab-pane>
        <!-- 上传图片 -->
        <el-tab-pane label="上传图片" name="upload">
          <el-upload
            class="avatar-uploader"
            action="http://ttapi.research.itcast.cn/mp/v1_0/user/images"
            name="image"
            :headers="headers"
            :show-file-list="false"
            :on-success="uploadSuccess"
          >
            <img v-if="uploadImageUrl" :src="uploadImageUrl" class="avatar" />
            <i v-else class="el-icon-plus avatar-uploader-icon"></i>
          </el-upload>
        </el-tab-pane>
      </el-tabs>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="confirmImage">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
// 默认图丢失了,vue-cli 3.0的项目，基于webpack搭建，是一个打包工具，把项目依赖的所有资源，合并到一起（目录下）。
// 依赖的所有资源（import  src  url  href）依赖资源都会打包。渲染后的地址不会打包。自己主动的去导入图片数据即可
import defaultImage from '../assets/images/default.png'
import Store from '@/store'
export default {
  name: 'my-image',
  props: ['value'],
  data () {
    return {
      dialogVisible: false,
      activeName: 'image',
      // 获取素材请求参数
      reqParams: {
        collect: false,
        page: 1,
        per_page: 8
      },
      // 素材列表
      image: [],
      // 素材总图片数量
      total: 0,
      // data申明一个默认图数据
      defaultImage,
      // (素材库)记录点击选中的图片URL
      selectedImageUrl: null,
      // 上传图片请求头
      headers: {
        Authorization: `Bearer ${Store.getUser().token}`
      },
      // (上传图片)上传成功预览的图片地址
      uploadImageUrl: null
    }
  },
  methods: {
    // ---------------------------------打开对话框
    openDialog () {
      // 清空选中图片和上传图片地址
      this.selectedImageUrl = null
      this.uploadImageUrl = null
      // 打开对话框
      this.dialogVisible = true
      // 发送请求获取素材列表
      this.getImage()
    },
    // --------------------------------获取素材
    async getImage () {
      const {
        data: { data }
      } = await this.$http.get('/user/images', { params: this.reqParams })
      this.image = data.results
      this.total = data.total_count
    },
    // --------------------------------切换分页
    changePage (newPage) {
      this.reqParams.page = newPage
      this.getImage()
    },
    // -----------------------------------切换全部与收藏
    changeCollect () {
      this.reqParams.page = 1
      this.getImage()
    },
    // ----------------------------------点击选中的图片
    selectImage (url) {
      this.selectedImageUrl = url
    },
    // ----------------------------------------上传图片成功
    uploadSuccess (res) {
      this.uploadImageUrl = res.data.url
    },
    // ----------------------------------------点击确认按钮，显示预览，关闭对话框
    confirmImage () {
      let url = null
      // 素材库点击确定，将选中的图片展示到页面进行预览
      if (this.activeName === 'image') {
        if (!this.selectedImageUrl) return this.$message.info('请选择一张图片')
        url = this.selectedImageUrl
      } else {
        // 上传图片点击确定，将上传的图片展示到页面进行预览
        if (!this.uploadImageUrl) return this.$message.info('请上传一张图片')
        url = this.uploadImageUrl
      }
      // 把你确认的图片地址 提交给父组件
      this.$emit('input', url)
      // 关闭对话框
      this.dialogVisible = false
    }
  }
}
</script>

<style lang="less" scoped>
.publish {
  display: inline-block;
  margin-right: 20px;
}
.btn_img {
  width: 160px;
  height: 160px;
  border: 1px dashed #ddd;
  img {
    width: 100%;
    height: 100%;
  }
}
.img_list {
  margin-top: 20px;
  .img_item {
    width: 160px;
    height: 120px;
    border: 1px dashed #ddd;
    display: inline-block;
    margin-right: 15px;
    position: relative;
    img {
      width: 100%;
      height: 100%;
      object-fit: contain;
    }
    &.select {
      &::after {
        // .img_item.selected::after{} 解析后选择器
        content: "";
        width: 100%;
        height: 100%;
        position: absolute;
        top: 0;
        left: 0;
        background: rgba(0, 0, 0, 0.2) url(../assets/images/selected.png)
          no-repeat center / 50px;
      }
    }
  }
}
.el-pagination {
  text-align: center;
}
.dialog-footer {
  display: block;
  width: 100%;
  text-align: center;
}
</style>
