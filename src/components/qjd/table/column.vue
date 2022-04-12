<template lang="pug">
el-table-column(
  :label="item.label"
  :width="item.width"
  :fixed="item.fixed ? item.fixed : false"
  :align="item.align ? item.align : 'left'"
  :sortable="item.sortable ? item.sortable : false"
  :min-width='item.minWidth ? item.minWidth : null'
  :prop='item.key'
)
  //- 若是存在继续遍历，针对多级表头
  template(v-if="item.children && item.children.length")
    Column(
      v-for="child in item.children"
      :item="child"
      :key="child.key"
      @buttonHandle="buttonHandle"
    )
  //- body
  template(slot-scope="{row, column}")
    fragment(v-if="item.key !== 'operate'")
      //- text
      span(v-if="!item.type || item.type === 'text'") {{ item.render ? item.render(row, row[item.key]) : (row[item.key] || row[item.key] === 0) ? row[item.key] : "- -" }}
    fragment(v-else-if="item.key === 'operate'")
      el-button(
        v-for="(btn, index) in item.options"
        :key="index"
        type="text"
        @click="() => buttonHandle({row: row, label: btn.render ? btn.render(row) : btn.label})"
      ) {{ btn.render ? btn.render(row) : btn.label }}
</template>
<script>
/** 针对多级表头
 * @param item column单条数据
 */
export default {
  name: 'Column',
  props: {
    item: {
      type: Object,
      default: () => ({})
    }
  },
  setup(props, { emit }) {
    // 操作
    const buttonHandle = detail => emit('buttonHandle', detail)

    return {
      buttonHandle
    }
  }
}
</script>
