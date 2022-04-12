<template lang="pug">
.info
  img.left(:src='url' v-if="url")
  .right
    p
      span {{title}}
      el-tooltip(
        placement='top'
        :content='tooltip'
        v-if="tooltip"
      )
        i.el-icon-info
    p.num {{value}}
</template>

<script>

export default {
  props: {
    title: {
      type: String,
      defaultValue: ''
    },
    value: {
      type: [Number, String],
      defaultValue: ''
    },
    url: {
      type: String,
      defaultValue: ''
    },
    tooltip: {
      type: String,
      defaultValue: ''
    }
  },
  components: {
  },
  setup(props, context) {
    return {}
  },
}
</script>
<style lang="stylus" scoped>
.info
  display flex
  align-items center
  padding 25px 12px 18px 35px
  background-color #f8f9fa
  // border 1px solid #f2f2f6
  .left
    width 60px
    height 50px
    margin-right 12px
  .right
    color #383b42
    p
      line-height 17px
      margin 0
      i
        color #cbcbcd
        margin-left 1px
    .num
      line-height 37px
      font-size 26px
      margin 3px 0 0
</style>
