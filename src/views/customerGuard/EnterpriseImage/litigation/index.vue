<template lang="pug">
.litigation-main
  //- 立案信息
  TableModule(
    ref='litigation-courtRegister'
    title='立案信息'
    :request='getCourtRegister'
    :columns='courtRegisterColumns'
    :requestDone='requestDone'
    @initDone='scrollToPosition'
  )
  //- 开庭公告
  TableModule(
    ref='litigation-ktannouncement'
    title='开庭公告'
    :request='getKtannouncement'
    :columns='ktannouncementColumns'
    :requestDone='requestDone'
    @initDone='scrollToPosition'
  )
  //- 裁判文书
  TableModule(
    ref='litigation-lawSuit'
    title='裁判文书'
    :request='getLawSuit'
    :columns='lawSuitColumns'
    :requestDone='requestDone'
    @initDone='scrollToPosition'
  )
  //- 失信人
  TableModule(
    ref='litigation-dishonest'
    title='失信人'
    :request='getDishonest'
    :columns='dishonestColumns'
    :requestDone='requestDone'
    @initDone='scrollToPosition'
  )
  //- 被执行人
  TableModule(
    ref='litigation-zhixinginfo'
    title='被执行人'
    :request='getZhixinginfo'
    :columns='zhixinginfoColumns'
    :requestDone='requestDone'
    @initDone='scrollToPosition'
  )
  //- 终本案件
  TableModule(
    ref='litigation-endCase'
    title='终本案件'
    :request='getEndCase'
    :columns='endCaseColumns'
    :requestDone='requestDone'
    @initDone='scrollToPosition'
  )
  //- 限制消费令
  TableModule(
    ref='litigation-consumptionRestriction'
    title='限制消费令'
    :request='getConsumptionRestriction'
    :columns='consumptionRestrictionColumns'
    :requestDone='requestDone'
    @initDone='scrollToPosition'
  )
</template>

<script>
import TableModule from '../components/tableModule'
import ajaxStore from '@/apis'
import { ref, getCurrentInstance, toRefs, reactive } from '@vue/composition-api'
import useEventBus from '@/hooks/useEventBus'
import busStore from '@/utils/busStore'
import { deepCopy } from '@/utils/qjd'
import {
  courtRegisterColumns,
  ktannouncementColumns,
  lawSuitColumns,
  dishonestColumns,
  zhixinginfoColumns,
  endCaseColumns,
  consumptionRestrictionColumns,
  taxArrearsColumns,
  abnormalOperationColumns,
  pageModuleTitle,
} from './config'
export default {
  components: {
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
      })
      state.pageModuleTitle.forEach((item, index) => {
        if (!item.result) {
          result = false
        }
      })
      if (result) {
        state.requestDone = result
      }
    }

    const { getCourtRegister, getKtannouncement, getLawSuit, getDishonest, getZhixinginfo, getEndCase, getConsumptionRestriction } = ajaxStore.customer.enterprise
    return {
      refs,
      getCourtRegister,
      getKtannouncement,
      getLawSuit,
      getDishonest,
      getZhixinginfo,
      getEndCase,
      getConsumptionRestriction,
      courtRegisterColumns,
      ktannouncementColumns,
      lawSuitColumns,
      dishonestColumns,
      zhixinginfoColumns,
      endCaseColumns,
      consumptionRestrictionColumns,
      taxArrearsColumns,
      abnormalOperationColumns,
      scrollToPosition,
      ...toRefs(state)
    }
  }
}
</script>

<style lang="stylus" scoped>
.litigation-main
  padding 40px 20px
</style>
