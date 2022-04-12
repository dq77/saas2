<template lang='pug'>
div(v-loading='loading')
  List(
    title='流动资产'
    :dataSource='currentAssets.tableList || []'
    :columns="currentAssets.tableHeader || []"
  )
  List(
    title='非流动资产'
    :dataSource='noncurrentAssets.tableList || []'
    :columns="noncurrentAssets.tableHeader || []"
  )
  List(
    title='流动负债'
    :dataSource='currentLiab.tableList || []'
    :columns="currentLiab.tableHeader || []"
  )
  List(
    title='非流动负债'
    :dataSource='noncurrentLiab.tableList || []'
    :columns="noncurrentLiab.tableHeader || []"
  )
  List(
    title='股东权益'
    :dataSource='equity.tableList || []'
    :columns="equity.tableHeader || []"
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
import { publicTableHeader, currentAssetsList, noncurrentAssetsList, currentLiabList, noncurrentLiabList, equityList } from './config'

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
      currentAssets: {},
      noncurrentAssets: {},
      currentLiab: {},
      noncurrentLiab: {},
      equity: {},
      columns: []
    })
    const { companyName, month } = root.$route.query
    const { customer: { stratify: { getBalanceByQuarter } } } = ajaxStore
    const { loading } = useAsync({
      isLoading: true,
      request: getBalanceByQuarter,
      params: { fullName: companyName, month },
      successCallBack: res => {
        const { code, data } = res
        if (code !== '0') return
        state.dataSource = data
        state.currentAssets = getTableData(data, currentAssetsList)
        state.noncurrentAssets = getTableData(data, noncurrentAssetsList)
        state.currentLiab = getTableData(data, currentLiabList)
        state.noncurrentLiab = getTableData(data, noncurrentLiabList)
        state.equity = getTableData(data, equityList)
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
          { label: key, key: `data${key}`, minWidth: 100 }
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
