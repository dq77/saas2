<template lang="pug">
el-table(
  ref='tableRef'
  :data="dataSource"
  v-loading="loading"
  :stripe="stripe"
  :row-key="rowKey"
  :row-class-name='rowClassName'
  @select="selectHandle"
  @selection-change="selectionHandle"
  @select-all="selectAll"
  @sort-change="sortChange"
  :show-summary='showSummary'
  :summary-method="(param) => getSummaries(param)"
  :cell-style='(data) => cellStyle(data)'
  :empty-text='emptyText'
  :span-method='spanMethod'
  :border='border'
  :height='height'
)
  //- 自定义数据为空时显示
  template(v-if='isEmptySet' slot='empty')
    slot(name="table-empty")
  //- expend
  el-table-column(
    v-if="isExpand"
    type="expand"
  )
    template(slot-scope="props")
      slot(name="table-expand" :row="props.row")
  //- checkbox
  el-table-column(
    v-if="checkbox"
    type="selection"
    width="50"
    :reserve-selection="reserveSelection"
    :selectable="selectable"
  )
  //- index
  el-table-column(
    v-if='index'
    label='序号'
    type="index"
    width="55"
  )
  //- columns
  el-table-column(
    v-for="(item, index) in columns"
    :key="item.key ? item.key : index"
    :label="item.label"
    :width="item.width"
    :fixed="item.fixed ? item.fixed : false"
    :align="item.align ? item.align : 'left'"
    :sortable="item.sortable ? item.sortable : false"
    :min-width='item.minWidth ? item.minWidth : null'
    :prop='item.key'
  )
    //- header 若存在customHeader则表示自定义请求头
    template(slot="header" slot-scope="{row, column}")
      span(v-if="!item.customHeader") {{ column.label }}
      slot(v-else :name="item.customHeader" :column="item")
    template(slot-scope="{row, column, $index}")
      //- slot为具名插槽，name值为column-key，使用时通过slot-scope="{ row }"接收row，例如： template(slot="key" slot-scope="{ row }")
      slot(
        v-if="slots[item.key]"
        :name="item.key"
        :row="row"
        :column="column"
        :$index="$index"
      )
      template(v-else)
        template(v-if="item.key !== 'operate'")
          //- text
          span(v-if="!item.type || item.type === 'text'") {{ item.render ? item.render(row, row[item.key]) : (row[item.key] || row[item.key] === 0) ? row[item.key] : "- -" }}
          //- image
          el-image(
            v-if="item.type === 'img'"
            :style="`width: ${item.igWidth ? item.igWidth : 60}px; height: ${item.igHeight ? item.igHeight : 60}px;`"
            :src='row[item.imgUrlKey]'
          )
            div(slot='error')
              img(style="width: 100%;" :src='row[item.errorUrlKey]')
          //- inputNumber
          el-input-number(
            v-if="item.type === 'inputNumber'"
            :style="`width: ${item.itemWidth ? item.itemWidth : '100%'};`"
            v-model="row[item.key]"
            :disabled="item.disabled ? item.disabled : false"
            :controls-position="item.controlsPosition ? item.controlsPosition : 'right'"
            :min="typeof item.min === 'number' ? item.min : typeof item.min === 'string' ? row[item.min] : -Infinity"
            :max="typeof item.max === 'number' ? item.max : typeof item.max === 'string' ? row[item.max] : Infinity"
            :precision="item.precision ? item.precision : null"
            :step="item.step ? item.step : 1"
            @change="val => cellChangeHandle(val, item.key, row)"
          )
          //- input
          el-input(
            v-if="item.type === 'input'"
            :style="`width: ${item.itemWidth ? item.itemWidth : '100%'};`"
            v-model="row[item.key]"
            :disabled="item.disabled ? item.disabled : false"
            :maxlength="item.maxlength ? item.maxlength : null"
            @change="val => cellChangeHandle(val, item.key, row)"
          )
          //- select
          el-select(
            v-if="item.type === 'select'"
            :style="`width: ${item.itemWidth ? item.itemWidth : '100%'};`"
            :placeholder="item.placeholder ? item.placeholder: `请选择`"
            :disabled="item.disabled ? item.disabled : false"
            :clearable='item.clearable ? item.clearable : false'
            :filterable="item.filterable ? item.filterable : false"
            :loading="item.loadingSpecifier ? row[item.loadingSpecifier] : false"
            :remote="item.remote ? item.remote : false"
            :remote-method="item.remoteMethod ? (query) => item.remoteMethod(query, item.key, row, dataSource) : null"
            v-model="row[item.key]"
            @change="val => cellChangeHandle(val, item.key, row)"
            @focus="e => cellFocusHandle(e, item.key, row)"
            @visible-change="val => cellShowHandle(val, item.key, row)"
          )
            el-option(
              v-for='op in (!item.customOption ? item.options : (row[item.optionSpecifier] || []))'
              :key='op.value'
              :label='op.label'
              :value='op.value'
              :disabled='op.disabled'
            ) {{ op.customLabel ? op.customLabel : op.label }}
          //- datePicker
          el-date-picker(
            v-if='item.type==="datePicker"'
            :style="`width: ${item.itemWidth ? item.itemWidth : '100%'};`"
            v-model='row[item.key]'
            :value-format="item.valueFormat ? item.valueFormat : 'yyyy-MM-dd'"
            :format="item.format ? item.format : 'yyyy-MM-dd'"
            :type='item.kind ? item.kind : "date"'
            :disabled='item.disabled ? item.disabled : false'
            :start-placeholder='item.kind==="daterange" || item.kind==="datetimerange" ? "开始日期" : ""'
            :end-placeholder='item.kind==="daterange" || item.kind==="datetimerange" ? "结束日期" : ""'
            :placeholder='item.placeholder ? item.placeholder : `请输入${item.label}`'
            :clearable='item.clearable ? item.clearable : false'
            :picker-options="item.pickerOptions ? item.pickerOptions : {}"
            :range-separator="item.rangeSeparator ? item.rangeSeparator : '-'"
            @change="val => cellChangeHandle(val, item.key, row)"
          )
        template(v-else-if="item.key === 'operate'")
          el-button(
            v-for="(btn, index) in item.options"
            :key="index"
            type="text"
            @click="() => buttonHandle({row: row, label: btn.render ? btn.render(row) : btn.label})"
          ) {{ btn.render ? btn.render(row) : btn.label }}
  template(slot="append")
    slot(name="append")
