<template lang="pug">
.p-detail-item(v-loading='loading')
  .p-detail-item-title
    span 企业自身舆情风险
    el-button.p-check-btn(type='text' @click='checkCompanyRisk' :weblogs-anchor='weblogs') 查看
  .p-detail-item-content
    TableCard(:source='riskSummary' :columns='riskColumns')
  el-dialog(
    width='90%'
    :center='true'
    :visible.sync='visible')
    CompanyRisk(:companyName='companyName')
</template>

<script>
import { watch, ref } from '@vue/composition-api'
import useRiskNews from '@/views/factoryService/realEstate/hooks/useRiskNews'
import TableCard from '../components/tableCard'
import CompanyRisk from '../../components/companyRisk'
import { riskColumns } from '../config'
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

  components: { TableCard, CompanyRisk },

  setup(props, { root }) {
    const visible = ref(false)
    const { companyName, type } = props
    const { loading, riskSummary, doRiskResult, doResult} = useRiskNews()
    const weblogs = type === 'realEstateCompany' ? 'factory-customerEvaluation-eval-programme-companyView' : 'factory-customerEvaluation-eval-project-companyView'

    if (companyName) {
      doRiskResult({ companyName })
      doResult({ companyName })
    }

    const checkCompanyRisk = () => {
      visible.value = true
    }

    watch(
      () => props.companyName,
      (value) => {
        doRiskResult({ companyName: value })
        doResult({ companyName: value })
      }
    )

    return {
      checkCompanyRisk,
      visible,
      loading,
      riskColumns,
      riskSummary,
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
</style>
