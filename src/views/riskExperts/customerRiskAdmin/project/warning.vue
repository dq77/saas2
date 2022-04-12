<template lang="pug">
.page-main
  .warning
    //- 基础信息
    baseInfoHeader(:baseInfo="baseInfo")
    //- 预警信息
    .warning-tabs(v-loading="loading")
      Tabs(:dataSource="dataSource", :defaultTab="'risk'", @tabCLick="(val) => tabCLick(val)")
      .warning-content
        RiskEvent(:name="baseInfo.name" v-if="currentTab === 'risk'")
        DebtEvent(:name="baseInfo.name" v-if="currentTab === 'debt'")
        Blacklist(:name="baseInfo.name" v-if="currentTab === 'black'")
        .p-btns-main
          el-button(@click='goback' size="small" plain) 返回
</template>
<script>
import baseInfoHeader from '../baseInfoHeader'
import Tabs from '@/components/qjd/tabs'
import useTabs from 'hooks/useTabs'
import RiskEvent from './risk'
import DebtEvent from './debt'
import Blacklist from './blacklist'
import ajaxStore from '@/apis'
import useAsync from 'hooks/useAsync'
import { ref, computed, onMounted } from 'vue-demi'

export default {
  components: {
    Tabs,
    baseInfoHeader,
    RiskEvent,
    DebtEvent,
    Blacklist,
  },
  setup(props, { root }) {
    const { $route: { query: { corporationId, name } }} = root
    const {riskExperts: {customerRiskAdmin: { getCount }}} = ajaxStore
    const thisProjectWarningTabs = ref([])
    const baseInfo = computed(() => (
      {
        corporationId,
        name
      }
    ))
    const tabItem = ref('')
    const { loading, doResult } = useAsync({
      request: getCount,
      successCallBack: ({ code, data }) => {
        if (code === '0') {
          thisProjectWarningTabs.value = [
            { label: '预警信息摘要（' + data?.warnInfo + '）', value: 'risk' },
            { label: '债劵到期信息（' + data?.bondMaturityInfo + '）', value: 'debt' },
            { label: '黑名单信息（' + data?.blacklist + '）', value: 'black' },
          ]
          tabItem.value = ref('risk')
        }
      },
      init: false
    })

    const { dataSource, currentTab, tabCLick } = useTabs({
      dataSource: thisProjectWarningTabs,
      currentTab: 'risk'
    })
    // 返回
    const goback = () => {
      root.$router.go(-1)
    }

    onMounted(() => doResult({companyName: root.$route.query.name}))

    return {
      loading,
      tabItem,
      baseInfo,
      dataSource,
      currentTab,
      tabCLick,
      goback,
    }
  },
}
</script>
<style lang="stylus" scoped>
.warning-tabs
  padding 20px 0
.p-btns-main
  text-align center
  padding 30px 0
  background #fff
</style>
