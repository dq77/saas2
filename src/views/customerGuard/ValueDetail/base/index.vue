<template lang='pug'>
//- 分数及红线触发次数
div
  .p-block
    .p-block-title
      .p-left
        .p-company {{$route.query.corpName}}
        .p-desc 数据统计周期：截止到{{new Date() | toDateStr('yyyy-MM-dd')}}
      el-button.p-btn(type="primary" @click="setReportName($route.query)") 申请报告
    .p-content
      .p-content-left
        Chart(:detail='chatApi.result' v-loading='chatApi.loading')
      .p-content-right
        Redline(:dataSource='redLineApi.redlineData')
  //- 基础信息
  BoxList.p-card(:data='baseSource')
  TableScore.p-card(:data='baseSource' v-loading='baseApi.loading')
  ApplyDialog(:dialogShow='applyReportDialogShow' @close='applyReport' :companyName='reportCompanyName')
</template>

<script>
import ajaxStore from '@/apis'
import { reactive, toRefs, watch } from '@vue/composition-api'
import Chart from './chart'
import Redline from '../../components/redline'
import BoxList from './boxList'
import TableScore from './tableScore'
// hooks
import useAsync from 'hooks/useAsync'
import useRedLine from '../hooks/useRedLine'
import ApplyDialog from '../../components/applyDialog'
// other
import {
  baseList,
  operateList,
  riskList,
  performanceList,
  financeList,
  tableSource,
  getKey
} from './config'
import { deepCopy } from '@/utils/qjd'

export default {
  props: {
    processId: String,
    industry: String
  },
  emits: {},
  components: {
    Chart,
    Redline,
    BoxList,
    TableScore,
    ApplyDialog
  },
  setup (props, { root }) {
    // ajaxStore
    const { customer: { stratify: { enterpriseScore } } } = ajaxStore
    const { checkCompanyInfoById } = ajaxStore.factoryService.layered
    // route
    const { id } = root.$route.query
    // state
    const state = reactive({
      id,
      baseApi: {},
      chatApi: {},
      redLineApi: {},
      baseSource: [],
      applyReportDialogShow: false,
      reportCompanyName: ''
    })

    // 基础信息
    state.baseApi = useAsync({ init: false, request: enterpriseScore })
    // 企业红线
    state.redLineApi = useRedLine({ processId: props.processId })
    // 企业分数
    state.chatApi = useAsync({ init: false, request: checkCompanyInfoById })

    // methods
    const initData = () => {
      // route
      const { id } = root.$route.query
      state.chatApi.doResult({ id })
      state.redLineApi.doResult({ processId: props.processId })
      state.baseApi.doResult({ processId: props.processId }).then(res => {
        const { code, data } = res
        if (code !== '0') return
        const source = deepCopy(tableSource)
        if (!props.industry) source.pop()
        source.forEach((item, index) => {
          item.score = data[item.key] || 0
          const key = getKey(item.score) // 根据分数获取当前等级
          item.status = key // 对应状态 用来展示区分卡片颜色
          if (index === 0) { // 基础信息
            item.desc = baseList[key].text // 对应描述
            item.level = baseList[key].level // 对应等级
          } else if (index === 1) { // 经营状况
            item.desc = operateList[key].text
            item.level = operateList[key].level
          } else if (index === 2) { // 司法风险
            item.desc = riskList[key].text
            item.level = riskList[key].level
          } else if (index === 3) { // 履约行为
            item.desc = performanceList[key].text
            item.level = performanceList[key].level
          } else if (index === 4) { // 财务分析
            item.desc = financeList[key].text
            item.level = financeList[key].level
          }
        })

        state.baseSource = source
      })
    }

    const applyReport = (isShow) => {
      state.applyReportDialogShow = isShow === false ? isShow : !state.applyReportDialogShow
    }

    const setReportName = (row) => {
      state.reportCompanyName = row.corpName
      // applyReport()
    }

    watch(() => props.processId, (val) => {
      val && initData()
    }, {
      immediate: true
    })

    return {
      applyReport,
      setReportName,
      ...toRefs(state)
    }
  }
}
</script>

<style lang='stylus' scoped>
.p-block
  background: #fff
  border-radius 5px
  padding-bottom 15px
  margin-bottom 10px
  .p-block-title
    display flex
    align-items center
    justify-content space-between
    border-bottom 1px solid #EAEBEE
    padding 0 20px
    height 50px
    .p-left
      display flex
      justify-content flex-start
    .p-company
      font-size 14px
      color #494949
      font-weight 500
    .p-desc
      margin-left 10px
      color #A9AFB8
  .p-content
    display flex
    justify-content flex-start
    padding 20px 25px 0
    height 330px
    .p-content-left
      min-width 420px
      width: 40%
      margin-right 10px
      border-right 1px dashed #EAEBEE
    .p-content-right
      width: 60%
      padding 0 20px 0 40px
.p-card
  background #fff
  border-radius 5px
  padding 20px
  margin-bottom 10px
</style>
