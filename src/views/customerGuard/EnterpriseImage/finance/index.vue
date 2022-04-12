<template lang="pug">
.p-finance
  .tab-nav
    TabsNav(:dataSource='dataSource' :defaultTab='currentTab' @tabClick='tabCLick')
  .tab-content(ref='finance-main')
    MainBusiness(v-if='currentTab === "mainBusiness"' :reportDate='reportDateApi.result')
    FinanceReport(v-if='currentTab === "financeReport"')
</template>

<script>
// components
import TabsNav from './tabsNav'
import MainBusiness from './mainBusiness'
import FinanceReport from './financeReport'
// hooks
import useTabs from 'hooks/useTabs'
import useEventBus from '@/hooks/useEventBus'
import useAsync from 'hooks/useAsync'
// others
import ajaxStore from '@/apis'
import { ref, getCurrentInstance, reactive, toRefs } from '@vue/composition-api'
import { financeTabs } from './config'
import busStore from '@/utils/busStore'

export default {
  components: {
    TabsNav,
    MainBusiness,
    FinanceReport
  },
  setup(props, { root }) {
    const refs = ref(null)
    refs.value = getCurrentInstance().refs

    const { emitEvent } = useEventBus({
      event: busStore.getRefs
    })
    emitEvent(refs)

    const { dataSource, currentTab, tabCLick } = useTabs({
      dataSource: financeTabs,
      currentTab: 'mainBusiness'
    })

    const { initEvent } = useEventBus({
      event: busStore.targetTab
    })
    initEvent(({name}) => {
      currentTab.value = name
    })

    // 季度
    const { customer: { stratify: { getMainBusinessDate } } } = ajaxStore
    const { companyName } = root.$route.query
    const reportDateApi = useAsync({ request: getMainBusinessDate, params: { fullName: companyName } })

    const state = reactive({
      reportDateApi
    })

    return {
      dataSource,
      currentTab,
      tabCLick,
      ...toRefs(state)
    }
  }
}
</script>

<style lang="stylus" scoped>
.p-finance
  display flex
  margin-top 20px
  .tab-content
    padding-left 20px
    min-width 0
    width 100%
    border-left 1px solid #f0f0f0
</style>
