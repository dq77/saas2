<template lang="pug">
Card.p-card(title='股东结构')
  el-scrollbar
    .p-table.p-height-max
      el-table(:data='result' ref="gdjgTable" v-loading='loading' :fit='true' stripe)
        el-table-column(prop='name' align='left' label='股东及出资信息')
        el-table-column(prop='holdingRatio' align='right' label='持股比例')
        el-table-column(prop='holdingNum' align='right' label='持股金额')
</template>

<script>
import { watch } from '@vue/composition-api'
import Card from '@/components/Card'
import useShareHolder from '../hooks/useShareHolder'
export default {
  props: {
    companyName: {
      type: String,
      required: true
    }
  },

  components: { Card },

  setup(props, { root }) {
    const { companyName } = props
    const { loading, result, doResult } = useShareHolder({companyName})

    watch(
      () => props.companyName,
      (value) => {
        doResult({ companyName: value })
      }
    )

    return {
      loading,
      result
    }
  }
}
</script>

<style lang="stylus" scoped>
.p-height-max
  max-height 160px
</style>
