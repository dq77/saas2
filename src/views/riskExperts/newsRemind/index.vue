<template lang="pug">
.page-main
  Tabs(:dataSource="dataSource", :defaultTab="'risk'", @tabCLick="(val) => tabCLick(val)")
  .news-content
    RiskEvent(v-if="currentTab === 'risk'")
    NewsPublic(v-if="currentTab === 'news'")
</template>
<script>
import Tabs from '@/components/qjd/tabs'
import useTabs from 'hooks/useTabs'
import { newsRemindTabs } from './config'
import RiskEvent from './risk'
import NewsPublic from './news'
import { ref } from 'vue-demi'
import store from '@/store'

export default {
  components: {
    Tabs,
    RiskEvent,
    NewsPublic
  },
  setup() {
    // store
    const { state: { permissions } } = store
    if (!permissions['PTN:RISKEXPERTS:PUBLICOPINION:RISKEVENT'] && !permissions['PTN:RISKEXPERTS:PUBLICOPINION:JOURNALISM']) {
      root.$message.error('您还未开通此项服务，请联系售前商务')
    }
    const tabItem = ref('risk')
    const { dataSource, currentTab, tabCLick } = useTabs({
      dataSource: newsRemindTabs,
      currentTab: 'risk'
    })

    return {
      tabItem,
      dataSource,
      currentTab,
      tabCLick
    }
  },
}
</script>

<style lang="stylus" scoped>

</style>
