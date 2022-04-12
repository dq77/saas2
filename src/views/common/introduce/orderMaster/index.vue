<template lang='pug'>
.order-master-page
  .top-area
    .title-name 订货大师
    .desc 通过线上贸易协同代替人工对接，将上游企业与下游经销商连接起来，实现产品线上管理、经销商在线订货、产品差异化定价等数字化管理，提高企业业务效率。
  Title(text='核心服务')
  .center-service
    .text
      .txt-block.left
        .text-title 全场景的产品管理
        .text-item 多类目产品分级管理
        .text-item 灵活配置产品属性
        .text-item 个性化产品装修
        .text-item 支持产品差异化营销策略
    .pic
      img(:src="`${$assetsBaseUrl}/introduce/order-master1.png`" width='640px')
  .center-service
    .pic
      img(:src="`${$assetsBaseUrl}/introduce/order-master2.png`" width='569px')
    .text
      .txt-block.right
        .text-title 千人千面的价格策略
        .text-item 支持多种价格策略
        .text-item 自定义报价优先级
        .text-item 支持多种销售体系灵活定价
  .center-service
    .text
      .txt-block.left
        .text-title 灵活高效的订单管理
        .text-item 客户自主/企业代客下单
        .text-item 支持“再来一单”极速复购
        .text-item 下单后自动生成电子订货单
        .text-item 自定义审批流程
        .text-item 订单状态互通，全程跟踪
    .pic
      img(:src="`${$assetsBaseUrl}/introduce/order-master3.png`" width='628px')
  .center-service
    .pic
      img(:src="`${$assetsBaseUrl}/introduce/order-master4.png`" width='560px')
    .text
      .txt-block.right
        .text-title 安全便捷的电子签约
        .text-item 支持多种签约类型订货单、签收单等
        .text-item 自定义报价优先级
        .text-item 文件电子化存储、完善贸易证据链
  .center-service
    .text
      .txt-block.left
        .text-title 标准快捷的系统集成
        .text-item 支持多种系统对接
        .text-item 标准API接口，快速对接
        .text-item 极速兼容，无需业务迁移
        .text-item 业务、订单等信息实时互通
    .pic
      img(:src="`${$assetsBaseUrl}/introduce/order-master5.png`" width='385px')
  Title(text='应用场景')
  .sence-list
    .sence-item
      .img
        img(:src="`${$assetsBaseUrl}/introduce/order-master-icon1.png`")
      .sence-title 多场景销售策略
      .sence-desc 精细化管理SKU库，提高产品管理效率；支持差异化定价，满足不同场景销售策略
    .sence-item
      .img
        img(:src="`${$assetsBaseUrl}/introduce/order-master-icon2.png`")
      .sence-title 业务在线
      .sence-desc 告别人工对接的传统采购订货模式，杜绝错单和漏单情况，在线下单、处理订单，提高关键节点效率，降低企业运营成本
    .sence-item
      .img
        img(:src="`${$assetsBaseUrl}/introduce/order-master-icon3.png`")
      .sence-title 全流程管控
      .sence-desc 从下单、发货、物流进行全程管控与追踪，实现全流程数字化管理,加速企业业务运转效率
  Title(text='服务流程')
  OpenDialog(id='3')
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
.order-master-page
  background-color #fff
  margin 0 30px
  padding-bottom 56px
  min-width 1000px
  .top-area
    height 240px
    background-image url('//cdn.qjdchina.com/static-online/saas/introduce/top-order-master.png')
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
