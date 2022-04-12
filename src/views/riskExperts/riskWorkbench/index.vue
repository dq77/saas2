<template lang="pug">
.page-main
  .p-row
    .p-col(style='display: flex; flex-direction: column; width: 70%;')
      Quick.p-mg-b-10
      RiskWarn(style="flex: 1;")
    .p-col.p-mg-l-10(style='flex: 1;')
      MyMission
      TodayOpinion.p-mg-t-10
  .p-row.p-mg-t-10
    EvaluateTaskOverview
  .p-row.p-mg-t-10
    EvaluateResultOverview
  .p-row.p-mg-t-10
    CustomerRiskOverview
</template>

<script>
import Quick from './quick'
import RiskWarn from './riskWarn'
import MyMission from './myMission'
import TodayOpinion from './todayOpinion'
import EvaluateTaskOverview from './evaluateTaskOverview'
import EvaluateResultOverview from './evaluateResultOverview'
import CustomerRiskOverview from './customerRiskOverview'
export default {
  components: {
    Quick,
    RiskWarn,
    MyMission,
    TodayOpinion,
    EvaluateTaskOverview,
    EvaluateResultOverview,
    CustomerRiskOverview,
  }
}
</script>

<style lang="stylus" scoped>
.p-mg-l-10
  margin-left 10px
.p-mg-t-10
  margin-top 10px
.p-mg-b-10
  margin-bottom 10px
.p-row
  display flex
// 以下为本页面的通用样式
/deep/.p-read-more-btn
  color #A9AFB8
  cursor pointer
  transition color .3s
  &:hover
    color #3B68F0
  &.u-absolute
    position absolute
    right 0
    top 0
</style>
