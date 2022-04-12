<template lang="pug">
  .header-nav
    template(v-for='(item, index) in collapseItems')
      .nav-item(:class='item.key === currentKey? "active" :""' @click='() => clickTest(item.key)') {{item.label}}
</template>

<script>
// import { ref } from '@vue/composition-api'

export default {
  props: {
    collapseItems: {
      type: Array,
      default: () => ([])
    },
    currentKey: String
  },
  setup(props, {emit}) {
    // 当前点击的锚点
    // const currentKey = ref('a1')
    const clickTest = (val) => {
      // props.currentKey = val
      emit('changeTopNav', val)
      const toEle = document.querySelector(`#${val}`)
      getElScrollBar().scrollTo({ top: toEle.offsetTop - 80 })
      // toEle && toEle.scrollIntoView(true)
    }
    // 获取滚动元素-element-ui滚动容器
    const getElScrollBar = () => {
      let wrap
      const wraps = document.querySelectorAll('.el-scrollbar__wrap')
      wraps.forEach((item) => {
        if (item.parentNode.id === 'content_view') wrap = item
      })
      return wrap
    }
    return {
      clickTest,
    }
  },
}
</script>

<style lang="stylus" scoped>
.header-nav
  width 100%
  padding 20px
  display flex
  background #fff
  position sticky
  top 0px
  left 0
  z-index 9
  // padding 0 30px
  .nav-item
    flex 1
    height 40px
    line-height 40px
    background #EFF2F6
    text-align center
    border #EAEBEE 1px solid
    &.active
      background-color #fff
      color #3B68F0

</style>
