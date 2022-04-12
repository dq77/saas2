<!--
 * @Date: 2021-07-23 15:43:57
 * @LastEditors: 掉漆
 * @LastEditTime: 2021-08-02 16:54:30
-->
<template lang="pug">
.total-info-card-components
  .left
    .title
      span {{ title }}
      el-tooltip(v-if='info' effect="dark" :content="info" placement="top")
        i.el-icon-warning
    .num {{ value ? value.toLocaleString() : '' }}
  img.right(:src='url')
</template>
<script>

export default {
  props: {
    title: {
      type: String,
      defaultValue: ''
    },
    info: {
      type: String,
      defaultValue: ''
    },
    value: {
      type: Number,
      defaultValue: ''
    },
    url: {
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
<style lang="stylus">
.total-info-card-components
  color #494949
  background-color #F8F9FA
  padding 20px
  display flex
  .left
    flex auto
    padding-left 10px
    .title
      margin-bottom 10px
      .el-icon-warning
        color #a3b2c2
        font-size 14px
        vertical-align bottom
    .num
      font-size 24px
      font-weight bold
  .right
    width 80px
    height 60px
</style>
