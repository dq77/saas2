<template lang='pug'>
.order-master-page
  .top-area
    .title-name 风险专家
    .desc 风险专家是一款为企业做风险评估的SaaS系统，应用大数据算法技术并结合供应链财务数据，为企业提供风险评估和决策建议。
  Title(text='核心服务')
  .center-service
    .text
      .txt-block.left
        .text-title 满配的风险功能
        .text-item 赊销风险审查
        .text-item 精准额度预测
        .text-item 项目风险评估
        .text-item 行业黑名单
    .pic
      img(:src="`${$assetsBaseUrl}/introduce/risk-experts1.png`" width='605px')
  .center-service
    .pic
      img(:src="`${$assetsBaseUrl}/introduce/risk-experts2.png`" width='590px')
    .text
      .txt-block.right
        .text-title 多维度审查视角
        .text-item 企业风险分类
        .text-item 财务能力评估
        .text-item 个人欺诈风险
        .text-item 个人资质评估
  .center-service
    .text
      .txt-block.left
        .text-title 精准的决策建议
        .text-item 客户是否准入
        .text-item 客户额度建议
        .text-item 客户违约概率
        .text-item 项目是否准入
    .pic
      img(:src="`${$assetsBaseUrl}/introduce/risk-experts3.png`" width='605px')
  .center-service
    .pic
      img(:src="`${$assetsBaseUrl}/introduce/risk-experts4.png`" width='638px')
    .text
      .txt-block.right
        .text-title 实时的风险预警
        .text-item 动态客户风险扫描
        .text-item 企业与个人全面扫描
        .text-item 差异化观察频率
        .text-item 主动式风险推送
  Title(text='应用场景')
  .sence-list
    .sence-item
      .img
        img(:src="`${$assetsBaseUrl}/introduce/risk-experts-icon1.png`")
      .sence-title 赊销业务快速风险审查
      .sence-desc 无需客户授权，完成对客户企业的基本风险特征的初筛
    .sence-item
      .img
        img(:src="`${$assetsBaseUrl}/introduce/risk-experts-icon2.png`")
      .sence-title 赊销业务标准风险审查
      .sence-desc 在轻度授权的情况下，无需客户提供资料，完成对企业、实控人的风险筛查，并给出建议额度
    .sence-item
      .img
        img(:src="`${$assetsBaseUrl}/introduce/risk-experts-icon3.png`")
      .sence-title 赊销业务精准风险审查
      .sence-desc 对于客户提供的资料做全面的风险审查，给出精准的决策建议和额度建议
    .sence-item
      .img
        img(:src="`${$assetsBaseUrl}/introduce/risk-experts-icon4.png`")
      .sence-title 项目评估
      .sence-desc 从项目方基本情况、股权结构、债券评级、三条红线、商票兑付情况、财务状况和涉诉情况、行业趋势、项目情况等方面对开发商或开发项目做全面的风险审查和项目准入决策
  Title(text='服务流程')
  OpenDialog(id='7' @clickShowDialog='clickShowDialog')
</template>

<script>
import { weblogsDom } from '@/utils/qjd/weblogs'
import Title from '../components/title'
import OpenDialog from '../components/openDialog'
export default {
  props: {
  },
  components: {
    Title, OpenDialog
  },
  setup() {
    const clickShowDialog = (openstate) => (openstate === 0 && weblogsDom('我的服务-风险专家-产品详情页-申请'))
    return {
      clickShowDialog
    }
  },
}
</script>

<style lang='stylus'>
.order-master-page
  background-color #fff
  margin 0 30px
  padding-bottom 56px
  min-width 1000px
  .top-area
    height 240px
    background-image url('//cdn.qjdchina.com/static-online/saas/introduce/top-risk-experts.jpg')
    background-repeat no-repeat
    background-position center right
    background-size auto 100%
    background-color #061646
    color #FFF
    padding-left 62px
    .title-name
      font-size 26px
      padding-top 56px
      height 104px
      line-height 37px
      position relative
      margin-bottom 12px
      &:after
        content ''
        position absolute
        bottom 0
        left 0
        width 40px
        height 2px
        background-color #3B68F0
    .desc
      width 40%
      min-width 462px
      color #E0E0E0
      font-size 14px
      line-height 22px
  .center-service
    margin 0 34px 40px
    border 1px solid #EAEBEE
    padding 30px
    display flex
    .text
      flex 2 0 auto
      display flex
      justify-content center
      .txt-block
        .text-title
          font-size 18px
          margin 20px 0 15px
        .text-item
          margin-bottom 15px
          position relative
          font-size 14px
          line-height 20px
          height 20px
          padding-left 15px
          &:after
            content ''
            position absolute
            top 7px
            left 0
            width 6px
            height 6px
            border-radius 3px
            background-color #A9AFB8
        &.left
          margin-right 30%
        &.right
          margin-left 0
    .pic
      flex 1 0 auto
      display flex
      justify-content center
    &:nth-child(2n)
      background-color #FAFBFC
  .sence-list
    display flex
    padding 0 19px 24px
    .sence-item
      flex 1
      width 0
      text-align center
      padding 62px 0 68px
      border 1px solid #EAEBEE
      margin 0 15px
      color #252631
      img
        width 90px
      .sence-title
        margin 27px 0 15px
        font-size 20px
      .sence-desc
        padding 0 28px
        color #595961
        font-size 14px
        line-height 20px
        margin 0 auto
</style>
