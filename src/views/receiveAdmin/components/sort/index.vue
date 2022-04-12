<template lang="pug">
.sear_sort_box
  span 排序：
  el-select(
    :style="`width: ${width}px`"
    size="mini"
    v-model="sortBy"
    @change="onChange"
  )
    el-option(
      v-for="(item, index) in options"
      :key="index"
      :label="item.label"
      :value="item.value"
    )
  img(
    v-if="order === 1"
    :src="`${$assetsBaseUrl}/receiveAdmin/down.png`"
    @click="orderHandle"
  )
  img(
    v-if="order === -1"
    :src="`${$assetsBaseUrl}/receiveAdmin/up.png`"
    @click="orderHandle"
  )
</template>
<script>
import { ref } from '@vue/composition-api'

export default {
  props: {
    options: {
      type: Array,
      default: () => ([])
    },
    defaultSort: [String, Number],
    width: {
      type: Number,
      default: 140
    }
  },
  setup(props, { emit }) {
    // 排序依据
    const sortBy = ref(props.defaultSort)
    // 正序or倒叙 1倒序 2 正序
    const order = ref(1)
    // 获取排序依据 & 正序倒序
    const getSortVal = (val) => {
      if (order.value === 1) {
        return { descs: [val || sortBy.value], ascs: null }
      } else if (order.value === -1) {
        return { ascs: [val || sortBy.value], descs: null }
      }
    }
    // 切换排序条件
    const onChange = value => emit('onChange', getSortVal(value))
    // 排序
    const orderHandle = () => {
      order.value = order.value === 1 ? -1 : 1
      emit('orderHandle', getSortVal())
    }

    return {
      sortBy,
      order,
      onChange,
      orderHandle,
      getSortVal
    }
  },
}
</script>
<style lang="stylus" scoped>
@import './index.styl';
</style>
