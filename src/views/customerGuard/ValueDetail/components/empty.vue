<template lang='pug'>
.vd-empty
  img(:src='`${$assetsBaseUrl}/customerGuard/empty.png`')
  .vd-empty__content 暂无数据，请至价值列表添加需要价值分析的企业
</template>

<script>
</script>

<style lang='stylus' scoped>
.vd-empty
  height 100%
  color #494949
  background #fff
  display flex
  flex-direction column
  justify-content center
  align-items center
  .vd-empty__content
    margin-top 8px
    font-size 12px
    color #999
</style>
