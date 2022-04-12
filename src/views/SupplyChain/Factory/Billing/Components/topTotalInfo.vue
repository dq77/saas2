<template lang="pug">
  .order-list-top-total-info
    Card(:loading='loading' noTitle)
      .top-list
        .row
          totalInfoCard.item(title='开票中的开票订单（笔）' info='状态为“开票中”的订单数量' :value='totalInfo.billingRequestingCount || 0' :url='`${$assetsBaseUrl}/SupplyChain/factory/order-manage-1.png`')
          totalInfoCard.item(title='已开票的开票订单（笔）' info='状态为“已开票”的订单数量' :value='totalInfo.billingFinishCount || 0' :url='`${$assetsBaseUrl}/SupplyChain/factory/order-manage-2.png`')
          totalInfoCard.item(title='已关闭的开票订单（笔）' info='状态为“已关闭”的订单数量' :value='totalInfo.billingClosedCount || 0' :url='`${$assetsBaseUrl}/SupplyChain/factory/order-manage-3.png`')
        .row
          totalInfoCard.item(title='开票中的开票金额（元）' info='状态为“开票中”的订单“总金额”之和' :value='totalInfo.billingRequestingAmount || 0' :url='`${$assetsBaseUrl}/SupplyChain/factory/order-manage-5.png`')
          totalInfoCard.item(title='已开票的开票金额（元）' info='状态为“已开票”的订单“总金额”之和' :value='totalInfo.billingFinishAmount || 0' :url='`${$assetsBaseUrl}/SupplyChain/factory/order-manage-6.png`')
          totalInfoCard.item(title='已关闭的开票金额（元）' info='状态为“已关闭”的订单“总金额”之和' :value='totalInfo.billingClosedAmount || 0' :url='`${$assetsBaseUrl}/SupplyChain/factory/order-manage-7.png`')
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
    const { dealer: { getDeliverInvoiceDataOverview } } = ajaxStore
    const loading = ref(true)
    const totalInfo = ref({})
    const getTotalInfo = async () => {
      loading.value = true
      const res = await getDeliverInvoiceDataOverview()
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
