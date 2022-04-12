<template lang="pug">
.page-main
  Card(title='场景操作')
    QuickEnter(:configData='quickEnterConfig' @createHandle='createHandle')
    .taskCard
      .task-card-title 任务卡片
      TaskBlocks(:data='taskData')
  Card(title='业务总览')
    OuterFrame(:configData='businessOverview')
  Card(title='账务总览')
    OuterFrame(:configData='financeOverview')
  Card(title='下游账户总览')
    OuterFrame(:configData='accountOverview')
  Card(title='本月新增')
    OuterFrame(:configData='newIncreased')
  Card(title='订单数据变化')
    .statics-wrap
      .statics-wrap-section
        .statics-wrap-section-title 每月订单数量变化统计(单位:笔)
        EachartLine(id='oderStatics' :data='oderStatics' :config='{ width: 324, height: 218 }')
      .statics-wrap-section
        .statics-wrap-section-title 每月下单客户统计(单位:笔)
        EachartLine(id='orderCustomerStatic' :data='orderCustomerStatic' :config='{ width: 324, height: 218 }')
</template>

<script>
import { reactive, toRefs} from '@vue/composition-api'
import Card from '@/components/Card'
import OuterFrame from './OuterFrame'
import { businessOverview, financeOverview, accountOverview, newIncreased, quickEnterConfig } from './config'
import useAsync from 'hooks/useAsync'
import ajaxStore from '@/apis'
import QuickEnter from './QuickEnter'
import TaskBlocks from './TaskBlocks'
import EachartLine from '@/components/dataView/EchartLine'

export default {
  components: {
    Card,
    TaskBlocks,
    OuterFrame,
    QuickEnter,
    EachartLine
  },
  setup(props, {root}) {
    const {factory: { getBusiOverview, getNewIncreased, getTaskList, getOderStatics, getOderCustomerStatics }} = ajaxStore
    const { order: { checkMenuAuth } } = ajaxStore.common
    useAsync({
      request: getBusiOverview,
      successCallBack: ({data}) => {
        state.businessOverview.forEach((item, i) => {
          item.value = data[item.key]
        })
      }
    })
    useAsync({
      request: getNewIncreased,
      successCallBack: ({data}) => {
        state.newIncreased.forEach((item, i) => {
          item.value = data[item.key]
        })
      }
    })
    useAsync({
      request: getTaskList,
      successCallBack: ({data}) => {
        Object.keys(data).forEach(key => {
          state.taskData[key] = data[key]
        })
      }
    })
    useAsync({
      request: getOderStatics,
      successCallBack: ({data}) => {
        // console.log(data, 'getOderStatics')
        state.oderStatics = data.map((item) => {
          return [item.createdMonth ?? '', item.orderTotalCount ?? '']
        })
      }
    })
    useAsync({
      request: getOderCustomerStatics,
      successCallBack: ({data}) => {
        state.orderCustomerStatic = data.map((item) => {
          return [item.createdMonth, item.orderCustomerCount]
        })
      }
    })
    useAsync({
      request: ajaxStore.factory.finance.getSumAccount,
      successCallBack: (res) => {
        if (res?.code === '0') {
          const data = res?.data ?? {}
          state.accountOverview.forEach(item => {
            item.value = data[item.key]
          })
        }
      }
    })
    useAsync({
      request: ajaxStore.factory.finance.getSumReceivables,
      successCallBack: (res) => {
        if (res?.code === '0') {
          const data = res?.data ?? {}
          state.financeOverview.forEach(item => {
            item.value = data[item.key]
          })
        }
      }
    })
    const {doResult: _checkMenuAuth} = useAsync({ request: checkMenuAuth, init: false })
    const state = reactive({
      businessOverview,
      financeOverview,
      accountOverview,
      newIncreased,
      taskData: {
        awaitConfirmReverseCount: '',
        awaitDeliverOrderCount: '',
        awaitInvoiceOrderCount: '',
        awaitOrderCount: '',
        awaitReverseOrderCount: ''
      },
      oderStatics: [],
      orderCustomerStatic: []
    })

    const createHandle = (blockData) => {
      // console.log(blockData, 'blockData')
      const name = blockData.name
      const params = { name, query: {} }
      if (name === 'orderEdit') {
        params.query.editFlag = 'add'
      }
      _checkMenuAuth({menuCode: blockData.menuTag}).then(res => {
        if (res?.data) {
          root.$router.push(params)
        }
      })
    }
    const clickHandle = (name, params, value) => {
      const obj = { name }
      if (params) {
        obj.params[params] = value
      }
      root.$router.push(obj)
    }
    return {
      ...toRefs(state),
      quickEnterConfig,
      createHandle,
      clickHandle
    }
  },
}
</script>

<style lang="stylus" scoped>
>>>.card
  margin-bottom 20px
.task-card-title
  font-weight 500
  font-size 14px
  margin-top 26px
  margin-bottom 13px
.task-card-warp
  display flex
  padding 23px
  border-radius 4px
  border 1px solid #EAEBEE
  .task-card-item
    flex 1
    border-left 1px solid #EAEBEE
    height 64px
    display flex
    flex-direction column
    justify-content center
    &:first-child
      border-left none
    .item-content
      display flex
      justify-content space-around
      .item-content-desc
        line-height 32px
        .pd
          padding 10px
          color #3B68F0
.statics-wrap
  display flex
  &-section
    flex 1
    border 1px solid #EAEBEE
    margin-left 20px
    &-title
      border-bottom 1px solid #EAEBEE
      padding 12px
      margin-bottom 20px
      font-weight 500
      font-size 14px
    &:first-child
      margin-left 0
</style>
