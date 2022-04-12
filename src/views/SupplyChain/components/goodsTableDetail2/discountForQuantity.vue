<template lang="pug">
el-tooltip
  div(slot='content')
    div
      template(v-if='overRestrictedStrategy === "OVER_PART_ORIGIN_PRICE"') 超过限量部分将按照原价计算
      template(v-else-if='overRestrictedStrategy === "REJECT_PURCHASE"') 超过限量部分不可购买
    div 享受折扣数量：{{ marketingQuantity }}
    div 原价购买数量：{{ originalPriceCount || 0 }}
  i.el-icon-info(style="margin-left: 4px; line-height: 23px;")
</template>

<script>
export default {
  props: {
    overRestrictedStrategy: String,
    marketingQuantity: Number,
    originalPriceCount: Number,
  }
}
</script>
