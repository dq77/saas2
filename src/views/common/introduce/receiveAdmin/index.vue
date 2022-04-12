<template lang='pug'>
.receive-admin-page
  .top-area
    .title-name 应收管家
    .desc 全链路的应收账款过程管理，灵活配置应收款项及计划，规范管控应收过程，提升收款效率，把控经营风险。
  Title(text='核心服务')
  .center-service
    .text
      .txt-block.left
        .text-title 灵活配置应收计划
        .text-item 根据不同业务场景配置应收款项及节点
        .text-item 自定义异常款项类型及界定规则
        .text-item 个性化产品装修
        .text-item 灵活配置多种应收款项的支付方式
    .pic
      img(:src="`${$assetsBaseUrl}/introduce/receive1.png`" width='640px')
  .center-service
    .pic
      img(:src="`${$assetsBaseUrl}/introduce/receive2.png`" width='569px')
    .text
      .txt-block.right
        .text-title 多场景应收管控
        .text-item 应收计划自主添加
        .text-item 子计划灵活拆分配置
        .text-item 应收计划可关联项目
        .text-item 满足项目应收全链路管理场景
  .center-service
    .text
      .txt-block.left
        .text-title 系统化管理收款过程
        .text-item 收款记录系统化录入留痕
        .text-item 触发催款规则，系统自动提醒
        .text-item 收款进度可视化统筹管理
    .pic
      img(:src="`${$assetsBaseUrl}/introduce/receive3.png`" width='628px')
  .center-service
    .pic
      img(:src="`${$assetsBaseUrl}/introduce/receive4.png`" width='560px')
    .text
      .txt-block.right
        .text-title 标准快捷的系统集成
        .text-item 支持多种系统对接
        .text-item 标准API接口，快速对接
        .text-item 极速兼容，无需业务迁移
        .text-item 应收计划及收款数据实时互通
  Title(text='应用场景')
  .sence-list
    .sence-item
      .img
        img(:src="`${$assetsBaseUrl}/introduce/receive5.png`")
      .sence-title 多场景的应收账款管理
      .sence-desc 可根据实际业务需求，自定义配置应收计划、异常款项和还款计划，满足多场景、多种类型的应收账款管理
    .sence-item
      .img
        img(:src="`${$assetsBaseUrl}/introduce/receive6.png`")
      .sence-title 全链路的应收账款过程管控
      .sence-desc 通过系统承载，跟踪节点进度和计划整体执行情况，规范化管控应收过程，同时对收款信息留痕，直观统筹应收进度
    .sence-item
      .img
        img(:src="`${$assetsBaseUrl}/introduce/receive7.png`")
      .sence-title 把控经营风险
      .sence-desc 可视化的数据看板，随时掌握收款动态，支持配置催款策略，多种提醒方式全方位触达，提高收款效率，把控经营风险
  Title(text='服务流程')
  OpenDialog(id='5')
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
.receive-admin-page
  background-color #fff
  margin 0 30px
  padding-bottom 56px
  min-width 1000px
  .top-area
    height 240px
    background-image url('//cdn.qjdchina.com/static-online/saas/introduce/top-receive.png')
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
