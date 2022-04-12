<template lang='pug'>
div(v-loading='loading')
  List(
    title='经营活动产生的现金流量'
    :dataSource='operate.tableList || []'
    :columns="operate.tableHeader || []"
  )
  List(
    title='投资活动产生的现金流量'
    :dataSource='invest.tableList || []'
    :columns="invest.tableHeader || []"
  )
  List(
    title='筹资活动产生的现金流量'
    :dataSource='finance.tableList || []'
    :columns="finance.tableHeader || []"
  )
  List(
    title='补充资料'
    :dataSource='replenish.tableList || []'
    :columns="replenish.tableHeader || []"
  )
</template>

<script>
// components
import TabCard from '../components/tabCard'
import List from './components/list'
// hooks
import useAsync from 'hooks/useAsync'
// other
import ajaxStore from '@/apis'
import { reactive, toRefs } from '@vue/composition-api'
import { deepCopy } from '@/utils/qjd'
import { publicTableHeader, operateTableList, investTableList, financeTableList, replenishTableList } from './config'

export default {
  props: {},
  components: {
    TabCard,
    List
  },
  setup (props, { root }) {
    // useAsync
    const state = reactive({
      dataSource: [],
      operate: {},
      invest: {},
      finance: {},
      replenish: {},
      equity: {},
      columns: []
    })
    const { companyName, month } = root.$route.query
    const { customer: { stratify: { getCashFlowByQuarter } } } = ajaxStore
    const { loading } = useAsync({
      isLoading: true,
      request: getCashFlowByQuarter,
      params: { fullName: companyName, month },
      successCallBack: res => {
        const { code, data } = res
        if (code !== '0') return
        state.dataSource = data
        state.operate = getTableData(data, operateTableList)
        state.invest = getTableData(data, investTableList)
        state.finance = getTableData(data, financeTableList)
        state.replenish = getTableData(data, replenishTableList)
      }
    })


    // 处理表格信息
    const million_100 = 100000000
    const renderMillion_100 = (val) => { return val === 0 ? 0 : (val / million_100).toFixed(2) }
    const getTableData = (tableData, tableListConfig) => {
      const soureData = {}
      tableData.forEach(item => {
        soureData[item.reportDate.slice(0, 10)] = item
      })
      // 基础数据
      const tableHeader = deepCopy(publicTableHeader)
      const tableList = deepCopy(tableListConfig)

      for (const key in soureData) {
        // 表头
        tableHeader.push(
          { label: key, key: `data${key}`, minWidth: 120 }
        )
        // 表格数据
        tableList.forEach(item => {
          item[`data${key}`] = (soureData[key][item.key] || soureData[key][item.key] === 0) && renderMillion_100(soureData[key][item.key])
        })
      }
      return {
        tableHeader,
        tableList,
        soureData
      }
    }

    return {
      loading,
      ...toRefs(state)
    }
  }
}
</script>

<style lang='stylus' scoped>
>>> .el-table .el-table__fixed
  height auto!important
  bottom 16px
</style>
