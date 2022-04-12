<template lang="pug">
Card(noTitle noWrap).p-news
  Tabs(:dataSource="dataSource", :defaultTab="'hotWords'", @tabCLick="(val) => tabCLick(val)" type='noBackground')
  HotWords(:companyName='companyName')
  //- 新闻舆情模块
  .news-content
    NewsPublicOpinion(:companyName='companyName' :pageSize='4')
</template>

<script>
import Card from '@/components/Card'
import Tabs from '@/components/qjd/tabs'
import useTabs from 'hooks/useTabs'
import { newsPublicTabs } from './config'
import NewsPublicOpinion from '../components/riskList/newsPublicOpinion'
import HotWords from '../RealEstateDetail/newsPublicChart/hotWords'
export default {
  props: {
    companyName: {
      type: String
    }
  },
  components: { Card, Tabs, NewsPublicOpinion, HotWords },
  setup(props) {
    const { dataSource, currentTab, tabCLick } = useTabs({
      dataSource: newsPublicTabs,
      currentTab: 'hotWords'
    })

    return {
      dataSource,
      currentTab,
      tabCLick
    }
  }
}
</script>

<style lang="stylus" scoped>
.p-news
  padding 5px 20px
</style>
