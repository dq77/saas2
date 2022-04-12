<template lang='pug'>
TabCard(:title='title')
  Table(
    ref='tableRef'
    :dataSource='dataSource || []'
    :columns="columns || []"
  )
</template>

<script>
// components
import TabCard from '../../components/tabCard'
import Table from '@/components/qjd/table'
// others
import { ref } from '@vue/composition-api'

export default {
  props: {
    title: String,
    dataSource: Array,
    columns: Array
  },
  components: {
    TabCard,
    Table
  },
  setup() {
    const tableRef = ref()
    return {
      tableRef
    }
  }
}
</script>

<style lang='stylus' scoped>
</style>
