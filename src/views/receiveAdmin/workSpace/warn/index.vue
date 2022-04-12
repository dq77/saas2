<template lang='pug'>
.warn
  Header(title='应收预警' :left='20')
    .warn-header
      el-button(:type='current === 1 ? "primary" : "default"' @click='clickCheckList(1)') 按应收计划
      el-button(:type='current === 2 ? "primary" : "default"' @click='clickCheckList(2)') 按应收款项
  .warn-content(v-loading='aLoading || bLoading')
    el-scrollbar(style="height: 100%; width: 100%;padding-bottom: 29px" v-if='list && list.length')
      Card.warn-content-card(v-for='item in list' :key='item.id' :item='item' :type='current')
    Empty(v-else)
    .warn-footer(@click='route' v-if='list && list.length') 查看全部
</template>

<script>
import { reactive, toRefs } from '@vue/composition-api'
import Header from '@/components/qjd/header'
import Card from './card'
import Empty from '../components/empty'
import ajaxStore from '@/apis'
import useAsync from 'hooks/useAsync'
import { nullCallback } from '../../utils'
export default {
  components: {
    Header,
    Card,
    Empty
  },
  setup(props, { root: { $router } }) {
    // ajaxStore
    const { receive: { getBadDebtsByReceivablePlanDataView, getBadDebtsByFundTypeDataView } } = ajaxStore
    // state
    const state = reactive({
      planData: null,
      current: 1,
      loading: false,
      aList: null,
      bList: null,
      list: null,
      isEmpty: false
    })
    // methods
    const route = () => {
      $router.push({ name: 'InfoSearch', query: { overdueStatus: 2 } })
    }
    const clickCheckList = (key) => {
      state.current = key
      state.list = state.current === 1 ? state.aList : state.bList
    }
    const initNotInfo = async() => {
      const { data: bData } = await bResult()
      const { data: aData } = await aResult()
      if (!aData.length && !bData.length) state.isEmpty = true
    }
    // async
    const { loading: aLoading, doResult: aResult } = useAsync({
      init: false,
      request: getBadDebtsByReceivablePlanDataView,
      callback: res => nullCallback(res, 'array'),
      successCallBack: ({code, data}) => {
        if (code === '0') {
          state.aList = data
          state.list = state.aList
        }
      }
    })
    const { loading: bLoading, doResult: bResult } = useAsync({
      init: false,
      request: getBadDebtsByFundTypeDataView,
      callback: res => nullCallback(res, 'array'),
      successCallBack: ({code, data}) => {
        if (code === '0') state.bList = data
      }
    })
    initNotInfo()

    return {
      aLoading,
      bLoading,
      route,
      ...toRefs(state),
      clickCheckList
    }
  }
}
</script>

<style lang='stylus' scoped>
@import '../style'
.warn
  flex 1
  height 362px
  background #fff
  margin-top var(--smallSpace)
  display flex
  flex-direction column
.warn-header
  margin-right 20px
.warn-content
  position relative
  padding 20px
  height 312px
  flex-grow 1
.warn-content-card + .warn-content-card
  margin-top var(--smallSpace)
.warn-footer
  position absolute
  left 0
  bottom 0
  width 100%
  height 39px
  line-height 39px
  text-align center
  border-top 1px solid #eaebee
  color #848484
  background-color #fff
  z-index 10
  cursor pointer
</style>
