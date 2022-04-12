<template lang='pug'>
.health-status(v-loading='aLoading')
  Header(title='应收健康状况' :left='20')
  div(v-if='!isEmpty')
    Card(
      :totalInfo='list'
      :columns='columns'
    )
  Empty(style='padding: 61px 0 62px 0' v-else)
  Overview
</template>

<script>
import { toRefs, reactive, computed } from '@vue/composition-api'
import Header from '@/components/qjd/header'
import Card from '../components/card'
import Overview from './overview'
import Empty from '@/components/qjd/empty'
import { nullCallback } from '../../utils'
import useAsync from 'hooks/useAsync'
import ajaxStore from '@/apis'
import { columns } from './config'
export default {
  components: {
    Header,
    Card,
    Empty,
    Overview
  },
  setup () {
    // ajaxStore
    const { receive: { getHealthDataView } } = ajaxStore
    // state
    const state = reactive({
      list: {}
    })
    // methods
    const initNotInfo = async() => {
      await aResult()
    }
    // async
    const { loading: aLoading, doResult: aResult } = useAsync({
      init: false,
      request: getHealthDataView,
      callback: res => nullCallback(res, 'object'),
      successCallBack: ({code, data}) => {
        if (code === '0') state.list = data
      }
    })
    // 是否为空
    const isEmpty = computed(() => {
      const values = Object.values(state.list)
      return values.every(item => item === 0)
    })
    initNotInfo()

    return {
      columns,
      aLoading,
      isEmpty,
      ...toRefs(state)
    }
  }
}
</script>

<style lang='stylus' scoped>
.health-status
  margin-top var(--smallSpace)
  background #fff
  .button
    margin-right 20px
</style>
