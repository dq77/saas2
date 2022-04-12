<template lang='pug'>
totalPage
  template(v-slot="slot")
    .p-main-page
      topTitle(title='赊销系统' subTitle='精细化赊销管理系统：让赊销管理更智能、高效' :status='slot.status' @btnClick='slot.goPage' img='creditsales-system')
      .page-header-title 产品内容
      .u-pdc-content
        .container
          .flex-item.hover
            img.icon-area(:src='`${$assetsBaseUrl}/factoryService/home/recommendService/creditsales-system-pdc1.png`')
            .name 授信管理
            .info 授信规则灵活配置，多维度预防信用风险
          .flex-item.hover
            img.icon-area(:src='`${$assetsBaseUrl}/factoryService/home/recommendService/creditsales-system-pdc2.png`')
            .name 用信管理
            .info 资金路由及用信规则配置，实现用信精细化管理
          .flex-item.hover
            img.icon-area(:src='`${$assetsBaseUrl}/factoryService/home/recommendService/creditsales-system-pdc3.png`')
            .name 控信管理
            .info 逾期风险监测预警，坏账催收及诉讼管理
      .process-introduction
        .container
          .process-introduction-card
            .title 流程介绍
            .content
              .process-item
                .process-title 授信管理
                .process-info
                  .block 区域额度配置
                  .block 等级额度配置
                  .block 临时额度管理
                  .block 产品方案配置
                  .block 黑白名单管理
              .process-item
                .process-title 用信管理
                .process-info
                  .block 资金路由
                  .block 待还款管理
                  .block 额度使用规则管理
              .process-item
                .process-title 控信管理
                .process-info
                  .block 催收管理
                  .block 诉讼管理
                  .block 业务员用信监控
                  .block 催收台账
                  .block 下游企业信用监控
            .bottom-bearer
              .bearer-title
                img.up-icon(:src='`${$assetsBaseUrl}/factoryService/home/recommendService/creditsales-system-arrow.png`')
                img.up-icon(:src='`${$assetsBaseUrl}/factoryService/home/recommendService/creditsales-system-arrow.png`')
                .title-cnt 底层承载
                img.up-icon(:src='`${$assetsBaseUrl}/factoryService/home/recommendService/creditsales-system-arrow.png`')
                img.up-icon(:src='`${$assetsBaseUrl}/factoryService/home/recommendService/creditsales-system-arrow.png`')
              .bearer-list
                .bearer-item 仟金顶风控引擎
                .bearer-item 仟金顶行业专家评分卡
                .bearer-item 资金路由
                .bearer-item 规则引擎
      .application-scenario
        .left-pic-area
          img(:src='`${$assetsBaseUrl}/factoryService/home/recommendService/creditsales-system-scens-left.png`')
        .right-bg-area
          img.rt-bgimg(:src='`${$assetsBaseUrl}/factoryService/home/recommendService/supply-coordination-scens-rtbg.png`')
          img.dot-bging-1(:src='`${$assetsBaseUrl}/factoryService/home/recommendService/supply-coordination-dot.png`')
          img.dot-bging-2(:src='`${$assetsBaseUrl}/factoryService/home/recommendService/supply-coordination-dot.png`')
          .center-area
            .application-title 应用场景
            img.lc-bgimg(:src='`${$assetsBaseUrl}/factoryService/home/recommendService/supply-coordination-arrow-right.png`')
            .application-list
              .scene-item
                //- .scene-title 核心企业无ERP系统
                .scene-info 有相对完善的经销商体系，提供赊销政策，同时有厂家自有资金及第三方银行等渠道共同提供赊销资金
              .scene-item
                //- .scene-title 核心企业无ERP系统
                .scene-info 有内部业务管理系统，无线上赊销管理体系
      .service-advantage
        .container
          .page-header-title 服务优势
          .service-advantage-list
            .flex-item.hover
              img.icon-area(:src='`${$assetsBaseUrl}/factoryService/home/recommendService/creditsales-system-advantage1.png`')
              .name 提升管理效率
              .info 赊销流程全链路线上化管理，帮助核心企业提升管理效率
            .flex-item.hover
              img.icon-area(:src='`${$assetsBaseUrl}/factoryService/home/recommendService/creditsales-system-advantage2.png`')
              .name 合理分配额度
              .info 额度管理规则及用信管理线上化、系统化，帮助核心企业合理分配额度，有助于赊销政策更好落地，推动业务健康发展
            .flex-item.hover
              img.icon-area(:src='`${$assetsBaseUrl}/factoryService/home/recommendService/creditsales-system-advantage3.png`')
              .name 降低赊销风险
              .info 还款管理线上化、系统化，帮助核心企业及时了解待还及还款情况，降低核心企业赊销风险
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
    .container
      margin-top 10px
      padding-bottom 40px
      display flex
      justify-content space-between
      .flex-item
        border 1px solid #E8ECF7
        padding 20px 40px
        width 313px
        @media screen and (max-width: 1300px)
          padding 20px
          width 296px
  .process-introduction
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
        justify-content space-between
        padding 20px 40px
        @media screen and (max-width: 1300px)
          padding 20px
        text-align center
        .process-item
          width 290px
          display flex
          flex-direction column
          .process-title
            font-size 16px
            height 40px
            line-height 40px
            color #fff
            background-color #9AA6B8
          .process-info
            flex 1 0 auto
            border 1px dashed #A8A8A8
            border-top none
            padding 15px 15px 8px
            display flex
            flex-wrap wrap
            align-content flex-start
            .block
              width 118px
              height 30px
              border 1px solid #8DA8D6
              line-height 30px
              margin 5px
      .bottom-bearer
        margin 15px 40px 40px
        border 1px dashed #A8A8A8
        height 100px
        .bearer-title
          width 290px
          height 30px
          margin 0 auto
          margin-top -15px
          background-color #DCE2EF
          border-radius 15px
          font-size 16px
          color #4D7FD5
          display flex
          justify-content center
          align-items center
          .up-icon
            width 11px
            height 13px
            margin 0 5px
          .title-cnt
            margin 0 15px
        .bearer-list
          margin-top 19px
          display flex
          justify-content center
          .bearer-item
            margin 0 10px
            background-color #4D7FD5
            color #FFF
            font-size 16px
            padding 9px 12px

</style>
