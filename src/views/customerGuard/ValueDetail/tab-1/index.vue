<template lang="pug">
.tab-content
  TabCard(title='工商信息' isMore :type='linkType["工商信息"]' :isMoreDisabled='!baseData.length')
    TableBase(:data='baseData' v-loading='baseLoading')
  TabCard(title='股权信息' isMore :type='linkType["股权信息"]' :isMoreDisabled='!stockData.length')
    TableStock(:data='stockData' v-loading='baseLoading')
  TabCard(title='主要成员TOP10' isMore :type='linkType["主要成员TOP10"]' :isMoreDisabled='!topData.length')
    TableTop(:data='topData' v-loading='baseLoading')
  .tab-block.tab-block--height(:class='{"empty--height" : (!echartPieData.length && isEmpty)}')
    TabCard(title='关联股权穿透数量' isPopover isMore :type='linkType["关联股权穿透数量"]' :isMoreDisabled='!echartPieData.length')
      template(slot='popover')
        span.popover-text {{ popoverTexts.text1 }}
      template(slot='headRight')
        el-select(v-model='dir' style='width:100%' @change='changeRelation(dir)')
          el-option(v-for='item in relationList' :label='item.label' :value='item.value' :key='item.Value')
      StockRelation(:dataSource="echartPieData" v-loading='gqctLoading')
    TabCard(title='股权分散程度' isPopover isMore :type='linkType["股权分散程度"]' :isMoreDisabled='isEmpty')
      template(slot='popover')
        span.popover-text {{ popoverTexts.text2 }}
      StockRatio(:dataSource="standardDiviation" :isEmpty='isEmpty' v-loading='baseLoading')
</template>

<script>
// 组件
import TabCard from '../components/tabCard'
import TableBase from './tableBase'
import TableStock from './tableStock'
import TableTop from './tableTop'
import StockRelation from './stockRelation'
import StockRatio from './stockRatio'
// hooks
import useAsync from 'hooks/useAsync'
// import useRelation from './useRelation'
// otehr
import ajaxStore from '@/apis'
import { reactive, toRefs, watch } from '@vue/composition-api'
import { deepCopy } from '@/utils/qjd'
import { relationList, baseInfoColumns, echartPieApi, popoverTexts } from './config'
import { linkType } from '../config'

export default {
  components: {
    TabCard,
    TableBase,
    TableStock,
    TableTop,
    StockRelation,
    StockRatio
  },
  setup(props, {root}) {
    // ajaxStore
    const { customer: { stratify: { tycCompanyBase, tycGqct } } } = ajaxStore
    const state = reactive({
      // 上下层关联
      dir: 'up',
      mainApi: {},
      relationApi: {},
      baseData: [], // 基础信息
      stockData: [], // 股权信息
      topData: [], // 主要成员TOP10
      echartPieData: [],
      standardDiviation: 0,
      isEmpty: false
    })
    // 获取企业名称及诚信信息
    const { loading: baseLoading, doResult: baseResult } = useAsync({
      init: false,
      request: tycCompanyBase,
      successCallBack: res => {
        const { code, data } = res
        if (code !== '0') return
        const { holders, tycStaffVOs, standardDiviation } = data || {}
        state.baseData = initBaseData(data || {})
        state.stockData = holders || []
        state.topData = tycStaffVOs || []
        state.isEmpty = isEmptyHandle(standardDiviation)
        state.standardDiviation = Math.round(standardDiviation) || 0
      }
    })
    // 获取企业名称及诚信信息
    const { loading: gqctLoading, doResult: gqctResult } = useAsync({
      init: false,
      request: tycGqct,
      successCallBack: res => {
        const { code, data } = res
        if (code !== '0') return
        state.echartPieData = pieDataHandle(data || {}, echartPieApi)
      }
    })
    // methods
    const pieDataHandle = (data, apis) => {
      const arr = Object.values(data).filter(value => (value || value === 0))
      if (!arr.length) return []
      if (arr.length) {
        apis.forEach(item => {
          item.value = (data && data[item.key]) || 0
        })
        return deepCopy(apis)
      }
    }
    const isEmptyHandle = (data) => {
      if (!data && data !== 0) {
        return true
      } else {
        return false
      }
    }
    const initBaseData = (data) => {
      // 区分是否为空
      if (!data.legalPersonName && !data.estiblishTime) return []
      const info = {}
      baseInfoColumns.forEach(item => {
        info[item.key] = data[item.key] || '-'
      })
      return [info]
    }
    // 切换股权穿透上下层
    const changeRelation = (dir) => {
      const { corpName } = root.$route.query
      gqctResult({ companyName: corpName, dir })
    }
    const initData = (val) => {
      baseResult({ companyName: val})
      gqctResult({ companyName: val, dir: state.dir })
    }

    watch(() => root.$route.query.corpName, (val) => {
      val && initData(val)
    }, {
      immediate: true
    })

    return {
      baseLoading,
      gqctLoading,
      relationList,
      linkType,
      changeRelation,
      popoverTexts,
      ...toRefs(state)
    }
  }
}
</script>

<style lang="stylus" scoped>
@import ('../index.styl')
.tab-block--height
  height 264px
/deep/ .tab-block--height .tab-card__content
  padding 20px
</style>
