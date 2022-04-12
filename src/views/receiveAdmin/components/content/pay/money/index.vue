<template lang="pug">
.pay_top
  .pay_money
    .pay_all
      span 总：
      span {{ dataSource.allMoney }}
    .pay_other
      span 剩余：
      span {{ dataSource.lastMoney }}
  .pay_progress
    el-progress(
      :stroke-width="10"
      :percentage="dataSource.percentage || 0"
      :color="'#F2F2F6'"
      :show-text="false"
    )
  .pay_arrow
</template>
<script>
import { computed } from '@vue/composition-api'
import { percent2 } from '@/utils/qjd'

export default {
  props: {
    moneyInfo: {
      type: Object,
      default: () => ({})
    }
  },
  setup(props) {
    const dataSource = computed(() => {
      const { receivableAmount, notPlanAmount } = props.moneyInfo ?? {}
      // 应收总金额
      const allMoney = receivableAmount ?? 0
      // 未计划金额
      const lastMoney = notPlanAmount ?? 0
      // 比例
      const percentage = ((allMoney - lastMoney) / allMoney) * 100
      return {
        allMoney: percent2(allMoney),
        lastMoney: percent2(lastMoney),
        percentage
      }
    })

    return {
      dataSource
    }
  }
}
</script>
<style lang="stylus" scoped>
.pay_top
  display: flex
  flex-direction: column
  align-items: center
  justify-content: center
  padding-top: 20px
  .pay_money
    display: flex
    margin-bottom: 10px
    .pay_all
      margin-right: 20px
    .pay_other
      color: rgba(59, 104, 240, 1)
  .pay_progress
    width: 300px
    margin-bottom: 16px
    /deep/ .el-progress-bar__outer
      background-color: #3B68F0
  .pay_arrow
    border: 8px solid transparent;
    border-top: 8px solid rgba(59, 104, 240, 1);
    width: 0;
    height: 0px;
    margin-bottom: 15px
</style>
