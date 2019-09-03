<template>
  <div class="fans">
    <el-card>
      <!-- 头部 -->
      <div slot="header">
        <my-bread>粉丝管理</my-bread>
      </div>
      <!-- 粉丝tabs -->
      <el-tabs v-model="activeName" type="card">
        <el-tab-pane label="粉丝列表" name="list">
          <!-- 粉丝列表 -->
          <div class="fans_list">
            <div class="fans_item" v-for="item in fansList" :key="item.id.toString()">
              <el-avatar :size="80" :src="item.photo">
                <!-- <img :src="item.photo" alt /> -->
              </el-avatar>
              <p>粉丝名字</p>
              <el-button type="primary" size="small" plain>+关注</el-button>
            </div>
          </div>
          <!-- 分页 -->
          <el-pagination
            background
            layout="prev, pager, next"
            :total="total"
            :current-page="reqParams.page"
            :page-size="reqParams.per_page"
            @current-change="changePage"
            style="text-align:center;margin-top:20px"
          ></el-pagination>
        </el-tab-pane>
        <el-tab-pane label="粉丝画像" name="photo">
          <!-- 粉丝画像 -->
          <!-- 为 echarts 准备一个具备高宽的 DOM 容器 -->
          <div ref="bar" style="width: 600px;height:400px;"></div>
        </el-tab-pane>
      </el-tabs>
    </el-card>
  </div>
</template>

<script>
import echarts from 'echarts'
export default {
  data () {
    return {
      activeName: 'list',
      // 获取粉丝列表请求参数
      reqParams: {
        page: 1,
        per_page: 27
      },
      // 粉丝列表
      fansList: [],
      // 总条目数
      total: 0
    }
  },
  created () {
    this.getFans()
  },
  mounted () {
    // 获取容器的DOM元素
    var myChart = echarts.init(this.$refs.bar)
    // 绘制图表
    myChart.setOption({
      color: ['#3398DB'],
      tooltip: {
        trigger: 'axis',
        axisPointer: {
          // 坐标轴指示器，坐标轴触发有效
          type: 'shadow' // 默认为直线，可选为：'line' | 'shadow'
        }
      },
      grid: {
        left: '3%',
        right: '4%',
        bottom: '3%',
        containLabel: true
      },
      xAxis: [
        {
          type: 'category',
          data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
          axisTick: {
            alignWithLabel: true
          }
        }
      ],
      yAxis: [
        {
          type: 'value'
        }
      ],
      series: [
        {
          name: '直接访问',
          type: 'bar',
          barWidth: '60%',
          data: [10, 52, 200, 334, 390, 330, 220]
        }
      ]
    })
  },
  methods: {
    // ------------------------------------获取粉丝列表
    async getFans () {
      const {
        data: { data }
      } = await this.$http.get('/followers', { params: this.reqParams })
      this.fansList = data.results
      this.total = data.total_count
    },
    // -------------------------------------切换分页
    changePage (newPage) {
      this.reqParams.page = newPage
      this.getFans()
    }
  }
}
</script>

<style lang="less" scoped>
.fans_item {
  width: 120px;
  height: 170px;
  text-align: center;
  border: 1px dashed #ddd;
  padding-top: 15px;
  display: inline-block;
  margin-right: 50px;
  margin-top: 20px;
  p {
    font-size: 12px;
  }
}
</style>
