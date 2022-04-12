<template lang="pug">
.table-main(v-loading='loading')
  Table.relation-table.enterprise-detail-table(
    :dataSource="result || []"
    :columns="peripheralRiskColumns[type]"
    :index='true'
  )
  Pagination(:pagination="pagination")
</template>

<script>
import Table from '@/components/qjd/table'
import Pagination from '@/components/qjd/pagination'
import ajaxStore from '@/apis'
import { peripheralRiskColumns } from './config'
import useTable from 'hooks/useTable'
import { inject } from '@vue/composition-api'
export default {
  props: {
    type: {
      type: Number
    }
  },
  components: {
    Table,
    Pagination
  },
  setup(props) {
    const { getRiskScanDetail } = ajaxStore.customer.enterprise

    const {
      loading,
      dataSource: result,
      pagination,
      searchHandle: doResult,
    } = useTable({
      request: getRiskScanDetail,
      isInit: false,
      defaultParams: {
        companyName: inject('companyName'),
        creditCode: inject('creditCode'),
      },
      callback: (res) => {
        return {
          totalCount: res.total,
          dataSource: res.list
        }
      }
    })

    return {
      loading,
      result,
      peripheralRiskColumns,
      pagination,
      doResult,
    }
  }

}
</script>

<style lang="stylus" scoped>

</style>
