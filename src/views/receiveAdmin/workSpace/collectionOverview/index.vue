<template lang='pug'>
.health-status
  Header(title='催收情况总览' :left='20')
  div(v-loading='aLoading')
    div(v-if='!isEmpty')
      Card(:totalInfo='list' :columns='columns')
    Empty(style='padding: 62px 0' v-else)
</template>

<script>
import { toRefs, reactive, computed } from '@vue/composition-api'
import Header from '@/components/qjd/header'
import Card from '../components/card.vue'
import Empty from '@/components/qjd/empty'
import { nullCallback } from '../../utils'
import useAsync from 'hooks/useAsync'
import ajaxStore from '@/apis'
import { columns } from './config'
export default {
  components: {
    Header,
    Card,
    Empty
  },
  setup (props) {
    // ajaxStore
    const { receive: { getCollectionDataView } } = ajaxStore
    const initNotInfo = async() => {
      await aResult()
    }
    // async
    const { loading: aLoading, doResult: aResult } = useAsync({
      init: false,
      request: getCollectionDataView,
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
    // state
    const state = reactive({
      list: {}
    })

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
