<template lang='pug'>
.vertical-table
  Table(:columns='varticalTitle' :dataSource='tableList' v-if='tableList && tableList.length')
</template>

<script>
import Table from '@/components/qjd/table'
import { reactive, toRefs } from '@vue/composition-api'
export default {
  props: {
    columns: Array,
    dataSource: Array
  },
  components: {
    Table
  },
  setup (props) {
    const state = reactive({
      varticalTitle: [],
      tableList: []
    })

    const initData = () => {
      const { columns, dataSource } = props
      if (!dataSource || !dataSource.length) return
      // 处理title
      const titles = [{ key: 'title', label: columns[0].label, width: 100 }]
      const keys = columns.map(item => item.key)
      dataSource.forEach(item => {
        titles.push({ key: item[columns[0].key], label: item[columns[0].key] })
      })
      state.varticalTitle = titles
      // 左侧数据
      const leftTitles = columns.map(item => {
        return { title: item.label }
      })
      // 处理数据
      const vData = {}
      titles.forEach(title => {
        dataSource.forEach(item => {
          if (title.key !== 'title' && title.key === item.period) vData[title.key] = item
        })
      })

      for (const key in vData) {
        leftTitles.forEach((item, index) => {
          leftTitles[index][key] = vData[key][keys[index]] || '- -'
        })
      }
      leftTitles.shift()
      state.tableList = leftTitles || []
    }
    initData()
    return {
      ...toRefs(state)
    }
  }
}
</script>

<style lang='stylus' scoped>
.empty
  height 60px
  border 1px solid #f2f2f6
  text-align center
  line-height 60px

/deep/ .el-table th.el-table__cell, /deep/ .el-table--striped .el-table__body tr.el-table__row--striped td
  background #fff
/deep/ .el-table th.el-table__cell:first-child, /deep/ .el-table td:first-child, /deep/ .el-table--striped .el-table__body tr.el-table__row--striped td:first-child
  background #f2f2f6
/deep/ .el-table th.is-leaf
  border-top 1px solid #ebeef5
  &:last-child
    border-right 1px solid #ebeef5
/deep/ .el-table th.is-leaf:first-child
  border-right 0
/deep/ .el-table th.el-table__cell
  height 40px

/deep/ .el-table--small td, /deep/ .el-table--small th
  padding 8px 10px
</style>
