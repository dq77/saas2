<template lang="pug">
//- 新增出、入库 - 表格
.p-product-info
  .p-btns
    el-button(
      type='primary'
      :disabled='!tableEditState.warehouseId'
      @click='tableEditState.addRow()'
    ) 添加新行
    el-button(
      plain
      :disabled='!tableEditState.warehouseId || tableState.currentSelects.length === 0'
      @click='tableState.delSelectedRows("__id")'
    ) 删除
  .p-table
    Table(
      ref='tableRef'
      row-key='__id'
      :border='true'
      :checkbox='true'
      :index='false'
      :loading='tableState.loading'
      :dataSource='tableState.dataSource'
      :columns='tableColumns'
      @selectionHandle='tableState.selectionChange'
    )
      //- 图片
      template(slot="mainPicPath" slot-scope="{ row }")
        el-image.p-table-img(:src='row.mainPicPath ? downloadUrl + row.mainPicPath : ""')
          div(slot='error')
            img(:src='`${$assetsBaseUrl}/common/alt.png`')

      //- 产品名称
      template(slot='goodsName' slot-scope='{ row, $index }')
        el-select(
          value-key='goodsId'
          :filterable='true'
          :clearable='true'
          :remote='true'
          :remote-method='v => tableEditState.getProductOptions(v, row)'
          :loading='row.productLoading'
          v-model='row.goodsName'
          @change='v => tableEditState.cellProductChangeHandle(v, row, $index)'
          @focus='() => tableEditState.cellProductFocusHandle("goodsName", row)'
        )
          el-option(
            v-for='item in row.productOptions'
            :key='item.value.goodsId'
            :label='item.value.name'
            :value='item.value'
          ) {{ `${item.value.name}(${item.value.productSn})` }}

      //- 产品型号
      template(slot='productSn' slot-scope='{ row, $index }')
        el-select(
          value-key='goodsId'
          :filterable='true'
          :clearable='true'
          :remote='true'
          :remote-method='v => tableEditState.getProductOptions(v, row)'
          :loading='row.productLoading'
          v-model='row.productSn'
          @change='v => tableEditState.cellProductChangeHandle(v, row, $index)'
          @focus='() => tableEditState.cellProductFocusHandle("productSn", row)'
        )
          el-option(
            v-for='item in row.productOptions'
            :key='item.value.goodsId'
            :label='item.value.productSn'
            :value='item.value'
          ) {{ `${item.value.productSn}(${item.value.name})` }}

      //- 产品属性
      template(slot='extendData' slot-scope='{ row, $index }')
        template(v-if='row.extendData && row.extendData.length > 0')
          div(v-for='attribute in row.extendData')
            span.attr-label {{ attribute.name }}：
            el-select.attr-select(
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
          span --

      //- 产品规格、销售单位
      template(slot='payAmount' slot-scope='{row}')
        i.el-icon-loading(v-show='row.payAmountLoading')
        span {{ row.payAmount }}

      //- 入库数量
      template(slot='goodsQuantity' slot-scope='{row}')
        el-input-number(
          style='width: 100%;'
          controls-position='right'
          :precision='0'
          :step='1'
          :min='1'
          v-model='row.goodsQuantity'
          @change='v => tableEditState.cellChangeHandle(v, "goodsQuantity", row)'
        )
        div(v-show='isShowInventory')
          span 库存：
            i.el-icon-loading(v-show='row.queryInventoryLoading')
            span(v-if='typeof row.stockQuantity === "number"') {{ row.stockQuantity }}
            span(v-else) 无
    .p-total-amount
      .u-count 合计{{txt}}：{{totalCount}}
</template>

<script>
import { computed, reactive, toRefs, ref, watch } from '@vue/composition-api'
import Table from '@/components/qjd/table'
import useTable from 'hooks/useTable'
import { toPrefixUrl } from '@/utils/util'
import { getTableColumns } from './config'
import useTableEdit from './useTableEdit'

export default {
  components: {
    Table
  },
  props: {
    warehouseId: {
      type: String,
      value: '',
    },
  },
  setup(props, { root }) {
    const downloadUrl = toPrefixUrl('/saas-ofc/org/goodsAlbum/getAttachment?fileKey=')
    const tableRef = ref()

    // 入库inAdd，出库outAdd
    const { $route: { name } } = root
    const isShowInventory = name === 'outAdd'
    const txt = name === 'outAdd' ? '出库' : '入库'
    const tableColumns = getTableColumns(txt)

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
      name,
    })

    const state = reactive({
      tableColumns,
      tableState,
      tableEditState,
    })

    // 表格内所有产品数量的计算
    const totalCount = computed(() => {
      let num = 0
      tableState.dataSource.forEach(row => {
        num += (row.goodsQuantity ? row.goodsQuantity : 0)
      })
      return num
    })

    watch(
      () => props.warehouseId,
      (v) => {
        tableEditState.setWarehouseId(v)
      },
      {
        immediate: true
      }
    )

    return {
      txt,
      isShowInventory,
      downloadUrl,
      tableRef,
      totalCount,
      ...toRefs(state),
      getTableData: tableEditState.getTableData,
      clearTableData: tableEditState.clearTableData,
      initEditTableData: tableEditState.initEditTableData,
    }
  },
}
</script>

<style lang="stylus" scoped>
.p-btns
  margin-top 20px
  text-align left
.p-table
  margin-top 20px
.p-table-img
  width 60px
  height 60px
  img
   width 100%
.p-total-amount
  padding 20px 20px
  background: #fef8e1
  .u-count
    color #f25754
    font-size 14px
    text-align: right

.attr-label
  width 50px
  display inline-block
  line-height 16px
  vertical-align middle
.attr-select
  width 100px
</style>
