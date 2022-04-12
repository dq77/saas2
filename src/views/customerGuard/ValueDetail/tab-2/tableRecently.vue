<template lang='pug'>
.p-table-base
  el-table(:data="dataSource" border style="width: 100%")
    el-table-column(prop='name' label='变更类型')
      template(slot-scope="{row}")
        span {{ row.name || '-'}}
    el-table-column(prop='times' label='次数')
      template(slot-scope="{row}")
        span {{ (row.times || row.times === 0) ? row.times : "-"  }}
    el-table-column(prop='date' label='最近一次变更日期')
      template(slot-scope="{row}")
        span {{ row.date || '-' }}
</template>

<script>
export default {
  props: {
    dataSource: {
      type: Array,
      default: () => ([])
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
