<template lang='pug'>
TabCard(:title='title' subtitle='单位：亿元')
  Table.enterpriseImageFinance(
    v-if='dataSource && dataSource.length'
    :dataSource='dataSource || []'
    :columns="columns || []"
    :rowClassName='rowClassName'
  )
  Empty(v-else)
</template>

<script>
// import { reactive, ref, toRefs } from '@vue/composition-api'
import TabCard from '../../components/tabCard'
import Table from '@/components/qjd/table'
import Empty from '@/components/qjd/empty'
export default {
  props: {
    title: String,
    loading: Boolean,
    dataSource: Array,
    columns: Array
  },
  components: {
    TabCard,
    Table,
    Empty
  },
  setup (props) {
    const rowClassName = ({ row, rowIndex }) => {
      if (row.attr === 'first') {
        return 'row-first-title'
      } else if (row.attr === 'seccond') {
        return 'row-seccond-title'
      } else {
        return ''
      }
    }

    return {
      rowClassName
    }
  }
}
</script>

<style lang='stylus'>
.enterpriseImageFinance
  .row-first-title
    font-weight bold
    td:not(:first-of-type) span
      display none
  .row-seccond-title td:first-child span
    margin-left 10px
</style>
