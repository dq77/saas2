<template lang="pug">
Card(title='当年累计权益拿地金额/累计权益销售金额' v-loading='loading')
  RedBlueBar(:config='saleBarConfig' :data='saleBarData')
</template>

<script>
import { watch, reactive, toRefs } from '@vue/composition-api'
import Card from '@/components/Card'
import RedBlueBar from '../components/redBlueBar'
import useRedBlueBar from '../hooks/useRedBlueBar'
import { saleBarConfig, saleBarDataDefault, currentYear } from './config'
export default {
  props: {
    dataSource: {
      type: Array,
      default: () => ([])
    },
    loading: {
      type: Boolean,
      default: false
    }
  },
  components: {
    Card,
    RedBlueBar
  },
  setup(props) {
    const state = reactive({
      saleBarData: saleBarDataDefault
    })
    const { toFloat, getChartConfig } = useRedBlueBar()

    const setSaleBarData = (saleData) => {
      if (!saleData.length) {
        return
      }
      const config = {}
      const lastYear = saleData.filter((item) => {
        return parseInt(item.rankYear).toString() === currentYear
      })[0]
      if (!lastYear) {
        return
      }
      saleBarConfig.map((item) => {
        const { configName, standard, isReverse, renderText } = item
        // 当年累计权益拿地金额/累计权益销售金额
        const value = toFloat(parseFloat(lastYear.acquireMoney) / parseFloat(lastYear.sellMoney))
        config[configName] = getChartConfig({
          value,
          standard,
          isReverse,
          text: renderText(value)
        })
      })
      state.saleBarData = config
    }

    watch(
      () => props.dataSource,
      (saleData) => {
        setSaleBarData(saleData)
      }
    )

    return {
      saleBarConfig,
      ...toRefs(state)
    }
  }
}
</script>

<style lang="stylus" scoped>

</style>
