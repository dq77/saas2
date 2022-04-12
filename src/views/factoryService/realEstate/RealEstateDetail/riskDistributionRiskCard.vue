<template lang="pug">
RiskCard(:showCompanyName='newCompanyName' title="司法风险-数据概览" :columns='riskDistributionColumns' :dataSource='riskSummary')
  template(slot='rightContent')
    Tabs(:dataSource="dataSource", :defaultTab="'regionalDistribution'", @tabCLick="(val) => tabCLick(val)" type='noBackground')
    RegionalDistribution(v-loading='chartLoading' v-if='currentTab === "regionalDistribution"' :dataSource="chartResult ? chartResult.area : []")
    CaseDistribution(v-loading='chartLoading' v-if='currentTab === "causeDistribution"' :dataSource="chartResult ? chartResult.reason : []")
    NearOneYearRegional(v-loading='chartLoading' v-if='currentTab === "nearOneYearRegional"' :dataSource="chartResult ? chartResult.month : []")
    YearRegional(v-loading='chartLoading' v-if='currentTab === "yearRegional"' :dataSource="chartResult ? chartResult.year : []")
    PlaintiffDefendant(v-loading='loading' v-if='currentTab === "plaintiffDefendant"' :dataSource="riskSummary")
</template>

<script>
import RiskCard from '../RealEstateDetail/riskCard'
import useRiskNews from '../hooks/useRiskNews'
import { watch } from '@vue/composition-api'
import { riskDistributionColumns, riskDistributionTabs } from './config'
import Tabs from '@/components/qjd/tabs'
import useTabs from 'hooks/useTabs'
import RegionalDistribution from './riskDistributionChart/regionalDistribution'
import CaseDistribution from './riskDistributionChart/caseDistribution'
import NearOneYearRegional from './riskDistributionChart/nearOneYearRegional'
import YearRegional from './riskDistributionChart/yearRegional'
import PlaintiffDefendant from './riskDistributionChart/plaintiffDefendant'
import useRiskDistribution from '../hooks/useRiskDistribution'
import useCompanyReplace from '../hooks/useCompanyReplace'
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
    RegionalDistribution,
    CaseDistribution,
    NearOneYearRegional,
    YearRegional,
    PlaintiffDefendant
  },
  setup(props) {
    const { loading, riskSummary, doRiskResult, doResult} = useRiskNews()
    const { loading: chartLoading, result: chartResult, doResult: chartDoResult} = useRiskDistribution()

    const { dataSource, currentTab, tabCLick } = useTabs({
      dataSource: riskDistributionTabs,
      currentTab: 'regionalDistribution'
    })

    const { newCompanyName, getCompanyName } = useCompanyReplace()

    watch(
      () => props.companyName,
      (value) => {
        getCompanyName({ companyName: value })
        doRiskResult({ companyName: value })
        doResult({ companyName: value })
        chartDoResult({ companyName: value })
      }
    )

    return {
      loading,
      riskDistributionColumns,
      riskSummary,
      dataSource,
      tabCLick,
      currentTab,
      chartLoading,
      chartResult,
      newCompanyName
    }
  }
}
</script>

<style lang="stylus" scoped>

</style>
