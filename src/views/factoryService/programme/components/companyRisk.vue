<template lang="pug">
.p-related-risk-main
  CompanyBase(:companyName='companyName')
  Card(noTitle noWrap)
    RiskList(:companyName='companyName' newsType='shadow')
</template>
<script>
import ajaxStore from '@/apis'
import { isNumber } from '@/utils/util'
import Card from '@/components/Card'
import RiskList from '@/views/factoryService/realEstate/components/riskList/index'
import CompanyBase from './companyBase'
export default {
  props: {
    companyName: {
      type: String
    },
  },
  components: { Card, RiskList, CompanyBase },
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
