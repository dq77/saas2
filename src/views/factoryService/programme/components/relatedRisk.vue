<template lang="pug">
.p-related-risk-main
  .p-related-main
    .p-related-header 关联公司风险
    .p-related-content
      .p-related-item
        .p-related-item-label 司法诉讼
        .p-related-item-num {{summary.sfssRelationCompanyCount}}
        .p-related-item-case 案件数{{summary.sfssTotalCount}}
      .p-related-item
        .p-related-item-label 被执行人
        .p-related-item-num {{summary.bzxrRelationCompanyCount}}
        .p-related-item-case 案件数{{summary.bzxrTotalCount}}
      .p-related-item
        .p-related-item-label 失信
        .p-related-item-num {{summary.sxRelationCompanyCount}}
        .p-related-item-case 案件数{{summary.sxTotalCount}}
      .p-related-item
        .p-related-item-label 限制高消费
        .p-related-item-num {{summary.xgRelationCompanyCount}}
        .p-related-item-case 案件数{{summary.xgTotalCount}}
      .p-related-item
        .p-related-item-label 经营异常
        .p-related-item-num {{summary.jyycRelationCompanyCount}}
        .p-related-item-case 案件数{{summary.jyycTotalCount}}
      .p-related-item
        .p-related-item-label 动产抵押
        .p-related-item-num {{summary.dcdyRelationCompanyCount}}
        .p-related-item-case 案件数{{summary.dcdyTotalCount}}
  .u-tip
    i.el-icon-info
    | 上述口径为统计含舆情风险的关联企业数量和案件总数量
  Card(noTitle noWrap)
    RiskList(:companyName='companyName')
</template>
<script>
import ajaxStore from '@/apis'
import { isNumber } from '@/utils/util'
import Card from '@/components/Card'
import RiskList from '@/views/factoryService/realEstate/components/riskList/related'
export default {
  props: {
    companyName: {
      type: String
    },
  },
  components: { Card, RiskList },
  data() {
    return {
      loading: false,
      currentRiskType: 'judicialLitigation',
      summary: {
        bzxrRelationCompanyCount: 0,
        bzxrTotalCount: 0,
        dcdyRelationCompanyCount: 0,
        dcdyTotalCount: 0,
        jyycRelationCompanyCount: 0,
        jyycTotalCount: 0,
        sfssRelationCompanyCount: 0,
        sfssTotalCount: 0,
        sxRelationCompanyCount: 0,
        sxTotalCount: 0,
        xgRelationCompanyCount: 0,
        xgTotalCount: 0,
        xzcfRelationCompanyCount: 0,
        xzcfTotalCount: 0
      }
    }
  },
  methods: {
    isNumber,
    async getCompanyCount() {
      const res = await ajaxStore.factoryService.realEstate.getRelationCompanyRiskCount({
        companyName: this.companyName || this.$route.query.companyName
      })
      if (res.data && res.data.code === '0') {
        this.summary = res.data.data
      }
    },
  },
  mounted() {
    this.getCompanyCount()
  },
}
</script>
<style lang="stylus" scoped>
.p-related-main
  background url('//cdn.qjdchina.com/static-online/saas/factoryService/programme/related-bg.png') no-repeat
  background-size cover
  height 180px
  margin-bottom 10px
  .p-related-header
    position relative
    height 50px
    font-size 14px
    line-height 50px
    text-indent 27px
    color #fff
    margin-bottom 20px
    &:before
      content ''
      position absolute
      top 18px
      left 20px
      width 3px
      height 14px
      background-color #25BECD
      border-radius 2px
.p-module-main
  background #fff
  width 100%
  border-radius 10px
  .p-module-header
    font-size 14px
    padding 15px 20px
    border-bottom 1px solid #EAEBEE
    display flex
    justify-content space-between
  .p-module-content
    padding 15px 20px
    position relative
.p-type-main
  padding-top 10px
.p-module-type-header
  margin 0 20px
  display flex
  border-bottom 2px solid #E8ECF7
  .p-type-item
    color #9AA6B8
    font-size 14px
    min-width 95px
    line-height 40px
    text-align center
    cursor pointer
    display block
    padding 0 10px
    margin-bottom -1px
  .p-type-item:hover
    color #3C5DA4
.p-table
  .table-header
    align-items center
    padding 20px 10px
.p-pagination
  margin-top 20px
  text-align center
.p-current-title
  color #3C5DA4 !important
  border-bottom 3px solid #3C5DA4
.p-related-content
  display flex
  .p-related-item
    padding-left 20px
    color #fff
    font-size 14px
    width 185px
    border-right 1px solid #728BC2
    .p-related-item-num
      font-size 28px
      font-weight bold
    .p-related-item-case
      font-size 12px
  .p-related-item:last-child
    border-right none
.u-tip
  margin-bottom 45px
  color #6D7278
</style>
