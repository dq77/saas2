<template lang="pug">
  .order-list-top-total-info
    Card(:loading='loading' noTitle)
      .top-list
        .row
          totalInfoCard.item(title='库存总产品种类（个）' info='' :value='totalInfo.goodsCount || 0' :url='`${$assetsBaseUrl}/SupplyChain/factory/order-manage-1.png`')
          totalInfoCard.item(title='下单冻结中的产品种类（个）' info='' :value='totalInfo.lockGoodQuantity || 0' :url='`${$assetsBaseUrl}/SupplyChain/factory/order-manage-2.png`')
</template>
<script>
import ajaxStore from '@/apis'
import { ref } from '@vue/composition-api'
import Card from '@/components/Card'
import totalInfoCard from '@/components/List/totalInfoCard'
import useLoading from 'hooks/useLoading'

export default {
  props: {},
  components: {
    Card, totalInfoCard
  },
  setup(props, context) {
    const { factory: { getGoodsTotalInSell } } = ajaxStore
    const totalInfo = ref({})
    const {
      loading,
      checkLoading
    } = useLoading()

    const getTotalInfo = async () => {
      checkLoading(true)
      const res = await getGoodsTotalInSell()
      checkLoading(false)
      if (res?.data?.code === '0') {
        totalInfo.value = res.data.data
      }
    }
    getTotalInfo()

    return {
      loading,
      totalInfo,
    }
  },
}
</script>

<style lang="stylus" scoped>
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
