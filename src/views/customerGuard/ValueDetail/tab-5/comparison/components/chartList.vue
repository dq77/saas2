<template lang='pug'>
TabCard(:title='title')
  //- :style='{ height: `${tableHeight}px` }'
  .graphical
    .graphical-echart(v-loading='loading' :style='{ height: `${tableHeight}px` }')
      EchartBar(:dataSource="solvencyData" :options='options' :id='prop' v-if='!loading && !sortLoading')
    .graphical-list.graphical-table(v-loading='loading')
      Table(
        ref='tableRef'
        :dataSource='tableList'
        :columns="tableColumns"
        :stripe='false'
        :border='false'
        :rowClassName="tableRowClassName"
        @sortChange='sortChange'
        :height='tableHeight'
      )
</template>

<script>
// components
import TabCard from '../../../components/tabCard'
import EchartBar from './echartBar'
import Table from '@/components/qjd/table'
// others
import { reactive, toRefs, watch } from '@vue/composition-api'
import { solvencyLegend, solvencyColumns, operationLegend, operationColumns, profitabilityLegend, profitabilityColumns, companySizeLegend, companySizeColumns, isMillion_1000, barOptions } from '../config'
import { deepCopy } from '@/utils/qjd'

export default {
  props: {
    dataSource: {
      typeof: Array,
      default: () => ([])
    },
    loading: Boolean,
    avgDataSource: {
      type: Object,
      default: () => ({})
    },
    title: String,
    prop: String,
    current: String
  },
  components: {
    TabCard,
    EchartBar,
    Table
  },
  setup (props, { root }) {
    const split = { rankId: '--', stockName: '----', ld: '----', sd: '----', xjxsb: '----', zcfzl: '----', isEllipsis: true }
    const state = reactive({
      avgData: '',
      sourceLists: [],
      tableHeight: 315,
      solvencyData: {},
      tableColumns: [],
      tableList: [],
      sortData: {},
      // echarts
      avgKey: 'ld',
      chartLegend: [],
      options: {},
      sortLoading: false
    })
    // initConfig
    const initConfig = (key) => {
      switch (true) {
        case key === 'solvency':
          state.tableColumns = solvencyColumns
          state.chartLegend = solvencyLegend
          state.avgKey = 'ld'
          break
        case key === 'operation':
          state.tableColumns = operationColumns
          state.chartLegend = operationLegend
          state.avgKey = 'yszkzzl'
          break
        case key === 'profitability':
          state.tableColumns = profitabilityColumns
          state.chartLegend = profitabilityLegend
          state.avgKey = 'roejq'
          break
        case key === 'companySize':
          state.tableColumns = companySizeColumns
          state.chartLegend = companySizeLegend
          state.avgKey = 'netprofit'
          break
        default:
          state.tableColumns = []
          state.chartLegend = []
          state.avgKey = 'ld'
          break
      }
    }
    // init
    const initState = (lists) => {
      lists = lists || []
      state.sourceLists = deepCopy(lists)
      const avgData = deepCopy(props.avgDataSource)
      state.options = initOptions(barOptions, avgData)
      const echartsList = initEchartsList(state.sourceLists) // 符合的列表 表格和echats都需要
      const tableList = initTableList(echartsList)
      state.tableHeight = initTableHeight(tableList)
      state.tableList = tableList
      // echats
      const xData = initXData(echartsList)
      const yData = initYDataList(echartsList)
      state.solvencyData = { xData, yData }
    }
    // echats需要的列表 也是table前置的列表
    const initEchartsList = (lists) => {
      const { corpName } = root.$route.query
      if (lists.length > 10) {
        return lists.filter((item, index) => {
          item.rankId = index + 1
          item.isCurrent = item.fullName === corpName || false
          const boo = index < 5 || index > lists.length - 6 || item.fullName === corpName
          return boo
        })
      } else { // 10条内
        return lists.map((item, index) => {
          item.rankId = index + 1
          item.isCurrent = item.fullName === corpName || false
          return item
        })
      }
    }
    // table需要的列表
    const initTableList = (lists) => {
      let tableList = []
      if (lists.length === 0) {
        tableList = []
      } else if (lists.length < 10) {
        tableList = lists
      } else if (lists.length === 10) {
        if (lists[5].rankId === 6) {
          tableList = lists
        } else {
          tableList = [...lists.slice(0, 5), split, ...lists.slice(-5)]
        }
      } else if (lists.length > 10) {
        tableList = [...lists.slice(0, 5), split, lists[5], split, ...lists.slice(-5)]
      }
      return tableList
    }
    // 高度 绑定class
    const initTableHeight = (lists) => {
      if (lists?.length === 0) {
        return 134
      } else if (lists?.length <= 10) {
        return 315
      } else {
        return 50 + 25 * lists.length
      }
    }
    // 绑定的class
    const tableRowClassName = ({row, rowIndex}) => {
      if (row.isCurrent) return 'is-current'
      if (row.isEllipsis) return 'is-ellipsis'
      return ''
    }
    // 排序
    const sortChange = (data) => {
      state.sortData = data
      const { order, prop, column: { label } } = data
      state.avgKey = prop
      initLegend(label)
      const source = deepCopy(props.dataSource)
      const lists = order === null ? source : sortSourceLists(source, prop, order) // 通过原数组排序
      state.sortLoading = true
      setTimeout(() => {
        initState(lists)
        state.sortLoading = false
      })
    }
    // 数组元素通过指定属性进行比较
    const arrayCompare = (key, order = 'ascending') => {
      return (next, curr) => {
        let result = false
        const nextValue = next[key]
        const currentValue = curr[key]
        if (order === 'ascending') {
          result = nextValue - currentValue
        } else {
          result = currentValue - nextValue
        }

        return result
      }
    }
    // 根据sort返回key排序
    const sortSourceLists = (lists, key, order) => {
      return lists.sort(arrayCompare(key, order))
    }
    /** 处理echats */
    // 处理legend chartLegend[1] = 行业均值
    const initLegend = (legend) => {
      state.chartLegend[0] = legend
    }
    // 处理echats配置项  options
    const initOptions = (options, avgData) => {
      const newOptions = deepCopy(options)
      const million_1000Arr = ['netprofit', 'operateIncome', 'totalAssets', 'totalEquity']
      const million_100 = 100000000
      const renderMillion_100 = (val) => { return val === 0 ? 0 : val ? (val / million_100).toFixed(2) : '-' }
      let avg
      if (million_1000Arr.indexOf(state.avgKey) > -1) {
        avg = renderMillion_100(avgData[state.avgKey])
      } else {
        avg = avgData[state.avgKey].toFixed(2)
      }
      const title = state.chartLegend[0]
      newOptions.title.text = title
      newOptions.series[0].markLine.data[0].yAxis = avg || 0
      // y轴最大最小值
      newOptions.yAxis[0].min = (value) => {
        if (value.min < parseFloat(avg)) {
          return Math.floor(value.min)
        } else {
          return Math.floor(avg)
        }
      }
      newOptions.yAxis[0].max = (value) => {
        if (value.max > parseFloat(avg)) {
          return Math.ceil(value.max)
        } else {
          return Math.ceil(avg)
        }
      }
      return newOptions
    }
    // 处理 x轴 xData
    const initXData = (lists) => {
      return lists.map(item => {
        return item.stockName
      })
    }
    // 处理 值 yDataList
    const initYDataList = (lists) => {
      const yDataList = []
      const million_100 = 100000000
      const renderMillion_100 = (val) => { return val === 0 ? 0 : val ? (val / million_100).toFixed(2) : '-' }
      lists.forEach(item => {
        const value = isMillion_1000.indexOf(state.avgKey) !== -1 ? renderMillion_100(item[state.avgKey]) : item[state.avgKey].toFixed(2)
        if (item.isCurrent) {
          yDataList.push({
            value: value,
            itemStyle: {
              color: '#F5786D'
            }
          })
        } else {
          yDataList.push(value)
        }
      })
      return yDataList
    }

    watch(() => props.prop, (val) => {
      val && initConfig(val)
    }, {
      immediate: true
    })
    watch(() => props.dataSource, (val) => {
      // 是否有key的排序
      state.sortData.prop ? sortChange(state.sortData) : initState(val)
    })

    return {
      ...toRefs(state),
      solvencyColumns,
      tableRowClassName,
      sortChange
    }
  }
}
</script>

<style lang='stylus' scoped>
.graphical
  display flex
  // height 315px
.graphical-echart, .graphical-list
  width 50%
  height 100%
.graphical-echart
  margin-right 20px
  border 1px solid #EAEBEE
</style>

<style lang='stylus'>
.graphical-table
  border 1px solid #f2f2f6
  border-top 0
  // &, .el-table
  //   height 100%
  .el-table th>.cell, .el-table .cell
    padding-left 5px
    padding-right 5px
  .el-table th.el-table__cell:nth-child(1), .el-table th.el-table__cell:nth-child(2), .el-table--small td:nth-child(1), .el-table--small td:nth-child(2)
    color #A9AFB8
  .el-table th.el-table__cell
    height 24px
  .el-table--small td
    padding 1px
  .el-table td, .el-table th.is-leaf
    border 0
  td
    color #494949
  .el-table__body-wrapper
    border 0
  .is-current td
    color #494949!important
  .is-ellipsis td
    color #a9afb8!important
</style>
