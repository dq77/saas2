<template lang="pug">
  .order-list-top-total-info
    Card(:loading='loading' noTitle)
      .top-list
        .row
          totalInfoCard.item(title='审核中的退货单（笔）' info='状态为“审核中”的订单数量' :value='totalInfo.reverseAuditingCount || 0' :url='`${$assetsBaseUrl}/SupplyChain/factory/order-manage-1.png`')
          totalInfoCard.item(title='退货中的退货单（笔）' info='状态为“退货中”的订单数量' :value='totalInfo.reversingCount || 0' :url='`${$assetsBaseUrl}/SupplyChain/factory/order-manage-2.png`')
          totalInfoCard.item(title='已退货的退货单（笔）' info='状态为“已退货”的订单数量' :value='totalInfo.reverseFinishCount || 0' :url='`${$assetsBaseUrl}/SupplyChain/factory/order-manage-3.png`')
          totalInfoCard.item(title='已驳回的退货单（笔）' info='状态为“已驳回”的订单数量' :value='totalInfo.reverseRejectCount || 0' :url='`${$assetsBaseUrl}/SupplyChain/factory/order-manage-4.png`')
        .row
          totalInfoCard.item(title='审核中的退货金额（元）' info='状态为“审核中”的订单“总金额”之和' :value='totalInfo.reverseAuditingAmount || 0' :url='`${$assetsBaseUrl}/SupplyChain/factory/order-manage-5.png`')
          totalInfoCard.item(title='退货中的退货金额（元）' info='状态为“退货中”的订单“总金额”之和' :value='totalInfo.reversingAmount || 0' :url='`${$assetsBaseUrl}/SupplyChain/factory/order-manage-6.png`')
          totalInfoCard.item(title='已退货的退货金额（元）' info='状态为“已退货”的订单“总金额”之和' :value='totalInfo.reverseFinishAmount || 0' :url='`${$assetsBaseUrl}/SupplyChain/factory/order-manage-7.png`')
          totalInfoCard.item(title='已驳回的退货金额（元）' info='状态为“已驳回”的订单“总金额”之和' :value='totalInfo.reverseRejectAmount || 0' :url='`${$assetsBaseUrl}/SupplyChain/factory/order-manage-8.png`')
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
    const { dealer: { getReverseOrderDataOverview } } = ajaxStore
    const loading = ref(true)
    const totalInfo = ref({})
    const getTotalInfo = async () => {
      loading.value = true
      const res = await getReverseOrderDataOverview()
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
