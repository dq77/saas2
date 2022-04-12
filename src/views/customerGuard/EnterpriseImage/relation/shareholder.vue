<template lang="pug">
.shareholder-main(v-loading='loading')
  .relation-title 股东（多层级）
  Table.relation-table.enterprise-detail-table(
    :dataSource="dataSource || []"
    :columns="shareholderColumns"
    :index='true'
  )
  Pagination(:pagination="pagination")
</template>

<script>
import Table from '@/components/qjd/table'
import { shareholderColumns } from './config'
import ajaxStore from '@/apis'
import Pagination from '@/components/qjd/pagination'
import { inject } from '@vue/composition-api'
import useFakePagination from '@/hooks/useFakePagination'
export default {
  components: {
    Table,
    Pagination
  },
  setup(props) {
    const { getShipmentAtlas } = ajaxStore.customer.enterprise
    const { loading, dataSource, pagination } = useFakePagination({
      request: getShipmentAtlas,
      params: {
        companyName: inject('companyName'),
        dir: 'up',
      }
    })

    return {
      loading,
      shareholderColumns,
      dataSource,
      pagination
    }
  }
}
</script>

<style lang="stylus" scoped>
@import './index.styl';
</style>
