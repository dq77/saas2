<template lang="pug">
.history-investment-main(v-loading='loading')
  .relation-title 历史投资
  Table.relation-table.enterprise-detail-table(
    :dataSource="dataSource || []"
    :columns="historyInvestmentColumns"
    :index='true'
  )
  Pagination(:pagination="pagination")
</template>

<script>
import Table from '@/components/qjd/table'
import { historyInvestmentColumns } from './config'
import { inject } from '@vue/composition-api'
import useTable from 'hooks/useTable'
import ajaxStore from '@/apis'
import Pagination from '@/components/qjd/pagination'
export default {
  components: {
    Table,
    Pagination
  },
  setup(props) {
    const { getHistoryInvestment } = ajaxStore.customer.enterprise

    const {
      loading,
      dataSource,
      pagination,
    } = useTable({
      request: getHistoryInvestment,
      defaultParams: {
        companyName: inject('companyName'),
      },
      callback: (res) => {
        return {
          totalCount: res.total,
          dataSource: res.list
        }
      }
    })
    return {
      historyInvestmentColumns,
      loading,
      dataSource,
      pagination
    }
  }
}
</script>

<style lang="stylus" scoped>
@import './index.styl';
</style>
