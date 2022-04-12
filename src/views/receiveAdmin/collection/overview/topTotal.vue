<template lang="pug">
fragment
  el-row.row
    el-col.col(:span='8')
      Info(title="剩余应收总金额" :value='totalInfo && toAmountStr(totalInfo.remainReceivableAmount || 0, 2, true) || 0' :url='totalInfo && totalInfo.img')
    el-col.col(:span='8')
      Info(title="逾期总金额" :value='totalInfo && toAmountStr(totalInfo.overdueAmount || 0, 2, true) || 0 ' :url='totalInfo && totalInfo.img')
    el-col.col(:span='8')
      Info(title="逾期金额占比" :value='totalInfo && totalInfo.overduePercent || "0%"' :url='totalInfo && totalInfo.img')
</template>
<script>
import { toAmountStr } from '@/utils/util'
import Info from '../../components/info'
export default {
  components: {
    Info
  },
  props: {
    totalInfo: {
      type: Object,
      default: () => ({})
    }
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
  margin-bottom 10px
  >.col:not(:last-child)
    padding-right 10px
</style>
