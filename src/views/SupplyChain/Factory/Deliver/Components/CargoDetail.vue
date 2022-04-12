<template lang="pug">
  .cargo-detail
    //- Table(:columns='columns' :dataSource='dataSource' :showSummary='true' :getSummaries='(param) => getSummaries(param, summaryProp)' :cellStyle='(data) => cellStyle(data, "deliverPrice")')
    Table(:columns='columns' :dataSource='dataSource' :showSummary='true' :getSummaries='(param) => getSummaries(param, summaryProp)')
      template(slot="deliverProduct" slot-scope="{ row }" )
        .cloumn-commodity
          el-image.cloumn-commodity_img(:src='row.mainPicPath?`${baseUrl}/saas-ofc/org/goodsAlbum/getAttachment?fileKey=${row.mainPicPath}`:""')
            div(slot='error')
              img(:src='`${$assetsBaseUrl}/common/alt.png`')
          .cloumn-commodity_info
            el-tooltip(placement='top-start' :content='row.goodsName')
              .cloumn-commodity-name.no-row {{row.goodsName}}
            .cloumn-commodity-code {{row.productSn}}
      template(slot="addCostPriceList" slot-scope="{ row }" )
        div(v-for='(item, index) in row.addCostPriceList' :key="item.id")
          div {{item.name}}：¥{{toAmountStr(item.singleFee, 2, true)}}
      template(slot="deliverPrice" slot-scope="{ row }" )
        div(style='color: #F25754') ¥{{toAmountStr(row.deliverPrice, 2, true)}}
        div(v-if='row.reversePrice') 含退货中：¥{{toAmountStr(row.reversePrice, 2, true)}}
        div(v-if='row.hasBeenReversePrice') 含已退货：¥{{toAmountStr(row.hasBeenReversePrice, 2, true)}}
</template>

<script>
import Table from '@/components/qjd/table'
import useTable from 'hooks/useTable'
import ajaxStore from '@/apis'
import { develiverDetailProductColumns } from '../const'
import { toAmountStr } from '@/utils/util'
// import { cellStyle } from './createDeliver'
import { getDynamicHead, getSummaries, cellStyle } from '../../Common/index'
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
    const { factory: { getLogisticsDetail} } = ajaxStore
    const summaryProp = ['deliverPrice', 'hasBeenReversePrice', 'reversePrice']
    const {
      loading,
      dataSource,
      columns,
    } = useTable({
      columns: develiverDetailProductColumns,
      isPage: false,
      request: getLogisticsDetail,
      defaultParams: {deliverId: queryId},
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
