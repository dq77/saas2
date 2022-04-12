<template lang="pug">
.card2(:style='{width: width, height: height, marginBottom: marginBottom}')
  .card2-head(v-if='title')
    .card2-head-title
      slot(name='title' v-if='$slots.title')
      span(v-else) {{ title }}
    .card2-head-right
      slot(name='headRight')
  .card2-content(
    :class='noWrap?"card2-nowrap":""'
    v-loading='loading'
  )
    slot
</template>

<script>
export default {
  props: {
    title: {
      type: String
    },
    noTitle: { // 是否不需要标题
      type: Boolean,
      default: false
    },
    noWrap: { // content是否不需要内缩，默认需要
      type: Boolean,
      default: false
    },
    width: { // 整个Card的宽度
      type: String,
      default: '100%'
    },
    height: { // 整个Card的高度
      type: String,
      default: 'auto'
    },
    marginBottom: { // 整个Card的下边距，在多个card上下排布时可设置间距
      type: String,
      default: ''
    },
    loading: { // content的loading状态
      type: Boolean,
      default: false
    },
  },
}
</script>

<style lang="stylus" scoped>
.card2
  display flex
  flex-direction column
  background #FFFFFF
  border-radius 4px
  &-head
    display flex
    align-items center
    justify-content space-between
    padding 0 20px
    height 50px
    color #494949
    border-bottom 1px solid #f2f2f6
    &-title
      flex 1
      display flex
      align-items center
      font-size 14px
  &-content
    flex 1
    position relative
    padding 20px
    &.card2-nowrap
      padding 0
</style>
