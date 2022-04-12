<!--
 * @Date: 2021-07-19 15:49:35
 * @LastEditors: 掉漆
 * @LastEditTime: 2021-08-17 17:14:10
-->
<template lang="pug">
.order-list-top-total-info
  Card(:loading='loading' noTitle)
    .top-list
      .row
        totalInfoCard.item(title='产品总数（个）' info='该列表中所有的产品数量' :value='totalInfo.totalCount' :url='`${$assetsBaseUrl}/SupplyChain/factory/product-manage-1.png`')
        totalInfoCard.item(title='生效中产品数（个）' info='该列表中所有生效的产品数量' :value='totalInfo.validCount' :url='`${$assetsBaseUrl}/SupplyChain/factory/product-manage-2.png`')
        totalInfoCard.item(title='已失效产品数（个）' info='该列表中所有禁用的产品数量' :value='totalInfo.invalidCount' :url='`${$assetsBaseUrl}/SupplyChain/factory/product-manage-3.png`')
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
    const { factory: { getProductTotalInfo } } = ajaxStore
    const loading = ref(true)
    const totalInfo = ref({})
    const getTotalInfo = async () => {
      loading.value = true
      const res = await getProductTotalInfo()
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
        flex auto
        margin 5px
</style>
