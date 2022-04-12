<template lang='pug'>
div
  div(style='margin-bottom: 20px;')
    el-button(type='primary' @click='goodsTableState.clickDeliverAll') 一键全部发货
  Table(
    :border='true'
    :cellStyle='goodsTableState.cellStyle'
    :dataSource='goodsTableState.tableList'
    :columns='goodsTableState.columns'
    :loading='goodsTableState.getGoodsListloading'
  )
    template(slot='mainPicPath' slot-scope='{row}')
      el-image.p-table-img(:src='row.mainPicPath ? downloadUrl + row.mainPicPath : ""')
        div(slot='error')
          img(:src='`${$assetsBaseUrl}/common/alt.png`')
    //- 产品名称
    template(slot='goodsName' slot-scope='{row}')
      div {{ row.goodsName }}
      .p-discount-tag(v-if='row.marketingLogos')
        | 限时
        span(v-if='row.isPurchaseRestricted==="Y"') 限量
        | 折扣：
        span.p-nowrap {{ row.marketingDiscount }}折
    //- 产品属性
    template(slot='extendData' slot-scope='{row}')
      div(v-for='item in row.extendData') {{ item.name }}：{{ item.valueName }}
    //- 附加费
    template(slot='addCostPriceList' slot-scope='{row}')
      div(v-for='item in row.addCostPriceList') {{ item.name }}：
        span.p-nowrap {{ toAmountStr(item.singleFee, 2, true) }}
    //- 产品单价
    template(slot='price' slot-scope='{row}')
      template(v-if='row.marketingLogos')
        div 折扣价：{{row.marketingPrice | toAmountStr(2, true)}}
        .p-discount-old-price 原价：{{row.price | toAmountStr(2, true)}}
      template(v-else)
        span {{row.price | toAmountStr(2, true)}}
    //- 本次发货数量
    template(slot='currentDeliverCount' slot-scope='{row}')
      div
        el-input-number(
          style='width: 100%;'
          controls-position='right'
          :precision='2'
          :step='1'
          :min='0'
          :max='row._maxDeliver'
          :disabled='row._maxDeliver===0'
          v-model='row.currentDeliverCount'
          @change='val => goodsTableState.changeDeliverCount(val, row)'
        )
      div
        el-button(
          type='text'
          :disabled='row._maxDeliver===0'
          @click='goodsTableState.clickDeliverAllInRow(row)'
        ) 全部
        DiscountForQuantity(
          v-if='row.marketingLogos'
          :overRestrictedStrategy='row.overRestrictedStrategy'
          :marketingQuantity='row.marketingQuantity'
          :originalPriceCount='row.originalPriceCount'
        )
    //- 本次发货总价
    template(slot='currentDeliverTotalPrice' slot-scope='{row}')
      i.el-icon-loading(v-show='row.batchCalculateLoading')
      span {{ row.currentDeliverTotalPrice | toAmountStr(2, true) }}
    //- 剩余应发总价
    template(slot='residueTotalPrice' slot-scope='{row}')
      i.el-icon-loading(v-show='row.batchCalculateLoading')
      span {{ row.residueTotalPrice | toAmountStr(2, true) }}
  GoodsSummary(:summary='goodsTableState.summary' v-loading='goodsTableState.batchCalculateLoading')
</template>

<script>
import { reactive, toRefs } from '@vue/composition-api'
import Table from '@/components/qjd/table'
import { toPrefixUrl, toAmountStr } from '@/utils/util'
import GoodsSummary from '@/views/SupplyChain/components/goodsSummary'
import DiscountForQuantity from '@/views/SupplyChain/components/goodsTableDetail2/discountForQuantity'
import { prefixFileUrl } from './config'
import useGoodsTable from './useGoodsTable'

export default {
  components: {
    Table,
    GoodsSummary,
    DiscountForQuantity,
  },
  setup(props, { root }) {
    const downloadUrl = toPrefixUrl(prefixFileUrl)
    const routeName = root.$route.name
    const { deliverId, orderId, status } = root.$route.query || {}

    const goodsTableState = useGoodsTable({
      orderId: orderId,
      deliverId: deliverId,
      paramFlag: typeof status === 'string' ? '2' : '1',
      paramUpdateFlag: typeof status === 'string',
      routeName
    })

    const state = reactive({
      goodsTableState
    })

    return {
      downloadUrl,
      toAmountStr,
      ...toRefs(state),
      getEditData: goodsTableState.getEditData,
      showWarehouse: goodsTableState.showWarehouse,
      changeWareHouse: goodsTableState.changeWareHouse,
    }
  }
}
</script>

<style lang='stylus' scoped>
.p-table-img
  width 60px
  height 60px
  img
   width 100%

.p-discount-tag
  margin-top 10px
  padding 4px 10px
  border-radius: 4px
  line-height: 17px
  color #F55849
  background-color #FEEEED
.p-discount-old-price
  color #CBCBCD
  text-decoration: line-through;
.p-nowrap
  white-space nowrap
</style>
