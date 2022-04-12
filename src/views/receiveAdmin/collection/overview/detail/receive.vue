<template lang="pug">
div
  .content-table
    Table(
      :dataSource="receiveTable && receiveTable.dataSource ? receiveTable.dataSource : []"
      :columns="receiveColumns"
      :loading="receiveTable.loading"
    )
  Pagination(:pagination="receiveTable.pagination")
</template>
<script>
import { toRefs, reactive } from '@vue/composition-api'
import Table from '@/components/qjd/table'
import Pagination from '@/components/qjd/pagination'
import useTable from 'hooks/useTable'
import ajaxStore from '@/apis'
import { toAmountStr } from '@/utils/util'
import {
  receiveColumns
} from './config'
export default {
  components: {
    Table,
    Pagination
  },
  setup(props, { root }) {
    // customerId
    const { $route: { query: { customerId } } } = root
    const { receive: { getReceivableDetail } } = ajaxStore
    // table
    const receiveTable = useTable({ request: getReceivableDetail, defaultParams: { customerId: customerId ?? '' } })
    // state
    const state = reactive({ receiveTable })

    return {
      receiveColumns,
      toAmountStr,
      ...(toRefs(state))
    }
  }
}
</script>
<style lang="stylus" scoped>
.content-table
  padding: 20px 20px 30px 20px
  .total-ul
    display flex
    color #383b42
    margin-bottom 20px
    li
      position relative
      padding-left 14px
      margin-right 29px
      &:before
        content ''
        width 8px
        height 8px
        background-color #3b68f0
        border-radius 50%
        position absolute
        left 0
        top 4px
</style>
