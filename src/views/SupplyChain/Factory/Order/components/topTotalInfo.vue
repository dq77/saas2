<template lang="pug">
  .order-list-top-total-info
    Card(:loading='loading' noTitle)
      .top-list
        .row
          totalInfoCard.item(title='待审核订单数（笔）' info='状态为“待审核”的订单数量' :value='totalInfo.orderedCount || 0' :url='`${$assetsBaseUrl}/SupplyChain/statistic-icons/1.png`')
          totalInfoCard.item(title='已审核订单数（笔）' info='状态为“已审核”的订单数量' :value='totalInfo.confirmCount || 0' :url='`${$assetsBaseUrl}/SupplyChain/statistic-icons/2.png`')
          totalInfoCard.item(title='进行中订单数（笔）' info='状态为“进行中”的订单数量' :value='totalInfo.processCount || 0' :url='`${$assetsBaseUrl}/SupplyChain/statistic-icons/3.png`')
          totalInfoCard.item(title='已完成订单数（笔）' info='状态为“已完成”的订单数量' :value='totalInfo.successCount || 0' :url='`${$assetsBaseUrl}/SupplyChain/statistic-icons/4.png`')
        .row
          totalInfoCard.item(title='待审核订单金额（元）' info='状态为“待审核”的订单“总金额”之和' :value='totalInfo.orderedAmount || 0' :url='`${$assetsBaseUrl}/SupplyChain/statistic-icons/5.png`')
          totalInfoCard.item(title='已审核订单金额（元）' info='状态为“已审核”的订单“总金额”之和' :value='totalInfo.confirmAmount || 0' :url='`${$assetsBaseUrl}/SupplyChain/statistic-icons/6.png`')
          totalInfoCard.item(title='进行中订单金额（元）' info='状态为“进行中”的订单“总金额”之和' :value='totalInfo.processAmount || 0' :url='`${$assetsBaseUrl}/SupplyChain/statistic-icons/7.png`')
          totalInfoCard.item(title='已完成订单金额（元）' info='状态为“已完成”的订单“总金额”之和' :value='totalInfo.successAmount || 0' :url='`${$assetsBaseUrl}/SupplyChain/statistic-icons/8.png`')
</template>
<script>
import ajaxStore from '@/apis'
import { onMounted, ref } from '@vue/composition-api'
import Card from '@/components/Card'
import totalInfoCard from '@/components/List/totalInfoCard'

export default {
  props: {
  },
  components: {
    Card, totalInfoCard
  },
  setup(props, context) {
    const { factory: { getOrderTotalInfo } } = ajaxStore
    const loading = ref(true)
    const totalInfo = ref({})
    const getTotalInfo = async () => {
      loading.value = true
      const res = await getOrderTotalInfo()
      loading.value = false
      if (res.data && res.data.code === '0') {
        totalInfo.value = res.data.data
      }
    }
    onMounted(() => {
      getTotalInfo()
    })

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
        flex 1
        width 0
        margin 5px
</style>
