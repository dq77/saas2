<template lang="pug">
.p-percent-bar
  .u-label {{ label }}：
  .u-sum {{ sum }}
  .u-progress
    el-progress(
      :percentage='percent'
      :color='color'
      :format='format'
    )
</template>

<script>
export default {
  props: {
    label: String,
    sum: Number,
    percent: Number,
    color: String,
  },
  setup() {
    const format = percentage => {
      return percentage >= 0 ? percentage.toFixed(2) + '%' : '0.00%'
    }
    return {
      format
    }
  }
}
</script>

<style lang="stylus" scoped>
.p-percent-bar
  display flex
  align-items center
  color #9AA6B8
  font-size 12px
  .u-progress
    flex 1
    margin-left 6px
  /deep/.el-progress-bar
    padding-right 60px
    margin-right -64px
</style>
