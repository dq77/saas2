<template lang='pug'>
.credit-manager-page
  .top-area
    .title-name 赊销管家
    .desc 全链路的赊销流程管理，赋能企业开展自主赊销的精细化管理，包括授信、用信、赊销政策、还款管理，降低赊销风险，推动业务的健康发展。
  Title(text='核心服务')
  .center-service
    .text
      .txt-block.left
        .text-title 灵活配置的政策管理
        .text-item 区域额度配置
        .text-item 等级额度配置
        .text-item 产品方案管理
        .text-item 黑白名单管理
    .pic
      img(:src="`${$assetsBaseUrl}/introduce/credit-manager1.png`" width='549px')
  .center-service
    .pic
      img(:src="`${$assetsBaseUrl}/introduce/credit-manager2.png`" width='567px')
    .text
      .txt-block.right
        .text-title 多场景的授信管理
        .text-item 项目类授信
        .text-item 经销商授信
        .text-item 临时额度管理
        .text-item 直签授信管理
  .center-service
    .text
      .txt-block.left
        .text-title 精细化的用信管理
        .text-item 清晰透明的资金路由
        .text-item 还款状态全程跟踪
        .text-item 逾期风险监测预警
    .pic
      img(:src="`${$assetsBaseUrl}/introduce/credit-manager3.png`" width='518px')
  .center-service
    .pic
      img(:src="`${$assetsBaseUrl}/introduce/credit-manager4.png`" width='518px')
    .text
      .txt-block.right
        .text-title 纵览全局的数据管理
        .text-item 还款日历
        .text-item 赊销总览
        .text-item 数据报表
  Title(text='应用场景')
  .sence-list
    .sence-item
      .img
        img(:src="`${$assetsBaseUrl}/introduce/credit-manager-icon1.png`")
      .sence-title 提高管理效率
      .sence-desc 赊销流程全链路线上化管理，帮助企业提升管理效率
    .sence-item
      .img
        img(:src="`${$assetsBaseUrl}/introduce/credit-manager-icon2.png`")
      .sence-title 合理分配赊销政策
      .sence-desc 赊销政策管理及用信管理线上化、系统化，帮助企业合理分配赊销政策，有助于赊销政策更好落地，推动业务健康发展
    .sence-item
      .img
        img(:src="`${$assetsBaseUrl}/introduce/credit-manager-icon3.png`")
      .sence-title 降低赊销风险
      .sence-desc 还款管理线上化、系统化，帮助企业及时了解待还及还款情况，降低企业赊销风险,加速企业业务运转效率
  Title(text='服务流程')
  OpenDialog(id='2')
</template>

<script>
import Title from '../components/title'
import OpenDialog from '../components/openDialog'
export default {
  props: {
  },
  components: {
    Title, OpenDialog
  },
  setup(props, context) {
    return {
    }
  },
}
</script>

<style lang='stylus'>
.credit-manager-page
  background-color #fff
  margin 0 30px
  padding-bottom 56px
  min-width 1000px
  .top-area
    height 240px
    background-image url('//cdn.qjdchina.com/static-online/saas/introduce/top-credit-manager.png')
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
      flex 1 0 auto
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
        color #595961
        font-size 14px
        line-height 20px
        width 280px
        margin 0 auto
</style>
