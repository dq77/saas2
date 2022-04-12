<template lang="pug">
.page-main
  .p-header(v-if='mode === "follow"')
    Tabs(page='realEstateMyFollow')
    MainSearch
  .page-title.p-module-title.p-first-title.p-header-search
    span 数据概览
    MainSearch.p-search-main(v-if='mode === "all"')
  .p-module-flex
    //- 年度销售额排名
    Top(:mode='mode' :refresh='topRefresh')
    //- 三条红线对比
    ThreeLineCompare(:mode='mode' :refresh='threeRedLineRefresh' v-if='mode === "follow"')
    //- 舆情预警
    // Sentiment(:mode='mode' :refresh='sentimentRefresh' v-if='mode === "all"')
    //- 开发商风险榜单
    DeveloperRiskList(:mode='mode' :refresh='sentimentRefresh' v-if='mode === "all"')
    //- 行业舆情预警日报
    DailyReport(:mode='mode' :refresh='dailyRefresh' v-if='mode === "all"')
    //- 新闻资讯预警
    // News(:mode='mode' :refresh='newsRefresh' v-else)
  .page-title.p-module-title 业务概览
  .p-module-flex
    //- 销售TOP5
    SaleChart(:mode='mode' :refresh='saleRefresh')
    //- 拿地TOP5
    LandTakenChart(:mode='mode' :refresh='landTakenRefresh')
  .p-module-flex
    //- 资产负债TOP5
    AssetsLiabilitiesChart(:mode='mode' :refresh='assetsLiabilitiesRefresh')
    //- 净利润负债率TOP5
    NetProfitDebtRatioChart(:mode='mode' :refresh='netProfitDebtRatioRefresh')
  .page-title.p-module-title(v-if='mode === "all"') 百强列表
  .page-title.p-module-title(v-else) 关注企业列表
  RealEstateList(@changeFollow='changeFollow' :mode='mode')
  RecommendFollow(@changeFollow='changeFollow' v-if='mode === "follow"')
</template>

<script>
import { reactive, toRefs } from '@vue/composition-api'
import SearchAutoCompanyName from '@/components/SearchAutoCompanyName'
import { deepCopy } from '@/utils/qjd'
import Tabs from '../components/tabs'
import MainSearch from '../components/mainSearch'
import useFollow from '../hooks/useFollow'
import RecommendFollow from './recommendFollow'
import RealEstateList from './realEstateList'
import Top from './top'
// import Sentiment from './sentiment'
import DeveloperRiskList from './developerRiskList'
import News from './news'
import DailyReport from './dailyReport'
import { businessChartOptions } from './config'
// import { clearCharts } from './utils'
import SaleChart from './saleChart'
import LandTakenChart from './landTakenChart'
import AssetsLiabilitiesChart from './assetsLiabilitiesChart'
import NetProfitDebtRatioChart from './netProfitDebtRatioChart'
import ThreeLineCompare from './threeLineCompare'
export default {
  components: {
    SearchAutoCompanyName,
    Tabs,
    MainSearch,
    RecommendFollow,
    RealEstateList,
    Top,
    // Sentiment,
    DeveloperRiskList,
    News,
    DailyReport,
    SaleChart,
    LandTakenChart,
    AssetsLiabilitiesChart,
    NetProfitDebtRatioChart,
    ThreeLineCompare
  },

  setup(props, { root }) {
    const state = reactive({
      topRefresh: false,
      threeRedLineRefresh: false,
      sentimentRefresh: false,
      dailyRefresh: false,
      newsRefresh: false,
      saleRefresh: false,
      landTakenRefresh: false,
      assetsLiabilitiesRefresh: false,
      netProfitDebtRatioRefresh: false,
      mode: '',
      chartOptions: deepCopy(businessChartOptions),
    })

    const {
      followCompanyList,
      getFollowCompanyList
    } = useFollow()

    const changeFollow = async (isInit) => {
      await getFollowCompanyList({cache: true})
      if (state.mode === 'follow' && !followCompanyList.value.length) {
        // 初始化配置项
        state.chartOptions = deepCopy(businessChartOptions)
      } else if (state.mode === 'follow' || isInit) {

      }
      // 刷新年度销售额排名
      state.topRefresh = !state.topRefresh
      // 刷新三条红线对比
      state.threeRedLineRefresh = !state.threeRedLineRefresh
      // 刷新舆情预警
      state.sentimentRefresh = !state.sentimentRefresh
      // 刷新新闻资讯预警
      state.newsRefresh = !state.newsRefresh
      // 刷新重大舆情日报预警
      state.dailyRefresh = !state.dailyRefresh
      // 刷新销售TOP5
      state.saleRefresh = !state.saleRefresh
      // 刷新拿地TOP5
      state.landTakenRefresh = !state.landTakenRefresh
      // 刷新资产负债TOP5
      state.assetsLiabilitiesRefresh = !state.assetsLiabilitiesRefresh
      // 刷新净利润负债率TOP5
      state.netProfitDebtRatioRefresh = !state.netProfitDebtRatioRefresh
    }

    const init = async () => {
      await getFollowCompanyList({cache: true})
      state.mode = root.$route.name === 'realEstateMyFollow' ? 'follow' : 'all'
      changeFollow(true)
    }

    init()

    return {
      changeFollow,
      ...toRefs(state)
    }
  },
}
</script>

<style lang="stylus" scoped>
.p-header-search
  display flex
  align-items center
  justify-content space-between
  line-height 42px
  .p-search-main
    font-size 12px
    font-weight normal
.p-header
  display flex
  justify-content space-between
.p-module-title
  margin 30px 0 20px 0
.p-first-title
  margin-top 0
.p-module-flex
  display flex
.p-card
  margin-right 10px
  margin-bottom 10px
  min-width 0
  /deep/.card-title_text
    margin-left 20px
.p-card:last-child
  margin-right 0
</style>
