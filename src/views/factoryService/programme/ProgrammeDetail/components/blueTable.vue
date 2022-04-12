<template lang="pug">
.p-detail-card
  .p-card-title(v-if='title') {{title}}
  .p-table-flex
    .p-table-item(:style='{minWidth: item.minWidth, width: width}' v-for='item in tableData')
      .p-table-item-label {{item.label}}
      .p-table-item-num(v-if='item.slotName && typeof $scopedSlots[item.slotName] === "function"')
        slot(:name='item.slotName')
      .p-table-item-num(v-else) {{item.value || '-'}}
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
    title: {
      type: String,
    },
    width: {
      type: String
    }
  },

  setup(props, { root }) {
    const tableData = ref([])

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
    tableData.value = _setTableData(props.source)

    watch(
      () => props.source,
      (value) => {
        tableData.value = _setTableData(value)
      }
    )

    return {
      tableData
    }
  }
}
</script>

<style lang="stylus" scoped>
.p-card-title
  background #728BC2
  color #fff
  font-size 18px
  padding 18px
  box-shadow 4px 7px 12px 0px rgba(60, 93, 164, 0.39)
.p-table-flex
  display flex
  flex-wrap wrap
  margin-bottom 30px
  background url(//cdn.qjdchina.com/static-online/saas/factoryService/programme/project-detail-bg.png) right bottom no-repeat #3c5da4
  background-size cover
  padding 0 10px
.p-table-item
  width 20%
  color #fff
  font-size 14px
  .p-table-item-label
    text-align left
    padding 18px 0 10px 10px
    border-bottom 1px solid #728bc2
  .p-table-item-num
    text-align left
    padding 10px 0 18px 10px
</style>
