<template lang="pug">
.p-card
  .p-head
    .p-icon
    .p-title {{ title }}
  .p-content
    slot
</template>
<script>

export default {
  props: {
    title: {
      type: String,
      defaultValue: ''
    }
  },
  components: {
  },
  setup(props, {emit}) {
  },
}
</script>
<style lang="stylus" scoped>
.p-card
  margin-top 10px
.p-head
  border-bottom 1px solid #EAEBEE
  display flex
  justify-content flex-start
  align-items center
  padding 10px 0
  .p-icon
    height 16px
    width 2px
    background #3B68F0
  .p-title
    margin-left 20px
    font-weight 500
    font-size 14px
.p-content
  padding-top 20px
</style>
<style lang="stylus">
.p-content
  .el-form-item--small .el-form-item__content
    height 32px
</style>
