<template lang="pug">
div
  .overview-button(v-if="list && list.length")
    el-button(:type='current === 1 ? "primary" : "default"' @click='clickCheckList(1)') 按金额
    el-button(:type='current === 2 ? "primary" : "default"' @click='clickCheckList(2)') 按天数
  .plan(v-loading="aLoading || bLoading")
    Title(:title="title")
    Unit(
      :title='unitTitle'
      style='margin: 30px -2px 10px 0;float: right;'
      v-if="list && list.length"
    )
    .plan-wraper
      List(
        :dataSource="list"
        :current="current"
        v-if="list && list.length"
        @route="routeDetail"
      )
        p.route(@click="route") 查看详情>
      Empty(v-else)
</template>
<script>
import Title from '../components/title.vue'
import List from './list'
import Unit from '../components/unit.vue'
import Empty from '../components/empty'
import { reactive, toRefs, } from '@vue/composition-api'
import ajaxStore from '@/apis'
import useAsync from 'hooks/useAsync'
import { deepCopy } from '@/utils/qjd'
import { nullCallback } from '../../utils'

export default {
  components: {
    Title,
    List,
    Empty,
    Unit
  },
  setup (props, { root: { $router } }) {
    // state
    const state = reactive({
      aList: null,
      bList: null,
      list: null,
      current: 1,
      title: '当前逾期金额排名TOP5',
      unitTitle: '单位：元'
    })

    const { receive: { getReceivableHealthOverdueView } } = ajaxStore
    // methods
    const clickCheckList = (key) => {
      state.current = key
      state.list = state.current === 1 ? state.aList : state.bList
      state.title = state.current === 1 ? '当前逾期金额排名TOP5' : '当前最高逾期天数排名TOP5'
      state.unitTitle = state.current === 1 ? '单位：元' : '单位：天'
    }
    const initNotInfo = async () => {
      await bResult()
      await aResult()
    }
    const route = () => { $router.push({ name: 'ComInfo' }) }
    const routeDetail = (item) => {
      item.code && $router.push({ name: 'ComInfoDetail', query: { customerId: item.code } })
    }
    // useAsync
    const { loading: aLoading, doResult: aResult } = useAsync({
      init: false,
      request: getReceivableHealthOverdueView,
      params: { orderBy: 1 },
      callback: res => nullCallback(res, 'array'),
      successCallBack: ({ code, data }) => {
        if (code === '0') {
          const list = deepCopy(data)
          list.forEach(item => {
            item.name = item.customerName
            item.code = item.customerId
            item.amount = item.overTotalPrice
          })
          state.aList = list
          state.list = state.aList
        }
      }
    })
    const { loading: bLoading, doResult: bResult } = useAsync({
      init: false,
      request: getReceivableHealthOverdueView,
      params: { orderBy: 2 },
      callback: res => nullCallback(res, 'array'),
      successCallBack: ({ code, data }) => {
        if (code === '0') {
          const list = deepCopy(data)
          list.forEach(item => {
            item.name = item.customerName
            item.code = item.customerId
            item.amount = item.maxOverDays
          })
          state.bList = list
        }
      }
    })
    initNotInfo()

    return {
      aLoading,
      bLoading,
      route,
      routeDetail,
      clickCheckList,
      ...toRefs(state)
    }
  }
}
</script>
<style lang="stylus" scoped>
@import '../style'
.plan
  flex 1
  box-sizing border-box
  padding 0 20px
  .plan-wraper
    width 100%
    height 339px
    box-sizing border-box
    padding 30px 0
    .route
      color #3B68F0
      padding 0
      margin 30px 0 0
      text-align center
      cursor pointer
.overview-button
  margin-right 18px
</style>
