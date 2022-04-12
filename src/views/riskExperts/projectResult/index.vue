<template lang="pug">
.page-main
  .p-head
    .p-head-left 报告编号：{{thirdSource.taskNumber}}
    .p-title 项目评估深度报告
    .p-head-right
      .p-item 报告生成日期：{{thirdSource.insDatetime | toDateStr('yyyy-MM-dd')}}
      .p-item 报告申请日期：{{thirdSource.updDatetime | toDateStr('yyyy-MM-dd')}}
  .p-content
    .p-company
      img(:src="`${$assetsBaseUrl}/riskExperts/result/company-logo.png`")
      .p-text
        .p-name
          span {{thirdSource.companyName}}
        .p-code 企业信用代码：{{thirdSource.uniformCreditCode}}
      .p-right(:class='thirdSource.result === "通过" ? "p-success" : ""' v-show='!thirdState.loading')
        .p-val {{thirdSource.result || '拒绝'}}
        .p-label 决策结果
    .p-detail
      .p-block
        .p-block-title 基础信息
        .p-slot
          table.table
            tr
              th 项目方名称
              td {{thirdSource.companyName}}
              th 成立日期
              td {{thirdSource.estiblishTime | toDateStr('yyyy-MM-dd')}}
            tr
              th 注册资本
              td {{thirdSource.regCapital}}
              th 企业类型
              td {{thirdSource.type}}
      .p-block
        .p-block-title 企业股权结构
        .p-slot
          Table(
            ref="tableRef"
            :dataSource="dataSource"
            :columns="columns"
            :loading="thirdState.loading"
            :border='true'
          )
      .p-block
        .p-block-title 涉诉情况
        .p-slot
          table.table
            tr
              th 原告涉诉笔数
              td {{detail.plaintiffCount}}
              th 原告涉诉金额（万元）
              td {{detail.plaintiffAmount | toAmountStr(2, true) || '--'}}
              th 被告涉诉笔数
              td {{detail.defendantCount}}
              th 被告涉诉金额（万元）
              td {{detail.defendantAmount | toAmountStr(2, true) || '--'}}
            tr
              th 近两年执行记录
              td {{detail.recentTwoYearsImplementationCount}}
              th(style='width: 160px') 近两年执行金额（万元）
              td {{detail.recentTwoYearsImplementationAmount | toAmountStr(2, true) || '--'}}
              th 失信次数
              td {{detail.dishonestyCount}}
              th 失信金额（万元）
              td {{detail.dishonestyAmount | toAmountStr(2, true) || '--'}}
      .p-block
        .p-block-title 其他信息
        .p-slot
          table.table.table-layout-main
            tr
              th 三条红线情况
              td(v-html='detail.redThreadInfo') {{detail.redThreadInfo}}
              th 有票贴现情况
              td(v-html='detail.billDiscountInfo') {{detail.billDiscountInfo}}
            tr
              th 评估时间
              td(colspan='3' style='height: 64px') {{detail.evaluationTime | toDateStr('yyyy-MM-dd hh:mm:ss')}}
            tr
              th 机构评级
              td(colspan='3' v-html='detail.agencyRating') {{detail.agencyRating}}
            tr
              th 财务情况
              td(colspan='3' v-html='detail.financialInfo') {{detail.financialInfo}}
            tr
              th 舆情情况
              td(colspan='3' v-html='detail.consensusInfo') {{detail.consensusInfo}}
            tr
              th 行业趋势
              td(colspan='3' v-html='detail.industryTrends') {{detail.industryTrends}}
            tr
              th 评估意见
              td(colspan='3' v-html='detail.evaluationResult') {{detail.evaluationResult}}
    .p-tips
      .p-tip-item
        //- .p-tip-line
        .p-tip-content 声明：此报告基于企业公开数据及系统评估生成。仅供参考，不代表我司任何明示、暗示的观点和保证，不作为您是否合作的依据
        //- .p-tip-line
      .p-tip-item
        .p-tip-content 报告生成日期：{{thirdSource.insDatetime | toDateStr('yyyy-MM-dd')}}   报告申请日期：{{thirdSource.updDatetime | toDateStr('yyyy-MM-dd')}}   报告编号：{{thirdSource.taskNumber}}
    .p-control
      el-button(@click="goback") 返回
</template>
<script>
import { reactive, toRefs } from '@vue/composition-api'
import ajaxStore from '@/apis'
import Table from '@/components/qjd/table'
import useAsync from 'hooks/useAsync'
import { columns } from './config'

export default {
  components: {
    Table
  },
  setup(props, {root}) {
    const { deepId, processId } = root.$route.query || {}
    // ajax
    const { riskExperts: { projectEvaluation: { getDeepByProcessId, tycCompanyBase } } } = ajaxStore
    // state
    const state = reactive({
      detailState: {},
      thirdState: {},
      detail: {
      },
      thirdSource: {},
      dataSource: [],
    })
    // 详情-接口1
    state.detailState = useAsync({
      request: getDeepByProcessId,
      params: { processId },
      successCallBack: ({ code, data }) => {
        if (code === '0') {
          state.detail = data
        }
      }
    })
    // 详情-接口2
    state.thirdState = useAsync({
      request: tycCompanyBase,
      params: { deepId },
      successCallBack: ({ code, data }) => {
        if (code === '0') {
          state.thirdSource = data
          state.dataSource = data.holders || []
        }
      }
    })
    // 返回
    const goback = val => {
      root.$router.push({
        name: 'projectTaskList',
      })
    }

    return {
      columns,
      goback,
      ...toRefs(state)
    }
  },
}
</script>
<style lang="stylus" scoped>
.p-head
  padding 20px 30px
  height 260px
  text-align center
  background #2D3174
  display flex
  justify-content space-between
  align-items flex-start
  .p-head-left
    color #F2F2F6
    line-height 24px
  .p-head-right
    color #F2F2F6
    line-height 24px
  .p-title
    font-size 30px
    color #fff
    font-weight 500
.p-content
  position relative
  overflow hidden
  background #fff
  margin -180px 28px
  padding 30px 30px 0 30px
  border-radius 4px
  .p-company
    display flex
    align-items flex-start
    img
      width 24px
      height 24px
      margin 5px
    .p-text
      margin-left 5px
      .p-name
        font-size 24px
        font-weight 500
      .p-code
        font-size 12px
    .p-right
      margin-left auto
      margin-right 30px
      width 169px
      height 84px
      background #FFF7F7
      border-radius 8px
      text-align center
      padding 15px
      .p-val
        font-size 26px
        font-weight 600
        color #D40000
      .p-label
        font-size 12px
    .p-success
      background #F1FCF2
      .p-val
        color #359570
  .p-detail
    margin-top 20px
    .p-block
      margin-top 20px
      .p-block-title
        border-left 2px solid #3B68F0
        font-size 16px
        font-weight 500
        height 16px
        line-height 18px
        padding-left 10px
      .p-slot
        margin-top 15px
  .p-tips
    padding 50px 0 80px
    .p-tip-item
      display flex
      justify-content center
      align-items center
      margin-top 10px
      // .p-tip-line
      //   flex 160px 0 0
      //   height 1px
      //   background #E8ECF2
      .p-tip-content
        color #A9AFB8
        flex 1
        text-align center
.table
  th
    width 152px
.p-control
  position fixed
  bottom 0
  left 292px
  right 88px
  height 60px
  background #FFFFFF
  box-shadow 0px -2px 6px 0px rgba(51, 75, 133, 0.2);
  border: 1px solid #ECEDF1
  display flex
  align-items center
  justify-content center
  margin 0 -30px
</style>
