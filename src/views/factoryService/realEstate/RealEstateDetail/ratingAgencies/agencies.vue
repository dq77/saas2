<template lang="pug">
.rating-content
  .rating-content-title 机构评级
  el-carousel(ref='carousel' :interval="4000" height="90px" :autoplay='false' indicator-position='none' arrow='never' :loop='false' @change='slideChange')
    .rating-content-card
      el-carousel-item(v-for='(item, index) in listData' :key='index')
        .rating-card-item(v-for='(li, key) in item' :key='key')
          .rating-card-item_grade {{li.rating}}
          .rating-card-item_name {{li.agency}}
          .rating-card-item_trend
            .p-green(v-if='li.trend === "上升"') {{li.trend}}
            .p-red(v-else-if='li.trend === "下降"') {{li.trend}}
            template(v-else) {{li.trend}}
  .arrow-main
    template(v-if='listData.length > 1')
      .arrow-prev(@click='slide("prev")' :class='currentIndex === 0 ? "arrow-disabled" : ""') <
      .arrow-next(@click='slide("next")' :class='currentIndex === listData.length-1 ? "arrow-disabled" : ""') >
</template>

<script>
import { ref, reactive, toRefs, getCurrentInstance, watch } from '@vue/composition-api'
export default {
  props: {
    loading: {
      type: Boolean,
      default: false,
    },
    dataSource: {
      type: Object,
      default: () => ({})
    }
  },
  setup(props, { root }) {
    const refs = ref(null)
    refs.value = getCurrentInstance().refs
    const state = reactive({
      currentIndex: 0,
      listData: []
    })

    const slideChange = (index) => {
      state.currentIndex = index
    }

    const slide = (type) => {
      if (type === 'next') {
        refs.value.carousel.next()
      } else {
        refs.value.carousel.prev()
      }
    }

    // 一维数组根据长度变成多维数组
    const chunk = (list, length) => {
      const iconsArr = [] // 声明数组
      list.forEach((item, index) => {
        const page = Math.floor(index / length) // 计算该元素为第几个素组内
        if (!iconsArr[page]) { // 判断是否存在
          iconsArr[page] = []
        }
        iconsArr[page].push(item)
      })
      return iconsArr
    }

    watch(
      () => props.dataSource,
      (value) => {
        const { agencyRatings} = value
        state.listData = chunk(agencyRatings, 3)
      }
    )

    return {
      slide,
      slideChange,
      ...toRefs(state)
    }
  }
}
</script>

<style lang="stylus" scoped>
.rating-content
  margin-top 20px
  overflow hidden
  background linear-gradient(360deg, #C0D0F2 0%, #CFDAF1 15%, #E6ECFB 56%, #F9FAFF 100%)
  position relative
  padding-bottom 10px
  &-title
    color #3C5DA4
    font-size 18px
    margin 12px 20px 17px 20px
    border-bottom 1px solid #E3EAFA
    padding-bottom 13px
  &-card
    padding 10px 20px
    display flex
    &:after
      content ''
      display block
      height 0
      clear both
      visibility hidden
.rating-card-item
  width 33%
  text-align center
  font-size 16px
  float left
  &_grade
    color #4D6FB5
    margin-bottom 13px
  &_name
    color #494949
    margin-bottom 13px
  &_trend
    font-size 12px
    color #4D6FB5
.arrow-main
  display flex
  color #4D6FB5
  font-size 20px
  float right
  margin-right 10%
  width 50px
  height 20px
  justify-content space-between
  margin-top 10px
  .arrow-prev
    cursor pointer
    width 20px
    height 20px
    line-height 20px
    text-align center
  .arrow-next
    cursor pointer
    width 20px
    height 20px
    line-height 20px
    text-align center
  .arrow-disabled
    color #C0C4CC
.p-red
  color #E05E62
.p-green
  color #25BECD
</style>
