<!--
 * @Date: 2021-07-19 15:49:35
 * @LastEditors: 掉漆
 * @LastEditTime: 2021-08-17 16:54:05
-->
<template lang="pug">
.order-list-top-total-info
  Card(:loading='loading' noTitle)
    .top-list
      .row
        totalInfoCard.item(title='项目总数（个）' info='该列表中所有的项目数量' :value='totalInfo.orgProjectCount || 0' :url='`${$assetsBaseUrl}/SupplyChain/factory/product-manage-1.png`')
        totalInfoCard.item(title='项目总金额（万元）' info='该列表中所有的项目的项目合同金额之和' :value='totalInfo.orgProjectContractAmount || 0' :url='`${$assetsBaseUrl}/SupplyChain/factory/product-manage-2.png`')
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
    const { factory: { getProjectTotalInfo } } = ajaxStore
    const loading = ref(false)
    const totalInfo = ref({})
    const getTotalInfo = async () => {
      loading.value = true
      const res = await getProjectTotalInfo()
      loading.value = false
      if (res.data && res.data.code === '0') {
        totalInfo.value = res?.data?.data ?? {}
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
