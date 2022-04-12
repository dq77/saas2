<template lang="pug">
.module-main
  .home-title 企业年报
  Table.enterprise-detail-table(
    v-loading='loading'
    :dataSource="result.reportItemList || []"
    :columns="reportColumns"
    :index='true'
    :border='true'
  )
    template(slot='totalSales' slot-scope='{row}')
      span(v-if='row.baseInfo') {{ row.baseInfo.totalSales || '-' }}
      span(v-else) -
    template(slot='retainedProfit' slot-scope='{row}')
      span(v-if='row.baseInfo') {{ row.baseInfo.retainedProfit || '-' }}
      span(v-else) -
    template(slot='totalTax' slot-scope='{row}')
      span(v-if='row.baseInfo') {{ row.baseInfo.totalTax || '-' }}
      span(v-else) -
    template(slot='employeeNum' slot-scope='{row}')
      span(v-if='row.baseInfo') {{ row.baseInfo.employeeNum || '-' }}
      span(v-else) -
</template>

<script>
import Table from '@/components/qjd/table'
import { inject } from '@vue/composition-api'
import { reportColumns } from './config'
export default {
  components: {
    Table
  },
  setup(props) {
    const { loading, result } = inject('baseInfo')

    return {
      loading,
      result,
      reportColumns
    }
  }
}
</script>

<style lang="stylus" scoped>
@import './index.styl';
.p-table-img-wrap
  display flex
  align-items center
  .u-table-img
    width 40px
    height 40px
    margin 0 10px
  .u-table-img-text
    width 40px
    height 40px
    margin 0 10px
    line-height 40px
    font-size 14px
    text-align: center
    color #fff
    background #7eb3da
    border-radius 4px
</style>
