<template lang="pug">
.deliver-info
  el-button(v-if='status === "1" || status === "2"' type='primary' style='margin: 20px 0' @click='clickToDeliver') 新建发货
  Table(:dataSource="dataSource" :columns="deliverModuleColumns" :loading="loading" @buttonHandle="buttonHandle")
</template>

<script>
import Table from '@/components/qjd/table'
import ajaxStore from '@/apis'
import useDevliverManage from '@/views/SupplyChain/Factory/Deliver/jsDeliverlist'
import { deliverModuleColumns } from '@/views/SupplyChain/Factory/Deliver/const/index'

export default {
  components: {
    Table,
  },
  props: {
    orderId: String,
    status: String
  },
  setup(props, {root}) {
    const { factory: { getOderDeliverList } } = ajaxStore
    const {
      loading,
      dataSource,
      buttonHandle,
    } = useDevliverManage(getOderDeliverList, root)
    const clickToDeliver = () => {
      root.$router.push({name: 'deliverCreate', query: {orderId: props.orderId}})
    }
    return {
      loading,
      dataSource,
      deliverModuleColumns,
      buttonHandle,
      clickToDeliver,
    }
  },
}
</script>
