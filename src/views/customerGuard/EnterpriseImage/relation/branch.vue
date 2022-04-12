<template lang="pug">
.branch-main(v-loading='loading')
  .relation-title 分支机构
  Table.relation-table.enterprise-detail-table(
    :dataSource="dataSource || []"
    :columns="branchColumns"
    :index='true'
  )
  Pagination(:pagination="pagination")
</template>

<script>
import Table from '@/components/qjd/table'
import { branchColumns } from './config'
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
    const { getBranch } = ajaxStore.customer.enterprise

    const {
      loading,
      dataSource,
      pagination,
    } = useTable({
      request: getBranch,
      defaultParams: {
        companyName: inject('companyName'),
      },
      callback: (res) => {
        return {
          totalCount: res.total,
          dataSource: res.list || []
        }
      }
    })
    return {
      branchColumns,
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
