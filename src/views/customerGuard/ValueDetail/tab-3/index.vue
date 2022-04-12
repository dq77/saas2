<template lang="pug">
.tab-content
  .tab-block.tab-block-1(:class='{"empty--height" : (!echartApi1.length && (echartApi2.xData && !echartApi2.xData.length))}')
    TabCard.tab-45(title='案件身份' isPopover isMore :type='linkType["案件身份"]' :isMoreDisabled='!echartApi1.length')
      template(slot='popover')
        span.popover-text {{ popoverTexts.text1 }}
      EchartPieLine(:dataSource="echartApi1" id='echartApi1' text='案件<br/>身份' v-loading="loading")
    TabCard.tab-55(title='法律诉讼被告趋势' isPopover isMore :type='linkType["法律诉讼被告趋势"]' :isMoreDisabled='echartApi2.xData && !echartApi2.xData.length')
      template(slot='popover')
        span.popover-text {{ popoverTexts.text2 }}
      EchartLine(:dataSource="echartApi2" id='echartApi2' :chartLegend='chartLegend2' :chartYData='chartYData2' v-loading="loading")
  .tab-block.tab-block-1(:class='{"empty--height" : (!echartApi3.length && (echartApi4.xData && !echartApi4.xData.length))}')
    TabCard.tab-45(title='司法类别' isPopover isMore :type='linkType["司法类别"]' :isMoreDisabled='!echartApi3.length')
      template(slot='popover')
        span.popover-text {{ popoverTexts.text3 }}
      EchartPieLine(:dataSource="echartApi3" id='echartApi3' text='司法<br/>类别' v-loading="loading")
    TabCard.tab-55(title='法院top10' isPopover isMore :type='linkType["法院top10"]' :isMoreDisabled='echartApi4.xData && !echartApi4.xData.length')
      template(slot='popover')
        span.popover-text {{ popoverTexts.text4 }}
      EchartBar(:dataSource="echartApi4" id='echartApi4' v-loading="loading")
  .tab-block.tab-block-1(:class='{"empty--height" : (!echartApi5.length && (echartApi6.xData && !echartApi6.xData.length))}')
    TabCard.tab-45(title='关联风险类型' isPopover isMore :type='linkType["关联风险类型"]' :isMoreDisabled='!echartApi5.length')
      template(slot='popover')
        span.popover-text {{ popoverTexts.text5 }}
      EchartPieLine(:dataSource="echartApi5" id='echartApi5' text='关联风险<br/>类型' v-loading="loading")
    TabCard.tab-55(title='关联风险趋势' isPopover isMore :type='linkType["关联风险趋势"]' :isMoreDisabled='echartApi6.xData && !echartApi6.xData.length')
      template(slot='popover')
        span.popover-text {{ popoverTexts.text6 }}
      EchartLine(:dataSource="echartApi6" id='echartApi6' :chartLegend='chartLegend6' :chartYData='chartYData6' v-loading="loading")
  .tab-block-border.tab-block-2(:class='{"empty--height" : (!echartApi7.length)}')
    TabCard(title='涉案地区分布' isPopover isMore :type='linkType["涉案地区分布"]' :isMoreDisabled='!echartApi7.length')
      template(slot='popover')
        span.popover-text {{ popoverTexts.text7 }}
      EchartMap(:dataSource="echartApi7" v-loading="loading")
  .tab-block-border.tab-block-1(:class='{"empty--height" : (echartApi8.xData && !echartApi8.xData.length)}')
    TabCard(title='案由分布' isPopover isMore :type='linkType["案由分布"]' :isMoreDisabled='echartApi8.xData && !echartApi8.xData.length')
      template(slot='popover')
        span.popover-text {{ popoverTexts.text8 }}
      EchartBar(:dataSource="echartApi8" id='echartApi8' v-loading="loading")
</template>

<script>
// components
import TabCard from '../components/tabCard'
import EchartPieLine from '../components/echarts/echartPieLine'
import EchartLine from '../components/echarts/echartLine'
import EchartBar from '../components/echarts/echartBar'
import EchartMap from './echartMap'
// hooks
import useAsync from 'hooks/useAsync'
// other
import ajaxStore from '@/apis'
import { reactive, toRefs } from '@vue/composition-api'
import { deepCopy } from '@/utils/qjd'
import { getEchartPieLineData, getEchartLineData, getEchartTop10Data, getEchartLine2Data } from '../util'
import { echartApi1, chartLegend2, chartYData2, echartApi3, chartLegend6, chartYData6, echartApi6, nameEnums, popoverTexts } from './config'
import { linkType } from '../config'
export default {
  components: {
    TabCard,
    EchartPieLine,
    EchartLine,
    EchartBar,
    EchartMap
  },
  setup(props, {root}) {
    const { corpName } = root.$route.query
    // ajaxStore
    const { customer: { stratify: { law } } } = ajaxStore
    // state
    const state = reactive({
      // 数据
      echartApi1: [],
      echartApi2: {},
      echartApi3: [],
      echartApi4: {},
      echartApi5: [],
      echartApi6: {},
      echartApi7: [],
      echartApi8: {},
    })

    // useAsync
    const { loading } = useAsync({
      request: law,
      params: { companyName: corpName },
      successCallBack: res => {
        const { code, data = {} } = res
        if (code !== '0') return
        const { beiGaos, adsKhOpinionCountVO, adsKhTbJudgeTop10VOs, adsKhOpinionCountVO2, guanLianFengXianQuShis, areas, reasons } = data || {}
        state.echartApi1 = getEchartPieLineData(data, echartApi1)
        state.echartApi2 = getEchartLineData(beiGaos || [], 'time')
        state.echartApi3 = getEchartPieLineData(adsKhOpinionCountVO, echartApi3)
        state.echartApi4 = getEchartTop10Data(adsKhTbJudgeTop10VOs || [])
        state.echartApi5 = getEchartPieLineData(adsKhOpinionCountVO2, echartApi3)
        state.echartApi6 = getEchartLine2Data(guanLianFengXianQuShis || [], echartApi6)
        state.echartApi7 = getEchartApi7Data(areas || [])
        state.echartApi8 = getEchartApi8Data(reasons || [])
      }
    })
    // chart data
    const getEchartApi8Data = (data) => {
      const xData = []
      const yData = []
      data.forEach(item => {
        xData.push(item.keyName)
        yData.push(item.value || 0)
      })
      return { xData, yData }
    }
    // 地图数据
    const getEchartApi7Data = (data) => {
      if (!data.length) return []
      const realData = []
      Object.keys(nameEnums).forEach((key) => {
        const realDataItem = {}
        realDataItem.name = nameEnums[key]
        realDataItem.value = 0
        data.forEach(item => {
          if (nameEnums[item.keyName] === nameEnums[key]) {
            realDataItem.value = item.value || 0
          }
        })
        realData.push(realDataItem)
      })
      return deepCopy(realData)
    }

    return {
      loading,
      chartLegend2,
      chartYData2,
      chartLegend6,
      chartYData6,
      linkType,
      popoverTexts,
      ...toRefs(state)
    }
  }
}
</script>

<style lang="stylus" scoped>
@import ('../index.styl')
.tab-block-border
  margin-bottom 40px
/deep/ .tab-block-border .tab-card__content
  border 1px solid #f2f2f6
</style>
