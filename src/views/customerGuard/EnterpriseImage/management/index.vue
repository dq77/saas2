<template lang="pug">
.management-main
  //- 工商变更
  BusinessChanges(ref='management-businessChanges')
  //- 竞争分析
  TableModule(
    ref='management-competitionAnalysis'
    title='竞争分析'
    :request='getJingpin'
    :columns='competitionAnalysisColumns'
    :requestDone='requestDone'
    @initDone='scrollToPosition'
  )
  //- 动产抵押
  TableModule(
    ref='management-chattelMortgage'
    title='动产抵押'
    :request='getMortgageInfo'
    :columns='chattelMortgageColumns'
    :requestDone='requestDone'
    @initDone='scrollToPosition'
  )
  //- 股权出质
  TableModule(
    ref='management-equityPledge'
    title='股权出质'
    :request='getEquityInfo'
    :columns='equityPledgeColumns'
    :requestDone='requestDone'
    @initDone='scrollToPosition'
  )
  //- 行政处罚
  TableModule(
    ref='management-administrative'
    title='行政处罚'
    :request='getPunishmentInfo'
    :columns='administrativeSanctionColumns'
    :requestDone='requestDone'
    @initDone='scrollToPosition'
  )
  //- 行政许可
  TableModule(
    ref='management-administrativeLicensing'
    title='行政许可'
    :request='getAdministrativeLicense'
    :columns='administrativeLicensingColumns'
    :requestDone='requestDone'
    @initDone='scrollToPosition'
  )
  //- 税务评级
  TableModule(
    ref='management-taxRating'
    title='税务评级'
    :request='getTaxCredit'
    :columns='taxRatingColumns'
    :requestDone='requestDone'
    @initDone='scrollToPosition'
  )
  //- 重大税收违法
  TableModule(
    ref='management-taxViolation'
    title='重大税收违法'
    :request='getTaxContravention'
    :columns='taxViolationColumns'
    :requestDone='requestDone'
    @initDone='scrollToPosition'
  )
  //- 欠税
  TableModule(
    ref='management-taxArrears'
    title='欠税'
    :request='getOwnTax'
    :columns='taxArrearsColumns'
    :requestDone='requestDone'
    @initDone='scrollToPosition'
  )
  //- 经营异常
  TableModule(
    ref='management-abnormalOperation'
    title='经营异常'
    :request='getAbnormal'
    :columns='abnormalOperationColumns'
    :requestDone='requestDone'
    @initDone='scrollToPosition'
  )
  //- 对外担保
  TableModule(
    ref='management-externalGuarantee'
    title='对外担保'
    :request='getGuarantees'
    :columns='externalGuaranteeColumns'
    :requestDone='requestDone'
    @initDone='scrollToPosition'
  )
</template>

<script>
import BusinessChanges from './businessChanges'
import TableModule from '../components/tableModule'
import ajaxStore from '@/apis'
import { ref, getCurrentInstance, toRefs, reactive } from '@vue/composition-api'
import useEventBus from '@/hooks/useEventBus'
import busStore from '@/utils/busStore'
import { deepCopy } from '@/utils/qjd'
import {
  competitionAnalysisColumns,
  chattelMortgageColumns,
  equityPledgeColumns,
  administrativeSanctionColumns,
  administrativeLicensingColumns,
  taxRatingColumns,
  taxViolationColumns,
  taxArrearsColumns,
  abnormalOperationColumns,
  externalGuaranteeColumns,
  pageModuleTitle,
} from './config'
export default {
  components: {
    BusinessChanges,
    TableModule,
  },
  setup(props, { emit }) {
    const state = reactive({
      pageModuleTitle: deepCopy(pageModuleTitle),
      requestDone: false
    })

    const refs = ref(null)
    refs.value = getCurrentInstance().refs

    const { emitEvent } = useEventBus({
      event: busStore.getRefs
    })

    emitEvent(refs)

    const scrollToPosition = ({title}) => {
      let result = true
      state.pageModuleTitle.forEach((item, index) => {
        if (title === item.title) {
          state.pageModuleTitle[index].result = true
        }
        if (!state.pageModuleTitle[index].result) {
          result = false
        }
      })
      if (result) {
        state.requestDone = result
      }
    }
    const {
      getJingpin,
      getMortgageInfo,
      getEquityInfo,
      getPunishmentInfo,
      getAdministrativeLicense,
      getTaxContravention,
      getOwnTax,
      getAbnormal,
      getGuarantees,
      getTaxCredit,
    } = ajaxStore.customer.enterprise
    return {
      refs,
      getJingpin,
      getMortgageInfo,
      getEquityInfo,
      getPunishmentInfo,
      getAdministrativeLicense,
      getTaxContravention,
      getOwnTax,
      getAbnormal,
      getGuarantees,
      getTaxCredit,
      competitionAnalysisColumns,
      chattelMortgageColumns,
      equityPledgeColumns,
      administrativeSanctionColumns,
      administrativeLicensingColumns,
      taxRatingColumns,
      taxViolationColumns,
      taxArrearsColumns,
      abnormalOperationColumns,
      externalGuaranteeColumns,
      scrollToPosition,
      ...toRefs(state)
    }
  }
}
</script>

<style lang="stylus" scoped>
.management-main
  padding 40px 20px
</style>
