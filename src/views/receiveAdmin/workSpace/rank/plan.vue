<template lang='pug'>
div
  .overview-button(v-if='list && list.length')
    el-button(:type='current === 1 ? "primary" : "default"' @click='clickCheckList(1)') 按应收计划
    el-button(:type='current === 2 ? "primary" : "default"' @click='clickCheckList(2)') 按收款对象
  .plan
    Title(:title='title')
    .plan-wraper
      List(:dataSource='list' @route="route" v-if='list && list.length')
      Empty(v-else)
</template>
<script>
import Title from '../components/title'
import List from './list'
import Empty from '../components/empty'
import { reactive, toRefs } from '@vue/composition-api'
import ajaxStore from '@/apis'
import useAsync from 'hooks/useAsync'
import { deepCopy } from '@/utils/qjd'
import { nullCallback } from '../../utils'

export default {
  components: {
    Title,
    List,
    Empty
  },
  setup(props, { root: { $router } }) {
    // state
    const state = reactive({
      aList: null,
      bList: null,
      list: null,
      current: 1,
      title: '应收计划总金额排名top10（万元）'
    })

    const { receive: { getReceivableTopTenDataView, getReceivableCustomerTopTenDataView } } = ajaxStore
    // methods
    const clickCheckList = (key) => {
      state.current = key
      state.list = state.current === 1 ? state.aList : state.bList
      state.title = state.current ? '应收计划总金额排名top10（万元）' : '收款对象应收总金额TOP10（万元）'
    }
    const initNotInfo = async () => {
      await bResult()
      await aResult()
    }
    const route = (item) => {
      const params = state.current === 1 ? { receivablePlanName: item.name } : {customerName: item.name}
      $router.push({ name: 'InfoSearch', query: params })
    }
    // useAsync
    const { loading: aLoading, doResult: aResult } = useAsync({
      init: false,
      request: getReceivableTopTenDataView,
      callback: res => nullCallback(res, 'array'),
      successCallBack: ({ code, data }) => {
        if (code === '0') {
          const list = deepCopy(data)
          list.forEach(item => {
            item.name = item.receivablePlanName
            item.code = item.receivablePlanCode
            item.amount = item.receivableAmount
          })
          state.aList = list
          state.list = state.aList
        }
      }
    })
    const { loading: bLoading, doResult: bResult } = useAsync({
      init: false,
      request: getReceivableCustomerTopTenDataView,
      callback: res => nullCallback(res, 'array'),
      successCallBack: ({ code, data }) => {
        if (code === '0') {
          const list = deepCopy(data)
          list.forEach(item => {
            item.name = item.customerName
            item.code = item.customerId
            item.amount = item.receivableAmount
          })
          state.bList = list
        }
      }
    })
    initNotInfo()

    return {
      aLoading,
      bLoading,
      clickCheckList,
      route,
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
    height 360px
    box-sizing border-box
    padding 20px 0
.overview-button
  margin-right 24px
</style>
