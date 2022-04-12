<template lang="pug">
.tab-content
  .tab-block.tab-block-2(:class='{"empty--height" : (!echartApi1.length && (echartApi2.xData && !echartApi2.xData.length))}')
    TabCard.tab-45(title='变更类型' isPopover isMore :type='linkType["变更类型"]' :isMoreDisabled='!echartApi1.length')
      template(slot='popover')
        span.popover-text {{ popoverTexts.text1 }}
      EchartPieLine(:dataSource="echartApi1" id='echartApi1' text='变更<br/>类型' v-loading="loading")
    TabCard.tab-55(title='变更趋势' isPopover isMore :type='linkType["变更趋势"]' :isMoreDisabled='echartApi2.xData && !echartApi2.xData.length')
      template(slot='popover')
        span.popover-text {{ popoverTexts.text2 }}
      EchartLine(:dataSource="echartApi2" id='echartApi2' :chartLegend='chartLegend2' :chartYData='chartYData2' v-loading="loading")
  TabCard(title='最近变更' isPopover isMore :type='linkType["最近变更"]' :isMoreDisabled='!tableRecently.length')
    template(slot='popover')
      span.popover-text {{ popoverTexts.text3 }}
    TableRecently(:dataSource='tableRecently' v-loading="loading")
  .tab-block.tab-block-1(:class='{"empty--height" : (!echartApi3.length && (echartApi4.xData && !echartApi4.xData.length))}')
    TabCard.tab-45(title='行政许可类型' isPopover isMore :type='linkType["行政许可类型"]' :isMoreDisabled='!echartApi3.length')
      template(slot='popover')
        span.popover-text {{ popoverTexts.text4 }}
      EchartPieLine(:dataSource="echartApi3" id='echartApi3' text='行政许可<br/>类型' v-loading="loading")
    TabCard.tab-55(title='行政处罚趋势' isPopover isMore :type='linkType["行政处罚趋势"]' :isMoreDisabled='echartApi4.xData && !echartApi4.xData.length')
      template(slot='popover')
        span.popover-text {{ popoverTexts.text5 }}
      EchartBar(:dataSource="echartApi4" id='echartApi4' v-loading="loading")
  .tab-block.tab-block-2(:class='{"empty--height" : ((echartApi5.xData && !echartApi5.xData.length) && (echartApi6.xData && !echartApi6.xData.length))}')
    TabCard(title='经营异常趋势' isPopover isMore :type='linkType["经营异常趋势"]' :isMoreDisabled='echartApi5.xData && !echartApi5.xData.length')
      template(slot='popover')
        span.popover-text {{ popoverTexts.text6 }}
      EchartBar(:dataSource="echartApi5" id='echartApi5' v-loading="loading")
    TabCard(title='动产抵押' isPopover isMore :type='linkType["动产抵押"]' :isMoreDisabled='echartApi6.xData && !echartApi6.xData.length')
      template(slot='popover')
        span.popover-text {{ popoverTexts.text7 }}
      EchartBarLine(:dataSource="echartApi6" :chartLegend='chartLegend6' id='echartApi6' v-loading="loading")
</template>

<script>
// components
import TabCard from '../components/tabCard'
import EchartPieLine from '../components/echarts/echartPieLine'
import EchartLine from '../components/echarts/echartLine'
import EchartBar from '../components/echarts/echartBar'
import EchartBarLine from '../components/echarts/echartBarLine'
import TableRecently from './tableRecently'
// api
import { reactive, toRefs } from '@vue/composition-api'
import ajaxStore from '@/apis'
import useAsync from 'hooks/useAsync'
import { toAmountStr } from '@/utils/util'
import { getEchartPieLineData, getEchartLine2Data, getEchartBarData, getYearXData } from '../util'
import { echartApi1, echartApi2, chartLegend2, chartYData2, echartApi3, chartLegend6, popoverTexts } from './config'
import { linkType } from '../config'
export default {
  components: {
    TabCard,
    EchartPieLine,
    EchartLine,
    EchartBar,
    EchartBarLine,
    TableRecently
  },
  setup(props, {root}) {
    const { corpName } = root.$route.query
    // ajaxStore
    const { customer: { stratify: { stateOfBusiness } } } = ajaxStore
    // state
    const state = reactive({
      init: false,
      tableRecently: [],
      echartApi1: [],
      echartApi2: {},
      echartApi3: [],
      echartApi4: {},
      echartApi5: {},
      echartApi6: {}
    })
    // useAsync
    const { loading } = useAsync({
      request: stateOfBusiness,
      params: { companyName: corpName },
      successCallBack: res => {
        const { code, data } = res
        if (code !== '0') return
        const {changeVOs, lastChangeVOs, punishmentVOs, exceptVOs, diYaVOs } = data || {}
        state.echartApi1 = getEchartPieLineData(data || {}, echartApi1)
        state.echartApi2 = getEchartLine2Data(changeVOs || [], echartApi2)
        state.tableRecently = lastChangeVOs || []
        state.echartApi3 = getEchartPieLineData(data || {}, echartApi3)
        state.echartApi4 = getEchartBarData(punishmentVOs || [], 'times')
        state.echartApi5 = getEchartBarData(exceptVOs || [], 'times')
        state.echartApi6 = getEchartBarLineData(diYaVOs || [])
      }
    })
    /** initEchartApi */
    // 处理EchartBarLine组件数据
    const getEchartBarLineData = (data) => {
      // xData
      const xData = getYearXData(data)
      const yDataList = [[], []]
      data.forEach((item, index) => {
        yDataList[0].push(item.times)
        yDataList[1].push(toAmountStr(item.amount, 2))
      })
      return { xData, yDataList }
    }

    return {
      loading,
      chartLegend2,
      chartYData2,
      chartLegend6,
      linkType,
      popoverTexts,
      ...toRefs(state)
    }
  }
}
</script>

<style lang="stylus" scoped>
@import ('../index.styl')
.tab-block-1
  height 350px
.tab-block-2
  height 435px
</style>
