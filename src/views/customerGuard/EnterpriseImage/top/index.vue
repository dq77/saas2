<template lang="pug">
.detail-top
  //- 基本信息
  Base
  //- 导航
  Summary(:moduleRefs='moduleRefs' :triggerClick='triggerClick')
</template>

<script>
import Base from './base'
import Summary from './summary'
import useAsync from 'hooks/useAsync'
import ajaxStore from '@/apis'
import { inject, provide } from '@vue/composition-api'
export default {
  components: {
    Base,
    Summary
  },
  props: {
    moduleRefs: {
      type: Object,
      default: () => {}
    },
    triggerClick: {
      type: Function,
      defaulut: () => {}
    }
  },
  setup(props) {
    const { getTopInfo } = ajaxStore.customer.enterprise

    const { loading, result } = useAsync({
      request: getTopInfo,
      params: {
        companyName: inject('companyName')
      }
    })

    provide('topInfo', { loading, result })

    return {
      loading,
      result
    }
  }
}
</script>

<style lang="stylus" scoped>
.detail-top
  background #ffffff
  padding 30px 20px 25px 20px
  border 1px solid #EAEBEE
  margin-bottom 10px
</style>
