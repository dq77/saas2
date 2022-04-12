<template lang="pug">
//- 新增出、入库 - 表格
.p-product-info
  .p-btns
    el-button(
      type='primary'
      @click='tableEditState.addRow()'
    ) 添加产品
    el-button(
      plain
      :disabled='tableState.currentSelects.length === 0'
      @click='tableState.delSelectedRows("__id")'
    ) 删除

  .p-table
    Table(
      ref='tableRef'
      row-key='__id'
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
      template(slot='goodsName' slot-scope='{ row }')
        el-select(
          value-key='goodsId'
          :filterable='true'
          :clearable='true'
          :remote='true'
          :remote-method='v => tableEditState.getProductOptions(v, row)'
          :loading='row.productLoading'
          v-model='row.goodsName'
          @change='v => tableEditState.cellProductChangeHandle(v, row)'
          @focus='() => tableEditState.cellProductFocusHandle("goodsName", row)'
          @visible-change="v => tableEditState.show(v, row)"
        )
          el-option(
            v-for='item in row.productOptions'
            :key='item.value.goodsId'
            :label='item.value.goodsName'
            :value='item.value.goodsId'
          ) {{ `${item.value.goodsName}(${item.value.productSn})` }}

      //- 产品型号
      template(slot='productSn' slot-scope='{ row }')
        el-select(
          value-key='goodsId'
          :filterable='true'
          :clearable='true'
          :remote='true'
          :remote-method='v => tableEditState.getProductOptions(v, row)'
          :loading='row.productLoading'
          v-model='row.productSn'
          @change='v => tableEditState.cellProductChangeHandle(v, row)'
          @focus='() => tableEditState.cellProductFocusHandle("productSn", row)'
          @visible-change="v => tableEditState.show(v, row)"
        )
          el-option(
            v-for='item in row.productOptions'
            :key='item.value.goodsId'
            :label='item.value.productSn'
            :value='item.value.goodsId'
          ) {{ `${item.value.productSn}(${item.value.goodsName})` }}
      //- 产品规格、销售单位
      template(slot='payAmount' slot-scope='{row}')
        i.el-icon-loading(v-show='row.payAmountLoading')
        span {{ row.payAmount }}

      //- 折扣
      template(slot='discountRate' slot-scope='{row}')
        div(style="display: flex;align-items: center")
          el-input-number(
            style='width: 100%;'
            controls-position='right'
            :precision='1'
            :step='1'
            :min='0.1'
            :max='9.9'
            v-model='row.discountRate'
          )
          span(style="margin-left: 10px;") 折
</template>

<script>
import { reactive, toRefs, ref } from '@vue/composition-api'
import Table from '@/components/qjd/table/index.vue'
import useTable from 'hooks/useTable'
import { toPrefixUrl } from '@/utils/util'
import { tableColumns } from './config'
import useTableEdit from './useTableEdit'

export default {
  components: {
    Table
  },
  setup() {
    const downloadUrl = toPrefixUrl('/saas-ofc/org/goodsAlbum/getAttachment?fileKey=')
    // ref
    const tableRef = ref()
    // table
    const tableState = useTable({
      tableRef,
      columns: tableColumns,
      isPage: false,
      isInit: false,
      checkbox: true,
      editDataSource: true,
    })
    const tableEditState = useTableEdit({ tableState })
    // methods
    const initCacheTableData = data => tableEditState.initCacheTableData(data)
    // state
    const state = reactive({
      tableState,
      tableEditState,
    })
    return {
      tableColumns,
      downloadUrl,
      tableRef,
      ...toRefs(state),
      initCacheTableData
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
.attr-label
  width 50px
  display inline-block
  line-height 16px
  vertical-align middle
.attr-select
  width 100px
</style>
