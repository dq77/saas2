<template lang="pug">
.page-main
  //- 催收详情
  CollectionDetail
  .content-box(style="background: #fff;border-radius: 4px;")
    Tabs(
      :currentIndex="currentApis.currentIndex"
      @selectHandle="currentApis.selectHandle"
    )
    //- 应收详情
    div(v-if="currentApis.currentIndex === 1")
      ReceiveDetail
    //- 联系方式
    div(v-if="currentApis.currentIndex === 2")
      LinkWay
    //- 阶段回款记录
    div(v-if="currentApis.currentIndex === 3")
      PaymentCycle
    //- 催收记录
    div(v-if="currentApis.currentIndex === 4")
      Record
</template>
<script>
import { toRefs, reactive } from '@vue/composition-api'
import Pagination from '@/components/qjd/pagination'
import Table from '@/components/qjd/table'
import CollectionDetail from './collection'
import ReceiveDetail from './receive'
import LinkWay from './linkWay'
import PaymentCycle from './paymentCycle'
import Record from './record'
import Tabs from '../components/tab'
import useCurrent from './useCurrent.js'

export default {
  components: {
    Pagination,
    Table,
    File,
    CollectionDetail,
    Tabs,
    ReceiveDetail,
    LinkWay,
    PaymentCycle,
    Record
  },
  setup(props, { root }) {
    const currentApis = useCurrent()
    // state
    const state = reactive({ currentApis })

    return {
      ...(toRefs(state))
    }
  },
}
</script>
<style lang="stylus" scoped>
.content-box
  padding-bottom: 57px
</style>
