<template lang="pug">
.page-main
  .detail_title 收款对象：{{ customerName }}
  Tabs(
    :dataSource="tabCols"
    :defaultTab="'1'"
    @tabCLick="tabApis.tabCLick"
  )
  //- 应收计划信息
  Plain(v-if="tabApis.currentTab === '1'" :customerId="customerId")
  //- 应收款项信息
  Pay(v-if="tabApis.currentTab === '2'" :customerId="customerId")
  //- 收款信息
  Receive(v-if="tabApis.currentTab === '3'" :customerId="customerId")
  //- 逾期信息
  Overdue(v-if="tabApis.currentTab === '4'" :customerId="customerId")
  //- 应收画像
  Portrait(v-if="tabApis.currentTab === '5'" :customerId="customerId")
</template>
<script>
import { defineComponent, reactive, toRefs } from '@vue/composition-api'
import Tabs from '@/components/qjd/tabs'
import useTabs from 'hooks/useTabs'
import Plain from './plain'
import Pay from './pay'
import Receive from './receive'
import Overdue from './overdue'
import Portrait from './portrait'
import { tabCols } from './config'

export default defineComponent({
  components: {
    Tabs,
    Plain,
    Pay,
    Receive,
    Overdue,
    Portrait
  },
  setup(props, { root: { $route: { query: { customerId, customerName } } } }) {
    const tabApis = useTabs({ currentTab: '1' })
    // state
    const state = reactive({ tabApis })

    return {
      tabCols,
      customerId,
      customerName,
      ...toRefs(state)
    }
  },
})
</script>
<style lang="stylus" scoped>
@import './index.styl';
</style>
