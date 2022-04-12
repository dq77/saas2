<template lang="pug">
.history-shareholder-main(v-loading='loading')
  .relation-title 历史股东
  Table.relation-table.enterprise-detail-table(
    :dataSource="dataSource || []"
    :columns="historyShareholderColumns"
    :index='true'
  )
  Pagination(:pagination="pagination")
</template>

<script>
import Table from '@/components/qjd/table'
import { historyShareholderColumns } from './config'
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
    const { getHistoryShareHolders } = ajaxStore.customer.enterprise

    const {
      loading,
      dataSource,
      pagination,
    } = useTable({
      request: getHistoryShareHolders,
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
      historyShareholderColumns,
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
