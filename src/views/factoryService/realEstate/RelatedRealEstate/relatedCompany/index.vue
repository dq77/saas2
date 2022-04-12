<template lang="pug">
.p-company-tree
  CompanyTree(:companyName='companyName' v-loading='loading || upLoading' :upData='upResult' :downData='result' :actualCompanyName='actualCompanyName')
</template>
<script>
import CompanyTree from './companyTree'
import useAsync from 'hooks/useAsync'
import ajaxStore from '@/apis'
import { watch } from '@vue/composition-api'
export default {
  props: {
    companyName: {
      type: String,
    },
    actualCompanyName: {
      type: String,
    },
  },
  components: {
    CompanyTree
  },
  setup(props) {
    const callback = (res) => {
      const { data: { data } } = res
      const children = data && data.length ? data[0].children : []
      children.map((item, key) => {
        children[key].type = 'down'
        children[key].key = key
      })
      return {
        data: children
      }
    }
    const upCallback = (res) => {
      const { data: { data } } = res
      const children = data && data.length ? data[0].children : []
      children.map((item, key) => {
        children[key].type = 'up'
      })
      return {
        data: children
      }
    }

    const { getRelatedCompanyByLevel } = ajaxStore.factoryService.realEstate
    // 接口
    const { loading, doResult, result } = useAsync({
      request: getRelatedCompanyByLevel,
      init: false,
      callback
    })
    // 接口
    const {
      loading: upLoading,
      doResult: upDoResult,
      result: upResult
    } = useAsync({
      request: getRelatedCompanyByLevel,
      init: false,
      callback: upCallback
    })
    const initMethods = async () => {
      doResult({
        companyName: props.companyName,
        dir: 'down'
      })
      upDoResult({
        companyName: props.companyName,
        dir: 'up'
      })
    }
    if (props.companyName) {
      initMethods()
    }
    watch(
      () => props.companyName,
      (value) => {
        if (value) initMethods()
      }
    )

    return {
      loading,
      upLoading,
      result,
      upResult
    }
  },
}
</script>
<style lang="stylus" scoped>
.p-company-tree
  overflow hidden
</style>
