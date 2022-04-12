<template lang="pug">
.p-summary
  span.u-left 合计：共{{newSummary.productSum}}行产品
  span.u-right
    div(v-for='item in newSummary.priceSum') {{item.label}}：￥{{item.value}}
</template>

<script>
import { computed } from '@vue/composition-api'
import { toAmountStr } from '@/utils/util'

export default {
  props: {
    /** summary案例
     * {
     *    productSum: 1,
     *    priceSum: [
     *      { label: '', value: 1, renderFn: (): string => {} }
     *    ]
     * }
     */
    summary: Object
  },
  setup(props) {
    const newSummary = computed(() => {
      const res = {
        productSum: props?.summary?.productSum,
        priceSum: []
      }
      props?.summary?.priceSum && props.summary.priceSum.forEach(item => {
        res.priceSum.push({
          label: item.label,
          value: item.renderFn ? item.renderFn(item.value) : toAmountStr(item.value, 4, true)
        })
      })
      return res
    })
    return {
      newSummary
    }
  }
}
</script>

<style lang="stylus" scoped>
.p-summary
  display: flex;
  justify-content: space-between;
  padding 20px 20px
  background: #fef8e1
  .u-right
    color #f25754
    font-size 14px
    text-align: right
</style>
