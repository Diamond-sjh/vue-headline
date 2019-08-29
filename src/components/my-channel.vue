<template>
  <div>
    <!-- 频道模块封装 -->
    <el-select @change="changeChannel" :value="value" clearable placeholder="请选择">
      <el-option v-for="item in channels" :key="item.id" :label="item.name" :value="item.id"></el-option>
    </el-select>
  </div>
</template>

<script>
export default {
  // 定义标签名
  name: 'my-channel',
  // 接受父组件传的参数
  props: ['value'],
  data () {
    return {
      // 频道列表参数
      channels: []
    }
  },
  methods: {
    async getChannels () {
      const {
        data: { data }
      } = await this.$http.get('/channels')
      this.channels = data.channels
    },
    changeChannel (newChannel) {
      // 当选择过频道，然后在清空的时候，channel_id为""，所以需要判断是否为空，为空则改为null
      if (newChannel === '') {
        newChannel = null
      }
      this.$emit('input', newChannel)
    }
  },
  created () {
    // 发送请求
    this.getChannels()
  }
}
</script>

<style lang="less" scoped>
</style>
