<template lang="pug">
.info_content
  Card(
    :title="'应收总金额'"
    :money="dataSource.allMoney"
  )
  Card(
    :title="'已计划金额'"
    :money="dataSource.plainMoney"
  )
  Card(
    :title="'已收款金额'"
    :money="dataSource.returnedAmount"
  )
  Card(
    :title="'总应收完成情况'"
    :percent="dataSource.percentage"
    :money="'1000.00'"
  )
    template(slot="content")
      .pay_progress
        el-progress(
          :stroke-width="10"
          :percentage="dataSource.percentage"
          :color="'#3B68F0'"
          :show-text="false"
        )
</template>
<script>
import { computed } from '@vue/composition-api'
import Card from './card'
import { percent2 } from '@/utils/qjd'

export default {
  components: {
    Card
  },
  props: {
    moneyInfo: {
      type: Object,
      default: () => ({})
    }
  },
  setup(props) {
    const dataSource = computed(() => {
      const { receivableAmount, notPlanAmount, returnedAmount } = props.moneyInfo ?? {}
      // 应收总金额
      const allMoney = receivableAmount ?? 0
      // 未计划金额
      const lastMoney = notPlanAmount ?? 0
      // 已计划金额
      const plainMoney = allMoney - lastMoney
      // 比例
      const percentage = !allMoney || !returnedAmount ? 0.00 : (((returnedAmount ?? 0) / allMoney) * 100).toFixed(2)
      return {
        allMoney: percent2(allMoney),
        lastMoney: percent2(lastMoney),
        plainMoney: percent2(plainMoney),
        returnedAmount: returnedAmount ? percent2(returnedAmount) : '0.00',
        percentage: Number(percentage)
      }
    })

    return {
      dataSource
    }
  },
}
</script>
<style lang="stylus" scoped>
.info_content
  padding-top 17px
  padding-bottom: 30px
  display: flex
.pay_progress
  width: 144px
  /deep/ .el-progress-bar__outer
    background-color: #CDD0D4
</style>
