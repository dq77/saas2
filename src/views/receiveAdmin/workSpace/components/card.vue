<template lang="pug">
fragment
  el-row.row
    el-col.col(
      :span='Math.floor(24/(columns.length || 1))'
      v-for='(item, index) in columns'
      :key='index'
    )
      Info(
        :title='item.title'
        :value='item.transform ? toAmountStr(totalInfo && totalInfo[item.key] || 0, 2, true) : totalInfo && totalInfo[item.key] || 0'
        :url='item.img'
        :tooltip='item.tooltip')
</template>
<script>
import Info from '../../components/info'
import { toAmountStr } from '@/utils/util'
export default {
  components: {
    Info
  },
  props: {
    totalInfo: {
      type: Object,
      default: () => ({})
    },
    columns: {
      type: Array,
      default: () => ([])
    },
  },
  setup(props, { emit, root }) {
    return {
      toAmountStr
    }
  },
}
</script>
<style lang="stylus" scoped>
.row
  background-color #fff
  padding 20px
  >.col:not(:last-child)
    padding-right 10px
</style>
