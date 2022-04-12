<template lang="pug">
.p-summary
  .p-summary-left
    .p-summary-title {{ title }}
    .p-summary-num {{ num }}
  .p-summary-right
    .p-summary-icon(:class="icon")
</template>

<script>
export default {
  props: {
    title: {
      type: String,
    },
    num: {
      type: Number,
    },
    icon: {
      type: String
    }
  }
}
</script>

<style lang="stylus" scoped>
.p-summary
  display flex
  align-items center
  justify-content space-between
  background #F8F9FA
  height 100px
  width 50%
  margin-right 10px
  .p-summary-left
    margin-left 20px
    .p-summary-title
      color #494949
      margin-bottom 6px
    .p-summary-num
      color #494949
      font-size 20px
      font-weight bold
  .p-summary-right
    margin-right 35px
    .p-summary-icon
      width 80px
      height 60px
    .p-summary-icon.company
      background url('//cdn.qjdchina.com/static-online/saas/customerGuard/companyCount.png')
      background-size contain
    .p-summary-icon.redline
      background url('//cdn.qjdchina.com/static-online/saas/customerGuard/redlineNum.png')
      background-size contain
.p-summary:last-child
  margin-right 0
</style>
