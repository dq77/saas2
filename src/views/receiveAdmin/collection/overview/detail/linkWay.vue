<template lang="pug">
div
  .content-table
    Table(
      :dataSource="linkWayTable && linkWayTable.dataSource ? linkWayTable.dataSource : []"
      :columns="linkWayColumns"
      :loading="linkWayTable.loading"
    )
  Pagination(:pagination="linkWayTable.pagination")
</template>
<script>
import { toRefs, reactive } from '@vue/composition-api'
import Table from '@/components/qjd/table'
import Pagination from '@/components/qjd/pagination'
import useTable from 'hooks/useTable'
import ajaxStore from '@/apis'
import {
  linkWayColumns
} from './config'
export default {
  components: {
    Table,
    Pagination
  },
  setup(props, { root }) {
    // customerId
    const { $route: { query: { customerId } } } = root
    // ajax
    const { receive: { getCollectionContactWay } } = ajaxStore
    // table
    const linkWayTable = useTable({ request: getCollectionContactWay, defaultParams: { customerId: customerId ?? '' } })
    // state
    const state = reactive({ linkWayTable })

    return {
      linkWayColumns,
      ...(toRefs(state))
    }
  }
}
</script>
<style lang="stylus" scoped>
.content-table
  padding: 20px 20px 30px 20px
</style>
