<template lang='pug'>
.page-main
  Collapse(
    v-loading='reportApi.loading'
    :columns='collapseColumns'
    :defaultActiveName='activeCollapse'
  )
    //- 基础信息
    template(slot='base')
      Base(:config='baseState.result' :data='basicInfo')
    //- 信贷交易授信及负债信息概要
    template(slot='account')
      SingleModule(:config='accountInfo')
    //- 相关还款责任信息概要
    template(slot='related')
      SingleModule(:config='relatedInfo')
    //- 相关还款责任信息明细
    template(slot='relatedDetail')
      div(v-for='(item, index) in relatedDetailInfo' :key='index')
        MultipleModule(:config='item')
    //- 信贷交易违约信息
    template(slot='default')
      SingleModule(:config='defaultInfo')
    //- 公共信息明细
    template(slot='public')
      SingleModule(:config='publicInfo')
    //- 信贷交易明细
    template(slot='transaction')
      div(v-for='(item, index) in transactionInfo' :key='index')
        Transaction(:config='item')
</template>

<script>
// components
import Collapse from '@/components/qjd/collapse'
import Card from '@/components/Card'
import Base from '../components/base'
import SingleModule from '../components/singleModule'
import MultipleModule from './components/multipleModule'
import Transaction from './components/transaction'
// hooks
import useBase from '../hooks/useBase'
import useAsync from 'hooks/useAsync'
// other
import { reactive, toRefs } from '@vue/composition-api'
import ajaxStore from '@/apis'
import { deepCopy } from '@/utils/qjd'
import { collapseColumns, activeCollapse, baseConfig, accountConfig, relatedConfig, relatedDetailConfig, defaultConfig, publicConfig, transactionConfig } from './config'

export default {
  props: {},
  emits: {},
  components: {
    Collapse,
    Card,
    Base,
    SingleModule,
    MultipleModule,
    Transaction
  },
  setup (props, { root }) {
    // route
    const { personBasicCode } = root.$route.query
    // state
    const state = reactive({
      // 基础信息
      baseState: [],
      basicInfo: {},
      // 个人报告数据
      reportApi: {},
      // 信贷交易授信及负债信息概要
      accountInfo: [],
      // 相关还款责任信息概要
      relatedInfo: [],
      // 相关还款责任信息明细
      relatedDetailInfo: [],
      // 信贷交易违约信息
      defaultInfo: [],
      // 公共信息明细
      publicInfo: [],
      // 信贷交易明细
      transactionInfo: []
    })
    // ajaxStore
    const { customer: { precise: { personCreditReport } } } = ajaxStore
    // useBase
    state.baseState = useBase({ baseList: baseConfig })
    // useAsync
    state.reportApi = useAsync({
      request: personCreditReport,
      params: { personCreditReportBasicCode: personBasicCode },
      successCallBack: ({ data, code }) => {
        if (code === '0') {
          const { personCreditReportBasic } = data || {}
          state.basicInfo = personCreditReportBasic || {}
          state.accountInfo = singleTableData(accountConfig, data || {})
          state.relatedInfo = singleTableData(relatedConfig, data || {})
          state.relatedDetailInfo = multipleTableData1(relatedDetailConfig, data || {})
          state.defaultInfo = singleTableData(defaultConfig, data || {})
          state.publicInfo = singleTableData(publicConfig, data || {})
          state.transactionInfo = multipleTableData2(transactionConfig, data || {})
        }
      }
    })
    // methods
    // 单表格数据
    const singleTableData = (config = [], data) => {
      config.forEach(item => {
        item.dataSource = data[item.key] || []
      })

      return deepCopy(config)
    }
    // 多表格数据 - 相关还款责任信息明细
    const multipleTableData1 = (config = [], data) => {
      config.forEach(item => {
        const lists = data[item.key] || []
        // 第一步 获取对应模块数据
        const dataSource = lists.filter(dataItem => item.type === dataItem.type)
        // 第二步 有数据的接着往下处理
        const dataList = []
        dataSource.forEach((dataItem, index) => {
          const columns = deepCopy(item.columns)
          columns.forEach(column => {
            column.dataSource.push(dataItem)
            handleLabel(column)
          })
          dataList.push(columns)
        })

        item.dataSource = dataList
      })
      console.log(config)
      return deepCopy(config)
    }
    // 多表格数据 - 信贷交易明细
    const multipleTableData2 = (config = [], data) => {
      config.forEach(item => {
        // 第一步 获取对应模块数据
        const dataSource = data[item.key] || []
        // 第二步 有数据的接着往下处理
        const dataList = []
        dataSource.forEach((dataItem, index) => {
          const columns = deepCopy(item.columns)
          columns.forEach(column => {
            const obj = dataItem[column.key] || []
            column.dataSource = Array.isArray(obj) ? obj : [obj]

            if (column.key === 'personCreditCreditTradeRepaymentDetailList') { // 账户详情
              column.label.value = dataItem[columns[0].key].latestRepaymentDescription
              console.log(column.label.value)
            }

            handleLabel(column)
          })
          dataList.push(columns)
        })

        item.dataSource = dataList
      })
      return deepCopy(config)
    }
    // 处理描述
    const handleLabel = (column = {}, date = []) => {
      const label = column.label
      if (!label) return
      column.dataSource.forEach((source) => {
        if (label.key === 'index') {
          label.value = '账户'
        } else if (label.key === 'description') {
          label.value = `还款状态描述：${source.description}`
        } else if (label.key === 'a_description') {
          label.value = `账户状态描述：${source.description}`
        } else if (label.key === 'r_description') {
          label.value = `还款状态描述：${source.description}`
        }
      })
    }
    return {
      collapseColumns,
      activeCollapse,
      ...toRefs(state)
    }
  }
}
</script>

<style lang='stylus' scoped>
.parse-person
  height 100%
  // padding 0 20px 20px
  background #fff

/deep/ .el-table .cell
  padding 0
</style>
<style lang="stylus">
.parse-person
  .card
    border 0
  .card-title
    border-bottom 1px solid #EAEBEE
    .card-title_text
      margin-left 7px
    .card-title--focus:before
      left 0
  .card-content
    margin 20px 0
</style>
