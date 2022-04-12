<template lang="pug">
  .block-card
    .block-card-title
      img.title-imange(:src='blockData.url')
      span {{blockData.title}}
    .block-card-content
      span {{blockData.content}}
    .block-card-oprate
      el-button(type='plain' @click='createHandle(blockData)') 前往创建
</template>

<script>
export default {
  props: {
    blockData: {
      type: Object,
      default: () => ({})
    }
  },
  setup(props, {emit}) {
    const createHandle = (blockData) => {
      emit('createHandle', blockData)
    }
    return {
      createHandle
    }
  },
}
</script>

<style lang="stylus" scoped>
.block-card-title
  font-size 14px
  font-weight 500
  margin-bottom 10px
  .title-imange
    width 36px
    vertical-align bottom
    margin-right 10px
.block-card-content
  height 34px
  color #848484
.block-card-oprate
  margin-top 16px
  text-align right
  .el-button
    color #3B68F0
    &:hover
      color #fff
      background #3B68F0
      border none
</style>
