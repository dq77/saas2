<template lang="pug">
.brother-main(v-loading='loading')
  .relation-title 兄弟公司
  Table.relation-table.enterprise-detail-table(
    :dataSource="dataSource || []"
    :columns="brotherColumns"
    :index='true'
  )
  Pagination(:pagination="pagination")
</template>

<script>
import Table from '@/components/qjd/table'
import { brotherColumns } from './config'
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
    const { getBrotherCorp } = ajaxStore.customer.enterprise
    const { loading, dataSource, pagination } = useFakePagination({
      request: getBrotherCorp,
      params: {
        companyName: inject('companyName'),
        dir: 'down',
      }
    })

    return {
      loading,
      brotherColumns,
      dataSource,
      pagination
    }
  }
}
</script>

<style lang="stylus" scoped>
@import './index.styl';
</style>
