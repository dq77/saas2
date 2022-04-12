<template lang="pug">
.week(v-loading="loading")
  h3.week-title 每周重点公告
  .week-lists(v-if="weekLists.length > 0")
    .week-list(v-for="(item,index) in weekLists")
      .week-list__icon
      i.week-list__index {{getIndex(index)}}
      .week-list__info
        p {{item.content}}
  EmptyData.p-height.p-empty(v-else)
</template>
<script>
import EmptyData from '@/components/EmptyData'
import { reactive, computed, toRefs } from '@vue/composition-api'
import ajaxStore from '@/apis'
import useAsync from 'hooks/useAsync'

export default {
  components: {
    EmptyData
  },
  setup(props, { root }) {
    const {riskExperts: {realestateWarning: { getWeeklyBulletin }}} = ajaxStore
    const { result, loading } = useAsync({ request: getWeeklyBulletin })
    const weekLists = computed(() => (result?.value ?? []))
    const getIndex = (index) => {
      const thisIndex = parseInt(index) + 1
      if (parseInt(thisIndex) < 10) {
        return '0' + thisIndex
      } else {
        return thisIndex
      }
    }

    const state = reactive({weekLists})

    return {
      loading,
      getIndex,
      ...toRefs(state)
    }
  },
}
</script>
<style lang="stylus" scoped>
.p-height
  height 200px
.week
  background #fff
  padding 0 20px
  margin-bottom 10px
.week-title
  font-size 14px
  margin 0
  padding 20px 0 12px 0
.week-lists
  padding-bottom 20px
.week-list
  font-size 12px
  color #494949
  padding 4px 98px 4px 20px
  background #F4F7FF
  margin-bottom 20px
  position relative
  border-radius 4px
  overflow hidden
  &__icon
    position absolute
    left 0
    top 0
    width 7px
    background #3B68F0
    height 100%
  &__index
    color #E4EBFE
    font-size 60px
    line-height 72px
    float left
    z-index 1
  &__info
    display block
    width 100%
    float left
    margin -72px 98px 0 20px;
.week-list:nth-child(n+0) .week-list__icon
  background #3B68F0
.week-list:nth-child(2n+0) .week-list__icon
  background #EECA83
.week-list:nth-child(3n+0) .week-list__icon
  background #25BECD
.week-list:last-child
  margin 0
</style>
