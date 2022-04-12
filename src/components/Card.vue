<!-- author liqi
用途：
1、标题带绿色竖条的卡片，可用插槽自定义标题的右边内容
2、无标题的空白卡片，此效果用来统一某些布局的边框和阴影效果
 -->
<template lang="pug">
  .card(:style='{width: width, height: height, marginBottom: marginBottom}')
    .card-title(v-if='title' :style='{paddingRight: paddingRight}')
      .card-title--left(:class='{"card-title--focus" : isFocus}')
        span.card-title_text {{ title }}
        template(v-if='$slots.afterTitle')
          slot(name='afterTitle')
      .card-title--right
        slot(name='headRight')
    .card-content(
      :class='noWrap?"card-nowrap":""'
      :style='contentStyle'
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
    paddingRight: { // header的右内边距
      type: String,
      default: ''
    },
    loading: { // content的loading状态
      type: Boolean,
      default: false
    },
    useFor: { // 作用场景，如用于搜索框(search)
      type: String,
      default: ''
    },
    // 瞩目标题
    isFocus: Boolean
  },
  data() {
    return {
      contentStyle: {}
    }
  },
  mounted() {
    if (this.useFor === 'search') { // 用于搜索框
      this.contentStyle['margin-bottom'] = '2px'
    }
  }
}
</script>

<style lang="stylus">
.card
  background #FFFFFF
  border 1px solid #EAEBEE
  border-radius 4px
  &-title
    position relative
    height 50px
    font-size 0
    line-height 50px
    color #494949
    display flex
    justify-content space-between
    &--left
      display flex
      position relative
    &_text
      display inline-block
      margin-left 27px
      vertical-align middle
      font-size 14px
    &--right
      float right
      text-indent 0
    &--focus:before
      content ''
      position: absolute
      top 16px
      left 20px
      width 2px
      height 16px
      background #3B68F0
  &-content
    position relative
    margin 20px
    &.card-nowrap
      margin 0
</style>
