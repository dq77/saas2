<template lang='pug'>
.rankIndustry
  .tab-header 行业排名趋势
  ButtonGroup.tab-button(
    title='指标类型'
    :dataSource='buttonGroupApi.dataSource'
    :current='buttonGroupApi.current'
    @change='changeGroup'
  )
  .tab-echart(v-loading="loading")
    EchartLine(
      ref='rankIndustry'
      :immediate='true'
      :dataSource="rankIndustryData"
      id='rankIndustry'
      :chartLegend='chartLegend'
      :chartYData='chartYData'
      v-if='chartLegend.length'
    )
</template>

<script>
// components
import ButtonGroup from '../../../components/buttonGroup'
import EchartLine from '../../components/echarts/echartLine'
// hooks
import useButtonGroup from '../../../hooks/useButtonGroup'
// others
import { ref, reactive, toRefs, watch } from '@vue/composition-api'
import ajaxStore from '@/apis'
import useAsync from 'hooks/useAsync'
import { rankIndustryButtonGroupLists, rankIndustryConfigs } from './config'

export default {
  props: {
    industry: String
  },
  components: {
    ButtonGroup,
    EchartLine
  },
  setup (props, { root }) {
    const rankIndustry = ref()
    const state = reactive({
      buttonGroupApi: {},
      // 图表数据
      allData: [],
      chartYData: [],
      chartLegend: [],
      rankIndustryData: null
    })
    // useButtonGroup
    state.buttonGroupApi = useButtonGroup({ config: rankIndustryButtonGroupLists })
    const changeGroup = (data) => {
      state.buttonGroupApi.changeGroup(data)
      initEcharts(state.allData)
    }

    // useAsyny
    const { customer: { stratify: { getTabAll } } } = ajaxStore
    const { loading, doResult } = useAsync({
      init: false,
      request: getTabAll,
      successCallBack: res => {
        const { code, data } = res
        if (code !== '0') return
        state.allData = data || []
        initEcharts(state.allData || [])
      }
    })
    // 初始化图表
    const initEcharts = (data) => {
      const configs = rankIndustryConfigs[state.buttonGroupApi.currentIndex]
      state.chartLegend = getLegend(configs)
      state.chartYData = getChartYData(state.chartLegend)
      const xCoordinate = getXCoordinate(data)
      const yDataList = getYDataList(data, configs)
      state.rankIndustryData = { xData: xCoordinate, yDataList }
    }
    // legend
    const getLegend = (configs) => {
      return configs.map(item => {
        return item.name
      })
    }
    // 横坐标 -- 期数
    const getXCoordinate = (data) => {
      const lists = data.map(item => {
        return item.reportMonth
      })
      return [...new Set(lists)]
    }
    // Y轴配置项
    const getChartYData = (data) => {
      return data.map(xCoor => {
        return { name: xCoor, type: 'line', data: [] }
      })
    }
    // 坐标yDataList数据
    const getYDataList = (data, configs) => {
      const lists = []
      // const million_100 = 100000000
      configs.forEach((config, configIndex) => {
        lists[configIndex] = []
        data.forEach(item => {
          const value = config.render(item[config.valueKey])
          lists[configIndex].push(value)
        })
      })
      return lists
    }

    watch(() => props.industry, (industry) => {
      industry && doResult({ industry })
    }, {
      immediate: true
    })

    return {
      rankIndustry,
      loading,
      doResult,
      changeGroup,
      ...toRefs(state)
    }
  }
}
</script>

<style lang='stylus' scoped>
// header
.tab-header
  padding 15px 0
  font-size 16px
  font-weight 500
  color #494949
  line-height 22px
  border-bottom 1px solid #EAEBEE
.tab-echart
  height 300px
  border 1px solid #EAEBEE
// button
.tab-button
  margin 25px 0
</style>
