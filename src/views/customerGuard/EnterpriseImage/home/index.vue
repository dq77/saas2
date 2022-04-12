<template lang="pug">
.detail-home-main(v-loading='loading')
  //- 基本信息
  Base(ref='home-base' :dataSource='result')
  .home-inline
    //- 涉诉
    Litigation(ref='home-litigation')
    //- 预警动态
    Warning(ref='home-warning')
  //- 风险扫描
  RiskScan(ref='home-riskScan')
  //- 新闻舆情
  News
</template>

<script>
import Base from './base/index'
import Litigation from './litigation'
import Warning from './warning'
import RiskScan from './riskScan'
import News from './news'
import { inject, ref, getCurrentInstance, provide } from '@vue/composition-api'
import useAsync from 'hooks/useAsync'
import ajaxStore from '@/apis'
import useEventBus from '@/hooks/useEventBus'
import busStore from '@/utils/busStore'
export default {
  components: {
    Base,
    Litigation,
    Warning,
    RiskScan,
    News
  },
  setup(props, { emit }) {
    const refs = ref(null)
    refs.value = getCurrentInstance().refs

    const { emitEvent } = useEventBus({
      event: busStore.getRefs
    })
    emitEvent(refs)

    const { loading, result } = inject('baseInfo')

    const { getScanning } = ajaxStore.customer.enterprise

    const { loading: scanningLoading, result: scanningInfo } = useAsync({
      request: getScanning,
      params: {
        companyName: inject('companyName')
      }
    })

    provide('scanningInfo', {
      loading: scanningLoading,
      result: scanningInfo
    })

    return {
      loading,
      result,
      refs
    }
  }
}
</script>

<style lang="stylus" scoped>
.detail-home-main
  padding 40px 20px
.home-inline
  display flex
  margin 40px 0
</style>
