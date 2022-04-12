<template lang="pug">
.credit-pay-box
  .credit-pay-money
    .credit-pay-detail
      span 本次还款总额：
      span {{ currentPay }}
    .credit-pay-detail(v-if="isAccount !=='none'")
      span 剩余额度：
      span {{ payAmount - currentPay }}
</template>
<script>
export default {
  props: {
    currentPay: Number,
    payAmount: Number,
    isAccount: String
  }
}
</script>
<style lang="stylus" scoped>
.credit-pay-box
  display flex
  flex-direction column
  align-items center
  justify-content center
  .credit-pay-money
    width 100%
    display flex
    flex-direction column
    align-items flex-end
    .credit-pay-detail
      padding-top 20px
</style>
