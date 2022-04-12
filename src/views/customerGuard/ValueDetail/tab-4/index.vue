<template lang="pug">
.tab-content
  .tab-block.tab-block-1(:class='{"empty--height" : ((echartApi1.xData && !echartApi1.xData.length) && (echartApi2.xData && !echartApi2.xData.length))}')
    TabCard.tab-45(title='税务评级分布' isPopover isMore :type='linkType["税务评级分布"]' :isMoreDisabled='echartApi1.xData && !echartApi1.xData.length')
      template(slot='popover')
        span.popover-text {{ popoverTexts.text1 }}
      EchartBar(:dataSource="echartApi1" id='echartApi1' type='category' v-loading="loading")
    TabCard.tab-55(title='税收违法趋势' isPopover isMore :type='linkType["税收违法趋势"]' :isMoreDisabled='echartApi2.xData && !echartApi2.xData.length')
      template(slot='popover')
        span.popover-text {{ popoverTexts.text2 }}
      EchartBar(:dataSource="echartApi2" id='echartApi2' v-loading="loading")
  .tab-block.tab-block-2(:class='{"empty--height" : ((echartApi3.xData && !echartApi3.xData.length) && (echartApi4.xData && !echartApi4.xData.length))}')
    TabCard.tab-45(title='被执行次数及标的' isPopover isMore :type='linkType["被执行次数及标的"]' :isMoreDisabled='echartApi3.xData && !echartApi3.xData.length')
      template(slot='popover')
        span.popover-text {{ popoverTexts.text3 }}
      EchartBarLine(:dataSource="echartApi3" :chartLegend='chartLegend3' id='echartApi3' v-loading="loading")
    TabCard.tab-55(title='执行法院top10' isPopover isMore :type='linkType["执行法院top10"]' :isMoreDisabled='echartApi4.xData && !echartApi4.xData.length')
      template(slot='popover')
        span.popover-text {{ popoverTexts.text4 }}
      EchartBar(:dataSource="echartApi4" id='echartApi4' v-loading="loading")
  .tab-block.tab-block-1(:class='{"empty--height" : (!echartApi5.length && (echartApi6.xData && !echartApi6.xData.length))}')
    TabCard.tab-45(title='失信履行' isPopover isMore :type='linkType["失信履行"]' :isMoreDisabled='!echartApi5.length')
      template(slot='popover')
        span.popover-text {{ popoverTexts.text5 }}
      EchartPieLine(:dataSource="echartApi5" id='echartApi5' text='失信<br/>履行' v-loading="loading")
    TabCard.tab-55(title='失信趋势' isPopover isMore :type='linkType["失信趋势"]' :isMoreDisabled='echartApi6.xData && !echartApi6.xData.length')
      template(slot='popover')
        span.popover-text {{ popoverTexts.text6 }}
      EchartBar(:dataSource="echartApi6" id='echartApi6' v-loading="loading")
  .tab-block.tab-block-1(:class='{"empty--height" : ((echartApi7.xData && !echartApi7.xData.length) && (echartApi8.xData && !echartApi8.xData.length))}')
    TabCard.tab-45(title='限制高消费趋势' isPopover isMore :type='linkType["限制高消费趋势"]' :isMoreDisabled='echartApi7.xData && !echartApi7.xData.length')
      template(slot='popover')
        span.popover-text {{ popoverTexts.text7 }}
      EchartLine(:dataSource="echartApi7" id='echartApi7' :chartLegend='chartLegend7' :chartYData='chartYData7' v-loading="loading")
    TabCard.tab-55(title='失信法院top10' isPopover isMore :type='linkType["失信法院top10"]' :isMoreDisabled='echartApi8.xData && !echartApi8.xData.length')
      template(slot='popover')
        span.popover-text {{ popoverTexts.text8 }}
      EchartBar(:dataSource="echartApi8" id='echartApi8' v-loading="loading")
  .tab-block.tab-block-2(:class='{"empty--height" : ((echartApi9.xData && !echartApi9.xData.length) && (echartApi10.xData && !echartApi10.xData.length))}')
    TabCard.tab-45(title='终本案件趋势' isPopover isMore :type='linkType["终本案件趋势"]' :isMoreDisabled='echartApi9.xData && !echartApi9.xData.length')
      template(slot='popover')
        span.popover-text {{ popoverTexts.text9 }}
      EchartBar(:dataSource="echartApi9" id='echartApi9' v-loading="loading")
    TabCard.tab-55(title='终本执行金额' isPopover isMore :type='linkType["终本执行金额"]' :isMoreDisabled='echartApi10.xData && !echartApi10.xData.length')
      template(slot='popover')
        span.popover-text {{ popoverTexts.text10 }}
      EchartBar2(:dataSource="echartApi10" id='echartApi10' :chartLegend='chartLegend10' :chartYData='chartYData10' v-loading="loading")
