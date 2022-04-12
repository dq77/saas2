<template lang="pug">
.receive_box
  .receive_item
    CustomCircle(
      :id="'receiveMoney'"
      :title="'应收总金额'"
      :dataSource="receiveDataSource"
    )
  .receive_item
    CustomCircle(
      :id="'hasReceiveMoney'"
      :title="'已收金额'"
      :dataSource="hasReceiveDataSource"
    )
</template>
<script>
import { computed, defineComponent } from '@vue/composition-api'
import CustomCircle from '../components/circle'

export default defineComponent({
  components: {
    CustomCircle
  },
  props: {
    dataSource: Object
  },
  setup(props) {
    // 应收总金额
    const receiveDataSource = computed(() => {
      const { dataSource } = props
      return {
        projectVal: dataSource?.projectReceivableAmount ?? 0,
        creditVal: dataSource?.creditReceivableAmount ?? 0,
        otherVal: dataSource?.otherReceivableAmount ?? 0,
        projectPer: dataSource?.projectReceivableRatio ?? 0,
        creditPer: dataSource?.creditReceivableRatio ?? 0,
        otherPer: dataSource?.otherReceivableRatio ?? 0,
        total: dataSource?.receivableAmount ?? 0
      }
    })
    // 已收金额
    const hasReceiveDataSource = computed(() => {
      const { dataSource } = props
      return {
        projectVal: dataSource?.projectReturnedAmount ?? 0,
        creditVal: dataSource?.creditReturnedAmount ?? 0,
        otherVal: dataSource?.otherReturnedAmount ?? 0,
        projectPer: dataSource?.projectReturnedRatio ?? 0,
        creditPer: dataSource?.creditReturnedRatio ?? 0,
        otherPer: dataSource?.otherReturnedRatio ?? 0,
        total: dataSource?.returnedAmount ?? 0
      }
    })

    return {
      receiveDataSource,
      hasReceiveDataSource
    }
  }
})
</script>
<style lang="stylus" scoped>
.receive_box
  border-top: 1px solid #EAEBEE
  display: flex
  .receive_item
    height: 300px
    flex: 1
    box-sizing: border-box
    padding: 20px
  .receive_item:nth-of-type(1)
    border-right: 1px solid #EAEBEE;
</style>
