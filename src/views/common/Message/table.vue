<template lang='pug'>
Table.template-table(
  :dataSource='dataSource'
  :columns='columns'
)
</template>

<script>
import Table from '@/components/qjd/table/index'
export default {
  props: {
    dataSource: {
      type: Array,
      default: () => ([])
    },
    columns: {
      type: Array,
      default: () => ([])
    }
  },
  components: {
    Table
  }
}
</script>

<style lang='stylus' scoped>
.template-table
  width 690px
.template-table table tr td, .template-table table tr th
  padding 8px 0!important
.template-table table
  border 0!important
</style>
