<template lang='pug'>
totalPage
  template(v-slot="slot")
    .p-main-page
      topTitle(title='智能合同' subTitle='合同在线管理、电子签约及存证' :status='slot.status' @btnClick='slot.goPage' img='smart-contract')
      .page-header-title 产品简介
      .u-pdc-info
        .container
          .left-area
            .title 一站式合同管理解决方案服务
            p 通过仟金顶SaaS智能合同引擎，深耕泛建材领域，产业专一更贴近实际业务。
            p 从合同起草、流转审批、电子签约、通知发送、存证归档、出证以及履约过程中的变更、查询、统计，整个合同管理过程实现全程数字化。
          .right-area
            .title 产品优势
            .content
              .hobby-list
                .advantage-title 安全可靠
                .advantage-item 证据链完整 + 司法认可
                .advantage-item 标准合同模板
                .advantage-item 电子签章/授权
                .advantage-item 高效、安全远程电子签署
                .advantage-item 电子存证、出证
                .advantage-item 防伪打印
                .advantage-item 无纸化、数字化合同管理
              .hobby-list
                .advantage-title 操作便捷
                .advantage-item PC、移动一体化
                .advantage-item 无开发、低成本、API标准接口
                .advantage-item 平台化可对接核心企业业务系统
                .advantage-item 随时、随地签署
                .advantage-item 支持定制化部署
      .legal-effect
        .container
          .page-header-title 有效法律效力
          .legal-effect-list
            .flex-item
              img.icon-area(:src='`${$assetsBaseUrl}/factoryService/home/recommendService/smart-contract-legal-icon1.png`')
              .name 真实身份
              .info 通过实名认证的技术手段，实现电子签名人身份及该身份操作的电子数据的专有
            .flex-item
              img.icon-area(:src='`${$assetsBaseUrl}/factoryService/home/recommendService/smart-contract-legal-icon2.png`')
              .name 真实意愿
              .info 意愿认证是通过短信验证码、刷脸认证等实现电子签名人进行电子签名时的真实意愿表达
            .flex-item
              img.icon-area(:src='`${$assetsBaseUrl}/factoryService/home/recommendService/smart-contract-legal-icon3.png`')
              .name 原文未改
              .info 通过签名验证、数字证书等手段签署后对数据电文内容和形式的任何改动能够被发现
            .flex-item
              img.icon-area(:src='`${$assetsBaseUrl}/factoryService/home/recommendService/smart-contract-legal-icon4.png`')
              .name 签名未改
              .info 经过哈希算法，可信时间戳等技术手段实现签署后对电子签名的任何改动能够被发现；
      .contract-storage
        .container
          .page-header-title 安全合同存储
          .contract-sub-title “国际权威资质保证合同安全”
          .contract-list
            .flex-item
              img.icon-area(:src='`${$assetsBaseUrl}/factoryService/home/recommendService/smart-contract-storage-icon1.png`')
              .name DJCP等保三级
              .info 公安部信息系统安全等级保护三级<br/>非银行金融机构能够获得的最高级别
            .flex-item
              img.icon-area(:src='`${$assetsBaseUrl}/factoryService/home/recommendService/smart-contract-storage-icon2.png`')
              .name 分段式加密存储
              .info 分段式加密存储即将随机密钥分为多段<br/>每段信息使以数字信封的形式加密后保存
            .flex-item
              img.icon-area(:src='`${$assetsBaseUrl}/factoryService/home/recommendService/smart-contract-storage-icon3.png`')
              .name 网络安全
              .info DDOS、CC攻击防护 SSL/TLS全程加密<br/>WAF防火墙安全防护安全组、边界安全防护
      .life-cycle-management
        .page-header-title 合同全生命周期管理
        img.life-cycle-pic(:src='`${$assetsBaseUrl}/factoryService/home/recommendService/smart-contract-life-cycle-pic.png`')
      .service-system
        .container
          .page-header-title 服务体系
          .service-system-list
            .flex-item.hover
              img.icon-area(:src='`${$assetsBaseUrl}/factoryService/home/recommendService/smart-contract-service-system-icon1.png`')
              .name 标准合同模版
              .info 泛建材行业贴近行业标准，海量合同库/合同条款模块化组合
            .flex-item.hover
              img.icon-area(:src='`${$assetsBaseUrl}/factoryService/home/recommendService/smart-contract-service-system-icon2.png`')
              .name 电子签约及存证
              .info 全程在线司法认可，支持多企业/自然人，多场景使用
            .flex-item.hover
              img.icon-area(:src='`${$assetsBaseUrl}/factoryService/home/recommendService/smart-contract-service-system-icon3.png`')
              .name 合同管理
              .info 合同审批、用印管理、合同管理实现全链路数字化
            .flex-item.hover
              img.icon-area(:src='`${$assetsBaseUrl}/factoryService/home/recommendService/smart-contract-service-system-icon4.png`')
              .name 法律服务
              .info 法律风险评估、合同检视、风险点提示
            .flex-item.hover
              img.icon-area(:src='`${$assetsBaseUrl}/factoryService/home/recommendService/smart-contract-service-system-icon5.png`')
              .name 定制化部署
              .info 支持定制化部署方案
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
  .u-pdc-info
    padding-bottom 40px
    margin-top 10px
    .container
      display flex
      .left-area
        background url('//cdn.qjdchina.com/static-online/saas/factoryService/home/recommendService/smart-contract-pdc-build.png')
        background-size 100% 100%
        height 462px
        width 413px
        color #FFF
        font-size 14px
        padding 32px
        .title
          font-size 22px
          height 30px
          line-height 30px
          margin 44px 0 40px
        p
          line-height 20px
          margin-bottom 10px
          margin-top 0
      .right-area
        border 1px solid #E8ECF7
        flex 1 0 auto
        display flex
        flex-direction column
        .title
          background-color #F8F9FA
          height 58px
          font-size 18px
          line-height 58px
          text-align center
        .content
          padding 20px 10px
          flex 1 0 auto
          display flex
          justify-content space-around
          .hobby-list
            width 260px
            background-color #F8F9FA
            text-align center
            .advantage-title
              background-color #4D7FD5
              color #FFF
              font-size 16px
              line-height 40px
            .advantage-item
              margin 10px
              border 1px solid #8DA8D6
              height 32px
              line-height 31px
              background-color #FFF
  .legal-effect
    background-color #F8F9FA
    padding-bottom 40px
    .legal-effect-list
      padding-top 10px
      display flex
      justify-content space-around
  .contract-storage
    padding-bottom 50px
    .contract-sub-title
      font-size 14px
      height 20px
      line-height 20px
      text-align center
      margin-bottom 50px
    .contract-list
      display flex
      justify-content space-around
      .flex-item
        width 240px
  .life-cycle-management
    background-color #F8F9FA
    padding-bottom 20px
    .life-cycle-pic
      display block
      width 757px
      margin 20px auto
  .service-system
    padding-bottom 40px
    .service-system-list
      display flex
      justify-content space-between
      .flex-item
        width 182px
        border 1px solid #E8ECF7
        padding 20px 10px 40px
</style>
