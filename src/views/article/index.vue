<template>
  <div>
    <el-card>
      <!-- 头部 -->
      <div slot="header">
        <my-bread>内容管理</my-bread>
      </div>
      <!-- 筛选区域 -->
      <el-form label-width="80px" size="small">
        <el-form-item label="状态：">
          <el-radio-group v-model="reqParams.status">
            <el-radio :label="null">全部</el-radio>
            <el-radio :label="0">草稿</el-radio>
            <el-radio :label="1">待审核</el-radio>
            <el-radio :label="2">审核通过</el-radio>
            <el-radio :label="3">审核失败</el-radio>
          </el-radio-group>
        </el-form-item>
        <el-form-item label="频道：">
          <!-- 频道选项 -->
          <!-- 传参:value 父传子 -->
          <my-channel v-model="reqParams.channel_id"></my-channel>
        </el-form-item>
        <el-form-item label="日期：">
          <el-date-picker
            @change="changeDate"
            value-format="yyyy-MM-dd"
            v-model="pubdate"
            type="daterange"
            range-separator="至"
            start-placeholder="开始日期"
            end-placeholder="结束日期"
          ></el-date-picker>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="search()">筛选</el-button>
        </el-form-item>
      </el-form>
    </el-card>
    <!-- 内容区域 -->
    <el-card>
      <div slot="header">根据筛选条件共查询到 {{total_count}} 条结果：</div>
      <!-- 表格 -->
      <el-table :data="total">
        <el-table-column prop="cover" label="封面">
          <template slot-scope="scope">
            <el-image
              :src="scope.row.cover.images[0]"
              style="width: 120px; height: 100px"
              fit="cover"
            >
              <div slot="error">
                <img src="../../assets/images/error.gif" alt style="width: 120px; height: 100px" />
              </div>
            </el-image>
          </template>
        </el-table-column>
        <el-table-column prop="title" label="标题"></el-table-column>
        <el-table-column label="状态">
          <template slot-scope="scope">
            <el-tag v-if="scope.row.status === 0" type="info">草稿</el-tag>
            <el-tag v-if="scope.row.status === 1">待审核</el-tag>
            <el-tag v-if="scope.row.status === 2" type="success">审核通过</el-tag>
            <el-tag v-if="scope.row.status === 3" type="warning">审核失败</el-tag>
            <el-tag v-if="scope.row.status === 4" type="danger">已删除</el-tag>
          </template>
        </el-table-column>
        <el-table-column prop="pubdate" label="发布时间"></el-table-column>
        <el-table-column label="操作" width="120">
          <template slot-scope="scope">
          <el-button type="primary" icon="el-icon-edit" circle @click="edit(scope.row.id)"></el-button>
          <el-button type="danger" icon="el-icon-delete" circle @click="delArticles(scope.row.id)"></el-button>
          </template>
        </el-table-column>
      </el-table>
      <!-- 分页 -->
      <el-pagination
        background
        layout="prev, pager, next, total"
        :total="total_count"
        :current-page="reqParams.page"
        :page-size="reqParams.per_page"
        @current-change='changePage'
      ></el-pagination>
    </el-card>
  </div>
</template>

<script>
export default {
  data () {
    return {
      // 请求参数
      reqParams: {
        status: null,
        channel_id: null,
        begin_pubdate: null,
        end_pubdate: null,
        page: 1,
        per_page: 20
      },
      // 频道列表参数 =>封装
      // channels: [],
      // 日期参数
      pubdate: [],
      // 文章内容列表
      total: [],
      // 文章总条数
      total_count: 0
    }
  },
  created () {
    // 页面加载发送axios请求获取文章频道
    // this.getChannels()
    // 页面加载发送axios请求获取文章列表
    this.getTotal()
  },
  methods: {
    // 编辑文章
    edit (id) {
      // 发布文章和编辑文章是同一个路由，因此不能使用params传参，只能使用query传参
      this.$router.push(`/publish?id=${id}`)
    },
    // -----------------------------------------删除数据的信息
    // 由于后台数据过大，超出最大安全值，使得数据产生误差，因此使用json-bigint模块处理id数据(api/index.js)
    delArticles (id) {
      this.$confirm('此操作将永久删除该条目, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(async () => {
        // 点击确定执行的操作
        // 发送请求删除数据，重新获取内容列表
        await this.$http.delete(`/articles/${id}`)
        this.$message.success('条目删除成功')
        this.getTotal()
      }).catch(() => {
        // 点击取消执行的操作
      })
    },
    // ------------------------------------------------筛选方法
    search () {
      // 每次查询的时候。当前页码在第一页
      this.reqParams.page = 1
      this.getTotal()
    },
    // --------------------------------------------------获取文章内容列表
    async getTotal () {
      const {
        data: { data }
      } = await this.$http.get('/articles', { params: this.reqParams })
      this.total = data.results
      this.total_count = data.total_count
    },
    // ------------------------------------------------获取文章频道
    // 封装在公用组件中components/my-channel.vue
    // -----------------------------------------处理时间范围信息,内容发生变化调用
    changeDate (pubdate) {
      if (pubdate) {
        this.reqParams.begin_pubdate = pubdate[0]
        this.reqParams.end_pubdate = pubdate[1]
      } else {
        this.reqParams.begin_pubdate = null
        this.reqParams.end_pubdate = null
      }
    },
    // ------------------------------------------切换分页
    changePage (newPage) {
      this.reqParams.page = newPage
      this.getTotal()
    }
  }
}
</script>

<style lang="less" scoped>
.el-card {
  margin-bottom: 20px;
}
.el-pagination {
  margin-top: 20px;
  text-align: center;
}
</style>
