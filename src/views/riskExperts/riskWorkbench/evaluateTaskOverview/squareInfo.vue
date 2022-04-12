<template lang="pug">
.p-square-info
  .u-head
    span {{ title }}
  .u-sum {{ sum }}
  .u-desc
    .u-label {{ desc }}
    .u-ongoning {{ ongoing }}
    .u-percent {{ percent }}%
</template>

<script>
export default {
  props: {
    title: String,
    desc: String,
    sum: String,
    ongoing: String,
    percent: String,
  },
}
</script>

<style lang="stylus" scoped>
.p-square-info
  padding 20px 30px
  width 242px
  height 134px
  border 1px solid #ECECEF
  .u-head
    color #494949
    font-size 12px
  .u-sum
    margin-top 7px
    color #494949
    font-size 22px
    font-weight bold
  .u-desc
    display flex
    align-items center
    margin-top 30px
    color #9AA6B8
    font-size 12px
    line-height 12px
  .u-label
    width 85px
  .u-ongoning
    padding-right 20px
  .u-percent
    flex 1
    padding-left 20px
    border-left 1px solid #ECECEF
</style>
