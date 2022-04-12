<template lang='pug'>
.page-main.value-detail
  //- head
  .page-head
    ValueTabs(current='right')
    ValueSearch(@currentTabHandle='currentTabHandle')
  .vd-content(v-loading='loading')
    template(v-if='$route.query.corpName')
      .page-content(v-if='stage === 3')
        Base(:processId='processId' :industry='industry')
        .tabs-main
          Tabs(type='noBackground' :dataSource="tabsApi.dataSource", :defaultTab="tabsApi.currentTab", @tabCLick="(val) => tabsApi.tabCLick(val)")
          .tabs-item-detail(:class='{"tab-detail-5": tabsApi.currentTab === "tab-5"}')
            Tab1(v-if='tabsApi.currentTab === "tab-1"')
            Tab2(v-if='tabsApi.currentTab === "tab-2"')
            Tab3(v-if='tabsApi.currentTab === "tab-3"')
            Tab4(v-if='tabsApi.currentTab === "tab-4"')
            Tab5(v-if='tabsApi.currentTab === "tab-5" && industry' :industry='industry')
      .vd-loading(v-if='stage === 2')
        img(:src='`${$assetsBaseUrl}/customerGuard/loading.png`')
        .vd-loading__content
          .vd-loading__content-title
            i.el-icon-loading
            span 尊敬的用户您好
          .vd-loading__content-text
            span(v-if='isOld') 因模型调整和系统升级，模型数据正在生成中，请您稍等片刻
            span(v-else) 尊敬的用户您好，模型数据正在生成中，请您稍等片刻
    Empty(v-else)
</template>

<script>
import { reactive, toRefs, watch } from '@vue/composition-api'
import { ddTabs, sourceKeys } from './config'
import ajaxStore from '@/apis'
import { deepCopy } from '@/utils/qjd'
// 组件
import Tabs from '@/components/qjd/tabs'
import ValueTabs from './components/valueTabs'
import ValueSearch from './components/valueSearch'
import Empty from './components/empty'
import Base from './base/index'
import Tab1 from './tab-1'
import Tab2 from './tab-2'
import Tab3 from './tab-3'
import Tab4 from './tab-4'
import Tab5 from './tab-5'
// hooks
import useAsync from 'hooks/useAsync'
import useTabs from 'hooks/useTabs'
import useModel from './hooks/useModel'
import useSearchCompany from './hooks/useSearchCompany'
import useFinance from '../hooks/useFinance'

export default {
  components: {
    Empty,
    Tabs,
    ValueTabs,
    ValueSearch,
    Base,
    Tab1,
    Tab2,
    Tab3,
    Tab4,
    Tab5
  },
  props: {
    current: {
      type: String,
      default: ''
    }
  },
  setup(props, {root}) {
    // state
    const state = reactive({
      processId: '',
      tabsApi: {},
      baseApi: {},
      currentTab: 'tab-1',
      modelApi: {},
      loading: false, // 查询当前企业loading
      isOld: false,
      companyState: {},
      stage: 1, // 3个阶段 1-查询当前企业 2-loading 3-页面渲染
      industry: ''
    })
    // api
    const { risk: { getPageCustomized } } = ajaxStore
    const { customer: { stratify: { enterpriseScore } } } = ajaxStore
    state.companyState = useSearchCompany({
      request: getPageCustomized
    })
    // 基础信息
    state.baseApi = useAsync({ init: false, request: enterpriseScore })
    state.tabsApi = useTabs({ dataSource: ddTabs, currentTab: state.currentTab })
    // methods
    const currentTabHandle = () => {
      state.tabsApi.tabCLick('tab-1')
    }
    // 初始化跑模型
    const initModel = async (val) => {
      state.stage = 1
      state.loading = true
      state.modelApi.initIsModelSuccess(false)
      await state.companyState.doResult({ corpName: val })
      state.loading = false
      const { id, gradeInfo: { status }, modelProcessId } = state.companyState?.companyList[0]
      state.processId = modelProcessId
      await state.baseApi.doResult({ processId: state.processId })
      const result = state.baseApi.result
      let isNull = false
      sourceKeys.forEach(item => {
        if (result[item] === null) isNull = true
      })
      state.isOld = false
      if (status === 0 || status === 1) { // 生成中
        state.stage = 2
        id && state.modelApi.initModel2(id)
      } else if (isNull) { // null数据
        id && state.modelApi.initModel(id)
        state.stage = 2
        state.isOld = true
      } else {
        state.modelApi.initIsModelSuccess(true)
      }
    }
    const initOthers = async (val) => {
      const { data } = await financeDoResult({ fullName: val })
      state.industry = data || ''

      // 处理tabs
      let detailTab = []
      if (state.industry) { // 有行业 代表上市企业
        detailTab = deepCopy(ddTabs)
      } else {
        detailTab = ddTabs.filter(item => {
          return item.value !== 'tab-5'
        })
      }
      // tabs
      state.tabsApi.dataSource = detailTab
      // useModel
      state.modelApi = useModel()
      initModel(root.$route.query.corpName)
    }
    // 是否有行业 - 用来判断是否是上市公司 - 显示finance
    const { doResult: financeDoResult } = useFinance()

    watch(() => root.$route.query.corpName, (val) => {
      if (val) {
        initOthers(val)
      }
    }, {
      immediate: true
    })

    watch(() => state.modelApi.isModelSuccess, (val) => {
      val && (state.stage = 3)
    })

    watch(() => state.modelApi.processId, (val) => {
      val && (state.processId = val)
    })

    return {
      initModel,
      currentTabHandle,
      ...toRefs(state)
    }
  }
}
</script>

<style lang='stylus' scoped>
.value-detail
  display flex
  flex-direction column
.page-head
  display flex
  justify-content: space-between
.tabs-main
  background #fff
  border-radius 5px
  border 1px solid #EAEBEE
.tabs-item-detail
  padding 20px
  background #fff
.tab-detail-5
  padding 0
.vd-content
  height 0
  flex 1
  background #fff
.page-content
  height 100%
// loading
.vd-loading
  height 100%
  color #494949
  background #fff
  display flex
  flex-direction column
  justify-content center
  align-items center
  .vd-loading__content-title
    margin-bottom 10px
    font-size 14px
    font-weight 500
    text-align: center
    i
      margin-right 5px
  .vd-loading__content-text
    font-size 12px
    color #999
</style>
<style lang="stylus">
.value-detail
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
          color #3B68F0
          border-bottom 1px solid #ffffff
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
          width 145px
</style>
