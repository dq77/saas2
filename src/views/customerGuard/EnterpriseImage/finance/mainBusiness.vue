<template lang='pug'>
.main-business
  ButtonGroup.tab-button(
    title='报告期'
    :dataSource='buttonGroupApi.dataSource'
    :current='buttonGroupApi.current'
    @change='changeGroup'
  )
  TabCard(title='行业分类')
    .card-main
      EchartBarLine.p-chart(
        id='industry'
        v-loading='loading'
        :chartLegend='industryChartLegend'
        :dataSource='industryData'
      )
      Table.p-table.main-business-table(
        :height='staticData.height'
        :dataSource="industryList"
        :columns="staticData.industryTableColumns"
        :loading="loading"
      )
  TabCard(title='地区分类')
    .card-main
      EchartBarLine.p-chart(
        id='area'
        v-loading='loading'
        :chartLegend='areaChartLegend'
        :dataSource='areaData'
      )
      Table.p-table(
        :height='staticData.height'
        :dataSource="areaList"
        :columns="staticData.areaTableColumns"
        :loading="loading"
      )
  TabCard(title='产品分类')
    .card-main
      EchartBarLine.p-chart(
        id='product'
        v-loading='loading'
        :chartLegend='productChartLegend'
        :dataSource='productData'
      )
      Table.p-table(
        :height='staticData.height'
        :dataSource="productList"
        :columns="staticData.areaTableColumns"
        :loading="loading"
      )
</template>

<script>
// components
import ButtonGroup from '../../components/buttonGroup'
import EchartBarLine from '../components/echarts/echartBarLine'
import TabCard from '../../components/tabCard'
import Table from '@/components/qjd/table'
// hooks
import useButtonGroup from '../../hooks/useButtonGroup'
import useAsync from 'hooks/useAsync'
// others
import ajaxStore from '@/apis'
import { reactive, toRefs, watch } from '@vue/composition-api'
import { industryChartLegend, productChartLegend, areaChartLegend, tableColumns } from './config'
import { deepCopy } from '@/utils/qjd'

export default {
  props: {
    reportDate: {
      type: Array,
      default: () => ([])
    }
  },
  components: {
    ButtonGroup,
    TabCard,
    EchartBarLine,
    Table
  },
  setup (props, { root }) {
    const staticData = {
      industryTableColumns: [],
      productTableColumns: [],
      areaTableColumns: [],
      height: 260
    }
    const state = reactive({
      buttonGroupApi: {},
      industryList: [],
      productList: [],
      areaList: [],
      industryData: {},
      productData: {},
      areaData: {}
    })

    // useAsync
    const { customer: { stratify: { getMainBusiness } } } = ajaxStore
    const { companyName } = root.$route.query
    const { loading, doResult } = useAsync({
      init: false,
      request: getMainBusiness,
      successCallBack: res => {
        const { code, data, params } = res
        const { mainopType } = params || {}
        if (code !== '0') return
        if (mainopType === 1) {
          state.industryList = data
          state.industryData = initEcharts(state.industryList)
        }
        if (mainopType === 2) {
          state.productList = data
          state.productData = initEcharts(state.productList)
        }
        if (mainopType === 3) {
          state.areaList = data
          state.areaData = initEcharts(state.areaList)
        }
      }
    })
    /** 初始化 */
    // 静态数据
    const initStaticData = () => {
      const productTableColumns = deepCopy(tableColumns)
      productTableColumns[0].label = '产品'
      const areaTableColumns = deepCopy(tableColumns)
      areaTableColumns[0].label = '地区'

      staticData.industryTableColumns = deepCopy(tableColumns)
      staticData.productTableColumns = productTableColumns
      staticData.areaTableColumns = deepCopy(tableColumns)
    }
    initStaticData()
    // 接口数据
    const initMainList = () => {
      const mainopTypes = [1, 2, 3]
      mainopTypes.forEach(item => {
        const params = {
          fullName: companyName,
          reportDate: props.reportDate[state.buttonGroupApi.currentIndex],
          mainopType: item
        }
        doResult(params)
      })
    }
    /** 处理echats */
    const initEcharts = (lists) => {
      const xData = initXData(lists)
      const yDataList = initYDataList(lists)
      return { xData, yDataList }
    }
    // 处理 x轴 xData
    const initXData = (lists) => {
      return lists.map(item => {
        return item.itemName
      })
    }
    // 处理 值 yDataList
    const initYDataList = (lists) => {
      const million_100 = 100000000
      const yDataList = [[], []]
      lists.forEach(item => {
        // 营业总收入
        const value = !item.mainBusinssIncome ? 0 : (item.mainBusinssIncome / million_100).toFixed(2)
        // 占比
        const ratio = !item.proportion ? 0 : (item.proportion * 100).toFixed(2)
        yDataList[0].push(value)
        yDataList[1].push(ratio)
      })
      return yDataList
    }

    const changeGroup = ({ item, index }) => {
      state.buttonGroupApi.changeGroup({ item, index })
      initMainList()
    }

    watch(() => props.reportDate, (val) => {
      if (val?.length) {
        const config = props.reportDate.map(item => {
          return item.slice(0, -3)
        })
        state.buttonGroupApi = useButtonGroup({ config })

        initMainList()
      }
    }, {
      immediate: true
    })

    return {
      staticData,
      industryChartLegend,
      productChartLegend,
      areaChartLegend,
      ...toRefs(state),
      loading,
      changeGroup
    }
  }
}
</script>

<style lang='stylus' scoped>
// button
.tab-button
  margin-bottom 25px
.card-main
  display flex
  height 300px
  border 1px solid #EAEBEE
  margin-right 20px
.p-chart
  width 40%
  flex-shrink 0
.p-table
  flex-grow 1
  margin 20px 30px 20px 0
  padding-left 30px
  border-left 1px solid #EAEBEE
</style>
