<template lang="pug">
.p-tabs
  Tabs(:dataSource="dataSource", :defaultTab="'judicialLitigation'", @tabCLick="(val) => tabCLick(val)" type='backgroundLine')
  .system-content
    //- 其他模块
    RiskTable(:companyName='companyName' v-if='currentTab !== "newsPublicOpinion" && currentTab === item.value' :columns='columns' :request='request' :type='item.value' :key='item.value' v-for='item in tabConfig')
    //- 新闻舆情模块
    NewsPublicOpinion(:companyName='companyName' v-if='currentTab === "newsPublicOpinion"')
</template>
<script>
import Tabs from '@/components/qjd/tabs'
import useTabs from 'hooks/useTabs'
import RiskTable from './riskTable'
import NewsPublicOpinion from './newsPublicOpinion'
import ajaxStore from '@/apis'
import { watch, reactive, toRefs } from '@vue/composition-api'
import { relatedRiskConfigTabs, relatedTableColumns, relatedRiskRequest } from './config'

export default {
  props: {
    companyName: {
      type: String,
    },
    riskConfigTabs: {
      type: Array,
      default: () => relatedRiskConfigTabs
    },
    tableColumns: {
      type: Object,
      default: () => relatedTableColumns
    },
    riskRequest: {
      type: Object,
      default: () => relatedRiskRequest
    }
  },
  components: {
    Tabs,
    RiskTable,
    NewsPublicOpinion
  },
  setup(props) {
    const {
      riskConfigTabs: tabConfig,
      tableColumns: columnsConfig,
      riskRequest: requestConfig
    } = props
    const { realEstate: realestate } = ajaxStore.factoryService
    const state = reactive({
      columns: columnsConfig.judicialLitigation,
      request: realestate[requestConfig.judicialLitigation]
    })
    const { dataSource, currentTab, tabCLick } = useTabs({
      dataSource: tabConfig,
      currentTab: 'judicialLitigation'
    })

    watch(
      () => currentTab.value,
      (value) => {
        state.columns = columnsConfig[value]
        state.request = realestate[requestConfig[value]]
      }
    )

    return {
      dataSource,
      currentTab,
      tabCLick,
      tabConfig,
      ...toRefs(state)
    }
  },
}
</script>
<style lang="stylus" scoped>
.system-content
  background #fff
</style>
