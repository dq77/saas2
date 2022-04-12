<template lang="pug">
.quick-card(:style='`background: ${info.bg}`')
  img.quick-card-img(:src='info.url')
  .quick-card__content
    .quick-card__content-title {{ info.title }}
    .quick-card__content-desc {{ info.desc }}
    el-button.quick-card__content-button(@click='clickToHref(info)') 点击发起
</template>
<script>
export default {
  props: {
    info: {
      type: Object,
      default: () => ({})
    }
  },
  setup(props, { root: { $router } }) {
    // 跳转
    const clickToHref = item => $router.push({ name: item?.name })
    return {
      clickToHref
    }
  }
}
</script>
<style lang="stylus" scoped>
.quick-card
  width 185px
  min-width 185px
  height 124px
  padding 20px
  position relative
  &-img
    position absolute
    width 100%
    left 0
    bottom 0
    z-index 1
    opacity 0
    transition .5s opacity
  &:hover &-img
    opacity 1
  &__content
    position relative
    z-index 9
    &-title
      margin-bottom 3px
      font-size 14px
      color #494949
      line-height 20px
    &-desc
      margin-bottom 10px
      font-size 12px
      color #6D7278
      line-height 17px
    &-button
      width 90px
      line-height 32px
      padding 0
      user-select none
      cursor pointer
      background #fff
      font-size 12px
      outline 0
      border 0
      border-radius 0
      text-align center
      &:hover
        background var(--defaultColor)
        color #fff
</style>
