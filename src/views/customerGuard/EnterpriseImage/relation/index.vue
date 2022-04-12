<template lang="pug">
.relation-main
  .chart-main
    .chart-item(@click='showChart("relationMap")')
      img(:src='`${$assetsBaseUrl}/customerGuard/diagram-chart.png`')
      .chart-title 企业关系图谱
    .chart-item(@click='showChart("relatedCompany")')
      img(:src='`${$assetsBaseUrl}/customerGuard/equity-chart.png`')
      .chart-title 股权穿透图
    .chart-item(@click='showChart("relationQuery")')
      img(:src='`${$assetsBaseUrl}/customerGuard/relation-chart.png`')
      .chart-title 企业关系查询
  .tab-main(ref='relation-main')
    TabsNav(:dataSource='dataSource' :defaultTab='currentTab' @tabClick='tabCLick')
    .tab-content
      Shareholder(v-if='currentTab === "shareholder"')
      Investment(v-if='currentTab === "investment"')
      HistoryShareholder(v-if='currentTab === "historyShareholder"')
      HistoryInvestment(v-if='currentTab === "historyInvestment"')
      BrotherCompany(v-if='currentTab === "brotherCompany"')
      Branch(v-if='currentTab === "branch"')
      PeripheralRisk(v-show='currentTab === "peripheralRisk"' :activeTab='currentTab')
</template>

<script>
import TabsNav from './tabsNav'
import useTabs from 'hooks/useTabs'
import { relationTabs } from './config'
import Shareholder from './shareholder'
import Investment from './investment'
import HistoryShareholder from './historyShareholder'
import HistoryInvestment from './historyInvestment'
import BrotherCompany from './brotherCompany'
import Branch from './branch'
import PeripheralRisk from './peripheralRisk/index'
import ajaxStore from '@/apis'
import useAsync from 'hooks/useAsync'
import { inject, watch, ref, getCurrentInstance } from '@vue/composition-api'
import useEventBus from '@/hooks/useEventBus'
import busStore from '@/utils/busStore'
export default {
  components: {
    TabsNav,
    Shareholder,
    Investment,
    HistoryShareholder,
    HistoryInvestment,
    BrotherCompany,
    Branch,
    PeripheralRisk
  },
  props: {
    showChart: {
      type: Function,
      default: () => {}
    }
  },
  setup(props, { emit }) {
    const refs = ref(null)
    refs.value = getCurrentInstance().refs

    const { emitEvent } = useEventBus({
      event: busStore.getRefs
    })
    emitEvent(refs)

    const { dataSource, currentTab, tabCLick } = useTabs({
      dataSource: relationTabs,
      currentTab: 'shareholder'
    })

    const { initEvent } = useEventBus({
      event: busStore.targetTab
    })
    initEvent(({name}) => {
      currentTab.value = name
    })

    const { getShipmentAtlas } = ajaxStore.customer.enterprise

    const { loading: shareholderLoading, result: shareholderResult, doResult: shareholderDoResult } = useAsync({
      request: getShipmentAtlas,
      init: false,
      params: {
        companyName: inject('companyName')
      }
    })

    watch(
      () => currentTab.value,
      (value) => {
        if (!shareholderResult.value && ['shareholder', 'investment', 'brotherCompany'].includes(value)) {
          shareholderDoResult()
        }
      }
    )

    return {
      dataSource,
      currentTab,
      tabCLick,
      shareholderLoading,
      shareholderResult,
    }
  }
}
</script>

<style lang="stylus" scoped>
.chart-main
  display flex
  margin-bottom 50px
  padding 40px 20px 0 20px
  .chart-item
    position relative
    width 252px
    margin-right 42px
    cursor pointer
    img
      width 252px
    .chart-title
      position absolute
      left 0
      bottom 0
      background #F5FAFF
      color #2D2926
      font-size 14px
      width 100%
      height 50px
      line-height 50px
      text-align center
  .chart-item:hover
    .chart-title
      color #3B68F0
.tab-main
  border-top 1px solid #EAEBEE
  display flex
.tab-content
  min-height 300px
  padding 30px 20px
  min-width 0
  width 100%
</style>
