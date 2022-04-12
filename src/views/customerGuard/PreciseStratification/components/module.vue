<template lang='pug'>
.table
  template(v-if='data.dataSource && data.dataSource.length')
    .table-label(v-if='data.label && data.label.value') {{ data.label.value }}
    Table(
      :columns='data.columns'
      :dataSource="data.dataSource"
    )
  Empty(v-else)
</template>

<script>
import Table from '@/components/qjd/table'
import Empty from '@/components/qjd/empty'
export default {
  props: {
    data: Object
  },
  components: {
    Table,
    Empty
  },
  setup (props) {
    return {}
  }
}
</script>

<style lang='stylus' scoped>
.table-label
  height 50px
  padding 0 10px
  line-height 50px
  font-weight bold
  color #494949
  background #f2f2f6
  border-bottom 1px solid #ebeef5
/deep/ .el-table th>.cell
  padding 0
</style>
