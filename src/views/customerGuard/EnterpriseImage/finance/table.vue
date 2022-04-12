<template lang="pug">
.tab-main
  .home-title
    .title-left {{title}}
      span.title-unit(v-if='unit') 单位：{{unit}}
    .title-right
      slot(name='headRight')
  .table-main(v-loading='requestDateApi.loading')
    Table.enterprise-detail-table(
      :dataSource='dataSource || []'
      :columns='tableHeader'
    )
</template>

<script>
import Table from '@/components/qjd/table'
import { reactive, toRefs, watch } from '@vue/composition-api'
// hooks
import useAsync from 'hooks/useAsync'
import { deepCopy } from '@/utils/qjd'
import { publicTableHeader } from '../finance/config'

export default {
  props: {
    title: {
      type: String
    },
    unit: {
      type: String
    },
    columns: {
      type: Array,
      default: () => ([])
    },
    month: String,
    request: {
      type: Function,
      default: () => {}
    },
    requestDone: {
      type: Boolean,
      default: false
    }
  },
  components: {
    Table
  },
  setup(props, { root }) {
    const state = reactive({
      dataSource: [],
      tableHeader: [],
      requestDateApi: {}
    })
    state.requestDateApi = useAsync({ init: false, request: props.request })
    // init数据
    const initBaseInfo = async (value) => {
      const { companyName } = root.$route.query
      const { data, code } = await state.requestDateApi.doResult({ month: value, fullName: companyName })
      // 表格
      if (code === '0') {
        const { tableHeader, tableList } = getTableData(data, props.columns)
        state.tableHeader = tableHeader
        state.dataSource = tableList
      }
    }

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

    watch(
      () => props.month,
      (value) => {
        initBaseInfo(value)
      },
      {
        immediate: true
      }
    )

    return {
      ...toRefs(state)
    }
  }
}
</script>

<style lang="stylus" scoped>
.home-title
  font-size 16px
  color #494949
  margin-bottom 20px
  display flex
  justify-content space-between
  .title-unit
    font-size 14px
    color #A9AFB8
    margin-left 24px
.u-empty-tips
  color #999
  min-height 100px
  display flex
  justify-content center
  align-items center
.p-font-bold
  font-weight bold

>>> .el-table .el-table__fixed
  height auto!important
  bottom 16px
</style>
