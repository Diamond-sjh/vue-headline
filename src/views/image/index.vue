<template>
  <el-card>
    <div slot="header">
      <my-bread>素材管理</my-bread>
    </div>
    <!-- 按钮盒子 -->
    <div class="btn-box">
      <el-radio-group v-model="reqParams.collect" size="small">
        <el-radio-button label="false">全部</el-radio-button>
        <el-radio-button label="true">收藏</el-radio-button>
      </el-radio-group>
      <el-button style="float:right" type="success" size="small">添加素材</el-button>
    </div>
    <!-- 素材列表 -->
    <div class="img-list">
      <div class="img-item" v-for="item in images" :key="item.id">
        <img :src="item.url" alt="">
        <div class="option">
          <span class="el-icon-star-off" :class="{red:item.is_collected}"></span>
          <span class="el-icon-delete"></span>
        </div>
      </div>
    </div>
  </el-card>
</template>

<script>
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
      images: []
    }
  },
  created () {
    this.getImages()
  },
  methods: {
    // 获取素材
    async getImages () {
      const { data: { data } } = await this.$http.get('/user/images', { params: this.reqParams })
      this.images = data.results
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
    background: rgba(0, 0, 0, .3);
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
</style>
