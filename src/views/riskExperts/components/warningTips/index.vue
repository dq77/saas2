<template lang="pug">
.p-error(ref="warning" :class='isFixed ? "p-nav-fixed" : ""')
  i.p-icon.el-icon-warning
  .p-desc 评估被驳回：
  .p-error-list
    .p-error-item {{remark}}
</template>

<script>
import { reactive, toRefs, onMounted, onBeforeUnmount, getCurrentInstance, ref } from '@vue/composition-api'
export default {
  props: {
    remark: {
      type: String
    }
  },
  setup(props, { root }) {
    const refs = ref(null)
    refs.value = getCurrentInstance().refs

    const state = reactive({
      isFixed: false,
      activeIndex: 0,
    })

    const handleTabFix = (e) => {
      //   元素上边到视窗上边的距离   getBoundingClientRect().top
      for (let index = 0; index < 5; index++) {
        if (refs.value.warning.getBoundingClientRect().top - 130 < 0) {
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
        top: refs.value.warning.offsetTop - height,
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
      refs,
      handleTabFix,
      handleToggle,
      ...toRefs(state)
    }
  }
}
</script>


<style lang="stylus">
.p-error
  display flex
  background #FAF5E8
  color #D59509
  padding 15px
  margin-bottom 30px
  width 67vw
  position relative
  .p-icon
    position absolute
    top -8px
    right -8px
    color #FAAD14
    font-size 24px
  .p-desc
    font-size 18px
  .p-error-list
    flex 1
    display flex
    flex-flow column wrap
    align-content flex-start
    .p-error-item
      margin-right 150px
      word-wrap break-word
      min-height 20px
      padding-top 2px
.p-error.p-nav-fixed
  position fixed
  top 60px
  z-index 2004
</style>
