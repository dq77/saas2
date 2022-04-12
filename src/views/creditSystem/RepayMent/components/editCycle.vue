<template lang="pug">
fragment
  span {{ dataSource && dataSource.debtPeriodDays ? dataSource.debtPeriodDays : '' }}天
  div
    el-tooltip(
      effect="dark"
      content="审批未结束"
      placement="top"
      v-if="!(dataSource && dataSource.canEditDebtPeriodDays)"
    )
      el-button(type='text' weblogs-anchor="common-consume-dayEdit" style="color: #ccc") 编辑
    el-button(type='text' @click='() => clickEdit(dataSource)' v-else) 编辑
</template>
<script>
export default {
  props: {
    dataSource: {
      type: Object,
      default: () => ({})
    }
  },
  setup(props, { emit }) {
    const clickEdit = dataSource => emit('clickEdit', dataSource || {})

    return {
      clickEdit
    }
  },
}
</script>
