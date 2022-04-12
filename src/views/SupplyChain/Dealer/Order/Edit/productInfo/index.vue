<template lang="pug">
.p-product-info
  .p-btns
    el-button(
      type='primary'
      :disabled='!hasBaseInfo'
      @click='tableEditState.addRow'
    ) 添加新行
    el-button(
      plain
      :disabled='!hasBaseInfo'
      @click='tableEditState.delSelectedRows'
    ) 删除
  .p-table
    Table(
      ref='tableRef'
      row-key='__id'
      :checkbox='true'
      :stripe='false'
      :index='false'
      :loading='tableState.loading'
      :dataSource='tableState.dataSource'
      :columns='tableColumns'
      :cellStyle='tableEditState.cellStyle'
      @selectionHandle='tableState.selectionChange'
      @cellChangeHandle='tableEditState.cellChangeHandle'
    )
      template(slot="mainPicPath" slot-scope="{ row }")
        el-image.p-table-img(:src='row.mainPicPath ? downloadUrl + row.mainPicPath : ""')
          div(slot='error')
            img(:src='`${$assetsBaseUrl}/common/alt.png`')
      template(slot='name' slot-scope='{ row, $index }')
        el-select(
          value-key='goodsId'
          :filterable='true'
          :clearable='true'
          :remote='true'
          :remote-method='v => tableEditState.getProductOptions(v, "name", row)'
          :disabled='!hasBaseInfo'
          :loading='row.productLoading'
          v-model='row.name'
          @change='v => tableEditState.cellProductChangeHandle(v, "name", row, $index)'
          @focus='() => tableEditState.cellProductFocusHandle("name", row)'
        )
          el-option(
            v-for='item in row.productOptions'
            :key='item.value.goodsId'
            :label='item.value.name'
            :value='item.value'
            :disabled='item.disabled'
          ) {{ `${item.value.name}(${item.value.productSn})` }}
        DiscountForName(
          v-if='row.marketingLogos'
          :isPurchaseRestricted='row.isPurchaseRestricted'
          :marketingCount='row.marketingCount'
          :marketingDiscount='row.marketingDiscount'
        )
      template(slot='productSn' slot-scope='{ row, $index }')
        el-select(
          value-key='goodsId'
          :filterable='true'
          :clearable='true'
          :remote='true'
          :remoteMethod='v => tableEditState.getProductOptions(v, "productSn", row)'
          :disabled='!hasBaseInfo'
          :loading='row.productLoading'
          v-model='row.productSn'
          @change='v => tableEditState.cellProductChangeHandle(v, "productSn", row, $index)'
          @focus='() => tableEditState.cellProductFocusHandle("productSn", row)'
        )
          el-option(
            v-for='item in row.productOptions'
            :key='item.value.goodsId'
            :label='item.value.productSn'
            :value='item.value'
            :diabled='item.disabled'
          ) {{ `${item.value.productSn}(${item.value.name})` }}
      template(slot='extendData' slot-scope='{ row, $index }')
        template(v-if='row.extendData && row.extendData.length > 0')
          div(v-for='attribute in row.extendData')
            div {{ attribute.label }}：
            el-select(
              value-key='id'
              :filterable='true'
              :clearable='true'
              :remote='true'
              :remoteMethod='v => tableEditState.getExtendAttributeOptions(v, attribute.key, attribute)'
              :loading='attribute.loading'
              v-model='attribute.value'
              @focus='() => tableEditState.cellExtendAttributeFocusHandle(attribute.key, attribute)'
              @change='v => tableEditState.cellChangeHandle(v, "extendData", row, $index, attribute)'
            )
              el-option(
                v-for='option in attribute.options'
                :key='option.value.id'
                :label='option.value.label'
                :value='option.value'
              )
        template(v-else)
          span - -
      template(slot='goodsPrice' slot-scope='{row, $index}')
        div(v-if='row.name && row.name.intervalPrice')
          template(v-if='row.marketingLogos')
            div 折扣价：{{row.marketingPrice | toAmountStr(2, true)}}
            .p-original-price 原价：{{row.goodsPrice | toAmountStr(2, true)}}
          template(v-else)
            span {{row.goodsPrice | toAmountStr(2, true)}}
        div(v-else)
          el-input-number(
            style='width: 100%;'
            controls-position='right'
            :precision='2'
            :step='1'
            :min='0'
            v-model='row.goodsPrice'
            @change='v => tableEditState.cellChangeHandle(v, "goodsPrice", row, $index)'
          )
          .p-discount-price(v-if='row.marketingLogos') 折扣价：{{ row.marketingPrice | toAmountStr(2, true)}}
      template(slot='addedCostPriceVOS' slot-scope='{row, $index}')
        template(v-if='row.addedCostPriceVOS && row.addedCostPriceVOS.length')
          div(v-for='(addedPrice, index) in row.addedCostPriceVOS' :key="addedPrice.code")
            div {{addedPrice.name}}：
            el-input-number(
              style='width: 100%;'
              controls-position='right'
              :precision='2'
              :step='1'
              :min='0'
              v-model='addedPrice.singleFee'
              @change='v => tableEditState.cellChangeHandle(v, "addedCostPriceVOS", row, $index)'
            )
        span(v-else) - -
      template(slot='quantity' slot-scope='{row, $index}')
        div(style="display: flex;")
          el-input-number(
            style="width: 100%;"
            controls-position="right"
            :min="0"
            :max='tableEditState.getMaxQuantity(row)'
            :precision="2"
            :step="1"
            v-model="row.quantity"
            @change='v => tableEditState.cellChangeHandle(v, "quantity", row, $index)'
          )
          DiscountForQuantity(
            v-if='row.marketingLogos'
            :strategy='row.overRestrictedStrategy'
            :marketingQuantity='row.marketingQuantity'
            :originalPriceCount='row.originalPriceCount'
          )
        div(v-if='tableEditState.inventoryState.needShowInvenstory')
          span 库存：
            i.el-icon-loading(v-show='row.queryInventoryLoading')
            span(v-if='typeof row.stockQuantity === "number"') {{ row.stockQuantity }}
            span(v-else) 无
      template(slot='payAmount' slot-scope='{row}')
        template(v-if='typeof row.payAmount === "number"')
          i.el-icon-loading(v-show='row.payAmountLoading')
          span {{ row.payAmount | toAmountStr(2, true) }}
        span(v-else) - -
    GoodsSummary(:summary='summary' v-loading='tableEditState.batchCaclulateLoading')
