<template lang="pug">
.empty-data(:class='size ? `u-${size}` : ""')
  img.u-img(:src='`${$assetsBaseUrl}/receiveAdmin/workSpace/empty.png`')
  .u-desc {{ desc }}
</template>

<script>
export default {
  props: {
    size: String, // 大小，可选值normal\small\big
    desc: { // 描述
      type: String,
      default: '暂无数据'
    }
  }
}
</script>

<style lang="stylus">
.empty-data
  display flex
  flex-direction: column
  justify-content center
  align-items center
  height 100%
  color #909399
  .u-img
    width 200px
    height 122px
</style>
