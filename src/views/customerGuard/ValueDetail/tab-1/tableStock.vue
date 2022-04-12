<template lang='pug'>
.p-table-base
  el-table(:data="data" border style="width: 100%")
    el-table-column(type='index' label='序号' width='75')
    el-table-column(
      v-for='item in stockInfoColumns'
      :key='item.key'
      :prop="item.key"
      :label="item.label"
      :min-width="item.width"
    )
      template(slot-scope='scope')
        fragment.p-render(v-if='item.render')
          column-Render(:scope='scope' :render='item.render')
        fragment(v-else) {{scope.row[item.key] || '-'}}
</template>

<script>
import Table from '@/components/qjd/table'
import ColumnRender from '../components/render'
import { stockInfoColumns } from './config'

export default {
  components: {
    Table,
    ColumnRender
  },
  props: {
    data: {
      type: Array,
      default: () => ([]),
    }
  },
  setup(props) {
    return {
      stockInfoColumns
    }
  }
}
</script>

<style lang='stylus' scoped>
.p-avator
  display flex
  align-items center
  flex-flow row nowrap
  img
    width 40px
    height 40px
    margin-right 10px
    border-radius 2px
</style>
