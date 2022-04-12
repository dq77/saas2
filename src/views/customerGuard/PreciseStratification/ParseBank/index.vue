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
    template(slot='detail')
      SingleModule(:config='detailInfo')
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
import { collapseColumns, activeCollapse, baseConfig, detailConfig } from './config'

export default {
  components: {
    Collapse,
    Card,
    Base,
    SingleModule
  },
  setup (props, { root }) {
    // route
    const { bankFlowSummaryCode } = root.$route.query
    // state
    const state = reactive({
      // 解析数据
      reportApi: {},
      // 基础信息
      baseState: [],
      basicInfo: {},
      // 流水明细
      detailInfo: []
    })
    // ajaxStore
    const { customer: { precise: { bankFlow } } } = ajaxStore
    // useBase
    state.baseState = useBase({ baseList: baseConfig })
    // useAsync
    state.reportApi = useAsync({
      request: bankFlow,
      params: { bankFlowSummaryCode: bankFlowSummaryCode },
      successCallBack: ({ data, code }) => {
        if (code === '0') {
          const { commonBankFlowSummary } = data || {}
          state.basicInfo = commonBankFlowSummary || {}
          state.detailInfo = singleTableData(detailConfig, data || {})
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
