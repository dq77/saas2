<template lang="pug">
.p-main
  .p-title 综合评分等级及定义
  Table.p-table(
    :dataSource="scoreDataSource"
    :columns="scoreColumns"
    :spanMethod='spanMethod'
    :border='true'
  )
  .p-title 国际评级机构符号等级及定义
  Table.p-table(
    :dataSource="interDataSource"
    :columns="interColumns"
    :spanMethod='interSpanMethod'
    :border='true'
  )
  .p-title 国内评级机构符号等级及定义
  Table.p-table(
    :dataSource="nationalDataSource"
    :columns="nationalColumns"
    :border='true'
  )
</template>

<script>
import Table from '@/components/qjd/table'
import { scoreDataSource, scoreColumns, interDataSource, interColumns, nationalDataSource, nationalColumns } from './config'
export default {
  components: { Table },
  setup(props) {
    const spanMethod = ({ row, column, rowIndex, columnIndex }) => {
      if (columnIndex === 0) {
        if (rowIndex === 0 || rowIndex === 7) {
          return {
            rowspan: 7,
            colspan: 1
          }
        } else {
          return {
            rowspan: 0,
            colspan: 0
          }
        }
      }
    }
    const interSpanMethod = ({ row, column, rowIndex, columnIndex }) => {
      if (columnIndex === 0) {
        if (rowIndex === 0) {
          return {
            rowspan: 4,
            colspan: 1
          }
        } else if (rowIndex < 4) {
          return {
            rowspan: 0,
            colspan: 0
          }
        } else if (rowIndex === 4) {
          return {
            rowspan: 5,
            colspan: 1
          }
        } else if (rowIndex < 9) {
          return {
            rowspan: 0,
            colspan: 0
          }
        } else if (rowIndex === 9) {
          return {
            rowspan: 2,
            colspan: 1
          }
        } else {
          return {
            rowspan: 0,
            colspan: 0
          }
        }
      } else if (columnIndex === 4) {
        if (rowIndex === 9) {
          return {
            rowspan: 2,
            colspan: 1
          }
        } else if (rowIndex === 10) {
          return {
            rowspan: 0,
            colspan: 0
          }
        }
      }
    }
    return {
      scoreDataSource,
      scoreColumns,
      interDataSource,
      interColumns,
      nationalDataSource,
      nationalColumns,
      spanMethod,
      interSpanMethod
    }
  }
}
</script>

<style lang="stylus" scoped>
.p-main
  padding 20px
  background #ffffff
  margin 20px
.p-title
  font-size 14px
  font-weight bold
  margin-bottom 20px
  margin-top 50px
.p-title:first-child
  margin-top 0
</style>
