<template lang="pug">
.page-main
  .p-header
    //- 导航Tab切换
    Tabs(page='realEstateDetail')
    //- 主搜索框
    MainSearch
  //- 导航定位
  Nav(:refs='refs')
  .p-module-title(ref='panel-0')
    span
      span.page-title 基本信息
      el-button.p-btn-apply(type='text' @click='clickApplyReport') 申请电子报告
    .p-update-time
      .p-tip-text 数据更新于：{{getYesterday()}}
      .p-tip-text(v-if='baseResult && baseResult.stockMarket') 涉及财报数据更新于：{{toDateStr(baseResult.reportDate, 'yyyy年MM月dd日')}}
  .p-module-flex.p-module-margin-bottom
    .p-list-left.p-module-baseInfo-left
      //- 基本信息
      BaseInfo(:dataSource='baseResult' :loading='baseLoading' :companyName='companyName')
    .p-list-right.p-module-baseInfo-right
      //- 三条红线标准
      RedLine(:companyName='companyName')
  .p-module-flex.p-module-margin-bottom
    //- 机构评级
    .p-list-left.p-module-baseInfo-left
      RatingAgencies(:dataSource='baseResult' :loading='baseLoading')
    .p-list-right.p-module-baseInfo-right
      //- 累计拿地金额/累计销售金额
      SaleBar.p-module-margin-bottom(:dataSource='saleResult || []' :loading='saleLoading')
      //- 近三年经营活动现金流是否为负
      CashFlow(:dataSource='financeResult' :loading='financeLoading')
  .p-module-main
    //- 股东结构
    ShareHolder(:companyName='companyName')
  .page-title.p-module-title(ref='panel-1') 业务分析
  .p-module-main
    //- 销售数据/拿地数据
    SaleTable(:dataSource='saleResult || []' :loading='saleLoading')
  .p-module-flex
    //- 销售金额/拿地金额趋势
    SaleMoneyChart(:dataSource='saleResult || []')
    //- 销售面积/拿地面积趋势
    SaleAreaChart(:dataSource='saleResult || []')
  //- 项目数据
  ProjectChart(:companyName='companyName')
  .page-title.p-module-title(ref='panel-2')
    .p-finance-title
      span 财务分析
      .p-btn-switch(v-if='financeShow' @click='switchFinance')
        span 收起
        i.el-icon-arrow-up
      .p-btn-switch(v-else @click='switchFinance')
        span 展开
        i.el-icon-arrow-down
  //- 关键财务数据
  .p-finance-main(v-show='financeShow')
    FinanceTable(:dataSource='financeResult' :loading='financeLoading')
    .p-module-flex
      //- 盈利能力
      ProfitabilityChart(:dataSource='financeResult' :loading='financeLoading')
      //- 经营效率
      EfficiencyChart(:dataSource='financeResult' :loading='financeLoading')
    .p-module-flex
      //- 流动性
      MobilityChart(:dataSource='financeResult' :loading='financeLoading')
      //- 偿债能力
      SolvencyChart(:dataSource='financeResult' :loading='financeLoading')
  .page-title.p-module-title(ref='panel-3') 新闻舆情
  // 新闻舆情
  NewsPublicOpinion(:companyName='companyName')
  .page-title.p-module-title(ref='panel-4') 企业风险
  //- 股权质押-数据概览
  // StockPledgeRiskCard(:companyName='companyName')
  //- 司法风险-数据概览
  RiskDistributionRiskCard(:companyName='companyName')
  //- 舆情风险
  RiskList(:companyName='companyName' :riskConfigTabs='riskConfigTabs')
</template>

