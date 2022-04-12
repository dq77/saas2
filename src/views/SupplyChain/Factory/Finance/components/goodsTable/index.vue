<template lang='pug'>
Table(
  :dataSource='dataSource'
  :columns='columns'
  :loading='loading'
)
  template(slot='mainPicPath' slot-scope='{row}')
    el-image.p-table-img(:src='row.mainPicPath ? downloadUrl + row.mainPicPath : ""')
      div(slot='error')
        img(:src='`${$assetsBaseUrl}/common/alt.png`')
  template(slot='extendData' slot-scope='{row}')
    div(v-for='item in row.extendData') {{ item.name }} : {{ item.valueName }}
  template(slot='addCostPriceList' slot-scope='{row}')
    div(v-for='item in row.addCostPriceList') {{ item.name }} : {{ item.singleFee }}
</template>

<script>
import Table from '@/components/qjd/table'
import { toPrefixUrl } from '@/utils/util'
import { columns, prefixFileUrl } from './config'

export default {
  components: {
    Table,
  },
  props: {
    dataSource: Array,
    loading: Boolean,
    mode: { // order下单信息，deliver发货信息
      type: String,
      default: 'order'
    }
  },
  setup(props, { root }) {
    const downloadUrl = toPrefixUrl(prefixFileUrl)
    if (props.mode === 'deliver') {
      columns[6].key = 'deliverQuantity'
      columns[8].key = 'deliverPrice'
    }
    return {
      downloadUrl,
      columns
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
</style>
