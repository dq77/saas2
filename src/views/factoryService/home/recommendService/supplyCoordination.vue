<template lang='pug'>
totalPage
  template(v-slot="slot")
    .p-main-page
      topTitle(title='供应链协同' subTitle='供应链智能化全链路追踪、管理、上下游贸易协同系统' :status='slot.status' @btnClick='slot.goPage' img='supply-coordination')
      .page-header-title 产品内容
      .u-pdc-content
        .container
          .flex-item.hover
            img.icon-area(:src='`${$assetsBaseUrl}/factoryService/home/recommendService/supply-coordination-content1.png`')
            .name 产品中心
            .info SKU级产品管理功能，支撑在线产品导购和营销推广
          .flex-item.hover
            img.icon-area(:src='`${$assetsBaseUrl}/factoryService/home/recommendService/supply-coordination-content2.png`')
            .name 交易中心
            .info 建立线上贸易通路，实时跟踪订单流转及状态变更
          .flex-item.hover
            img.icon-area(:src='`${$assetsBaseUrl}/factoryService/home/recommendService/supply-coordination-content3.png`')
            .name 物流中心
            .info 电子签收线上存证，减少人力成本并降低贸易纠纷
          .flex-item.hover
            img.icon-area(:src='`${$assetsBaseUrl}/factoryService/home/recommendService/supply-coordination-content4.png`')
            .name 结算中心
            .info 电子对账电子开票，解决票据散乱、糊涂账等财会问题
          .flex-item.hover
            img.icon-area(:src='`${$assetsBaseUrl}/factoryService/home/recommendService/supply-coordination-content5.png`')
            .name 绩效管理
            .info 销售目标及销售政策配置，业绩目标可视化管理
          .flex-item.hover
            img.icon-area(:src='`${$assetsBaseUrl}/factoryService/home/recommendService/supply-coordination-content6.png`')
            .name 任务工单
            .info 任务工单分配及流转管理，提升业务运转效率
          .flex-item.hover
            img.icon-area(:src='`${$assetsBaseUrl}/factoryService/home/recommendService/supply-coordination-content7.png`')
            .name 意见反馈
            .info 建立厂家和经销商的沟通通道，减少信息差
      .process-introduction
        .container
          .process-introduction-card
            .title 流程介绍
            .content
              .left-area
                .process-title 系统承载
                .process-info
                  .block.item-1 厂家ERP
                  .block.item-2 API接口对接
                  .block.item-3 厂家服务平台
                  .block.item-4 仟金顶APP
              .right-area
                .process-title 交互流程
                .process-info
                  .block-area
                    .column
                      .block 经销商建档
                    .column
                      .block 项目信息同步
                      .block 产品要素同步
                      .block 销售政策同步
                    .column
                      .block 订单信息同步
                    .column
                      .block 排产信息同步
                      .block 发货信息同步
                    .column
                  .center-arrow-area
                    .item
                      .arrow-area
                        img.arrow(:src='`${$assetsBaseUrl}/factoryService/home/recommendService/supply-coordination-arrow-down.png`')
                      .block 客户管理
                      .arrow-area
                        img.arrow(:src='`${$assetsBaseUrl}/factoryService/home/recommendService/supply-coordination-arrow-down.png`')
                    .item
                      .arrow-area
                        img.arrow(:src='`${$assetsBaseUrl}/factoryService/home/recommendService/supply-coordination-arrow-down.png`')
                      .block 产品中心
                      .arrow-area
                        img.arrow(:src='`${$assetsBaseUrl}/factoryService/home/recommendService/supply-coordination-arrow-down.png`')
                    .item
                      .arrow-area
                        img.arrow(:src='`${$assetsBaseUrl}/factoryService/home/recommendService/supply-coordination-arrow-up.png`')
                      .block 订单中心
                      .arrow-area
                        img.arrow(:src='`${$assetsBaseUrl}/factoryService/home/recommendService/supply-coordination-arrow-down.png`')
                        img.arrow(:src='`${$assetsBaseUrl}/factoryService/home/recommendService/supply-coordination-arrow-up.png`')
                    .item
                      .arrow-area
                        img.arrow(:src='`${$assetsBaseUrl}/factoryService/home/recommendService/supply-coordination-arrow-down.png`')
                      .block 物流中心
                      .arrow-area
                        img.arrow(:src='`${$assetsBaseUrl}/factoryService/home/recommendService/supply-coordination-arrow-up.png`')
                        img.arrow(:src='`${$assetsBaseUrl}/factoryService/home/recommendService/supply-coordination-arrow-down.png`')
                    .item
                      .arrow-area
                        .arrow
                      .block 结算中心
                      .arrow-area
                        img.arrow(:src='`${$assetsBaseUrl}/factoryService/home/recommendService/supply-coordination-arrow-up.png`')
                  .block-area
                    .column
                      .block 注册实名
                    .column
                      .block 产品信息查询
                      .block 销售政策查询
                    .column
                      .block 经销商下单
                      .block 在线签约
                    .column
                      .block 电子签收
                    .column
                      .block 返利查询
                      .block 在线对账
                      .block 申请开票
      .application-scenario
        .left-pic-area
          img(:src='`${$assetsBaseUrl}/factoryService/home/recommendService/supply-coordination-scens-left.png`')
        .right-bg-area
          img.rt-bgimg(:src='`${$assetsBaseUrl}/factoryService/home/recommendService/supply-coordination-scens-rtbg.png`')
          img.dot-bging-1(:src='`${$assetsBaseUrl}/factoryService/home/recommendService/supply-coordination-dot.png`')
          img.dot-bging-2(:src='`${$assetsBaseUrl}/factoryService/home/recommendService/supply-coordination-dot.png`')
          .center-area
            .application-title 应用场景
            img.lc-bgimg(:src='`${$assetsBaseUrl}/factoryService/home/recommendService/supply-coordination-arrow-right.png`')
            .application-list
              .scene-item
                .scene-title 核心企业无ERP系统
                .scene-info 可采用上游企业端+下游经销商端的整体供应链协同解决方案
              .scene-item
                .scene-title 核心企业有ERP系统
                .scene-info 可采用API对接上游企业ERP系统+下游经销商端
      .service-advantage
        .container
          .page-header-title 服务优势
          .service-advantage-list
            .flex-item.hover
              img.icon-area(:src='`${$assetsBaseUrl}/factoryService/home/recommendService/supply-coordination-advantage1.png`')
              .name 打通上下游线上贸易链路
              .info 实现厂家和经销商全渠道全链路供需调配和精准对接，通过系统承载降本增效
            .flex-item.hover
              img.icon-area(:src='`${$assetsBaseUrl}/factoryService/home/recommendService/supply-coordination-advantage2.png`')
              .name 全盘经销商精细化管理
              .info 精细化、系统化管理经销商信息、政策，促进厂家政策落地，实现业务增长
            .flex-item.hover
              img.icon-area(:src='`${$assetsBaseUrl}/factoryService/home/recommendService/supply-coordination-advantage3.png`')
              .name 提升贸易安全性
              .info 通过电子签约代替纸质合同签署及货物签收，证据链线上存证，提升贸易安全性
      openService(v-if='!slot.status')

