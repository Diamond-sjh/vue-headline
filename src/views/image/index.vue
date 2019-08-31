<template>
  <el-card>
    <div slot="header">
      <my-bread>素材管理</my-bread>
    </div>
    <!-- 按钮盒子 -->
    <div class="btn-box">
      <el-radio-group @change="changeCollect" v-model="reqParams.collect" size="small">
        <el-radio-button label="false">全部</el-radio-button>
        <el-radio-button label="true">收藏</el-radio-button>
      </el-radio-group>
      <el-button style="float:right" type="success" size="small" @click="openDialog">添加素材</el-button>
    </div>
    <!-- 素材列表 -->
    <div class="img-list">
      <div class="img-item" v-for="item in images" :key="item.id">
        <img :src="item.url" alt />
        <div class="option">
          <span
            @click="toggleCollect(item)"
            class="el-icon-star-off"
            :class="{red:item.is_collected}"
          ></span>
          <span class="el-icon-delete" @click="deleteImage(item.id)"></span>
        </div>
      </div>
    </div>
    <!-- 分页 -->
    <el-pagination
      @current-change="changePage"
      :current-page="reqParams.page"
      background
      layout="prev, pager, next"
      :total="totalCount"
      hide-on-single-page
    ></el-pagination>
    <!-- 弹窗 -->
    <el-dialog title="添加素材" :visible.sync="dialogVisible" width="300px">
      <!-- 上传组件 -->
      <el-upload
        class="avatar-uploader"
        action="http://ttapi.research.itcast.cn/mp/v1_0/user/images"
        :show-file-list="false"
        :on-success="handleSuccess"
        :headers="headers"
        name="image"
      >
        <img v-if="imageUrl" :src="imageUrl" class="avatar" />
        <i v-else class="el-icon-plus avatar-uploader-icon"></i>
      </el-upload>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible = false">取 消</el-button>
      </div>
    </el-dialog>
  </el-card>
</template>

<script>
import store from '@/store'
import { setTimeout } from 'timers'
export default {
  data () {
    return {
      // 请求参数
      reqParams: {
        collect: false,
        page: 1,
        per_page: 10
      },
      // 素材列表
      images: [],
      // 总条目数
      totalCount: 0,
      // 控制弹窗显示 false 隐藏   true 显示
      dialogVisible: false,
      // 设置请求头
      headers: {
        Authorization: 'Bearer ' + store.getUser().token
      },
      //  预览图片的地址
      imageUrl: null
    }
  },
  created () {
    this.getImages()
  },
  methods: {
    // ------------------------------------------获取素材
    async getImages () {
      const {
        data: { data }
      } = await this.$http.get('/user/images', { params: this.reqParams })
      this.images = data.results
      this.totalCount = data.total_count
    },
    // -------------------------------------------------切换分页
    changePage (newPage) {
      this.reqParams.page = newPage
      this.getImages()
    },
    // ----------------------------------------------改变全部和收藏
    changeCollect () {
      this.reqParams.page = 1
      this.getImages()
    },
    // ---------------------------------------收藏和取消收藏(需要两个参数，素材id和素材当前是否被收藏)
    async toggleCollect (item) {
      const {
        data: { data }
      } = await this.$http.put(`/user/images/${item.id}`, {
        collect: !item.is_collected
      })
      this.$message.success(data.collect ? '添加收藏成功' : '取消收藏成功')
      item.is_collected = data.collect
    },
    // ---------------------------------------删除素材
    deleteImage (id) {
      this.$confirm('此操作将永久删除该文件, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      })
        .then(async () => {
          await this.$http.delete(`/user/images/${id}`)
          this.$message.success('删除成功')
          this.getImages()
        })
        .catch(() => {})
    },
    // ---------------------------------------点击添加素材打开对话框
    openDialog () {
      this.dialogVisible = true
      // 清除上次添加的图片预览地址
      this.imageUrl = null
    },
    // -----------------------------------上传素材成功后的处理方法
    handleSuccess (res) {
      // 提示上传成功
      this.$message.success('上传成功')
      // 预览图片(组件上传文件时，得到的响应是响应主体)
      this.imageUrl = res.data.url
      // 2s后关闭弹窗,更新素材列表(从第一页获取)
      setTimeout(() => {
        this.dialogVisible = false
        this.reqParams.page = 1
        this.getImages()
      }, 2000)
    }
  }
}
</script>

<style lang="less" scoped>
.img-list {
  margin-top: 20px;
}
.img-item {
  width: 160px;
  height: 160px;
  position: relative;
  margin-right: 50px;
  margin-bottom: 20px;
  border: 1px dashed #ddd;
  display: inline-block;
  img {
    display: block;
    width: 100%;
    height: 100%;
  }
  .option {
    background: rgba(0, 0, 0, 0.3);
    width: 100%;
    height: 30px;
    line-height: 30px;
    position: absolute;
    left: 0;
    bottom: 0;
    color: #fff;
    text-align: center;
    span {
      margin: 0 20px;
      &.red {
        color: red;
      }
    }
  }
}
.el-pagination {
  text-align: center;
}
</style>
