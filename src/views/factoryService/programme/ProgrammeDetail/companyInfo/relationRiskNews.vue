<template lang="pug">
.p-detail-item(v-loading='loading')
  .p-detail-item-title
    span 关联企业风险舆情
    el-button.p-check-btn(type='text' @click='relatedDialogShow' :weblogs-anchor='weblogs') 查看
  .p-detail-item-content
    TableCard(:source='result' :columns='relationRiskColumns')
  el-dialog(
    width='90%'
    :center='true'
    :visible.sync='visible')
    RelatedRisk(:companyName='companyName')
</template>

<script>
import { watch, ref } from '@vue/composition-api'
import RelatedRisk from '../../components/relatedRisk'
import TableCard from '../components/tableCard'
import useRelationRiskNews from '@/views/factoryService/realEstate/hooks/useRelationRiskNews'
import { relationRiskColumns } from '../config'
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

  components: { TableCard, RelatedRisk },

  setup(props, { root }) {
    const visible = ref(false)
    const { companyName, type } = props
    const { loading, doResult, result } = useRelationRiskNews()
    const weblogs = type === 'realEstateCompany' ? 'factory-customerEvaluation-eval-programme-concatView' : 'factory-customerEvaluation-eval-project-concatView'

    if (companyName) {
      doResult({ companyName })
    }

    const relatedDialogShow = () => {
      visible.value = true
    }

    watch(
      () => props.companyName,
      (value) => {
        doResult({ companyName: value })
      }
    )

    return {
      loading,
      relationRiskColumns,
      result,
      relatedDialogShow,
      visible,
      weblogs
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
