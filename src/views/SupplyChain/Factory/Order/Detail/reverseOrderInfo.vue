<template lang="pug">
  .deliver-info
    Table(
      :dataSource='dataSource'
      :columns='reverseOrderColumns'
      :loading='loading'
      @buttonHandle='buttonHandle'
    )
</template>

<script>
import Table from '@/components/qjd/table'
import ajaxStore from '@/apis'
import useReverseOrderList from '@/views/SupplyChain/Factory/ReverseOrder/jsReverseOrderList'
import { reverseOrderColumns } from '@/views/SupplyChain/Factory/ReverseOrder/const'

export default {
  components: {
    Table,
  },
  props: {
    queryId: String
  },
  setup(props, {root}) {
    // const {queryId} = props
    const { factory: { getOrderReverseList } } = ajaxStore
    const {
      loading,
      dataSource,
      buttonHandle,
    } = useReverseOrderList(getOrderReverseList, root)
    return {
      loading,
      dataSource,
      reverseOrderColumns,
      buttonHandle,
    }
  },
}
</script>
