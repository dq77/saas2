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
    //- 信贷记录概要
    template(slot='credit')
      SingleModule(:config='creditInfo')
    //- 未结清信贷及授信信息概要
    template(slot='open')
      SingleModule(:config='openInfo')
    //- 相关还款责任信息概要
    template(slot='repayment')
      SingleModule(:config='repaymentInfo')
    //- 负债历史
    template(slot='debt')
      SingleModule(:config='debtInfo')
    //- 公共记录明细
    template(slot='public')
      SingleModule(:config='publicInfo')
    //- 信贷记录明细
    template(slot='repaymentDetail')
      SingleModule(:config='repaymentDetailInfo')
</template>

<script>
// components
import Collapse from '@/components/qjd/collapse'
import Card from '@/components/Card'
import Base from '../components/base'
import SingleModule from '../components/singleModule'
// hooks
import useBase from '../hooks/useBase'
import useAsync from 'hooks/useAsync'
// other
import { reactive, toRefs } from '@vue/composition-api'
import ajaxStore from '@/apis'
import { deepCopy } from '@/utils/qjd'
import { collapseColumns, activeCollapse, baseConfig, creditConfig, openConfig, repaymentConfig, debtConfig, publicConfig, repaymentDetailConfig } from './config'

export default {
  components: {
    Collapse,
    Card,
    Base,
    SingleModule
  },
  setup (props, { root }) {
    // route
    const { companyBasicCode } = root.$route.query
    // state
    const state = reactive({
      // 解析数据
      reportApi: {},
      // 基础信息
      baseState: [],
      basicInfo: {},
      // 信贷记录概要
      creditInfo: [],
      // 未结清信贷及授信信息概要
      openInfo: [],
      // 相关还款责任信息概要
      repaymentInfo: [],
      // 负债历史
      debtInfo: [],
      // 公共记录明细
      publicInfo: [],
      // 信贷记录明细
      repaymentDetailInfo: []
    })
    // ajaxStore
    const { customer: { precise: { companyCreditReport } } } = ajaxStore
    // useBase
    state.baseState = useBase({ baseList: baseConfig })
    // useAsync
    state.reportApi = useAsync({
      request: companyCreditReport,
      params: { companyCreditReportBasicCode: companyBasicCode },
      successCallBack: ({ data, code }) => {
        if (code === '0') {
          const { companyCreditReportBasic } = data || {}
          state.basicInfo = companyCreditReportBasic || {}
          state.creditInfo = singleTableData(creditConfig, data || {})
          state.openInfo = singleTableData(openConfig, data || {})
          state.repaymentInfo = dealData(repaymentConfig, data || {})
          state.debtInfo = dealData(debtConfig, data || {})
          state.publicInfo = singleTableData(publicConfig, data || {})
          state.repaymentDetailInfo = singleTableData(repaymentDetailConfig, data || {})
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
    // 处理相关还款责任信息概要数据 、处理负债历史数据
    const dealData = (config = [], data) => {
      config.forEach(item => {
        item.dataSource = data[item.key] ? data[item.key].filter(list => item.type === list.type) : []
      })
      return deepCopy(config)
    }
    return {
      collapseColumns,
      activeCollapse,
      singleTableData,
      ...toRefs(state)
    }
  }
}
</script>

<style lang='stylus' scoped>
.parse-person
  height 100%
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
