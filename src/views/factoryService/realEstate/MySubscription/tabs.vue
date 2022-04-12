<template lang='pug'>
.subscription-tabs
  .subscription-tabs__nav
    el-button.subscription-tabs__item(@click='changePage("list")' :class='tabCurrent === "list" ? "subscription-tabs__item--current" : ""' weblogs-anchor='factory-customerEvaluation-subscribe-list') 订阅列表
    el-button.subscription-tabs__item(@click='changePage("detail")' :class='tabCurrent === "detail" ? "subscription-tabs__item--current" : ""' weblogs-anchor='factory-customerEvaluation-subscribe-detail') 详情内容
    el-button.subscription-tabs__item(@click='changePage("connect")' :class='tabCurrent === "connect" ? "subscription-tabs__item--current" : ""' weblogs-anchor='factory-customerEvaluation-subscribe-concat') 关联关系
  Search(v-bind='$attrs' v-on="$listeners" v-if='tabCurrent !== "list"')
</template>

<script>
import Search from './search'

export default {
  props: ['tabCurrent'],
  emits: ['changeTab'],
  components: {
    Search
  },
  setup(props, { emit }) {
    /** methods start */
    const changePage = (name) => {
      emit('changeTab', name)
    }
    return {
      changePage
    }
  }
}
</script>

<style lang='stylus' scoped>
.subscription-tabs
  display flex
  justify-content space-between
  align-content center
  margin-bottom 20px
  // &__nav
  &__item
    border none
    padding 13px 30px
    color #3C5DA4
    font-size 14px
    height auto
    border-radius 4px
    box-shadow 0px 8px 16px 0px rgba(0, 0, 0, 0.05)
    &--current
      background #3C5DA4
      color #fff
</style>
