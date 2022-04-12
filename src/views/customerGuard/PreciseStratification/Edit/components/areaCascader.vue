<template lang="pug">
el-cascader(
  style='width:100%'
  v-model="row.locateLocationCode"
  :options="options"
  :props='{value: "code", label: "name"}'
  placeholder="请选择"
  :clearable='false'
  :filterable='false'
)
</template>
<script>
import { watch } from '@vue/composition-api'

export default {
  props: {
    options: {
      type: Array,
      defaultValue: () => {
        return []
      }
    },
    row: {
      type: Object,
      defaultValue: () => {
        return {}
      }
    },
  },
  components: {
  },
  setup(props, {emit}) {
    watch(() => props.row, (val, preVal) => {
    }, { immediate: true })
    return {
    }
  },
}
</script>
<style lang="stylus" scoped>
</style>
