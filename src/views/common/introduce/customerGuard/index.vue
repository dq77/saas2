<template lang='pug'>
.customer-guard-page
  .top-area
    .title-name 客户卫士
    .desc 客户卫士帮助企业获取客户全方位信息，挖掘关联关系与风险，透视客户基本商业价值，并通过7*24小时的全网舆情监测，为企业提供合作风险的快速响应；通过专业的评估模型，辅助判断合作企业综合价值，助力企业合理分配赊销/销售政策，锁定优质客户。
  Title(text='核心服务')
  .center-service
    .text
      .txt-block.left
        .text-title 经销商分层
        .text-sub-title 专业评估模型，对经销商进行多维度的价值评估，帮助企业锁定优质经销商
        .text-item 综合评估客户价值
        .text-item 挖掘合作潜在风险
    .pic
      img(:src="`${$assetsBaseUrl}/introduce/customer-guard1.png`" width='622px')
  .center-service.eye-block
    .choose-show
      .show-title {{ activeItem.name }}
      .sub-title {{ activeItem.desc }}
      .pic-area
        img(:src="`${$assetsBaseUrl}/introduce/img-${activeItem.btnUrl}`")
    .text
      .txt-block.right
        .text-title 仟金眼
        .text-sub-title 洞察客户全景画像，为企业供应商准入、赊销等场景提供决策支持
        .btn-list
          .btn-item(v-for='item in btnList' @click='showItem(item)')
            .pic-top(:class='{"active": item.name === activeItem.name}')
              img(:src="`${$assetsBaseUrl}/introduce/${item.btnUrl}`")
              img.active-img(:src="`${$assetsBaseUrl}/introduce/active-${item.btnUrl}`")
            .txt(:class='{"active": item.name === activeItem.name}') {{ item.name }}
  .center-service
    .text
      .txt-block.left
        .text-title 舆情雷达
        .text-sub-title 企业舆情风险智能监控平台，多渠道实时推送，协助企业有效管理和降低风险
        .text-item 实时风险扫描
        .text-item 多渠道预警
    .pic
      img(:src="`${$assetsBaseUrl}/introduce/customer-guard2.png`" width='653px')
  Title(text='应用场景')
  .sence-list
    .sence-item
      .img
        img(:src="`${$assetsBaseUrl}/introduce/customer-guard-icon1.png`")
      .sence-title 日常经销商管理
      .sence-desc 评优、汰换，有据可依
    .sence-item
      .img
        img(:src="`${$assetsBaseUrl}/introduce/customer-guard-icon2.png`")
      .sence-title 提前透查合作企业资质
      .sence-desc 企业在开拓新下游企业时，需提前透查资质，为合作提供决策依据
    .sence-item
      .img
        img(:src="`${$assetsBaseUrl}/introduce/customer-guard-icon3.png`")
      .sence-title 贸易风险实时预警
      .sence-desc 需要实时掌握合作中企业的一手风险信息，提前预警贸易风险,加速企业业务运转效率
  Title(text='服务流程')
  OpenDialog(id='4')
</template>

<script>
import { ref } from '@vue/composition-api'
import Title from '../components/title'
import OpenDialog from '../components/openDialog'
export default {
  props: {
  },
  components: {
    Title, OpenDialog
  },
  setup(props, context) {
    const btnList = ref([
      {name: '企业画像', btnUrl: 'qjd1.png', picUrl: 'customer-guard1.png', desc: '全景企业多维度画像刻画服务，让使用者快速了解该企业基本情况'},
      {name: '风险扫描', btnUrl: 'qjd2.png', picUrl: 'customer-guard1.png', desc: '扫描自身及关联风险，对股权质押、开庭、法律诉讼、法院公告、送达公告、立案信息、对外担保、等十三类数据聚合'},
      {name: '诉讼分析', btnUrl: 'qjd3.png', picUrl: 'customer-guard1.png', desc: '统计分析涉诉案件类型，地区分布、原告/被告等'},
      {name: '舆情动态', btnUrl: 'qjd4.png', picUrl: 'customer-guard1.png', desc: '全网舆情监控，精准识别正负新闻舆情'},
      {name: '关系图谱', btnUrl: 'qjd5.png', picUrl: 'customer-guard1.png', desc: '智能透视商业关系，深度挖掘关联关系'},
      {name: '股权图谱', btnUrl: 'qjd6.png', picUrl: 'customer-guard1.png', desc: '精准呈现股权结构，上下游关系'},
      {name: '经营信息', btnUrl: 'qjd7.png', picUrl: 'customer-guard1.png', desc: '企业动产抵押、税务信息、过往项目和招投标信息'},
      {name: '五维企业评价', btnUrl: 'qjd8.png', picUrl: 'customer-guard1.png', desc: '运用仟金眼五维评价模型，综合评估企业经营状况、综合实力、外部关联、行业前景、司法风险'},
    ])
    const activeItem = ref(btnList.value[0])
    const showItem = (item) => {
      activeItem.value = item
    }
    return {
      btnList,
      showItem,
      activeItem,
    }
  },
}
</script>

<style lang='stylus'>
.customer-guard-page
  background-color #fff
  margin 0 30px
  padding-bottom 56px
  min-width 1000px
  .top-area
    height 240px
    background-image url('//cdn.qjdchina.com/static-online/saas/introduce/top-customer-guard.png')
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
        .text-sub-title
          margin-bottom 30px
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
  .eye-block
    .choose-show
      flex 1 0 544px
      border-right 5px solid #A3B0DE
      border-radius 4px
      background-color #F3F4F8
      padding 18px 28px
      .show-title
        font-size 16px
        margin 22px 0 14px
      .sub-title
        color #ABABAB
        font-size 14px
        margin-bottom 24px
      .pic-area
        text-align center
        background-color #fff
        padding-top 20px
        img
          height 162px
    .btn-list
      display flex
      flex-wrap wrap
      margin 0 -20px
      width 432px
      .btn-item
        margin 20px
        cursor pointer
        .pic-top
          img
            width 68px
          .active-img
            display none
          &.active
            img
              display none
            .active-img
              display inline
        .txt
          text-align center
          padding-top 4px
          margin 0 -10px
          &.active
            color #3B68F0
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
