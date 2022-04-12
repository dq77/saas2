<template lang='pug'>
.template
  .template-title 尊敬的用户：
  .template-total {{ item.messageDetail }}
  template(v-if='status[code] === "应收提醒通知"')
    template(v-if='item.templateValue.currentDayReceivableList && item.templateValue.currentDayReceivableList.length > 0')
      .table-title 今日应收：
      Table.p-table(
        :dataSource='item.templateValue.currentDayReceivableList || []'
        :columns='remindTodayColumns'
      )
    template(v-if='item.templateValue.recentReceivablePlanItemList && item.templateValue.recentReceivablePlanItemList.length > 0')
      .table-title  近期应收：
      Table.p-table(
        :dataSource='item.templateValue.recentReceivablePlanItemList || []'
        :columns='remindRecentColumns'
      )
  .template-table(v-else-if='status[code] === "应收超期通知"')
    Table.p-table(
      v-if='item.templateValue.exceedDateReceivableItemsList && item.templateValue.exceedDateReceivableItemsList.length > 0'
      :dataSource='item.templateValue.exceedDateReceivableItemsList || []'
      :columns='overdueColumns'
    )
  .template-table(v-else-if='status[code] === "评估客户风险提醒"')
    Table.p-table(
      v-if='item.templateValue.length > 0'
      :dataSource='item.templateValue || []'
      :columns='evaluateCustomerRiskColumns'
    )
  .template-table(v-else-if='status[code] === "开发商预警"')
    .table-title 【本周重点公告】
    Table.p-table(
      v-if='item.templateValue.weeklyBulletinMessage && item.templateValue.weeklyBulletinMessage.length > 0'
      :dataSource='item.templateValue.weeklyBulletinMessage || []'
      :columns='weeklyHighlightsColumns'
      :index='true'
    )
    .table-title 【预警信息摘要】
    Table.p-table(
      v-if='item.templateValue.warnInfoMessage && item.templateValue.warnInfoMessage.length > 0'
      :dataSource='item.templateValue.warnInfoMessage || []'
      :columns='warningInfoColumns'
    )
    .table-title 【债券到期信息】
    Table.p-table(
      v-if='item.templateValue.bondMaturityMessage && item.templateValue.bondMaturityMessage.length > 0'
      :dataSource='item.templateValue.bondMaturityMessage || []'
      :columns='maturityBondsColumns'
    )
    .table-title 【黑名单信息】
    Table.p-table(
      v-if='item.templateValue.blacklistMessage && item.templateValue.blacklistMessage.length > 0'
      :dataSource='item.templateValue.blacklistMessage || []'
      :columns='blacklistColumns'
    )
      template(v-slot:threeRedLine='{row}')
        template(v-if='row.threeRedLine === "Y"')
          .p-icon-red
          span 命中
      template(v-slot:collapse='{row}')
        template(v-if='row.threeRedLine === "Y"')
          .p-icon-red
          span 命中
      template(v-slot:risk='{row}')
        template(v-if='row.threeRedLine === "Y"')
          .p-icon-red
          span 命中
      template(v-slot:riskObserve='{row}')
        template(v-if='row.threeRedLine === "Y"')
          .p-icon-red
          span 命中
  template(v-else)
    Table.p-table(
      v-if='item.templateValue.hasRepaymentList && item.templateValue.hasRepaymentList.length > 0'
      :dataSource='item.templateValue.hasRepaymentList || []'
      :columns='finishColumns'
    )
</template>

<script>
import { reactive, toRefs } from '@vue/composition-api'
import Table from '@/components/qjd/table/index'
import * as config from './config'
export default {
  props: {
    code: String,
    item: {
      type: Object,
      default: () => ({})
    }
  },
  components: {
    Table
  },
  setup (props) {
    const state = reactive({
      dataSource: []
    })
    return {
      ...config,
      ...toRefs(state)
    }
  }
}
</script>

<style lang='stylus' scoped>
.p-table
  margin-top 10px
  width 692px
.p-icon-red
  float left
  margin-top 7px
  margin-right 7px
  width 8px
  height 8px
  border-radius 12px
  background-color var(--successColor)
.table-title
  margin 10px 0
</style>
