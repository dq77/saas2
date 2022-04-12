<template lang="pug">
.p-detail-item(v-loading='loading')
  .p-detail-item-title.p-no-flex
    span 财务数据
  .p-detail-item-content
    TableCard(:source='result' :columns='financeColumns' :row='row')
</template>

<script>
import { watch } from '@vue/composition-api'
import useFinance from '@/views/factoryService/realEstate/hooks/useFinance'
import TableCard from '../components/tableCard'
import { financeColumns } from '../config'
export default {
  props: {
    companyName: {
      type: String,
      required: true
    },
    type: {
      type: String,
      default: 'realEstateCompany'
    }
  },

  components: { TableCard },

  setup(props, { root }) {
    const { companyName, type } = props
    const { loading, doResult, result } = useFinance()
    const row = type === 'realEstateCompany' ? 4 : 6

    if (companyName) {
      doResult({ companyName })
    }

    watch(
      () => props.companyName,
      (value) => {
        doResult({ companyName: value })
      }
    )

    return {
      loading,
      financeColumns,
      row,
      result
    }
  }
}
</script>
<style lang="stylus" scoped>
.p-detail-item
  width 49%
  margin-right 20px
  .p-detail-item-title
    font-size 16px
    color #494949
    margin-bottom 10px
    display flex
    justify-content space-between
.p-detail-item:last-child
  margin-right 0
</style>