</template>
<script>
import { ref } from '@vue/composition-api'

export default {
  props: {
    dataSource: {
      type: Array,
      default: () => ([])
    },
    columns: {
      type: Array,
      default: () => ([])
    },
    loading: Boolean,
    stripe: {
      type: Boolean,
      default: true
    },
    isExpand: Boolean,
    checkbox: Boolean,
    isEmptySet: {
      type: Boolean,
      default: false
    }, // 空状态设置
    checkBoxDisabled: {
      type: Boolean,
      default: true
    },
    index: { // 是否显示自动计算的序号列
      type: Boolean,
      default: false
    },
    border: { // 是否显示边框线
      type: Boolean,
      default: false
    },
    rowKey: {
      type: String,
      default: 'id'
    },
    showSummary: { // 是否计算
      type: Boolean,
      default: false
    },
    getSummaries: { // 自定义计算方法
      type: Function,
      default: () => {}
    },
    cellStyle: { // 自定义设置列样式
      type: Function,
      default: () => {}
    },
    reserveSelection: {
      type: Boolean,
      default: true
    },
    emptyText: {
      type: String,
      default: '暂无数据'
    },
    spanMethod: { // 合并单元格方法
      type: Function,
      default: () => {}
    },
    rowClassName: { // 表格行状态
      type: Function,
      default: () => ''
    },
    height: [String, Number]
  },
  setup(props, { emit, slots, root }) {
    const tableRef = ref()
    const buttonHandle = (detail) => {
      emit('buttonHandle', detail)
    }
    // 获取element-table-ref
    const getTableRef = () => tableRef.value || null
    // 手动切换checkbox选择状态
    const toggleRowSelection = (data, isCheck = true) => tableRef.value && tableRef.value.toggleRowSelection(data, isCheck)
    // 勾选checkbox
    const selectHandle = (selection, row) => emit('selectHandle', { selection, row })
    // checkbox选项发生变化
    const selectionHandle = selection => emit('selectionHandle', selection)
    // 勾选全选
    const selectAll = selection => emit('selectAll', selection)
    // 取消勾选
    const clearSelection = () => tableRef.value && tableRef.value.clearSelection()
    // 是否允许勾选
    const selectable = () => !!props.checkBoxDisabled
    // 自定义排序
    const sortChange = ({ column, prop, order }) => emit('sortChange', { column, prop, order })
    // 单元格的change事件
    const cellChangeHandle = (val, key, row) => { emit('cellChangeHandle', val, key, row) }
    // 聚焦事件
    const cellFocusHandle = (e, key, row) => { emit('cellFocusHandle', e, key, row) }
    // 下拉框显示
    const cellShowHandle = (val, key, row) => { emit('cellShowHandle', val, key, row) }
    // 取消排序
    const clearSort = () => tableRef.value && tableRef.value.clearSort()
    // 重新布局
    const doLayout = () => tableRef.value && tableRef.value.doLayout()

    return {
      slots,
      tableRef,
      buttonHandle,
      getTableRef,
      toggleRowSelection,
      selectHandle,
      selectionHandle,
      selectAll,
      clearSelection,
      clearSort,
      doLayout,
      selectable,
      cellChangeHandle,
      cellFocusHandle,
      cellShowHandle,
      sortChange
    }
  }
}
</script>
