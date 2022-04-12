<template lang="pug">
.p-summary-main
  .p-header-flex
    el-button(type='primary' @click='addProjectDialog' weblogs-anchor='factory-customerEvaluation-eval-initiate') 发起项目评估
  .p-summary-flex
    .p-summary-card.p-man-summary.card
      .p-card-title 人工评估概览
      .p-card-content
        .p-summary-item
          .p-bg
          .p-summary-item-label 待评估项目数（个）
          .p-summary-item-num {{summary.wait}}
        .p-summary-item.p-summary-item-right
          .p-bg
          .p-summary-item-label 完成评估项目数（个）
          .p-summary-item-num {{summary.done}}
        .p-summayr-chart
          .p-summary-score
          .p-summary-score-name(v-if='summary.last.length') 【项目名称】{{summary.last[0].name}}
          .p-summary-score-num(v-if='summary.last.length')
            span(v-if='summary.last[0].resultScore && summary.last[0].status === "3"') {{parseInt(summary.last[0].resultScore)}}
            span.p-status-num(v-else-if='summary.last[0].status === "4"') 已驳回
            span(v-else) -- --
          .p-summary-score-num(v-else) -- --
          el-button.p-detail-btn(type='primary' v-if='summary.last.length' @click='checkDetail(summary.last[0].id)' weblogs-anchor='factory-customerEvaluation-eval-overview-view') 查看
    .p-summary-card.p-base-summary.card
      .p-card-title 基本评估概览
      .p-card-content
        .p-card-label 评估项目总数（个）
        .p-card-num {{summary.basic}}
  el-dialog(
    width='357px'
    :visible.sync='addProject'
  )
    .p-dailog-man
      .p-dialog-title 请您选择评估模式
      .p-dialog-content
        el-button.p-btn(type='primary' size='large' @click='goPage("programmeBaseSearch")' weblogs-anchor='factory-customerEvaluation-eval-initiate-base') 基本项目评估
        el-button.p-btn.p-btn-default(type='primary' size='large' plain @click='dialogShow' weblogs-anchor='factory-customerEvaluation-eval-initiate-man') 人工项目评估
        .p-dialog-text
          p 提示：
          p 1.基本项目评估：输入项目名称、建筑工程商名称、项目公司名称，即可了解项目基本情况
          p 2.人工项目评估：输入项目信息、上传项目合同，可获得人工评估结果
          p 3.为保证评估结果的准确性，请按照要求上传项目真实信息
  el-dialog(
    width='357px'
    :center='true'
    :visible.sync='isVisible')
    .p-dialog-title 请您选择评估模式
    .p-dialog-btns
      el-button.p-btn(type='primary' @click='goPage("evaluationMan", {hasContractFile: 1})' weblogs-anchor='factory-customerEvaluation-eval-initiate-man-have') 有项目合同
      el-button.p-btn.p-btn-plain(type='primary' @click='goPage("evaluationMan", {hasContractFile: 0})' plain weblogs-anchor='factory-customerEvaluation-eval-initiate-man-not') 无项目合同
</template>
<script>
import ajaxStore from '@/apis'
export default {
  data() {
    return {
      isVisible: false,
      addProject: false,
      summary: {
        basic: 0,
        done: 0,
        wait: 0,
        last: []
      }
    }
  },
  methods: {
    checkDetail(id) {
      this.$router.push({
        name: 'programmeDetail',
        query: { id }
      })
    },
    async getEvaluationStatistics() {
      const res = await ajaxStore.factoryService.programme.getEvaluationStatistics()
      if (res.data && res.data.code === '0') {
        res.data.data.last.filter((item) => {
          return item.status === '3'
        })
        this.summary = res.data.data
      }
    },
    addProjectDialog() {
      this.addProject = true
    },
    goPage(name, query) {
      this.$router.push({
        name,
        query
      })
    },
    dialogShow() {
      this.isVisible = true
      this.addProject = false
    },
  },
  mounted() {
    this.getEvaluationStatistics()
  }
}
</script>
<style lang="stylus" scoped>
.p-summary-main
  margin-top -32px
.p-header-flex
  display flex
  justify-content flex-end
  margin-bottom 10px
.p-summary-flex
  display flex
  justify-content space-between
.p-summary-card
  background #1E367A
  width 100%
  .p-card-title
    position relative
    height 50px
    font-size 16px
    line-height 50px
    text-indent 33px
    color #fff
    background #31529D
    box-shadow 0px 6px 8px 0px rgba(60, 92, 164, 0.39)
    &:before
      content ''
      position absolute
      top 18px
      left 20px
      width 3px
      height 14px
      background-color #25BECD
      border-radius 2px
  .p-card-content
    position relative
    min-height 200px
    display flex
    color #fff
    .p-card-label
      position absolute
      top 70px
      left 40px
      font-size 14px
    .p-card-num
      position absolute
      top 90px
      left 40px
      font-size 32px
      font-weight bold
    .p-summary-item
      width 30%
      height 162px
      border-radius 6px
      position relative
      overflow hidden
      margin 20px 0
      margin-left 30px
      .p-bg
        background #395CAB
        opacity 0.39
        width 100%
        height 100%
        position absolute
      .p-summary-item-label,
      .p-summary-item-num
        position absolute
        font-size 14px
      .p-summary-item-label
        top 50px
        left 15%
      .p-summary-item-num
        top 70px
        left 15%
        font-size 32px
        font-weight bold
    .p-summary-item-right
      margin-left 15px
.p-man-summary
  .p-card-content
    background url(//cdn.qjdchina.com/static-online/saas/factoryService/programme/project-bg-2.png)
    background-size contain
.p-base-summary
  width 30%
  min-width 285px
  margin-left 10px
  .p-card-content
    background url(//cdn.qjdchina.com/static-online/saas/factoryService/programme/project-bg-1.png) right bottom no-repeat
    background-size cover
.p-summary-score
  background url(//cdn.qjdchina.com/static-online/saas/factoryService/programme/score-bg.png) no-repeat
  background-size cover
  width 158px
  height 139px
  margin 0 auto
.p-summayr-chart
  margin 20px 20px 0 15px
  position relative
  width 300px
  .p-summary-score-name
    text-align center
    color #9FCEFF
  .p-detail-btn
    position absolute
    right -10px
    top 0
  .p-summary-score-num
    font-size 32px
    position absolute
    top 55px
    left 40%
    width 55px
    text-align center
  .p-status-num
    font-size 18px
    margin-top 20px
.p-dailog-man
  margin 50px
  .p-dialog-title
    color #494949
    font-size 14px
    font-weight bold
    text-align center
    margin-bottom 47px
  .p-dialog-content
    display flex
    flex-wrap wrap
    justify-content center
    .p-btn
      width 196px
      margin 10px auto
    .p-btn-default
      background #E8ECF7
      color #3C5DA4
      border none
    .p-dialog-text
      color #6D7278
      margin-top 20px
      width 196px
.p-dialog-title
  font-size 14px
  color #494949
  margin 47px 0
  text-align center
.p-dialog-btns
  display flex
  width 100px
  margin 0 auto 50px auto
  flex-wrap wrap
  justify-content center
  .p-btn
    margin 0 0 10px 0
    padding 0 67px
  .p-btn-plain
    background #E8ECF7
    color #3C5DA4
    border none
</style>
