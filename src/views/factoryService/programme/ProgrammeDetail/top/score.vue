<template lang="pug">
.p-score-main(:class='["3", "4"].includes(projectInfo.status) ? "" : "p-process-ing"')
  .p-summayr-chart
    .p-summary-score
    .p-summary-score-name 【项目名称】{{projectInfo.name}}
    .p-summary-score-num(v-if='projectInfo.status === "3" && projectInfo.resultScore') {{parseInt(projectInfo.resultScore)}}
    .p-summary-score-num.p-status-num(v-else-if='projectInfo.status === "4"') 已驳回
    .p-summary-score-num(v-else) -- --
  .p-tips-main
    .p-tips-bg
    .u-tip
      i.el-icon-info
      span 提示：
      .p-detail-content
        p 1.评估结果以您提供的项目资料，人工评估而成，仅供参考，不作为您是否决定合作的依据
        p 2.以上数据为仟金顶基于企业公开信息深度分析的成果，不代表仟金顶任何明示、暗示的观点和保证，仅供用户参考
</template>

<script>
import { inject } from '@vue/composition-api'
export default {
  setup(props) {
    const projectInfo = inject('projectInfo')
    return {
      projectInfo
    }
  }
}
</script>

<style lang="stylus" scoped>
.p-score-main
  background  url(//cdn.qjdchina.com/static-online/saas/factoryService/programme/project-score-bg.png) no-repeat
  background-size cover
  min-width 480px
  height 280px
  display flex
  position relative
  margin-right 30px
  width 50%
  .p-summary-score
    background url(//cdn.qjdchina.com/static-online/saas/factoryService/programme/score-bg.png) center no-repeat
    background-size contain
    min-width 158px
    height 139px
    margin 0 auto
    width 100%
  .p-summayr-chart
    margin 55px 20px 0
    position relative
    min-width 160px
    width 30%
    display flex
    flex-wrap wrap
    justify-content center
    .p-summary-score-name
      text-align center
      color #9FCEFF
      margin-top -15px
      white-space normal
      word-break break-all
    .p-summary-score-num
      color #fff
      font-size 32px
      position absolute
      top 55px
      width 55px
      text-align center
    .p-status-num
      font-size 18px
      margin-top 20px
  .p-tips-main
    position absolute
    top 29px
    right 24px
    width 58%
    .p-tips-bg
      background #395CAB
      opacity .39
      min-width 230px
      width 100%
      height 226px
      border-radius 6px
    .u-tip
      position absolute
      top 20px
      width 100%
      min-width 200px
      font-size 14px
      color #fff
      border-bottom none
      padding 0 10px
      .p-detail-content
        font-size 14px
        display flex
        flex-wrap wrap
        flex-direction column
        height 180px
        justify-content center
        word-break break-all
.p-process-ing
  width 100%
  margin-right 0
</style>
