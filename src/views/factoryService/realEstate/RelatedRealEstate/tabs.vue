<template lang="pug">
.p-tabs
  Tabs(:dataSource="dataSource", :defaultTab="'relatedCompany'", @tabCLick="(val) => clickTab(val)" type='backgroundLine')
  .system-content
    RelatedCompany(:companyName='companyName' :actualCompanyName='actualCompanyName' v-if="currentTab === 'relatedCompany'")
    RiskSummary(:companyName='companyName' v-if="currentTab === 'riskSummary'")
    RelationQuery(:companyName='companyName' :actualCompanyName='actualCompanyName' v-if="currentTab === 'relationQuery'")
  RiskList(:companyName='companyName' v-if="currentTab === 'riskSummary'")
</template>
<script>
import Tabs from '@/components/qjd/tabs'
import useTabs from 'hooks/useTabs'
import RiskList from '../components/riskList/related'
import RiskSummary from './riskSummary'
import RelatedCompany from './relatedCompany/index'
import RelationQuery from './relationQuery/index'
import { weblogsDom } from '@/utils/qjd/weblogs'
export default {
  props: {
    companyName: {
      type: String,
    },
    actualCompanyName: {
      type: String,
    },
  },
  components: {
    Tabs, RiskSummary, RelatedCompany, RiskList, RelationQuery
  },
  setup(props) {
    // 关联公司-tabs
    const creditConfigTabs = [
      { label: '关联公司', value: 'relatedCompany' },
      { label: '关联关系查询', value: 'relationQuery' },
      { label: '关联风险', value: 'riskSummary' },
    ]
    const { dataSource, currentTab, tabCLick } = useTabs({
      dataSource: creditConfigTabs,
      currentTab: 'relatedCompany'
    })

    const clickTab = (val) => {
      tabCLick(val)
      // 埋点
      if (val === 'relatedCompany') weblogsDom('关联公司-关联公司')
      if (val === 'riskSummary') weblogsDom('关联公司-关联风险')
    }

    return {
      dataSource,
      currentTab,
      clickTab
    }
  },
}
</script>
<style lang="stylus" scoped>
.system-content
  background #fff
  margin-bottom 10px
</style>
