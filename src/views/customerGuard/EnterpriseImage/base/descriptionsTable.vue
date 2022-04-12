<template lang="pug">
table.p-table-base.table.table-layout-main
  tr(v-for='(line, index) in columns')
    template(v-for='(item, key) in line')
      th {{item.label}}
      td(:colSpan='line.length === 1 ? 3 : 1')
        slot(v-if="slots[item.key]", :name="item.key", :dataSource="dataSource")
        fragment(v-else) {{ item.render ? item.render(dataSource, dataSource && dataSource[item.key] ? dataSource[item.key] : '') : dataSource && dataSource[item.key] ? dataSource[item.key] : '-' }}
</template>

<script>
export default {
  props: {
    columns: {
      type: Array,
      default: () => [],
    },
    dataSource: {
      type: Object,
      default: () => ({}),
    },
  },
  setup(props, { slots }) {
    return {
      slots
    }
  }
}
</script>

<style lang="stylus" scoped>
.p-table-base
  th,td
    height 60px
    font-size 14px
    font-weight normal
    color #2D2926
</style>
