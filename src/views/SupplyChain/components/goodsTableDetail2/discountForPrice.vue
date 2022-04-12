<template lang="pug">
div
  .p-nowrap 折扣价：{{marketingPrice | toAmountStr(2, true)}}
  .p-discount-old-price.p-nowrap 原价：{{originalPrice | toAmountStr(2, true)}}
</template>

<script>
export default {
  props: {
    originalPrice: Number,
    marketingPrice: Number,
  }
}
</script>

<style lang="stylus" scoped>
.p-discount-old-price
  margin-left 6px
  color #CBCBCD
  text-decoration: line-through;
.p-nowrap
  white-space nowrap
</style>