</template>

<script>
import { computed, reactive, toRefs, ref } from '@vue/composition-api'
import Table from '@/components/qjd/table/index'
import useTable from 'hooks/useTable'
import { toPrefixUrl } from '@/utils/util'
import { tableColumns } from './config'
import useTableEdit from './useTableEdit'
import DiscountForName from '@/views/SupplyChain/components/goodsTableDetail2/discountForName'
import DiscountForQuantity from '@/views/SupplyChain/components/goodsTableDetail2/discountForQuantity'
import GoodsSummary from '@/views/SupplyChain/components/goodsSummary'
export default {
  components: {
    Table,
    DiscountForName,
    DiscountForQuantity,
    GoodsSummary,
  },
  setup(props, { root, emit }) {
    const downloadUrl = toPrefixUrl('/saas-ofc/org/goodsAlbum/getAttachment?fileKey=')
    const tableRef = ref()

    const tableState = useTable({
      tableRef,
      columns: tableColumns,
      isPage: false,
      isInit: false,
      checkbox: true,
      editDataSource: true,
    })

    const tableEditState = useTableEdit({
      tableState,
    })

    const state = reactive({
      tableColumns,
      tableState,
      tableEditState,
    })

    // 表格内所有产品总价的计算
    const summary = computed(() => {
      const res = {
        productSum: tableState.dataSource.length || 0,
        priceSum: [
          { label: '订单总金额', value: 0 }
        ]
      }
      let totalAmount = 0
      tableState.dataSource.forEach(row => {
        if (typeof row.payAmount === 'number') {
          totalAmount += row.payAmount
        }
      })
      res.priceSum[0].value = totalAmount
      return res
    })

    // 是否已填写基础信息，用于判断表格行是否可删减等
    const hasBaseInfo = computed(() => {
      return tableEditState.projectId
    })

    return {
      downloadUrl,
      tableRef,
      summary,
      hasBaseInfo,
      ...toRefs(state),
      // 以下函数提供给父组件调用
      getTableData: tableEditState.getTableData,
      clearTableData: tableEditState.clearTableData,
      resetBaseInfo: tableEditState.resetBaseInfo,
      initEditTableData: tableEditState.initEditTableData,
      initCacheTableData: tableEditState.initCacheTableData,
    }
  },
}
</script>

<style lang="stylus" scoped>
.p-btns
  margin-top 20px
  text-align: left
.p-red
  color #f56c6c
.p-table
  margin-top 20px
.p-table-img
  width 60px
  height 60px
  img
   width 100%
.p-total-amount
  display: flex;
  justify-content: space-between;
  padding 20px 20px
  background: #fef8e1
  .u-amount
    color #f25754
    font-size 14px
    text-align: right
.p-discount-tag
  margin-top 10px
  padding 4px 10px
  border-radius: 4px
  line-height: 17px
  color #F55849
  background-color #FEEEED
.p-original-price
  color #CBCBCD
  text-decoration: line-through;
.p-nowrap
  white-space nowrap
</style>
