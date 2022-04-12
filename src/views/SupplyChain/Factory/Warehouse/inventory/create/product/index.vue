<template lang="pug">
div(v-loading="currentApis.detailLoading")
  div(style="margin-bottom: 20px;")
    el-button(type="primary" @click="productApis.addHandle") 添加新行
    el-button(:disabled="!tableApis.currentSelects.length" @click="productApis.deleteHandle") 删除
  Table(
    ref="tableRef"
    row-key="_id"
    :dataSource="tableApis.dataSource"
    :columns="columns"
    :checkbox="true"
    @selectionHandle="productApis.selectionHandle"
    @cellChangeHandle="productApis.onChange"
    @cellFocusHandle="productApis.onFocus"
    @cellShowHandle="productApis.onShow"
  )
    //- 产品属性
    template(slot="extendData" slot-scope="{ row }")
      Attribute(
        :dataSource="row.extendData"
        :remoteMethod="(value, item) => productApis.searchAttr(value, item, row)"
        :focusHandle="(e, item) => !e.target.value && productApis.searchAttr('', item, row) "
        :changeHandle="(value, item) => productApis.attrChange(value, item, row)"
        :showHandle="(value, item) => productApis.attrShow(value, item, row)"
      )
    //- 盘盈盘亏
    template(slot="total" slot-scope="{ row }")
      span(
        :class="getPosColor((row.realQuantity ? row.realQuantity : 0) - (row.stockQuantity ? row.stockQuantity : 0 ))"
      ) {{ getPosNUm((row.realQuantity ? row.realQuantity : 0) - (row.stockQuantity ? row.stockQuantity : 0 )) }}
  Total(:sum="productApis.sum - productApis.max")
  .bottom
    el-button(@click="currentApis.backHandle") 返回
    el-button(type="primary" :loading="currentApis.loading" @click="currentApis.sureHandle") 保存
</template>
<script>
import { reactive, toRefs } from '@vue/composition-api'
import { templateRef } from '@vueuse/core'
import ajaxStore from '@/apis'
import Table from '@/components/qjd/table/index.vue'
import Attribute from '@/components/qjd/bsComs/supply/attribute.vue'
import Total from '@/components/qjd/bsComs/supply/total.vue'
import useTable from 'hooks/useTable'
import { getColumns, defaultDataSample } from '@/hooks/supplyChain/product/config'
import { otherColumns, otherSample } from './config'
import useProduct from '@/hooks/supplyChain/product/useProduct'
import useCurrent from './useCurrent'
import { getPosNUm, getPosColor } from '@/utils/qjd'

export default {
  components: {
    Table,
    Attribute,
    Total
  },
  props: {
    id: String,
    warehouseId: String,
    formApis: Object
  },
  setup(props) {
    // ref
    const tableRef = templateRef('tableRef')
    // ajax
    const { factory: { listBy, getSpecsListRemote, searchInventoryNum } } = ajaxStore
    // table & page
    const tableApis = useTable({
      request: [],
      checkbox: true,
      editDataSource: true
    })
    // 产品相关逻辑
    const productApis = useProduct({
      props,
      warehouseId: props?.warehouseId,
      tableRef,
      tableApis,
      request: listBy,
      attrRequest: getSpecsListRemote,
      numRequest: searchInventoryNum,
      sumKey: 'realQuantity',
      maxKey: 'stockQuantity',
      dataSample: { ...defaultDataSample, ...otherSample },
      defaultAttribute: 2
    })
    // 当前相关逻辑
    const currentApis = useCurrent({ productApis, tableApis, props })
    // state
    const state = reactive({ tableApis, productApis, currentApis })

    return {
      columns: [...getColumns((query, key, row) => productApis.searchProduct(query, key, row)), ...otherColumns],
      getPosNUm,
      getPosColor,
      ...toRefs(state)
    }
  }
}
</script>
<style lang="stylus" scoped>
.bottom
  display: flex
  align-items: center
  justify-content: center
  padding-top: 20px
</style>
