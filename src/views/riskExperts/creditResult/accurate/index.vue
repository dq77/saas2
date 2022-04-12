<template lang="pug">
.page-main
  .p-head
    .p-head-left 报告编号：{{id}}
    .p-title 精准评估
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
        .p-shadow
      .p-card.card-bg-2
        .p-card-inner
          .p-card-desc 建议赊销额度最高为年贸易额的
          .p-card-score {{(detail.quotoProportion || detail.quotoProportion === 0) ? detail.quotoProportion + '%' : '-' }}
        .p-shadow
    .p-tips
      .p-block
        .p-desc 审批意见
        .p-slot
          .p-risk {{riskList}}
    .p-detail
      .p-detail-name
        .p-detail-desc 报告详情
      .p-detail-main
        .p-detail-main-bg
        .p-detail-head 实际控制人及家庭基本情况
        .p-table-title 实际控制人基本情况
        .p-table
          table
            <tr>
              <th style="width: 189px;">姓名</th>
              <th style="width: 108px;">性别</th>
              <th style="width: 108px;">年龄</th>
              <th style="width: 108px;">婚姻状况</th>
              <th style="width: 283px;">身份证号码</th>
              <th style="width: 175px;">联系电话</th>
            </tr>
            <tr>
              <td></td>
              <td></td>
              <td></td>
              <td></td>
              <td></td>
              <td></td>
            </tr>
            //- <tr>
            //-   <th>支付宝/微信核实</th>
            //-   <td colspan="5">字段</td>
            //- </tr>
            //- <tr>
            //-   <th>家庭住址</th>
            //-   <td colspan="5">字段</td>
            //- </tr>
        //- .p-table-title 配偶基本情况
        //- .p-table(v-loading='tableState.loading')
        //-   table
        //-     <tr>
        //-       <th style="width: 189px;">姓名</th>
        //-       <th style="width: 108px;">性别</th>
        //-       <th style="width: 108px;">年龄</th>
        //-       <th style="width: 350px;">身份证号码</th>
        //-       <th style="width: 215px;">联系电话</th>
        //-     </tr>
        //-     <tr>
        //-       <td>字段</td>
        //-       <td>字段</td>
        //-       <td>字段</td>
        //-       <td>字段</td>
        //-       <td>字段</td>
        //-     </tr>
    .p-bottom
      .p-control
        el-button(type="primary", @click="download" v-weblogs.click='"赊销评估-精准评估-评估结果页-导出"') 导出全部报告
        el-button.p-btn(@click="goback") 返回
      //- .p-empty
</template>
<script>
import { reactive, toRefs } from '@vue/composition-api'
import ajaxStore from '@/apis'
import { toPrefixUrl } from '@/utils/util'
import useAsync from 'hooks/useAsync'

export default {
  components: {
  },
  setup(props, {root}) {
    const { id } = root.$route.query || {}
    // ajax
    const { riskExperts: { creditEvaluation: { getResultById } } } = ajaxStore
    // state
    const state = reactive({
      detailState: {},
      detail: {},
      riskList: [],
      tableState: {},
      dataSource: {},
    })
    // table数据
    // state.tableState = useAsync({
    //   request: getResultById,
    //   params: { id },
    //   successCallBack: ({ code, data }) => {
    //     if (code === '0') {
    //       state.dataSource = {}
    //     }
    //   }
    // })

    // 详情-接口
    state.detailState = useAsync({
      request: getResultById,
      params: { id },
      successCallBack: ({ code, data }) => {
        if (code === '0') {
          // 初始化数据
          state.detail = data
          state.riskList = data.approvalComments || '暂无'
        }
      }
    })
    // 导出报告
    const download = () => {
      window.open(toPrefixUrl(`/fs/file/download?fileKey=${state.detail.resultPdfKey}`))
      // window.open(toPrefixUrl(`/saas-credit/v1/credit/import/downErrorFile?fileKey=${state.detail.resultPdfKey}`))
    }
    // 返回
    const goback = val => {
      root.$router.push({
        name: 'creditTaskList',
      })
    }

    return {
      id,
      download,
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
  margin -180px 28px 0px 28px
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
  .p-tips
    background #FAFBFF
    margin 50px 0 20px 0
    padding 20px 30px
    border-radius 8px
  .p-detail
    border-radius 8px
    border 1px solid #F2F2F6
    padding-bottom 10px
    .p-detail-name
      height 66px
      background #FAFBFF
      border-radius 8px
      border 1px solid rgba(151, 151, 151, 0)
      padding 20px 30px
      .p-detail-desc
        font-size 20px
        border-left 2px solid #3b68f0
        height 16px
        line-height 18px
        padding-left 6px
        margin-bottom 10px
    .p-detail-main
      padding 20px 30px 0px
      position relative
      .p-detail-main-bg
        background linear-gradient(180deg, rgba(255, 255, 255, 0.27) 0%, #FFFFFF 100%)
        position absolute
        top 0
        bottom 0
        left 0
        right 0
    .p-detail-head
      height 60px
      line-height 60px
      border-radius 8px
      font-size 20px
      font-weight 500
      color #494949
      text-align center
    .p-table-title
      font-size 14px
      font-weight 500
      color #494949
    .p-table
      margin 20px 0
      border-bottom: 1px solid #F2F2F6;
      border-right: 1px solid #F2F2F6;
      table
        width 100%
      th
        background: #F8F9FA;
        border: 1px solid #F2F2F6;
        border-bottom: none;
        border-right: none;
        height: 40px;
        text-align: center;
        font-size: 12px;
        color: #848484;
      td
        border: 1px solid #F2F2F6;
        border-bottom: none;
        border-right: none;
        height: 40px;
        text-align: center;
        font-size: 12px;
        color: #494949;
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
  .p-risk
    min-height 90px
    padding 10px
    word-break break-all
.p-bottom
  position fixed
  bottom 0
  left 292px
  right 88px
  .p-empty
    height 120px
    background #FFFFFF
.p-control
  height 66px
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
