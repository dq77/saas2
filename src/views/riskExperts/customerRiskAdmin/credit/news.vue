<template lang="pug">
.page-main
  .credit-news
    //- 基础信息
    baseInfoHeader(:baseInfo="baseInfo")
    //- 舆情信息
    .credit-news-tabs
      Tabs(:dataSource="dataSource", :defaultTab="'risk'", @tabCLick="(val) => tabCLick(val)")
      .credit-news-content
        RiskEvent(:name="baseInfo.name" v-if="currentTab === 'risk'")
        NewsPublicOpinion(:name="baseInfo.name" v-if="currentTab === 'news'")
        .p-btns-main
          el-button(@click='goback' size="small" plain) 返回
</template>
<script>
import baseInfoHeader from '../baseInfoHeader'
import Tabs from '@/components/qjd/tabs'
import useTabs from 'hooks/useTabs'
import { creditNewsTabs } from '../config'
import RiskEvent from './risk'
import NewsPublicOpinion from './newsPublic'
import { ref, computed } from 'vue-demi'

export default {
  components: {
    Tabs,
    baseInfoHeader,
    RiskEvent,
    NewsPublicOpinion
  },
  setup(props, { root }) {
    const { $route: { query: { corporationId, name } }} = root
    const baseInfo = computed(() => (
      {
        corporationId,
        name
      }
    ))

    const tabItem = ref('risk')
    const { dataSource, currentTab, tabCLick } = useTabs({
      dataSource: creditNewsTabs,
      currentTab: 'risk'
    })
    // 返回
    const goback = () => {
      root.$router.go(-1)
    }

    return {
      tabItem,
      baseInfo,
      goback,
      dataSource,
      currentTab,
      tabCLick,
    }
  },
}
</script>
<style lang="stylus" scoped>
.credit-news-tabs
  padding 20px 0
.p-btns-main
  text-align center
  padding 30px 0
  background #fff
</style>
