<template lang='pug'>
.home-manual-page
  .item(@click='toPage("operationManual")') 操作手册
  .item.right(@click='toPage("commonQuestion")') 常见问题
</template>

<script>
import Router from '@/router'
export default {
  props: {
  },
  setup(props, context) {
    const toPage = (name) => {
      Router.push({ name })
    }
    return {
      toPage
    }
  },
  components: {
  }
}
</script>

<style lang='stylus'>
.home-manual-page
  margin 20px -10px 0
  display flex
  .item
    flex 1 0 auto
    cursor pointer
    background-color #fff
    position relative
    margin 0 10px
    border-radius 4px
    border 1px solid #EAEBEE
    padding 44px 20px
    font-size 22px
    background-size auto 100%
    background-repeat no-repeat
    background-position right center
    background-image url('//cdn.qjdchina.com/static-online/saas/common/home/operation-manual.png')
    &.right
      background-image url('//cdn.qjdchina.com/static-online/saas/common/home/common-problem.png')
    &::before
      content ''
      position absolute
      top 35px
      left 20px
      width 25px
      height 4px
      background-color #3B68F0
</style>
