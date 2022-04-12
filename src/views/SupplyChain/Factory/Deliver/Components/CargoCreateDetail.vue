<template lang="pug">
  .cargo-create-detail
    el-button(type='primary' @click='deliverHandler(dataSource, getMaxValue)' style='margin-bottom:20px') 一键全部发货
    Table(:columns='columns' :dataSource='dataSource' :showSummary='true' :getSummaries='(param) => getSummaries(param, summaryProp)' :cellStyle='(data) => cellStyle(data, "currentDeliverTotalPrice")')
      template(slot="deliverProduct" slot-scope="{ row }" )
        .cloumn-commodity
          el-image.cloumn-commodity_img(:src='row.mainPicPath?`${baseUrl}/saas-ofc/org/goodsAlbum/getAttachment?fileKey=${row.mainPicPath}`:""')
            div(slot='error')
              img(:src='`${$assetsBaseUrl}/common/alt.png`')
          .cloumn-commodity_info
            el-tooltip(placement='top-start' :content='row.goodsName')
              .cloumn-commodity-name.no-row {{row.goodsName}}
            .cloumn-commodity-code {{row.productSn}}
      template(slot="currentDeliverCount" slot-scope="{ row, column }" )

        //- 选择仓库时，可发货数量要取未发货数量&库存中的最小值
        el-input-number(v-model='row.currentDeliverCount' controls-position="right" :precision='2' :step='1' :min='0' :max='getMaxValue(row)' :disabled='getMaxValue(row, true) === 0' @change='(val) => handleChangeNumber(val, row, column)' class='cloumn-input-number')
        el-button(type='text' :disabled='getMaxValue(row) === 0' @click='handleChangeNumber(getMaxValue(row), row)') 全部
      template(slot="addCostPriceList" slot-scope="{ row }" )
        div(v-for='(item, index) in row.addCostPriceList' :key="item.id")
          div {{item.name}}：¥{{toAmountStr(item.singleFee, 2, true)}}
</template>

<script>
import { watch } from '@vue/composition-api'
import Table from '@/components/qjd/table'
import useTable from 'hooks/useTable'
import ajaxStore from '@/apis'
import { develiverProductColumns } from '../const'
import { toAmountStr } from '@/utils/util'
import { handleChangeNumber, deliverHandler } from './createDeliver'
import { getDynamicHead, getSummaries, cellStyle } from '../../Common/index'
import { baseUrl } from '@/utils/config'
import { deepCopy } from '@/utils/qjd'

export default {
  components: {
    Table
  },
  props: {
    queryId: {
      type: String,
      default: ''
    },
    warehouseName: {
      type: String,
      default: ''
    },
    queryStatus: {
      type: [Number, String]
    },
    warehouseId: String,
  },
  setup(props) {
    const {queryId, queryStatus} = props
    const { factory: { getCreateCargoList } } = ajaxStore
    const summaryProp = ['currentDeliverTotalPrice', 'residueTotalPrice', 'noDeliverTotalPrice']

    watch(
      // 监听仓库的change，变更表头的仓库名称
      () => [props.warehouseName, props.warehouseId],
      ([name, id]) => {
        // 清空表格值
        dataSource.value.forEach(el => {
          el.currentDeliverCount = 0
          el.currentDeliverTotalPrice = 0
          el.residueTotalPrice = 0
        })
        // 再次调用表格接口，多传仓库id参数
        searchHandle({ warehouseId: id })
      }
    )

    const {
      loading,
      dataSource,
      columns,
      setColumns,
      searchHandle
    } = useTable({
      columns: develiverProductColumns,
      isPage: false,
      request: getCreateCargoList,
      defaultParams: { id: queryId, flag: queryStatus ? '2' : '1', updateFlag: !!queryStatus },
      isActiveColumn: true,
      callback: data => {
        data.forEach(el => !el.warehouseQuantity && (el.warehouseQuantity = 0))
        const cols = deepCopy(develiverProductColumns)
        data && cols.splice(1, 0, ...getDynamicHead(data))
        // 调用接口成功后，如果当前仓库name有值，就添加仓库列
        if (props.warehouseName) {
          const whCol = { label: `库存数量（${props.warehouseName}）`, key: 'warehouseQuantity' }
          cols.splice(-4, 1, whCol)
        }
        setColumns(cols)
        return { dataSource: data }
      }
    })

    // 获取本次发货数量最大值
    const getMaxValue = (row, ifNumber) => {
      let mid = 0
      // 有仓库时，以最小值
      if (props.warehouseId) {
        mid = Math.min(row.noDeliverCount, Number(row.warehouseQuantity))
      } else {
        mid = row.noDeliverCount
      }
      return ifNumber ? (queryStatus ? Infinity : mid) : mid
    }

    return {
      loading,
      columns,
      dataSource,
      toAmountStr,
      getSummaries,
      handleChangeNumber,
      setColumns,
      deliverHandler,
      cellStyle,
      getDynamicHead,
      baseUrl,
      summaryProp,
      getMaxValue,
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
.cloumn-input-number
  width 120px
  margin-right 5px
>>>.el-table__footer-wrapper
  tr
    height 60px
    line-height 60px
    td
      background-color #FEF8E1
      &:nth-last-child(2)
        color #F25754
        font-size 14px
</style>
