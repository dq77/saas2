<template lang="pug">
el-collapse.collapse(
  v-model='activeName'
  :accordion="accordion"
  @change="onChange"
)
  el-collapse-item(
    v-for="item in columns"
    :key="item.key"
    :title="item.label"
    :name="item.key"
    :id="item.key"
  )
    slot(
      :name="item.key"
      :dataSource="item"
    )
</template>
<script>
import { ref } from '@vue/composition-api'
export default {
  props: {
    accordion: Boolean,
    defaultActiveName: [String, Array, Number],
    columns: {
      type: Array,
      default: () => ([])
    }
  },
  setup(props, { emit }) {
    const { defaultActiveName } = props
    const activeName = ref(defaultActiveName)

    const onChange = vals => emit('onChange', vals)

    return {
      onChange,
      activeName
    }
  },
}
</script>
<style lang="stylus" scoped>
.collapse
  padding 0 20px
  background #ffff
</style>
