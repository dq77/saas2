<template lang="pug">
Card.p-card(:title='showCompanyName' noWrap)
  .p-module-flex
    .p-risk-summary-main
      .p-risk-summary
        .p-risk-summary-title
          span(:class='type === "pledge" ? "p-icon-gqzy" : "p-icon-sffx"')
          span {{title}}
        .p-risk-summary-content
          .p-risk-summary-item(v-for='item in columns') {{item.label}}：
            template(v-if='item.render') {{item.render(dataSource, dataSource[item.key])}}
            template(v-else) {{dataSource[item.key] || '-'}}
    .p-risk-chart-main
      slot(name='rightContent')
</template>

<script>
import Card from '@/components/Card'
export default {
  props: {
    showCompanyName: {
      type: String,
      default: ''
    },
    title: {
      type: String
    },
    columns: {
      type: Array,
      default: () => []
    },
    dataSource: {
      type: Object,
      default: () => ({})
    },
    type: {
      type: String,
      default: 'riskDistribution'
    }
  },
  components: {
    Card
  },
}
</script>

<style lang="stylus" scoped>
.p-module-flex
  display flex
  width 100%
  .p-module-main
    margin 0 20px 0 0
  .p-module-main:last-child
    margin-right 0
.p-risk-summary-title
  display flex
  background linear-gradient(270deg, #97B0DA 0%, #3C5DA4 100%)
  height 60px
  line-height 60px
  color #fff
  font-size 14px
  .p-icon-gqzy
    width 40px
    height 40px
    display block
    background url('//cdn.qjdchina.com/static-online/saas/factoryService/realEstate/realestate-icon-2.png') top right no-repeat
    background-size contain
    margin-top 10px
  .p-icon-sffx
    width 40px
    height 40px
    display block
    background url('//cdn.qjdchina.com/static-online/saas/factoryService/realEstate/realestate-icon-1.png') top right no-repeat
    background-size contain
    margin-top 10px
.p-risk-summary-main
  padding 20px
  .p-risk-summary
    background #F4F9FD
    min-width 270px
    height 350px
    color #494949
    height auto
    padding-bottom 20px
    .p-risk-summary-title
      font-size 14px
      margin-bottom 20px
    .p-risk-summary-item
      margin 0 20px
      height 28px
      line-height 28px
      border-bottom 1px dashed #D3DEEC
.p-risk-chart-main
  width 100%
  padding 20px
</style>