</template>

<script>
import openService from './openService'
import topTitle from './topTitle'
import totalPage from './index'
export default {

  data () {
    return {

    }
  },
  props: ['status'],
  methods: {

  },
  mounted () {

  },
  components: {
    openService,
    topTitle,
    totalPage
  },
  watch: {

  }
}
</script>

<style lang='stylus' scoped>
.p-main-page
  color #494949
  .u-pdc-content
    margin-top -10px
    .container
      padding 0 10px
      display flex
      flex-wrap wrap
      .flex-item
        margin 10px
        border 1px solid #E8ECF7
        padding 20px 40px
        width 228px
        @media screen and (max-width: 1300px)
          width 220px
  .process-introduction
    margin-top 35px
    .process-introduction-card
      border 1px solid #E8ECF7
      .title
        font-size 18px
        text-align center
        line-height 60px
        height 60px
        background-color #F8F9FA
      .content
        display flex
        padding 20px
        text-align center
        .left-area,.right-area
          display flex
          flex-direction column
        .left-area
          margin-right 20px
          width 192px
          .block
            background-color #25BECD
            width 120px
            height 40px
            line-height 40px
            color #FFF
            margin 0 auto
            font-size 16px
            &.item-1
              margin-top 70px
            &.item-2
              margin-top 20px
              background-color #F8F9FA
              border 1px dotted #A8A8A8
              color #494949
            &.item-3
              margin-top 20px
            &.item-4
              margin-top 80px
        .right-area
          flex 1 0 auto
          .process-info
            padding 20px
            .block-area
              border 1px dotted #A8A8A8
              padding 10px 0
              display flex
              justify-content space-around
              .column
                display flex
                flex-direction column
                justify-content center
                width 140px
                .block
                  height 30px
                  border 1px solid #8DA8D6
                  line-height 30px
                  margin 5px 10px
                  background-color #FFF
            .center-arrow-area
              display flex
              justify-content space-around
              padding 10px 0
              .item
                display flex
                flex-direction column
                justify-content center
                .arrow-area
                  display flex
                  justify-content space-around
                  .arrow
                    width 11px
                    height 13px
                .block
                  width 90px
                  height 40px
                  background-color #9AA6B8
                  color #FFF
                  margin 6px 0 8px
                  line-height 40px
        .process-title
          background-color #E8ECF7
          font-size 16px
          height 40px
          line-height 40px
        .process-info
          flex 1 0 auto
          background-color #F8F9FA

</style>
