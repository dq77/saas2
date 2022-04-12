<template lang="pug">
.p-main
  .p-line
    .p-label 客户名称:
    .p-value  {{baseInfo.customerName}}
  .p-line
    .p-label 统一社会信用代码:
    .p-value  {{baseInfo.uniformCreditCode}}
  .p-line
    .p-label 法人名称:
    .p-value  {{baseInfo.corporateRepresentative}}
  .p-line(v-if='mode !=="FAST_MODE"')
    .p-label 法人身份证号:
    .p-value  {{baseInfo.representativeIdNumber | toWordHide('id')}}
  .p-line
    .p-label 实控人名称:
    .p-value  {{baseInfo.actualController}}
</template>

<script>
export default {
  components: {
  },
  props: {
    mode: {
      type: String,
      default: 'ACCURATE_MODE'
    },
    baseInfo: {
      type: Object,
      default: () => ({})
    },
  },
  setup(props, { root }) {
    return {
    }
  }
}
</script>

<style lang="stylus" scoped>
.p-main
  .p-line
    display flex
    justify-content flex-start
    align-items center
    font-size 14px
    margin-bottom 20px
    .p-label
      flex 150px 0 0
      color rgba(0, 0, 0, 0.65)
    .p-value
      color rgba(0, 0, 0, 0.85)
</style>
