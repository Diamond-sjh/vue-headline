<template>
  <div class="welcome" style="text-align:center">
    <img src="../../assets/images/welcome.jpg" alt />
  </div>
</template>

<script>
export default {
  created () {
    this.$http
      .get('/articles')
      .then(res => res)
      .catch(() => {})
  }
}
</script>

<style lang="less" scoped>

</style>
