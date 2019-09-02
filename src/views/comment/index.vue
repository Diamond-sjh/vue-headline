<template>
  <div class="comment">
    <el-card>
      <!-- 头部面包屑 -->
      <div slot="header">
        <my-bread>评论管理</my-bread>
      </div>
      <!-- 表格 -->
      <el-table :data="comments">
        <el-table-column label="标题" prop="title"></el-table-column>
        <el-table-column label="总评论数" prop="total_comment_count"></el-table-column>
        <el-table-column label="粉丝评论数" prop="fans_comment_count"></el-table-column>
        <el-table-column label="状态">
          <template slot-scope="scope">{{scope.row.comment_status?'正常':'关闭'}}</template>
        </el-table-column>
        <el-table-column label="操作" width="100px">
          <template slot-scope="scope">
            <el-button v-if="scope.row.comment_status" type="danger" size="small" @click="changeStatus(scope.row)">关闭评论</el-button>
            <el-button v-else type="success" size="small" @click="changeStatus(scope.row)">打开评论</el-button>
          </template>
        </el-table-column>
      </el-table>
      <!-- 分页 -->
      <el-pagination
        background
        layout="prev, pager, next"
        :total="total"
        style="text-align:center;margin-top:20px"
        :current-page="reqParmas.page"
        :page-size="reqParmas.per_page"
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
      reqParmas: {
        response_type: 'comment',
        page: 1,
        per_page: 20
      },
      // 评论内容
      comments: [],
      // 文章数量
      total: 0
    }
  },
  created () {
    this.getComments()
  },
  methods: {
    // -----------------------------------获取文章列表
    async getComments () {
      const {
        data: { data }
      } = await this.$http.get('/articles', { params: this.reqParmas })
      // console.log(data)
      this.comments = data.results
      this.total = data.total_count
    },
    // ---------------------------------改变分页
    changePage (newPage) {
      this.reqParmas.page = newPage
      this.getComments()
    },
    // -------------------------------------改变评论状态
    async changeStatus (req) {
      const { data: { data } } = await this.$http.put(`/comments/status?article_id=${req.id}`, { allow_comment: !req.comment_status })
      req.comment_status = data.allow_comment
    }
  }
}
</script>

<style lang="less" scoped>
</style>
