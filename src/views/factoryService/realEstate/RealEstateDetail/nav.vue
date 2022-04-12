<template lang="pug">
.p-nav(ref="nav" :class='isFixed ? "p-nav-fixed" : ""')
  .p-nav-item(@click='handleToggle(item.activeIndex)' v-for='item in navList')
    span(:class='activeIndex === item.activeIndex ? "p-nav-item-current" : ""') {{item.title}}
</template>

<script>
import { reactive, toRefs, onMounted, onBeforeUnmount } from '@vue/composition-api'
import { navList } from './config.js'
export default {
  props: {
    refs: {
      type: Object,
      default: () => ({})
    }
  },

  setup(props, { root }) {
    const state = reactive({
      isFixed: false,
      activeIndex: 0,
      navList
    })

    const handleTabFix = (e) => {
      //   元素上边到视窗上边的距离   getBoundingClientRect().top
      for (let index = 0; index < 5; index++) {
        if (props.refs[`panel-${index}`].getBoundingClientRect().top - 160 < 0) {
          state.activeIndex = index
        }
      }
      if (e.target.scrollTop > 60) {
        state.isFixed = true
      } else {
        state.isFixed = false
      }
    }

    // 点击导航栏，滚动条移动到内容所对应的位置
    const handleToggle = (index) => {
      //   网页被卷去的高   offsetTop
      const height = state.isFixed ? 80 : 140
      window.layoutScrollbar.wrap.scrollTo({
        top: props.refs[`panel-${index}`].offsetTop - height,
        behavior: 'smooth'
      })
      setTimeout(() => {
        state.activeIndex = index
      }, 0)
    }

    onMounted(() => {
      root.$nextTick(() => {
        window.layoutScrollbar.wrap.addEventListener('scroll', handleTabFix)
      })
    })

    onBeforeUnmount(() => {
      window.layoutScrollbar.wrap.removeEventListener('scroll', handleTabFix)
    })

    return {
      handleTabFix,
      handleToggle,
      ...toRefs(state)
    }
  }
}
</script>

<style lang="stylus" scoped>
.p-nav
  background #fff
  box-shadow 0px 8px 16px 0px rgba(0, 0, 0, 0.05)
  height 50px
  line-height 50px
  width 100%
  display flex
  .p-nav-item
    font-size 14px
    color #9AA6B8
    width 140px
    text-align center
    cursor pointer
    span
      border-bottom 2px solid #fff
      padding-bottom 5px
    .p-nav-item-current
      border-color #4C6EBC
      color #4C6EBC
  .p-nav-item:hover
    color #4C6EBC
  .p-nav-item:first-child
    margin-left -18px
.p-nav-fixed
  position fixed
  top 60px
  left 204px
  z-index 999
  border-top 1px solid #EAEBEE
  .p-nav-item:first-child
    margin-left 12px
</style>
