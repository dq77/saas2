<template lang="pug">
div
  .p-table-flex(v-for='line in tableData')
    .p-table-item(:style='{minWidth: item.minWidth, width: width}' v-for='item in line')
      .p-table-item-label(:style='{textAlign: align, paddingLeft: align === "left" ? "20px" : ""}') {{item.label}}
      .p-table-item-num(:style='{textAlign: align}') {{item.value || '-'}}
</template>

<script>
import { ref, watch } from '@vue/composition-api'
export default {
  props: {
    source: {
      type: Object,
      default: () => ({})
    },
    columns: {
      type: Array,
      default: () => ([])
    },
    row: {
      type: Number,
      default: 4
    },
    width: {
      type: String
    },
    align: {
      type: String,
      default: 'center'
    }
  },
  setup(props, { root }) {
    const tableData = ref([])

    // 根据row对tableData进行换行
    const _reCompute = (list) => {
      const num = props.row
      const data = [[]]
      let line = 0
      list.map((item, index) => {
        if (index && index % num === 0) {
          data.push([])
          line++
        }
        data[line].push(item)
      })
      return data
    }

    // 将source与columns一一匹配
    const _setTableData = (source) => {
      const list = []
      props.columns.map((item, key) => {
        list.push({
          label: item.label,
          value: source ? source[item.prop] : '',
          minWidth: item.minWidth,
          slotName: item.slotName
        })
      })
      return list
    }
    tableData.value = _reCompute(_setTableData(props.source))

    watch(
      () => props.source,
      (value) => {
        tableData.value = _reCompute(_setTableData(value))
      }
    )

    return {
      tableData
    }
  }
}
</script>

<style lang="stylus" scoped>
.p-table-flex
  display flex
.p-table-item
  width 100%
  .p-table-item-label
    background #E5E7EF
    color #263862
    text-align center
    padding 18px 0
    font-weight bold
  .p-table-item-num
    background #F3F4F8
    color #494949
    text-align center
    padding 20px
</style>
