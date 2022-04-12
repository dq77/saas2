<template lang="pug">
.p-discount-tag
  | 限时
  span(v-if='isPurchaseRestricted === "Y"') 限量
  | 折扣：
  span.p-nowrap {{ marketingDiscount }}折
    span(v-if='isPurchaseRestricted === "Y" && typeof marketingCount === "number"') （{{ marketingCount }}件）
</template>

<script>
export default {
  props: {
    isPurchaseRestricted: String, // 是否限购，Y表示限购
    marketingCount: Number,
    marketingDiscount: Number, // 此字段只有订单阶段需要显示，发货、退货时不展示
  }
}
</script>

<style lang="stylus" scoped>
.p-discount-tag
  margin-top 10px
  padding 4px 10px
  border-radius: 4px
  line-height: 17px
  color #F55849
  background-color #FEEEED
.p-nowrap
  white-space nowrap
</style>