</template>

<script>
// components
import TabCard from '../components/tabCard'
import EchartLine from '../components/echarts/echartLine'
import EchartBar from '../components/echarts/echartBar'
import EchartBarLine from '../components/echarts/echartBarLine'
import EchartPieLine from '../components/echarts/echartPieLine'
import EchartBar2 from '../components/echarts/echartBar2'
// hooks
import useAsync from 'hooks/useAsync'
// other
import ajaxStore from '@/apis'
import { reactive, toRefs } from '@vue/composition-api'
import { toAmountStr } from '@/utils/util'
import { getEchartLineData, getEchartBarData, getYearXData, getEchartTop10Data, getEchartPieLineData } from '../util'
import { chartLegend1, chartYData1, chartLegend3, echartApi5, chartLegend7, chartYData7, chartLegend10, chartYData10, popoverTexts } from './config'
import { linkType } from '../config'

export default {
  components: {
    TabCard,
    EchartLine,
    EchartBar,
    EchartBarLine,
    EchartPieLine,
    EchartBar2
  },
  setup(props, {root}) {
    // route
    const { corpName } = root.$route.query
    // ajaxStore
    const { customer: { stratify: { credit } } } = ajaxStore
    // state
    const state = reactive({
      echartApi1: {},
      echartApi2: {},
      echartApi3: {},
      echartApi4: {},
      echartApi5: [],
      echartApi6: {},
      echartApi7: {},
      echartApi8: {},
      echartApi9: {},
      echartApi10: {}
    })
    // useAsync
    const { loading } = useAsync({
      request: credit,
      params: { companyName: corpName },
      successCallBack: res => {
        const { code, data } = res
        if (code !== '0') return
        const { pingJi, weiFa, beiZhiXings, adsKhGaoyuanZhixingYwTop10VOs, shiXins, xianGaos, adsKhGaoyuanShixinYwTop10VOs, zhongBens, zhongBenAmounts } = data || {}
        state.echartApi1 = getEchartBarData(pingJi || [], 'pingJi')
        state.echartApi2 = getEchartBarData(weiFa || [], 'time')
        state.echartApi3 = getEchartBarLineData(beiZhiXings || [])
        state.echartApi4 = getEchartTop10Data(adsKhGaoyuanZhixingYwTop10VOs || [])
        state.echartApi5 = getEchartPieLineData(data, echartApi5)
        state.echartApi6 = getEchartBarData(shiXins || [], 'shiXin')
        state.echartApi7 = getEchartLineData(xianGaos || [], 'xianGao')
        state.echartApi8 = getEchartTop10Data(adsKhGaoyuanShixinYwTop10VOs || [])
        state.echartApi9 = getEchartBarData(zhongBens || [], 'zhongBen')
        state.echartApi10 = getEchartApi10Data(zhongBenAmounts || [])
      }
    })
    // 处理EchartBarLine组件数据
    const getEchartBarLineData = (data = []) => {
      // xData
      const xData = getYearXData(data)
      // yDataList
      const yDataList = [[], []]
      data.forEach((item, index) => {
        yDataList[0].push(item.beiZHiXingTime)
        yDataList[1].push(toAmountStr(item.beiZHiXingAmount, 2, false, true))
      })
      return { xData, yDataList }
    }
    // 处理echartApi10数据
    const getEchartApi10Data = (data = []) => {
      // xData
      const xData = getYearXData(data)
      // yDataList
      const yDataList = [[], []]
      data.forEach((item, index) => {
        yDataList[0].push(toAmountStr(item.zhixingAmount, 2, false, true))
        yDataList[1].push(toAmountStr(item.weizhixingAmount, 2, false, true))
      })
      return { xData, yDataList }
    }

    return {
      loading,
      chartLegend1,
      chartYData1,
      chartLegend3,
      chartLegend7,
      chartYData7,
      chartLegend10,
      chartYData10,
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
