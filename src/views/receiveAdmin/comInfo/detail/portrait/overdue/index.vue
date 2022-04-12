<template lang="pug">
.receive_box
  .receive_item
    CustomCircle(
      :id="'overdueMoney'"
      :title="'当前逾期金额'"
      :dataSource="overDataSource"
    )
  .receive_item
    Bar(:dataSource="dataSource")
</template>
<script>
import { defineComponent, computed } from '@vue/composition-api'
import CustomCircle from '../components/circle'
import Bar from './bar'

export default defineComponent({
  components: {
    CustomCircle,
    Bar
  },
  props: {
    dataSource: Object
  },
  setup(props) {
    // 应收总金额
    const overDataSource = computed(() => {
      const { dataSource } = props
      return {
        projectVal: dataSource?.projectOverdueAmount ?? 0,
        creditVal: dataSource?.creditOverdueAmount ?? 0,
        otherVal: dataSource?.otherOverdueAmount ?? 0,
        projectPer: dataSource?.projectOverdueRatio ?? 0,
        creditPer: dataSource?.creditOverdueRatio ?? 0,
        otherPer: dataSource?.otherOverdueRatio ?? 0,
        total: dataSource?.todayOverdueAmount ?? 0
      }
    })

    return {
      overDataSource
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
