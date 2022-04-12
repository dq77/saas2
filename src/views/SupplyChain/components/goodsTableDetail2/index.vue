<template lang='pug'>
div
  Table(
    :border='true'
    :cellStyle='cellStyle'
    :dataSource='goodsData'
    :columns='tableColumns'
  )
    //- 图片 mainPicPath
    template(slot='mainPicPath' slot-scope='{row}')
      el-image.p-table-img(:src='row.mainPicPath ? downloadUrl + row.mainPicPath : ""')
        div(slot='error')
          img(:src='`${$assetsBaseUrl}/common/alt.png`')
    //- 产品名称 goodsName
    template(slot='goodsName' slot-scope='{row}')
      div {{ row.goodsName }}
      DiscountForName(
        v-if='showDiscount && row.marketingLogos'
        :isPurchaseRestricted='row.isPurchaseRestricted'
        :marketingCount='row.marketingCount'
        :marketingDiscount='row.marketingDiscount'
      )
    //- 产品属性 extendData
    template(slot='extendData' slot-scope='{row}')
      template(v-if='row.extendData && row.extendData.length > 0')
        div(v-for='item in row.extendData') {{ item.name }} : {{ item.valueName }}
      template(v-else)
        span - -
    //- 附加费 addedCostPriceVOS
    template(slot='addedCostPriceVOS' slot-scope='{row}')
      template(v-if='row.addedCostPriceVOS && row.addedCostPriceVOS.length')
        div(v-for='item in row.addedCostPriceVOS') {{ item.name }} : {{ item.singleFee | toAmountStr(2, true) }}
      template(v-else)
        span - -
    //- 单价 price 需要dataKey
    template(slot='price' slot-scope='{row}')
      DiscountForPrice(
        v-if='showDiscount && row.marketingLogos'
        :originalPrice='row[dataKeys.price]'
        :marketingPrice='row.marketingPrice'
      )
      span.p-nowrap(v-else) {{row[dataKeys.price] | toAmountStr(2, true)}}
    //- 数量 quantity 需要dataKey
    template(slot='quantity' slot-scope='{row}')
      span {{ row[dataKeys.quantity] }}
      DiscountForQuantity(
        v-if='showDiscount && row.marketingLogos'
        :overRestrictedStrategy='row.overRestrictedStrategy'
        :marketingQuantity='row.marketingQuantity'
        :originalPriceCount='row.originalPriceCount'
      )
</template>

<script>
import { computed } from '@vue/composition-api'
import Table from '@/components/qjd/table'
import { toPrefixUrl, toAmountStr } from '@/utils/util'
import DiscountForName from './discountForName'
import DiscountForQuantity from './discountForQuantity'
import DiscountForPrice from './discountForPrice'
import { columns, prefixFileUrl, defaultDataKeys } from './config'

export default {
  components: {
    Table,
    DiscountForName,
    DiscountForQuantity,
    DiscountForPrice,
  },
  props: {
    showDiscount: {
      type: Boolean,
      default: true
    },
    columns: Array,
    goodsData: Array,
  },
  setup(props, { root }) {
    const downloadUrl = toPrefixUrl(prefixFileUrl)

    const dataKeys = computed(() => {
      const res = { ...defaultDataKeys }
      const columnsNow = props.columns || columns
      columnsNow.forEach(col => (col.dataKey && (res[col.key] = col.dataKey)))
      return res
    })
    // 单元格样式
    const cellStyle = () => {
      return {
        'vertical-align': 'top'
      }
    }

    return {
      downloadUrl,
      tableColumns: props?.columns ?? columns,
      dataKeys,
      toAmountStr,
      cellStyle,
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
.p-nowrap
  white-space nowrap
</style>
