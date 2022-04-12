<template lang="pug">
.enterprise-detail(v-loading='baseLoading')
  //- 头部公用
  Top(:moduleRefs='moduleRefs' :triggerClick='triggerClick')
  .tabs-main
    Tabs(type='noBackground' :dataSource="tabApi.dataSource", :defaultTab="tabApi.currentTab", @tabCLick="(val) => tabApi.tabCLick(val)")
    .tabs-item-detail
      //- 企业速览
      Home(v-if='tabApi.currentTab === "home"')
      //- 基本信息
      Base(v-if='tabApi.currentTab === "base"')
      //- 关联
      Relation(v-if='tabApi.currentTab === "relation"' :showChart='setChartTab')
      //- 经营
      Management(v-if='tabApi.currentTab === "management"')
      //- 涉诉
      Litigation(v-if='tabApi.currentTab === "litigation"')
      //- 财务分析
      Finance(v-if='tabApi.currentTab === "finance"')
      //- 新闻舆情
      News(v-if='tabApi.currentTab === "news"')
  .chart-main(v-if='chartTab')
    .chart-top
      .chart-btn(@click='setChartTab("")') &lt; 返回
    //- 企业关系图谱
    RelationMap(:rootCompanyName='companyName' :regCode='creditCode' v-if='chartTab === "relationMap"')
    //- 股权穿透图
    RelatedCompany(:companyName='companyName' v-if='chartTab === "relatedCompany"')
    //- 企业关系查询
    RelationQuery(:companyName='companyName' v-if='chartTab === "relationQuery"')
  RelationQueryDialog(:companyName='companyName' v-if='chartTab === "relationQuery"')
</template>

<script>
import Top from './top'
import { provide, inject, reactive, toRefs, ref } from '@vue/composition-api'
import Tabs from '@/components/qjd/tabs'
import useTabs from 'hooks/useTabs'
import { detailTabs } from './config'
import ajaxStore from '@/apis'
import useAsync from 'hooks/useAsync'
import Home from './home'
import Base from './base'
import Relation from './relation'
import Management from './management'
import Litigation from './litigation'
import Finance from './finance'
import News from './news'
import RelationMap from './charts/relationMap'
import RelatedCompany from './charts/relatedCompany'
import RelationQuery from './charts/relationQuery'
import RelationQueryDialog from './charts/relationQuery/dialog'
import { deepCopy } from '@/utils/qjd'
import useFinance from '../hooks/useFinance'
export default {
  components: {
    Top,
    Tabs,
    Home,
    Base,
    Relation,
    Management,
    Litigation,
    Finance,
    News,
    RelationMap,
    RelatedCompany,
    RelationQuery,
    RelationQueryDialog
  },
  setup(props, { root, emit }) {
    provide('companyName', root.$route.query.companyName)
    provide('creditCode', root.$route.query.creditCode)

    const state = reactive({
      moduleRefs: null,
      companyName: inject('companyName'),
      creditCode: inject('creditCode'),
      chartTab: '',
      companyStateApi: null,
      tabApi: {}
    })

    const setChartTab = (tab) => {
      state.chartTab = tab
      window.layoutScrollbar.wrap.scrollTo({
        top: 0,
        behavior: 'smooth'
      })
    }

    const triggerClick = (value) => {
      if (!value) return
      state.currentTab = value
      state.tabApi.tabCLick(value)
    }

    const { getCompanyPortraitDetail } = ajaxStore.customer.enterprise

    const { loading: baseLoading, result: baseInfo } = useAsync({
      request: getCompanyPortraitDetail,
      params: {
        companyName: inject('companyName'),
        creditCode: inject('creditCode'),
      },
      callback: (res) => {
        const { data: { code, data }} = res
        const companyBaseBO = data?.companyBaseBO
        if (code === '0' && data) {
          if (companyBaseBO && companyBaseBO.businessScope.length > 100) {
            companyBaseBO.needOpen = true
            companyBaseBO.businessScopeLimit = companyBaseBO.businessScope.substr(0, 100)
          }
          data.companyBaseBO = companyBaseBO
          return {
            data
          }
        } else {
          return {
            data: {}
          }
        }
      }
    })

    // 是否有行业 - 用来判断是否是上市公司 - 显示finance
    const industry = ref('')
    const { doResult: financeDoResult } = useFinance()
    financeDoResult({fullName: root.$route.query.companyName}).then((res) => {
      const { data } = res
      industry.value = data

      let detailTab = []
      if (industry.value) { // 有行业 代表上市企业
        detailTab = deepCopy(detailTabs)
      } else {
        detailTab = detailTabs.filter(item => {
          return item.value !== 'finance'
        })
      }
      state.tabApi = useTabs({ dataSource: detailTab, currentTab: 'home' })
    })

    provide('baseInfo', {
      loading: baseLoading,
      result: baseInfo
    })
    return {
      baseLoading,
      triggerClick,
      setChartTab,
      ...toRefs(state)
    }
  }
}
</script>
<style lang="stylus">
.enterprise-detail
  .p-tabs-background-line
    padding 0
  .el-tabs__active-bar
    height 0
  .p-tabs-background-line
    .u-header-tablist
      border-bottom none
      .el-tabs__header
        border-bottom 1px solid #F0F0F0
        .el-tabs__nav
          display flex
          width 100%
        .el-tabs__active-bar
          border-bottom none
        .el-tabs__item.is-active
          border-bottom 1px solid #ffffff
          color #3B68F0
        .el-tabs__item:hover
          color #3B68F0
          border-bottom 1px solid #F0F0F0
        .el-tabs__item.is-active:hover
          border-bottom 1px solid #ffffff
        .el-tabs__item
          color #2D2926
          font-size 16px
          height 50px
          line-height 50px
          border-right 1px solid #F0F0F0
          border-bottom 1px solid #F0F0F0
          padding 0 50px
          width 100%
</style>

<style lang="stylus" scoped>
.enterprise-detail
  position relative
  min-width 800px
  margin 0 30px
  padding-bottom 50px
  .tabs-main
    background #ffffff
    border 1px solid #EAEBEE
    .tabs-item-detail
      background #ffffff
.chart-main
  position absolute
  left 0
  top 0
  background #ffffff
  height 100%
  z-index 999
  width 100%
  overflow hidden
  .chart-top
    margin-bottom 20px
    padding 20px
    .chart-btn
       color #3B68F0
       font-size 14px
       cursor pointer
</style>
