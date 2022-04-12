<template lang='pug'>
totalPage
  template(v-slot="slot")
    .p-main-page
      topTitle(title='开发商评估' subTitle='一站式客户数据分析服务：透查建筑工程商、项目资质' :status='slot.status' @btnClick='slot.goPage' img='evaluation-developer')
      .page-header-title 产品内容
      .u-pdc-content
        .container
          .flex-item.hover
            img.icon-area(:src='`${$assetsBaseUrl}/factoryService/home/recommendService/evaluation-developer-content1.png`')
            .name 开发商大盘
            .info 多维交叉分析，评估百强建筑工程商市场竞争力
            .flex-list
              .list-title 百强建筑工程商综合分析
              .list-content
                .list-block 销售排名
                .list-block 拿地排名
                .list-block 财务排名
                .list-block 企业舆情
                .list-block 行业快报
                .list-block 百强列表
            .flex-list
              .list-title 单个建筑工程商订阅
              .list-content
                .list-block 百强订阅
                .list-block 非百强申请
          .flex-item.hover
            img.icon-area(:src='`${$assetsBaseUrl}/factoryService/home/recommendService/evaluation-developer-content2.png`')
            .name 开发商评估
            .info 四维综合分析，评估建筑工程商合作履约能力
            .flex-list
              .list-title 单个建筑工程商综合分析
              .list-content
                .list-block 基本信息
                .list-block 三条红线
                .list-block 财务数据
                .list-block 销售数据
                .list-block 法诉分析
                .list-block 舆情信息
                .list-block 司法诉讼
                .list-block 被执行人
                .list-block 失信
                .list-block 经营异常
                .list-block 动产质押
                .list-block 限高
                .list-block 股权质押
                .list-block 新闻舆情
          .flex-item.hover
            img.icon-area(:src='`${$assetsBaseUrl}/factoryService/home/recommendService/evaluation-developer-content3.png`')
            .name 关联公司评估
            .info 关联关系可视化，全链路防控风险
            .flex-list
              .list-title 建筑工程商关联公司分析
              .list-content
                .list-block 工商股东
                .list-block 股权穿透
                .list-block 主要人员
                .list-block 舆情信息
                .list-block 司法诉讼
                .list-block 被执行人
                .list-block 失信
                .list-block 经营异常
                .list-block 动产质押
                .list-block 限高
                .list-block 股权质押
                .list-block 新闻舆情
          .flex-item.hover
            img.icon-area(:src='`${$assetsBaseUrl}/factoryService/home/recommendService/evaluation-developer-content4.png`')
            .name 项目评估
            .info 独有专家评估模型，系统评估项目合作风险
            .flex-list
              .list-title 基础项目评估（项目库）
              .list-content
                .list-block 建筑工程商信息
                .list-block 项目公司信息
                .list-block 项目信息
            .flex-list
              .list-title 人工项目评估（项目库）
              .list-content
                .list-block 建筑工程商信息
                .list-block 项目公司信息
                .list-block 项目信息
      .application-scenario#evaluation-scenario
        .left-pic-area
          img(:src='`${$assetsBaseUrl}/factoryService/home/recommendService/evaluation-developer-scens-left.png`')
        .right-bg-area
          img.rt-bgimg(:src='`${$assetsBaseUrl}/factoryService/home/recommendService/supply-coordination-scens-rtbg.png`')
          img.dot-bging-1(:src='`${$assetsBaseUrl}/factoryService/home/recommendService/supply-coordination-dot.png`')
          img.dot-bging-2(:src='`${$assetsBaseUrl}/factoryService/home/recommendService/supply-coordination-dot.png`')
          .center-area
            .application-title 应用场景
            .application-sub-title 适用于建筑工程商工程项目合作的合作履约风险
            img.lc-bgimg(:src='`${$assetsBaseUrl}/factoryService/home/recommendService/supply-coordination-arrow-right.png`')
            .application-list
              .scene-item
                //- .scene-title 核心企业无ERP系统
                .scene-info 建筑工程商项目合作
              .scene-item
                //- .scene-title 核心企业无ERP系统
                .scene-info 无集中数据来源，缺少针对建筑工程商系统和客观的风险评估工具
      .service-advantage#evaluation-advantage
        .container
          .page-header-title 产品优势
          .service-advantage-list
            .flex-item.hover
              img.icon-area(:src='`${$assetsBaseUrl}/factoryService/home/recommendService/evaluation-developer-advantage1.png`')
              .name 海量数据
              .advantage-list
                .advantage-item 全国400个城市拿地数据
                .advantage-item 全国120个重点城市项目数据
                .advantage-item TOP100建筑工程商研报数据
                .advantage-item 全网建筑工程商征信数据
                .advantage-item 全网建筑工程商舆情数据
            .flex-item.hover
              img.icon-area(:src='`${$assetsBaseUrl}/factoryService/home/recommendService/evaluation-developer-advantage2.png`')
              .name 前沿技术
              .advantage-list
                .advantage-item NLP自然语言处理
                .advantage-item 数据挖掘技术
                .advantage-item AI机器学习
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
      display flex
      justify-content space-between
      .info
        width 144px
        margin 0 auto
        margin-bottom 20px
      .flex-item
        border 1px solid #E8ECF7
        padding 20px 10px
        width 232px
        @media screen and (max-width: 1300px)
          width 222px
        .flex-list
          margin-top 10px
          .list-title
            background-color #E8ECF7
            height 40px
            line-height 40px
          .list-content
            background-color #F8F9FA
            padding 5px 0
            display flex
            flex-wrap wrap
            .list-block
              margin 5px 0
              width 104px
              @media screen and (max-width: 1300px)
                width 100px
              position relative
              text-align left
              padding-left 26px
              &:before
                position absolute
                top 6px
                left 18px
                content ''
                display block
                width 4px
                height 4px
                background-color #494949
                border-radius 2px
  #evaluation-scenario
    .application-sub-title
      color #fff
      margin-top 10px
    .lc-bgimg
      margin-top 57px
  .service-advantage#evaluation-advantage
    .flex-item
      width 482px
      @media screen and (max-width: 1300px)
        width 424px
      padding-bottom 24px
    .advantage-list
      display flex
      flex-wrap wrap
      .advantage-item
        margin 5px
        background-color #F8F9FA
        height 30px
        line-height 30px
        width 179px
</style>
