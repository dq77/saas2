<template lang="pug">
div
    template(v-if='projectInfo.fileType === "2"')
      cardTitle(title='项目合同信息')
    .p-detail-item-content(v-if='projectInfo.fileType === "2"')
      TableCard(:source='projectInfo' :columns='columns' :row='5' width='20%' align='left')
      .p-detail-item.p-contract-main
        .p-summary-content
          .p-summary-item
            .p-summary-line
              .p-summary-label 是否有预付款
              .p-summary-value
                span(v-if='projectInfo.isTherePrepayment === "0"') 否
                span(v-else) 是
            .p-summary-line
              .p-summary-label 是否有商业汇票、保理付款
              .p-summary-value
                span(v-if='projectInfo.isThereCommercialDraft === "0"') 否
                span(v-else) 是
            .p-summary-line
              .p-summary-label 是否有有效应收账款
              .p-summary-value
                span(v-if='projectInfo.isThereEffectiveAccountsReceivable === "0"') 否
                span(v-else) 是
          .p-summary-item
            .p-summary-line
              .p-summary-label 是否有房抵款
              .p-summary-value
                span(v-if='projectInfo.isThereHouseMortgage === "0"') 否
                span(v-else) 是
            .p-summary-line
              .p-summary-label 项目验收前是否可支付到合同金额的70%
              .p-summary-value
                span(v-if='projectInfo.isItPossiblePaySevenPercent === "0"') 否
                span(v-else) 是
</template>
<script>
import CardTitle from '../components/cardTitle'
import TableCard from '../components/tableCard'
import { inject, ref } from '@vue/composition-api'
import { contractColumns } from '../config'
export default {
  components: { CardTitle, TableCard },
  setup(props, { root }) {
    const columns = ref(contractColumns)
    const projectInfo = inject('projectInfo')

    return {
      columns,
      projectInfo
    }
  }
}
</script>
<style lang="stylus" scoped>
.p-contract-table
  .p-table-item
    .p-table-item-label,
    .p-table-item-num
      text-align left
      padding-left 20px
.p-detail-item-content
  .p-table-flex
    display flex
  .p-table-item
    width 25%
    .p-table-item-label
      background #E5E7EF
      color #263862
      text-align center
      padding 18px 0
      font-weight bold
    .p-table-item-num
      background #F3F4F8
      color #494949
      text-align center
      padding 20px 50px
  .p-table-flex.p-single
      width 100%
    .p-table-item
      width 100%
.p-summary-content
  display flex
  .p-summary-item
    border-right 1px solid #F3F4F8
    padding 0 20px
    .p-summary-line
      font-size 14px
      color #494949
      border-bottom 1px solid #F3F4F8
      line-height 45px
  .p-summary-item:first-child
    padding-left 0
  .p-summary-item:last-child
    border-right none
.p-summary-line
  display flex
  justify-content space-between
.p-contract-main
  width 100%
  margin-top 20px
  .p-summary-content
    width 100%
  .p-summary-item
    width 100%
    .p-summary-line
      width 100%
      padding-left 20px
      padding-right 50px
.p-contract-table
  .p-table-item
    background #F3F4F8
    .p-table-item-label,
    .p-table-item-num
      text-align left
      padding-left 20px
</style>