<script>
import { reactive, toRefs, ref, getCurrentInstance, onMounted, watch } from '@vue/composition-api'
import Tabs from '../components/tabs'
import MainSearch from '../components/mainSearch'
import Card from '@/components/Card'
import Nav from './nav'
import BaseInfo from './baseInfo/index'
import RedLine from './redLine'
import RatingAgencies from './ratingAgencies/index'
import SaleBar from './saleBar'
import ShareHolder from './shareHolder'
import SaleTable from './saleTable'
import CashFlow from './cashFlow'
import SaleMoneyChart from './saleMoneyChart'
import SaleAreaChart from './saleAreaChart'
import ProjectChart from './projectChart'
import FinanceTable from './financeTable'
import ProfitabilityChart from './profitabilityChart'
import EfficiencyChart from './efficiencyChart'
import MobilityChart from './mobilityChart'
import SolvencyChart from './solvencyChart'
import RiskDistributionRiskCard from './riskDistributionRiskCard'
import StockPledgeRiskCard from './stockPledgeRiskCard'
import NewsPublicOpinion from './newsPublicOpinion'
import ajaxStore from '@/apis'
import RiskList from '../components/riskList/index'
import useSale from '../hooks/useSale'
import useBaseInfo from '../hooks/useBaseInfo'
import useFinance from '../hooks/useFinance'
import useAsync from 'hooks/useAsync'
import { riskConfigTabs } from './config'
import { toDateStr } from '@/utils/util'
import { weblogsDom } from '@/utils/qjd/weblogs'
import useRealEstateList from '../hooks/useRealEstateList'
export default {
  components: { Card, Tabs, MainSearch, Nav, BaseInfo, RedLine, ShareHolder, RiskList, SaleTable, SaleMoneyChart, SaleAreaChart, ProjectChart, FinanceTable, ProfitabilityChart, EfficiencyChart, MobilityChart, SolvencyChart, RiskDistributionRiskCard, StockPledgeRiskCard, RatingAgencies, SaleBar, CashFlow, NewsPublicOpinion },

  setup(props, { root }) {
    const refs = ref(null)
    refs.value = getCurrentInstance().refs

    const state = reactive({
      defaultCompany: '万科企业股份有限公司',
      companyName: '',
      financeShow: true
    })

    const { getCompanyList, realEstateList } = useRealEstateList()

    if (realEstateList.value && realEstateList.value.length) { state.defaultCompany = realEstateList.value[0] }

    const getYesterday = () => {
      const day1 = new Date()
      day1.setTime(day1.getTime() - 24 * 60 * 60 * 1000)
      return day1.getFullYear() + '年' + (day1.getMonth() + 1) + '月' + day1.getDate() + '日'
    }

    const { applyReport } = ajaxStore.factoryService.realEstate

    const { doResult } = useAsync({
      request: applyReport,
      init: false,
      callback: res => {
        const { data: { code } } = res
        return {
          data: code === '0'
        }
      }
    })

    // 申请电子报告
    const clickApplyReport = () => {
      root.$confirm('是否确认申请电子报告？', '提示', {
        type: 'warning',
        beforeClose: async (action, instance, done) => {
          if (action === 'confirm') {
            instance.confirmButtonLoading = true
            doResult({
              companyName: state.companyName
            }).then(val => {
              instance.confirmButtonLoading = false
              if (val) {
                done()
              }
            }).catch((e) => {
              console.log(e, 'error')
            })
            // 埋点
            weblogsDom('开发商评估-开发商详情-申请电子报告-确认')
          } else {
            done()
          }
        }
      }).then(() => {
        root.$confirm('立即前往查看？', '电子报告申请成功', {
          type: 'success'
        }).then(() => {
          root.$router.push({ name: 'myRealEstateReport' })
        }).catch((e) => {
          console.log('cancel')
        })
      }).catch(() => {
        console.log('cancel')
        // 埋点
        weblogsDom('开发商评估-开发商详情-申请电子报告-取消')
      })
    }

    // 隐藏显示财务数据
    const switchFinance = () => {
      state.financeShow = !state.financeShow
    }

    // 获取基本信息
    const { loading: baseLoading, result: baseResult, doResult: baseDoResult } = useBaseInfo({companyName: state.companyName})

    // 设置销售数据/拿地数据
    const { loading: saleLoading, result: saleResult, doResult: saleDoResult } = useSale()

    // 设置关键财务数据
    const { loading: financeLoading, financeData: financeResult, doResult: financeDoResult } = useFinance()

    watch(
      () => financeResult.value,
      (value) => {
        if (JSON.stringify(value) === '{}') {
          state.financeShow = false
        }
      }
    )

    const setDefaultCompany = async () => {
      let { companyName } = root.$route.query
      await getCompanyList()
      if (realEstateList.value && realEstateList.value.length) {
        state.defaultCompany = realEstateList.value[0]
        if (realEstateList.value.join().indexOf(companyName) === -1) {
          companyName = state.defaultCompany
        }
      }
      state.companyName = companyName || state.defaultCompany
    }

    onMounted(
      async () => {
        await setDefaultCompany()

        baseDoResult({
          companyName: state.companyName
        })
        saleDoResult({
          companyName: state.companyName
        })
        financeDoResult({
          companyName: state.companyName
        })
        // window.layoutScrollbar.wrap.scrollTo(0, 0)
      }
    )
    return {
      getYesterday,
      clickApplyReport,
      baseLoading,
      baseResult,
      saleLoading,
      saleResult,
      financeLoading,
      financeResult,
      riskConfigTabs,
      refs,
      toDateStr,
      switchFinance,
      ...toRefs(state)
    }
  }
}
</script>

<style lang="stylus" scoped>
.p-header
  display flex
  justify-content space-between
.p-module-title
  font-size 18px
  margin 35px 0 20px 0
  display flex
  justify-content space-between
.p-btn-apply
  margin-left 15px
.p-tip-text
  font-size 12px
  color #494949
  text-align right
.p-module-flex
  display flex
  width 100%
  .p-module-main
    margin 0 20px 0 0
  .p-module-main:last-child
    margin-right 0
.p-list-left,
.p-list-right
  display flex
  width 50%
  flex-wrap wrap
.p-module-main
  background #fff
  width 100%
  border-radius 10px
.p-link
  color #409eff
  cursor pointer
.p-module-baseInfo-left
  min-width 420px
  width 40%
  margin-right 10px
.p-module-baseInfo-right
  width 60%
.p-card
  margin-right 10px
  margin-bottom 10px
.p-card:last-child
  margin-right 0
.p-module-margin-bottom
  margin-bottom 10px
.p-finance-title
  display flex
  justify-content space-between
  width 100%
  .p-btn-switch
    font-size 12px
    color #3B68F0
    background #ffffff
    padding 2px 10px 2px 16px
    cursor pointer
    i
      color #9AA6B8
      margin-left 5px
</style>
