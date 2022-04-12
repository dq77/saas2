<template lang='pug'>
.indicators
  .tab-header 财报分析图
  Condition(
    :reportButtonGroupApi='reportButtonGroupApi'
    :allGroupApi='allGroupApi'
    @changeMonthHandle='changeMonthHandle'
    @changeTypeHandle='changeTypeHandle'
  )
  .tab-bar
    EchartBar2(
      :dataSource="financialData"
      id='financialApi'
      :chartLegend='chartLegend'
      :chartYData='chartYData'
      :options='barOptions2'
      v-loading="loading"
    )
  List(title='偿债能力' :dataSource='solvencyData.tableList' :columns='solvencyData.tableHeader')
  List(title='营运能力' :dataSource='operationData.tableList' :columns='operationData.tableHeader')
  List(title='盈利能力' :dataSource='profitabilityData.tableList' :columns='profitabilityData.tableHeader')
</template>
<script>
// components
import TabCard from '../../components/tabCard'
import Condition from './condition'
import EchartBar2 from '../../components/echarts/echartBar2'
import List from './list'
// hooks
import useBaseApi from '../hooks/useBaseApi'
import useButtonGroup from '../../../hooks/useButtonGroup'
// other
import { reactive, toRefs, watch, computed } from '@vue/composition-api'
import { reportButtonGroupLists, allGroupLists, chartYData, monthEnums, publicTableHeader, solvencyTableList, operationTableList, profitabilityTableList, barOptions2, allTableList } from './config'
import { deepCopy } from '@/utils/qjd'
export default {
  props: {
    industry: String
  },
  emits: [],
  components: {
    Condition,
    EchartBar2,
    TabCard,
    List
  },
  setup (props, { root }) {
    const { corpName } = root.$route.query
    const state = reactive({
      loading: false,
      tableLoading: false,
      reportButtonGroupApi: {},
      allGroupApi: {},
      solvencyData: {},
      operationData: {},
      profitabilityData: {},
      companyData: [],
      industryData: [],
      // echarts
      chartLegend: [],
      chartYData: [],
      financialData: {},
      financialType: 'ld',
      barOptions2: barOptions2
    })
    // useButtonGroup
    state.reportButtonGroupApi = useButtonGroup({ config: reportButtonGroupLists })
    state.allGroupApi = useButtonGroup({ config: allGroupLists, isGroups: true })
    // 季度切换
    const changeMonthHandle = (data) => {
      state.reportButtonGroupApi.changeGroup(data)
      initBaseInfo()
    }
    // 类型切换
    const changeTypeHandle = (data) => {
      const { item } = data
      state.allGroupApi.changeGroup(data)
      // state.financialType 筛选数据条件
      allTableList.forEach(list => {
        if (list.title === item) {
          state.financialType = list.key
        }
      })
      // echarts title
      state.barOptions2.title.text = item
      // echats data
      initCompanyData(state.companyData)
      initIndustryData(state.companyData, state.industryData)
    }
    // base
    const { byQuarterApi, oneDealerByQuarterApi } = useBaseApi(root)
    const { doResult: byQuarterDoResult } = byQuarterApi.value ?? {}
    const { doResult: oneDealerByQuarterDoResult } = oneDealerByQuarterApi.value ?? {}
    // 获取接口信息
    const initBaseInfo = async () => {
      // 某一公司数据
      state.loading = true
      state.tableLoading = true
      const res1 = await oneDealerByQuarterDoResult({ month: month.value, fullName: corpName })
      // 表格
      if (res1.code !== '0') { state.loading = false; return }
      state.tableLoading = false
      state.companyData = res1.data || []
      initCompanyData(state.companyData)
      // 行业平均数据
      const res2 = await byQuarterDoResult({ month: month.value, industry: props.industry })
      state.loading = false
      if (res2.code !== '0') return
      state.industryData = res2.data || []
      initIndustryData(state.companyData, state.industryData)
    }
    // 初始当前公司数据
    const initCompanyData = (data) => {
      state.solvencyData = getTableData(data, solvencyTableList)
      state.operationData = getTableData(data, operationTableList)
      state.profitabilityData = getTableData(data, profitabilityTableList)
    }
    // 出事行业平均数据
    const initIndustryData = (companyData, industryData) => {
      state.chartLegend = getLegend()
      // 取当前公司含有的期数 => 值用于x轴 和 筛选data2对应数据
      const xCoordinate = getXCoordinate(companyData)
      const industryList = initIndustryList(industryData, xCoordinate)
      state.chartYData = getChartYData(chartYData)
      const yDataList = getYDataList(companyData, industryList, state.financialType)
      state.financialData = { xData: xCoordinate, yDataList }
      // console.log(xCoordinate, industryList, yDataList)
    }
    // 处理表格信息
    const getTableData = (tableData, tableListConfig) => {
      const soureData = {}
      tableData.forEach(item => {
        soureData[item.reportDate.slice(0, 10)] = item
      })
      // 基础数据
      // const tableHeader = JSON.parse(JSON.stringify(publicTableHeader))
      const tableHeader = deepCopy(publicTableHeader)
      const tableList = deepCopy(tableListConfig)

      for (const key in soureData) {
        // 表头
        tableHeader.push(
          { label: key, key: `data${key}`, minWidth: 100 }
        )
        // 表格数据
        tableList.forEach(item => {
          item[`data${key}`] = soureData[key][item.key] || '--'
        })
      }

      return {
        tableHeader,
        tableList,
        soureData
      }
    }
    /** echarts相关 */
    // legend
    const getLegend = () => {
      return ['行业均值', corpName]
    }
    // 横坐标 -- 期数
    const getXCoordinate = (data) => {
      const newData = data.slice(0, 24) // 取24条
      const lists = newData.map(item => {
        return item.reportDate.slice(0, 7) // 截取字符串 例2022-03
      })
      return [...new Set(lists)]
    }
    // Y轴配置项
    const getChartYData = (data) => {
      data[1].name = corpName
      return data
    }
    // 初始化行业对应平均值
    const initIndustryList = (data, reportMonth) => {
      return data.filter(item => {
        return reportMonth.indexOf(item.reportMonth) > -1
      })
    }
    // 坐标yDataList数据
    const getYDataList = (data, industryList, type) => {
      const lists = [[], []]
      const rules = item => item[type] ? item[type].toFixed(2) : 0
      lists[0] = industryList.map(item => {
        return rules(item)
      })
      lists[1] = data.map(item => {
        return rules(item)
      })
      return lists
    }

    const month = computed(() => {
      return monthEnums[state.reportButtonGroupApi.current]
    })
    watch(() => props.industry, val => {
      val && initBaseInfo()
    }, {
      immediate: true
    })

    return {
      ...toRefs(state),
      changeMonthHandle,
      changeTypeHandle
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
.tab-bar
  margin 25px 0 30px 0
  height 340px
  border 1px solid #EAEBEE
  border-radius 4px
</style>
