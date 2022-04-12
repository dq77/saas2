<template lang="pug">
Card(title='全部日期导航' v-loading='loading')
  .p-content
    .p-title 快速定位入口
    .p-date-item(v-for='(item, index) in result' :key='index' :class='currentIndex === index ? "p-current" : ""' @click='changeDate(index)')
      .p-text {{item}}行业舆情预警日报
</template>

<script>
import Card from '@/components/Card'
import ajaxStore from '@/apis'
import useAsync from 'hooks/useAsync'
import { toRefs, reactive, watch } from '@vue/composition-api'
import useEventBus from '@/hooks/useEventBus'
import busStore from '@/utils/busStore'
export default {
  components: {
    Card
  },
  setup(props) {
    const state = reactive({
      currentIndex: 0,
      currentDate: ''
    })
    const { getPublishTime } = ajaxStore.factoryService.realEstate

    const {
      loading,
      result,
    } = useAsync({
      request: getPublishTime
    })

    const { emitEvent } = useEventBus({
      event: busStore.changeDailyDate
    })

    const changeDate = (index) => {
      state.currentIndex = index
      state.currentDate = result.value[index]
      emitEvent(state.currentDate)
    }

    watch(
      () => result.value,
      (value) => {
        changeDate(0)
      }
    )

    return {
      loading,
      result,
      changeDate,
      ...toRefs(state)
    }
  }

}
</script>

<style lang="stylus" scoped>
.p-title
  color #494949
  font-size 14px
  margin-bottom 15px
.p-content
  min-height 500px
  .p-date-item
    border-left 3px solid #F8F9FA
    padding-left 10px
    cursor pointer
    .p-text
      color #9AA6B8
      line-height 30px
      height 30px
      padding 0 10px
  .p-date-item.p-current
    border-color #3C5DA4
    .p-text
      color #ffffff
      background #3C5DA4
</style>
