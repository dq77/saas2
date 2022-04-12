<template lang="pug">
.page-main
  .p-head
    .p-head-left 报告编号：{{id}}
    .p-title 标准评估
    .p-head-right
      .p-item 报告生成日期：{{detail.genDate}}
      .p-item 报告申请日期：{{detail.applyDate}}
  .p-content
    .p-result(:class='detail.evaluateResult === "通过" ? "p-result-success" : ""') {{detail.evaluateResult}}
    .p-company
      img(:src="`${$assetsBaseUrl}/riskExperts/result/company-logo.png`")
      .p-text
        .p-name
          span {{detail.corporationName}}
        .p-code 企业信用代码：{{detail.uniformCreditCode}}
    .p-cards
      .p-card.card-bg-1(:class='detail.evaluateResult === "通过" ? "" : "card-bg-error"')
        .p-card-inner
          .p-card-desc 风险等级
          .p-card-score {{detail.riskLevel}}
      .p-card.card-bg-2
        .p-card-inner
          .p-card-desc 违约概率
          .p-card-score {{(detail.defaultProbability || detail.defaultProbability === 0) ? detail.defaultProbability + '%' : '-'}}
    .p-flex
      .p-left
        .p-block
          .p-desc 核查风险清单
          .p-slot
            el-scrollbar.p-risk-list(v-if='riskList.length && riskList.length > 0')
              .p-risk-item(v-for='(item, index) in riskList' :key='index') {{item}}
            .p-risk-empty(v-else) 暂无
        .p-block(style='margin-top: 20px')
          .p-desc 赊销指引
          .p-slot
            .p-risk-list
              .p-risk-item 建议赊销额度最高为年采购额的{{(detail.quotoProportion || detail.quotoProportion === 0) ? detail.quotoProportion + '%' : '0%'}}
      .p-right
        .p-block
          .p-desc 客户风险维度画像
          .p-slot
            .p-chart
              //- 客户风险维度画像
              Chart(:dataSource="dataSource")
  .p-control
    el-button(type="primary", @click="toAccurate" v-weblogs.click='"赊销评估-标准评估-评估结果页-一键获取"' :loading='loading') 一键获取精准评估结果
    el-button.p-btn(@click="goback") 返回
</template>
<script>
import { Message } from 'element-ui'
import { reactive, toRefs } from '@vue/composition-api'
import ajaxStore from '@/apis'
import Chart from './chart/index.vue'
import useAsync from 'hooks/useAsync'
// import store from '@/store'

export default {
  components: {
    Chart
  },
  setup(props, {root}) {
    // store
    // const { state: { permissions } } = store
    const { id } = root.$route.query || {}
    // ajax
    const { riskExperts: { creditEvaluation: { getResultById, accurateCreate } } } = ajaxStore
    // state
    const state = reactive({
      detailState: {},
      detail: {},
      dataSource: [],
      riskList: [],
    })
    // 详情-接口
    state.detailState = useAsync({
      request: getResultById,
      params: { id },
      successCallBack: ({ code, data }) => {
        if (code === '0') {
          // 初始化数据
          state.detail = data
          state.riskList = data.riskCheckList || []
          const { assetsPower, enterpriseRisk, creditHis, personQualification, fraudRisk } = (data.standardRiskProfile || {})
          state.dataSource = [assetsPower, enterpriseRisk, creditHis, personQualification, fraudRisk]
        }
      }
    })
    // 创建精准流程
    const { loading, doResult } = useAsync({
      request: accurateCreate,
      init: false,
    })

    // 跳转精准评估
    const toAccurate = () => {
      doResult({
        customerName: state.detail.corporationName,
        uniformCreditCode: state.detail.uniformCreditCode,
        evaluateMode: 'ACCURATE_MODE',
        corporateRepresentative: state.detail.representativeName,
      }).then((res) => {
        if (res.code === '0') {
          Message.success('发起成功')
          root.$router.push({
            name: 'evaluationSubmitSuccess',
            query: {
              step: 'first'
            }
          })
        }
      })
    }
    // 返回
    const goback = val => {
      root.$router.push({
        name: 'creditTaskList',
      })
    }

    return {
      id,
      toAccurate,
      goback,
      loading,
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
  .p-result
    position absolute
    top 24px
    right -130px
    font-size 22px
    background #FCF1F1
    color #D40000
    font-weight 600
    width 360px
    height 55px
    line-height 55px
    text-align center
    border 3px solid #E7E7E9
    transform rotate(35deg)
  .p-result-success
    color #359570
    background #F1FCF2
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
        margin-top 10px
  .p-cards
    margin-top 30px
    display flex
    justify-content flex-start
    align-items flex-start
    .p-card
      position relative
      width 380px
      height 150px
      margin-right 20px
      color #fff
      border-radius 8px
      .p-card-desc
        font-size 14px
      .p-card-score
        font-size 48px
    .card-bg-1
      .p-card-inner
        position absolute
        z-index 10
        border-radius 8px
        width 380px
        height 190px
        padding 40px 0 0 50px
        background-size 100% 100%
        background-image url('https://qjdstatic.oss-cn-hangzhou.aliyuncs.com/static-online/saas/riskExperts/result/result-success.png')
    .card-bg-error
      .p-card-inner
        height 192px
        background-image url('https://qjdstatic.oss-cn-hangzhou.aliyuncs.com/static-online/saas/riskExperts/result/result-error.png')
    .card-bg-2
      .p-card-inner
        position absolute
        z-index 10
        border-radius 8px
        width 380px
        height 190px
        padding 40px 0 0 50px
        background-size 100% 100%
        background-image url('https://qjdstatic.oss-cn-hangzhou.aliyuncs.com/static-online/saas/riskExperts/result/result-normal.png')
  .p-flex
    display flex
    align-items stretch
    background #fff
    margin 50px 0 60px 0
    .p-left
      flex 1
      padding 20px 30px 0px 20px
      background #FAFBFF
      margin-right 20px
    .p-right
      flex 1
      padding 20px 30px 0px 20px
      background #FAFBFF
  .p-block
    width 100%
    margin-bottom 20px
    .p-desc
      font-size 20px
      border-left 2px solid #3b68f0
      height 16px
      line-height 18px
      padding-left 6px
      margin-bottom 10px
    .p-slot
      width 100%
  .p-risk-empty
    text-align center
    height 120px
    line-height 120px
    border 1px solid #F2F2F6
    border-radius 5px
    margin-top 25px
  .p-risk-list
    margin-top 15px
    height 169px
    min-height 120px
    .p-risk-item
      border 1px solid #F2F2F6
      padding 10px 20px
      min-height 40px
      line-height 20px
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
  .p-btn
    margin-left 20px
</style>
