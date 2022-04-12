<template lang="pug">
  .cargo-detail
    Table(:columns='columns' :dataSource='dataSource' :showSummary='true' :getSummaries='(param) => getSummaries(param, summaryProp)' :cellStyle='(data) => cellStyle(data, "goodsPayTotalAmount")')
      template(slot="reverseProduct" slot-scope="{ row }" )
        .cloumn-commodity
          el-image.cloumn-commodity_img(:src='row.mainPicPath?`${baseUrl}/saas-ofc/org/goodsAlbum/getAttachment?fileKey=${row.mainPicPath}`:""')
            div(slot='error')
              img(:src='`${$assetsBaseUrl}/common/alt.png`')
          .cloumn-commodity_info
            el-tooltip(placement='top-start' :content='row.goodsName')
              .cloumn-commodity-name.no-row {{row.goodsName}}
            .cloumn-commodity-code {{row.productSn}}
      template(slot="itemAddedCostVOList" slot-scope="{ row }" )
        fragment(v-if='row.itemAddedCostVOList')
          div(v-for='(item, index) in row.itemAddedCostVOList' :key="item.id")
            div {{item.name}}：¥{{toAmountStr(item.price, 2, true)}}
        div(v-else) --
      template(slot="deliverSn" slot-scope="{ row }" )
        span(v-if='row.deliverSn') {{row.deliverSn}}
        span(v-else) --
</template>

<script>
import Table from '@/components/qjd/table'
import useTable from 'hooks/useTable'
import ajaxStore from '@/apis'
import { revseseDetailProductColumns } from '../const.js'
import { toAmountStr } from '@/utils/util'
import { getDynamicHead, getSummaries, cellStyle } from '../../Common'
import { baseUrl } from '@/utils/config'

export default {
  components: {
    Table
  },
  props: {
    queryId: {
      type: String,
      default: ''
    }
  },
  setup(props, {root}) {
    const {queryId} = props
    const { factory: { getReverseProductList} } = ajaxStore
    const summaryProp = ['goodsPayTotalAmount']
    const {
      loading,
      dataSource,
      columns,
    } = useTable({
      columns: revseseDetailProductColumns,
      isPage: false,
      request: getReverseProductList,
      defaultParams: {reverseOrderId: queryId},
      isActiveColumn: true,
      callback: data => {
        columns.value.splice(1, 0, ...getDynamicHead(data))
        return { dataSource: data }
      }
    })
    return {
      dataSource,
      columns,
      loading,
      toAmountStr,
      getSummaries,
      cellStyle,
      getDynamicHead,
      baseUrl,
      summaryProp
    }
  },
}
</script>

<style lang="stylus" scoped>
.cloumn-commodity
  display flex
  &_img
    width 60px
    height 60px
    img
      width 100%
  .cloumn-commodity_info
    flex 1
    display flex
    flex-direction column
    margin-left 14px
    .cloumn-commodity-code
      color #9AA6B8
    .no-row
      overflow: hidden
      text-overflow:ellipsis
      display: -webkit-box
      -webkit-line-clamp: 2
      -webkit-box-orient: vertical
>>>.el-table__footer-wrapper
  tr
    height 60px
    line-height 60px
    td
      background-color #FEF8E1
      &:nth-last-child(1)
        color #F25754
        font-size 14px
</style>
