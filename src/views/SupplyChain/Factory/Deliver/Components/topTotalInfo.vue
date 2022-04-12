<template lang="pug">
  .order-list-top-total-info
    Card(:loading='loading' noTitle)
      .top-list
        .row
          totalInfoCard.item(title='待确认发货的发货单数（笔）' info='状态为“待确认”的发货数量' :value='totalInfo.deliverWaitCount || 0' :url='`${$assetsBaseUrl}/SupplyChain/factory/order-manage-1.png`')
          totalInfoCard.item(title='待签收的发货单数（笔）' info='状态为“待签收”的发货数量' :value='totalInfo.deliverFinishCount || 0' :url='`${$assetsBaseUrl}/SupplyChain/factory/order-manage-2.png`')
          totalInfoCard.item(title='已签收的发货单数（笔）' info='状态为“已签收”的发货数量' :value='totalInfo.deliverSignCount || 0' :url='`${$assetsBaseUrl}/SupplyChain/factory/order-manage-3.png`')
        .row
          totalInfoCard.item(title='待确认发货的发货单金额（元）' info='状态为“待确认”的“总金额”之和' :value='totalInfo.deliverWaitAmount || 0' :url='`${$assetsBaseUrl}/SupplyChain/factory/order-manage-5.png`')
          totalInfoCard.item(title='待签收的发货单金额（元）' info='状态为“待签收”的“总金额”之和' :value='totalInfo.deliverFinishAmount || 0' :url='`${$assetsBaseUrl}/SupplyChain/factory/order-manage-6.png`')
          totalInfoCard.item(title='已签收的发货单金额（元）' info='状态为“已签收”的“总金额”之和' :value='totalInfo.deliverSignAmount || 0' :url='`${$assetsBaseUrl}/SupplyChain/factory/order-manage-7.png`')
</template>
<script>
import ajaxStore from '@/apis'
import { onMounted, ref, watch } from '@vue/composition-api'
import Card from '@/components/Card'
import totalInfoCard from '@/components/List/totalInfoCard'
import store from '@/store'

export default {
  props: {},
  components: {
    Card, totalInfoCard
  },
  setup(props, context) {
    const { dealer: { getDeliverDataOverview } } = ajaxStore
    const loading = ref(true)
    const totalInfo = ref({})
    const getTotalInfo = async () => {
      loading.value = true
      const res = await getDeliverDataOverview()
      loading.value = false
      if (res.data && res.data.code === '0') {
        totalInfo.value = res.data.data
      }
    }
    onMounted(() => {
      getTotalInfo()
    })
    watch(
      () => store.state.curFactory,
      () => {
        getTotalInfo()
      }
    )
    return {
      loading,
      totalInfo
    }
  },
}
</script>
<style lang="stylus">
.order-list-top-total-info
  margin-bottom 10px
  .top-list
    .row
      display flex
      margin -5px
      .item
        flex auto
        margin 5px
</style>
