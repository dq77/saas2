<template lang="pug">
div
  .content-table
    Table(
      :dataSource="recordTable && recordTable.dataSource ? recordTable.dataSource : []"
      :columns="recordColumns"
      :loading="recordTable.loading"
    )
  Pagination(:pagination="recordTable.pagination")
</template>
<script>
import { toRefs, reactive } from '@vue/composition-api'
import Table from '@/components/qjd/table'
import Pagination from '@/components/qjd/pagination'
import useTable from 'hooks/useTable'
import ajaxStore from '@/apis'
import {
  recordColumns
} from './config'
export default {
  components: {
    Table,
    Pagination
  },
  setup(props, { root }) {
    // customerId
    const { $route: { query: { customerId } } } = root
    const { receive: { getCollectionRecords } } = ajaxStore
    // table
    const recordTable = useTable({ request: getCollectionRecords, defaultParams: { customerId: customerId ?? '' } })
    // state
    const state = reactive({ recordTable })

    return {
      recordColumns,
      ...(toRefs(state))
    }
  }
}
</script>
<style lang="stylus" scoped>
.content-table
  padding: 20px 20px 30px 20px
</style>
