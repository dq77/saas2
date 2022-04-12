<template lang='pug'>
.p-table-base
  el-table(:data="data" border style="width: 100%")
    el-table-column(
      prop="dimension"
      label="分析维度"
      min-width="120"
    )
    el-table-column(
      prop="score"
      label="得分"
      min-width="120"
      header-align="center"
      align="center"
    )
    el-table-column(
      min-width="240"
    )
      template(slot="header" slot-scope="scope")
        div 描述
          el-popover(
            placement="bottom"
            title="描述"
            trigger="hover"
          )
            .p-tips
              Table(:dataSource="tableData" :columns="columns" :spanMethod="objectSpanMethod" :stripe="true" :border="true")
            i.el-icon-info(slot="reference")
      template(slot-scope="scope")
        span {{ scope.row.desc || '-' }}
</template>

<script>
import { reactive, toRefs } from '@vue/composition-api'
import Table from '@/components/qjd/table'
import {
  tableData,
  columns,
  objectSpanMethod
} from './config'

export default {
  components: {
    Table
  },
  props: {
    data: {
      type: Array,
      default: () => ([])
    }
  },
  setup(props) {
    // state
    const state = reactive({
      tableData,
      columns,
      objectSpanMethod
    })
    return {
      ...toRefs(state)
    }
  }
}
</script>

<style lang='stylus' scoped>
.p-table-base
  padding 20px
.p-tips
  width 720px
  height 500px
  overflow scroll
.el-icon-info
  margin-left 5px
</style>
