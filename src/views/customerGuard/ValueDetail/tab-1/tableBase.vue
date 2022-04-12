<template lang='pug'>
.p-table-base
  el-table(:data="data" border style="width: 100%")
    el-table-column(
      v-for='column in baseInfoColumns'
      :key='column.key'
      :prop="column.key"
      :label="column.label"
      :min-width="column.width"
    )
</template>

<script>
import Table from '@/components/qjd/table'
import { baseInfoColumns } from './config'

export default {
  components: {
    Table
  },
  props: {
    data: {
      type: Array,
      default: () => ([]),
    }
  },
  setup(props) {
    return {
      baseInfoColumns
    }
  }
}
</script>

<style lang='stylus' scoped>
.p-tips
  width 100%
  height 500px
  overflow scroll
</style>
