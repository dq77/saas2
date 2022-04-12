<template lang="pug">
div
  div(
    v-for="(item, index) in dataSource"
    :key="index"
    style="display: flex; align-items: center; margin-bottom: 5px"
  )
    span(style="margin-right: 5px;") {{ item.name }}:
    el-select(
      style="width: 120px"
      :filterable='true'
      :clearable='true'
      :remote='true'
      :remote-method="value => remoteMethod(value, item)"
      v-model="item.valueId"
      @focus="e => focusHandle(e, item)"
      @change="val => changeHandle(val, item)"
      @visible-change="val => showHandle(val, item)"
    )
      el-option(
        v-for='op in (item.options || [])'
        :key='op.id'
        :label='op.name'
        :value='op.id'
      )
</template>
<script lang="ts">
export default {
  props: {
    dataSource: {
      type: Array,
      default: () => ([])
    },
    remoteMethod: Function,
    focusHandle: Function,
    changeHandle: Function,
    showHandle: Function
  }
}
</script>

