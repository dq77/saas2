<template lang="pug">
RiskCard(title="股权质押-数据概览" :columns='equityPledgeColumns' :dataSource='summaryResult || {}' type='pledge')
  template(slot='rightContent')
    Tabs(:dataSource="dataSource", :defaultTab="'equityPledge'", @tabCLick="(val) => tabCLick(val)" type='noBackground')
    EquityPledge(v-loading='trendLoading' v-if='currentTab === "equityPledge"' :dataSource="trendTesult || []")
</template>

<script>
import { watch } from '@vue/composition-api'
import Tabs from '@/components/qjd/tabs'
import useTabs from 'hooks/useTabs'
import RiskCard from '../RealEstateDetail/riskCard'
import EquityPledge from './riskDistributionChart/equityPledge'
import useStockPledge from '../hooks/useStockPledge'
import { equityPledgeColumns, equityPledgeTabs } from './config'
export default {
  props: {
    companyName: {
      type: String,
      required: true
    }
  },
  components: {
    RiskCard,
    Tabs,
    EquityPledge,
  },
  setup(props) {
    const {
      summaryLoading,
      trendLoading,
      doSummaryResult,
      doTrendResult,
      summaryResult,
      trendTesult
    } = useStockPledge()

    const { dataSource, currentTab, tabCLick } = useTabs({
      dataSource: equityPledgeTabs,
      currentTab: 'equityPledge'
    })

    watch(
      () => props.companyName,
      (value) => {
        doSummaryResult({ companyName: value })
        doTrendResult({ companyName: value })
      }
    )

    watch(
      () => currentTab.value,
      (value) => {
        console.log(value, 'currentTab')
      }
    )

    return {
      summaryLoading,
      trendLoading,
      summaryResult,
      trendTesult,
      dataSource,
      tabCLick,
      equityPledgeColumns,
      currentTab
    }
  }
}
</script>

<style lang="stylus" scoped>

</style>
