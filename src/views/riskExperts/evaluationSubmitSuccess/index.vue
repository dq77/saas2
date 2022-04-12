<template lang="pug">
.page-main
  .evaluation-submit-success
    i.el-icon-warning-outline.evaluation-submit-success__icon
    .evaluation-submit-success__title {{title}}
    .evaluation-submit-success__tips
      p 您可以进行其他企业评估，
      p 本次评估结果我们将以短信等形式提醒您
      p 届时请再【风险专家-评估任务管理】中查阅
    .evaluation-submit-success__button
      el-button(type='primary' @click='goPage("chooseCreditMode")') 再评估一个
      el-button(type='infor' @click='goPage("creditTaskList")') 稍后查看
</template>

<script>
import { title } from './config'
export default {
  setup(props, { root }) {
    const goPage = (name) => {
      root.$router.replace({
        name
      })
    }
    const { step } = root.$route.query

    return {
      goPage,
      title: title[step]
    }
  }
}
</script>

<style lang="stylus" scoped>
.evaluation-submit-success
  background #ffffff
  min-height 90vh
  text-align center
  padding-top 100px
  &__icon
    font-size 70px
    margin-bottom 30px
    color #45B37C
  &__title
    font-size 24px
    font-weight bold
    margin-bottom 20px
  &__tips
    font-size 12px
    color #999
    margin-bottom 50px
</style>
