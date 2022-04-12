<template lang="pug">
.base-main
  //- 工商信息
  Business(ref='base-business')
  //- 融资历程
  Finance(ref='base-finance')
  //- 疑似实控人
  ActualController(ref='base-actualController')
  //- 最终受益人
  Beneficiary(ref='base-beneficiary')
  //- 企业年报
  Report(ref='base-report')
  //- 股东
  Holders(ref='base-holders')
  //- 高管信息
  MainPerson(ref='base-mainPerson')
</template>

<script>
import Business from './business'
import Finance from './finance'
import ActualController from './actualController'
import Beneficiary from './beneficiary'
import Report from './report'
import Holders from './holders'
import MainPerson from './mainPerson'
import { ref, getCurrentInstance } from '@vue/composition-api'
import useEventBus from '@/hooks/useEventBus'
import busStore from '@/utils/busStore'
export default {
  components: {
    Business,
    Finance,
    ActualController,
    Beneficiary,
    Report,
    Holders,
    MainPerson
  },
  setup(props, { emit }) {
    const refs = ref(null)
    refs.value = getCurrentInstance().refs
    const { emitEvent } = useEventBus({
      event: busStore.getRefs
    })
    emitEvent(refs)

    return {
      refs
    }
  }
}
</script>

<style lang="stylus" scoped>
.base-main
  padding 40px 20px
</style>
