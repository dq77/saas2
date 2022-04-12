<template lang="pug">
.calendar_box
  Header(:title="'还款日历'" :left="20" style="width: 100%;")
  div(style="padding-top: 40px")
    v-date-picker(
      style="border: none;"
      v-model="date"
      color="gray"
      :attributes='attributes'
      :model-config="modelConfig"
      @click.native="dateClick"
    )
  Card(
    :visible="visible"
    :dataSource="dataSource"
    :date="cacheDate"
    :title="title"
    @cancleHandle="cancleHandle"
  )
  .mark
</template>
<script>
import { computed, reactive, toRefs, watch } from '@vue/composition-api'
import useTimeout from 'hooks/useTimeout'
import VCalendar from 'v-calendar'
import Header from '@/components/qjd/header'
import moment from 'moment'
import { deepCopy } from '@/utils/qjd'
import Card from './card'
import ajaxStore from '@/apis'
import useAsync from 'hooks/useAsync'
import { getDataByTime } from '../../../util'

export default {
  components: {
    VCalendar,
    Header,
    Card
  },
  setup() {
    // ajaxStore
    const { credit: { calendarDetailList } } = ajaxStore
    // today
    const date = moment(new Date()).format('YYYY-MM-DD')
    // perTimeout
    const { perTimeout } = useTimeout()
    // state
    const state = reactive({
      visible: false,
      date,
      // 缓存date
      cacheDate: date,
      dates: [],
      dataSource: [],
      attributes: [],
      modelConfig: { type: 'string', mask: 'YYYY-MM-DD' }
    })
    // 获取attributes
    const getAttributes = dates => {
      return deepCopy([
        {
          highlight: false,
          dates,
          dot: {
            style: {
              background: '#3B68F0',
            }
          }
        }
      ])
    }
    // 过滤后日期
    const filterDates = (dates, date) => {
      const current = dates?.find(item => item.time === date)
      if (current) {
        perTimeout(() => {
          state.dataSource = current?.dataSource ?? []
          state.visible = true
        })
      }
      return dates
        ?.filter(item => item.time !== date)
        ?.map(item => item.time)
    }
    // 获取日历任务
    useAsync({
      request: calendarDetailList,
      params: { queryStartDate: '', queryEndDate: '' },
      successCallBack: ({ code, data }) => {
        if (code === '0') {
          const result = getDataByTime(data)
          const attributes = Object.keys(result)?.map(key => ({ time: key, dataSource: result[key] })) ?? []
          state.dates = attributes ?? []
          state.attributes = getAttributes(filterDates(attributes, date))
        }
      }
    })
    // 左右切换月份
    const dateClick = (e) => {
      e.stopPropagation()
      state.visible = false
      // 点击左右切换月份
      if (e.target && (e.target.tagName === 'svg' || e.target.tagName === 'path')) {
        const className = e.target.tagName === 'svg' ? e?.path[1]?.className : e.target.tagName === 'path' ? e?.path[2]?.className : ''
        // left 表示上个月 right 表示下个月
        const direction = className?.indexOf('left') > -1 ? 'left' : className?.indexOf('right') > -1 ? 'right' : ''
        const year = state.cacheDate.split('-')?.[0]
        const day = state.cacheDate.split('-')?.[2]
        let mounth = state.cacheDate.split('-')?.[1]
        mounth = direction === 'left' ? Number(mounth) - 1 : direction === 'right' ? Number(mounth) + 1 : null
        // 存储当前日期
        state.cacheDate = `${year}-${mounth}-${day}`
        state.attributes = getAttributes(filterDates(state.dates ?? [], state.cacheDate))
      }
    }
    // watch
    watch(
      () => state.date,
      value => {
        if (value) {
          state.cacheDate = value
          state.attributes = getAttributes(filterDates(state.dates ?? [], value))
        }
      }
    )
    // title
    const title = computed(() => state.cacheDate === date ? '今日还款提醒' : state.cacheDate)
    // cancleHandle
    const cancleHandle = () => {
      state.date = ''
      state.visible = false
    }

    return {
      title,
      dateClick,
      cancleHandle,
      ...toRefs(state)
    }
  },
}
</script>
<style lang="stylus" scoped>
.calendar_box
  width 100%
  display flex
  flex-direction column
  align-items center
  position relative
  .mark
    width 86px
    height 28px
    background rgba(0, 0, 0, 0)
    position absolute
    left 118px
    top 80px
</style>
