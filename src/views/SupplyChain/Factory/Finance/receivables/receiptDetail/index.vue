<template lang="pug">
.page-main
  Card(noTitle noWrap)
    .p-title 基本信息
    Bar(
      :info='detailState.baseInfo'
      v-loading='detailState.loading'
    )
  Card.p-mg(noTitle noWrap)
    .p-title 金额信息
    MultiAccountBar(
      style='padding: 20px'
      :totalData='detailState.totalData'
      :accountsData='detailState.listData'
      v-loading='detailState.loading'
    )
  Card.p-mg(noTitle noWrap)
    .p-title 产品信息
    //- table
    .p-table-wrap
      GoodsTable(
        mode='deliver'
        :dataSource='detailState.goodsData'
        :loading='detailState.loading'
      )
</template>
<script>
import { reactive, toRefs } from '@vue/composition-api'
import Card from '@/components/Card'
import MultiAccountBar from '@/views/SupplyChain/Factory/Finance/components/multiAccountBar/index'
import GoodsTable from '@/views/SupplyChain/Factory/Finance/components/goodsTable/index'
import useDetail from './useDetail'
import Bar from './bar'

export default {
  components: {
    Card,
    MultiAccountBar,
    GoodsTable,
    Bar,
  },
  setup(props, { root }) {
    const { billNo } = root.$route?.query

    // 顶部统计
    const detailState = useDetail({
      params: { turnoverSn: billNo }
    })
    // state
    const state = reactive({
      detailState,
    })
    return {
      ...toRefs(state),
    }
  },
}
</script>

<style lang="stylus" scoped>
.p-mg
  margin-top 10px
.p-title
  margin 15px 0 5px 20px
  font-size 14px
  color #494949
.p-table-wrap
  margin 20px
</style>
