<template lang="pug">
.peripheral-risk-main
  .relation-title 周边风险
  .relation-content(v-loading='loading')
    el-collapse(v-if='result && result.length' v-model='activeName' @change='handleChange')
      el-collapse-item(v-for='(item, index) in result' :name='index' :key='index')
        template(slot='title')
          span(:class='{"active": activeName.includes(index)}') {{item.title}}
          span.number ({{item.total}}）
        //- 子折叠面板
        SubCollapse(:dataSource='item.list' :index='index')
    .u-empty-tips(v-else) 暂无数据
</template>

<script>
import ajaxStore from '@/apis'
import useAsync from 'hooks/useAsync'
import { reactive, toRefs, inject, watch } from '@vue/composition-api'
import SubCollapse from './subCollapse'
export default {
  components: {
    SubCollapse
  },
  props: {
    dataSource: {
      type: Array,
      default: () => []
    },
    activeTab: {
      type: String
    }
  },
  setup(props) {
    const state = reactive({
      activeName: [],
    })

    const { getRiskScanList } = ajaxStore.customer.enterprise
    // 获取一级列表菜单
    const { loading, result, doResult } = useAsync({
      request: getRiskScanList,
      init: false,
      params: {
        companyName: inject('companyName'),
        creditCode: inject('creditCode'),
      },
      callback: (res) => {
        const { data: { code, data } } = res
        const { riskList } = data
        if (code === '0') {
          const dataSource = riskList.filter((item) => {
            return item.type === 2
          })
          return {
            data: dataSource.length ? dataSource[0].list : []
          }
        }
      }
    })

    const handleChange = (name) => {
      console.log(name)
    }

    watch(
      () => props.activeTab,
      (value) => {
        value === 'peripheralRisk' && !result.value && doResult()
      }
    )

    return {
      handleChange,
      loading,
      result,
      ...toRefs(state)
    }
  }
}
</script>

<style lang="stylus" scoped>
@import '../index.styl';
.peripheral-risk-main
  .number,
  .active
    color #3B68F0
</style>
