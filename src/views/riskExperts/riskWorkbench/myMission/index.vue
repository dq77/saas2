<template lang="pug">
Card2(title='我的任务' noWrap :loading='detailState.loading')
  el-scrollbar(style="height: 100%; width: 100%;")
    .p-my-mission
      .p-cate1
        .u-cate1-title 赊销评估
        .u-cate1-content
          .p-cate2
            .u-cate2-title 快速评估
            .u-cate2-vline
            .u-cate2-states
              .p-state
                .u-label 进行中
                router-link.u-num(
                  :to='{name: "creditTaskList", query: {evaluateMode: "FAST_MODE", evaluateStatus: ["EVALUATING"]}}'
                  v-weblogs.click='"风险工作台-我的任务-赊销评估-快速评估-进行中-点击跳转"'
                ) {{ detailState.creditCate.quick.doing }}
              .p-state
                .u-label 结果待查看
                router-link.u-num(
                  :to='{name: "creditTaskList", query: {evaluateMode: "FAST_MODE", evaluateStatus: ["ACCOMPLISH"]}}'
                  v-weblogs.click='"风险工作台-我的任务-赊销评估-快速评估-结果待查看-点击跳转"'
                ) {{ detailState.creditCate.quick.toRead }}
          .p-cate2.p-mg-t-20
            .u-cate2-title 标准评估
            .u-cate2-vline
            .u-cate2-states
              .p-state
                .u-label 进行中
                router-link.u-num(
                  :to='{name: "creditTaskList", query: {evaluateMode: "STANDARD_MODE", evaluateStatus: ["EVALUATING"]}}'
                  v-weblogs.click='"风险工作台-我的任务-赊销评估-标准评估-进行中-点击跳转"'
                ) {{ detailState.creditCate.standard.doing }}
              .p-state
                .u-label 待处理
                router-link.u-num(
                  :to='{name: "creditTaskList", query: {evaluateMode: "STANDARD_MODE", evaluateStatus: ["WAIT_SUBMIT"]}}'
                  v-weblogs.click='"风险工作台-我的任务-赊销评估-标准评估-待处理-点击跳转"'
                ) {{ detailState.creditCate.standard.todo }}
              .p-state
                .u-label 结果待查看
                router-link.u-num(
                  :to='{name: "creditTaskList", query: {evaluateMode: "STANDARD_MODE", evaluateStatus: ["ACCOMPLISH"]}}'
                  v-weblogs.click='"风险工作台-我的任务-赊销评估-标准评估-结果待查看-点击跳转"'
                ) {{ detailState.creditCate.standard.toRead }}
          .p-cate2.p-mg-t-20
            .u-cate2-title 精准评估
            .u-cate2-vline
            .u-cate2-states
              .p-state
                .u-label 进行中
                router-link.u-num(
                  :to='{name: "creditTaskList", query: {evaluateMode: "ACCURATE_MODE", evaluateStatus: ["EVALUATING"]}}'
                  v-weblogs.click='"风险工作台-我的任务-赊销评估-精准评估-进行中-点击跳转"'
                ) {{ detailState.creditCate.accurate.doing }}
              .p-state
                .u-label 待处理
                router-link.u-num(
                  :to='{name: "creditTaskList", query: {evaluateMode: "ACCURATE_MODE", evaluateStatus: ["SUPPLEMENT_INFO", "REPEAT_AUTH"]}}'
                  v-weblogs.click='"风险工作台-我的任务-赊销评估-精准评估-待处理-点击跳转"'
                ) {{ detailState.creditCate.accurate.todo }}
              .p-state
                .u-label 结果待查看
                router-link.u-num(
                  :to='{name: "creditTaskList", query: {evaluateMode: "ACCURATE_MODE", evaluateStatus: ["ACCOMPLISH"]}}'
                  v-weblogs.click='"风险工作台-我的任务-赊销评估-精准评估-结果待查看-点击跳转"'
                ) {{ detailState.creditCate.accurate.toRead }}
      .p-line
      .p-cate1
        .u-cate1-title 项目评估
        .u-cate1-content.p-flex.p-space-between
          .p-cate2
            .u-cate2-title 快速评估
            .u-cate2-vline
            .u-cate2-states
              .p-state
                .u-label 进行中
                router-link.u-num(
                  :to='{name: "projectTaskList", query: {type: "1", status: ["2"]}}'
                  v-weblogs.click='"风险工作台-我的任务-项目评估-快速评估-进行中-点击跳转"'
                ) {{ detailState.projectCate.quick.doing }}
          .p-cate2
            .u-cate2-title 深度评估
            .u-cate2-vline
            .u-cate2-states
              .p-state
                .u-label 进行中
                router-link.u-num(
                  :to='{name: "projectTaskList", query: {type: "2", status: ["2"]}}'
                  v-weblogs.click='"风险工作台-我的任务-项目评估-深度评估-进行中-点击跳转"'
                ) {{ detailState.projectCate.deep.doing }}
      //- .p-line
      //- .p-cate1
      //-   .u-cate1-title 风险舆情
      //-   .p-cate2.p-flex.p-space-between
      //-     .p-state
      //-       .u-label 未读风险事件
      //-       router-link.u-num(
      //-         :to='{name: "riskEvent"}'
      //-         v-weblogs.click='"风险工作台-我的任务-风险舆情-未读风险事件-点击跳转"'
      //-       ) {{ detailState.riskCate.risk }}
      //-     .p-state
      //-       .u-label 未读新闻舆情
      //-       router-link.u-num(
      //-         :to='{name: "journalism"}'
      //-         v-weblogs.click='"风险工作台-我的任务-风险舆情-未读新闻舆情-点击跳转"'
      //-       ) {{ detailState.riskCate.news }}
</template>

<script>
import { reactive, toRefs } from '@vue/composition-api'
import Card2 from './../card2'
import useDetail from './useDetail'

export default {
  components: {
    Card2,
  },
  setup() {
    const detailState = useDetail()

    const state = reactive({
      detailState
    })

    return {
      ...toRefs(state)
    }
  }
}
</script>

<style lang="stylus" scoped>
.p-my-mission
  padding 20px
  font-size 12px
  white-space nowrap
.p-flex
  display flex
.p-mg-t-20
  margin-top 20px
.p-space-between
  justify-content space-between
.p-line
  margin 22px 0 14px
  height 1px
  background-color #F4F4F4
.p-cate1
  .u-cate1-title
    padding-bottom 4px
    color #494949
.p-cate2
  display flex
  align-item center
  .u-cate2-title
    color #6D7278
  .u-cate2-states
    flex 1
    padding-left 8px
    display flex
  .u-cate2-vline
    margin-left 8px
    width 1px
    height 12px
    background-color #BDC1C8
.p-state
  display flex
  margin-left 8px
  &:first-child
    margin-left 0
  .u-label
    color #A9AFB8
  .u-num
    margin-left 5px
    font-size 14px
    color #3B68F0
    &:hover
      text-decoration underline
</style>
