<template lang="pug">
div
  .content-table
    Table(
      :dataSource="paymentCycleTable && paymentCycleTable.dataSource ? paymentCycleTable.dataSource : []"
      :columns="paymentCycleColumns"
      :loading="paymentCycleTable.loading"
    )
      template(slot='saArmBusinessFileList' slot-scope='{row}')
        File(:fileList="row.saArmBusinessFileList")
  Pagination(:pagination="paymentCycleTable.pagination")
</template>
<script>
import { toRefs, reactive } from '@vue/composition-api'
import Table from '@/components/qjd/table'
import Pagination from '@/components/qjd/pagination'
import File from '../components/files.vue'
import useTable from 'hooks/useTable'
import ajaxStore from '@/apis'
import {
  paymentCycleColumns
} from './config'
export default {
  components: {
    Table,
    Pagination,
    File
  },
  setup(props, { root }) {
    // customerId
    const { $route: { query: { customerId } } } = root
    const { receive: { getCollectionStageReturn } } = ajaxStore
    // table
    const paymentCycleTable = useTable({ request: getCollectionStageReturn, defaultParams: { customerId: customerId ?? '' } })
    // state
    const state = reactive({ paymentCycleTable })

    return {
      paymentCycleColumns,
      ...(toRefs(state))
    }
  }
}
</script>
<style lang="stylus" scoped>
.content-table
  padding: 20px 20px 30px 20px
</style>
