<template lang="pug">
.page-main
  .warning
    //- 每周重点公告
    WeekKeyHeader()
    //- 预警信息
    .warning-tabs
      Tabs(:dataSource="dataSource", :defaultTab="'risk'", @tabCLick="(val) => tabCLick(val)")
      .warning-content
        RiskEvent(v-if="currentTab === 'risk'")
        DebtEvent(v-if="currentTab === 'debt'")
        History(v-if="currentTab === 'history'")
        Blacklist(v-if="currentTab === 'black'")
</template>
<script>
import Tabs from '@/components/qjd/tabs'
import useTabs from 'hooks/useTabs'
import { realestateWarningTabs } from './config'
import WeekKeyHeader from './week'
import RiskEvent from './risk'
import DebtEvent from './debt'
import History from './history'
import Blacklist from './blacklist'
import { ref } from 'vue-demi'

export default {
  components: {
    Tabs,
    WeekKeyHeader,
    RiskEvent,
    DebtEvent,
    History,
    Blacklist,
  },
  setup(props, { root }) {
    const { $route: { params: { creditId } } } = root
    const baseInfo = ref({})

    const tabItem = ref('history')
    const { dataSource, currentTab, tabCLick } = useTabs({
      dataSource: realestateWarningTabs,
      currentTab: 'history'
    })

    return {
      tabItem,
      baseInfo,
      dataSource,
      currentTab,
      tabCLick,
      creditId,
    }
  },
}
</script>
<style lang="stylus" scoped>
.warning-tabs
  padding 20px 0
</style>
