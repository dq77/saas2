<template lang='pug'>
.module
  .module-title(v-if='config.title') {{ config.title }}
  //- config 非循环贷账户 循环贷账户 贷记卡账户 准贷记卡账户
  template(v-if='config.dataSource && config.dataSource.length')
    //- config.dataSource 某一类总数据
    .table-template1(v-for='(source, sourceIndex) in config.dataSource')
      //- source 这类其中一条数据
      .table-template2(v-for='(source2, sourceIndex2) in source')
        //- source2 这类数据多个table
        //- template(v-if='source2.dataSource && source2.dataSource.length')
        .table-label(v-if='source2.label && source2.label.value')
          span(v-if='source2.label.key !== "index"') {{ source2.label.value }}
          span.table-label--key(v-else) {{ `账户${sourceIndex + 1}` }}
        Table(
          v-if='!source2.isVertical'
          :dataSource='source2.dataSource'
          :columns='source2.columns'
          :key='`${sourceIndex-sourceIndex2}`'
        )
        VerticalTable(
          :dataSource='source2.dataSource'
          :columns='source2.columns'
          v-else
        )
  Empty(v-else)
</template>

<script>
import Empty from '@/components/qjd/empty'
import Module from '../../components/module'
// import Table from './table'
import Table from '@/components/qjd/table'
import VerticalTable from './verticalTable'
export default {
  props: {
    config: Object
  },
  components: {
    Empty,
    Module,
    Table,
    VerticalTable
  },
  setup (props) {
    return {}
  }
}
</script>

<style lang='stylus' scoped>
.module-template:last-child
  margin-bottom 0
.module-title
  margin-bottom 10px
  font-size 12px
  font-weight bold
  color #494949
.table-label
  height 50px
  padding 0 10px
  line-height 50px
  font-weight bold
  color #494949
  background #f2f2f6
  border-bottom 1px solid #ebeef5
.table-template2
  margin-bottom 20px
.table-label--key
  color #3b68f0
/deep/ .el-table--small td, /deep/ .el-table--small th
  padding 8px 10px
</style>
