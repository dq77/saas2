<template lang='pug'>
totalPage
  template(v-slot="slot")
    .p-main-page
      topTitle(title='经销商分层' subTitle='经销商风险评估模型，建立下游企业经营风险评估体系' :status='slot.status' @btnClick='slot.goPage' img='dealer-stratification')
      .page-header-title 产品内容
      .u-pdc-content
        .container
          .flex-item.hover
            img.icon-area(:src='`${$assetsBaseUrl}/factoryService/home/recommendService/dealer-stratification-pdc1.png`')
            .name 标准模型
            .info 经销商诚信等级分层
          .flex-item.hover
            img.icon-area(:src='`${$assetsBaseUrl}/factoryService/home/recommendService/dealer-stratification-pdc2.png`')
            .name 联合建模
            .info 结合企业关键因子
          .flex-item.hover
            img.icon-area(:src='`${$assetsBaseUrl}/factoryService/home/recommendService/dealer-stratification-pdc3.png`')
            .name 数据标签
            .info 数据脱敏后标准API接口输出
      .process-introduction
        .container
          .process-introduction-card
            .title 流程介绍
            .content
              .process-item
                .process-title 用户精准画像
                .process-sub-title 画像
                .process-info
                  img.avator(:src='`${$assetsBaseUrl}/factoryService/home/recommendService/dealer-stratification-avator.png.png`')
              img.right-icon(:src='`${$assetsBaseUrl}/factoryService/home/recommendService/dealer-stratification-right.png`')
              .process-item.right-area
                .process-title 下游企业分层与定制化（例）
                .process-list
                  .process-list-item
                    .process-sub-title 全盘分层
                    .process-info
                      .block AAA
                      .block AA
                      .block A
                      .block BBB
                      .block BB
                      .block B
                  img.middle-icon(:src='`${$assetsBaseUrl}/factoryService/home/recommendService/dealer-stratification-add.png`')
                  .process-list-item
                    .process-sub-title 企业要素
                    .process-info.middle
                      .block 合作年限
                      .block 历史销售金额
                      .block 历史违约情况
                      .block 客户征信
                      .block 其他....
                  img.middle-icon(:src='`${$assetsBaseUrl}/factoryService/home/recommendService/dealer-stratification-right.png`')
                  .process-list-item
                    .process-sub-title 全盘分层
                    .process-info
                      .block V1
                      .block V2
                      .block V3
                      .block V4
                      .block V5
                      .block V6
      .application-scenario#dealer
        .left-pic-area
          img(:src='`${$assetsBaseUrl}/factoryService/home/recommendService/dealer-stratification-scens-left.png`')
        .right-bg-area
          img.rt-bgimg(:src='`${$assetsBaseUrl}/factoryService/home/recommendService/supply-coordination-scens-rtbg.png`')
          img.dot-bging-1(:src='`${$assetsBaseUrl}/factoryService/home/recommendService/supply-coordination-dot.png`')
          img.dot-bging-2(:src='`${$assetsBaseUrl}/factoryService/home/recommendService/supply-coordination-dot.png`')
          .center-area
            .application-title 应用场景
            img.lc-bgimg(:src='`${$assetsBaseUrl}/factoryService/home/recommendService/supply-coordination-arrow-right.png`')
            .application-list
              .scene-item
                .scene-title 日常经销商管理
                .scene-info 评优、汰换，有据可依
              .scene-item
                .scene-title 赊销政策分配
                .scene-info 排除高风险客户、精细化配置额度规则
              .scene-item
                .scene-title 推送第三方合作
                .scene-info 提前筛查、排黑，避免无效的资料提审
      .service-advantage
        .container
          .page-header-title 服务优势
          .service-advantage-list
            .flex-item.hover
              img.icon-area(:src='`${$assetsBaseUrl}/factoryService/home/recommendService/dealer-stratification-advantage1.png`')
              .name 垂直领域独有数据沉淀
              .info 实现从数据沉淀到数据贯通，以数据反哺企业，系统化、标准化分配赊销政策，降低赊销风险
            .flex-item.hover
              img.icon-area(:src='`${$assetsBaseUrl}/factoryService/home/recommendService/dealer-stratification-advantage2.png`')
              .name 精准高效分层
              .info 以经营、工商、涉诉、征信等刻画用户画像，增加行为，时序等数据，实现精准高效的经销商分层管理
            .flex-item.hover
              img.icon-area(:src='`${$assetsBaseUrl}/factoryService/home/recommendService/dealer-stratification-advantage3.png`')
              .name 定制化建模
              .info 结合企业自身评估维度要素，定制化建模，满足业务发展需求
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
          width 290px
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
        padding 20px
        text-align center
        .process-item
          width 223px
          display flex
          flex-direction column
          .process-title
            font-size 16px
            height 40px
            line-height 40px
            color #FFF
            background-color #4D7FD5
          .process-sub-title
            font-size 16px
            height 40px
            line-height 40px
            background-color #E8ECF7
          .process-info
            flex 1 0 auto
            display flex
            flex-direction column
            align-items center
            justify-content center
            padding 7px
            background-color #F8F9FA
          &.right-area
            width 60%
            min-width 600px
            display flex
            flex-direction column
            .process-list
              flex 1 0 auto
              display flex
              justify-content space-between
              .process-list-item
                display flex
                flex-direction column
                .process-info
                  align-items stretch
                  flex 1 0 auto
                  .block
                    width 120px
                    margin 5px
                    height 32px
                    line-height 32px
                    border 1px solid #8DA8D6
                    background-color #FFF
                  &.middle
                    justify-content flex-start
                    .block
                      background-color #F8F9FA
                      border 1px dashed #A8A8A8
                      width 152px
              .middle-icon
                height 30px
                margin-top 116px
        .avator
          width 190px
        .right-icon
          align-self center
          height 30px
  #dealer
    .right-bg-area
      .center-area
        .application-list
          .scene-item
            width 190px
            display block
            @media screen and (max-width: 1300px)
              padding 10px
              margin-right 10px
              width 152px

</style>
