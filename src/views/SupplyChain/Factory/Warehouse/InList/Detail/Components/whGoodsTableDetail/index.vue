<template lang='pug'>
div
  Table(
    :dataSource='goodsData'
    :columns='tableColumns'
  )
    template(slot='mainPicPath' slot-scope='{row}')
      el-image.p-table-img(:src='row.mainPicPath ? downloadUrl + row.mainPicPath : ""')
        div(slot='error')
          img(:src='`${$assetsBaseUrl}/common/alt.png`')
    template(slot='extendData' slot-scope='{row}')
      div(v-for='item in row.extendData') {{ item.name }} : {{ item.valueName }}
    template(slot='addCostPriceList' slot-scope='{row}')
      div(v-for='item in row.addCostPriceList') {{ item.name }} : {{ toAmountStr(item.singleFee, 2, true) }}
    template(slot='goodsQuantity' slot-scope='{row}')
      div(
        :class="row.goodsQuantity > 0 ? 'green' : row.goodsQuantity < 0 ? 'red' : ''"
      ) {{ row.goodsQuantity > 0 ? `+${row.goodsQuantity}` : row.goodsQuantity }}
  .p-total-amount
    .u-count(
      :class="totalCount > 0 ? 'green' : totalCount < 0 ? 'red' : ''"
    ) 合计：{{ totalCount > 0 ? `+${totalCount}` : totalCount }}
</template>

<script>
import { computed } from '@vue/composition-api'
import Table from '@/components/qjd/table'
import { toPrefixUrl, toAmountStr } from '@/utils/util'
import { getColumns, prefixFileUrl } from './config'

export default {
  components: {
    Table,
  },
  props: {
    goodsData: Array,
  },
  setup(props, { root }) {
    const downloadUrl = toPrefixUrl(prefixFileUrl)
    const { $route: { name } } = root

    // 表格内所有产品数量的计算
    const totalCount = computed(() => {
      let num = 0
      props.goodsData.forEach(row => {
        num += (row.goodsQuantity ? row.goodsQuantity : 0)
      })
      return num
    })

    return {
      downloadUrl,
      tableColumns: getColumns(name === 'inDetail' ? '入库' : '出库'),
      totalCount,
      toAmountStr,
    }
  }
}
</script>

<style lang='stylus'>
.p-table-img
  width 60px
  height 60px
  img
   width 100%
.p-total-amount
  padding 20px 20px
  background: #fef8e1
  .u-count
    text-align: right
.green
  color: #67C23A
.red
  color: #F56C6C
</style>
