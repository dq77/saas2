<template lang="pug">
table.table.table-layout-main
  tr(v-for='(row, index) in result' :key='index')
    template(v-for='(item, itemIndex) in row')
      th {{item.label}}
      template(v-if="slots[item.key]")
        td
          slot(
            :name="item.key"
            :row="row"
          )
      template(v-else-if='item.type === "address"')
        td {{getAddress(baseInfo[item.key], baseInfo[item.detailKey]) || '- -'}}
      template(v-else-if='item.render')
        td {{item.render(baseInfo[item.key]) || '- -'}}
      template(v-else)
        td {{baseInfo[item.key] || '- -'}}
</template>
<script>
import { reactive, toRefs, watch } from '@vue/composition-api'
import useArea from '@/hooks/common/useArea'

export default {
  props: {
    result: {
      type: Array,
      defaultValue: () => {
        return []
      }
    },
    baseInfo: {
      type: Object,
      defaultValue: () => {
        return {}
      }
    }
  },
  setup(props, {emit, slots}) {
    const state = reactive({
      areaState: {}
    })
    state.areaState = useArea()
    state.areaState.doResult()
    const getAddress = (codeList, detail) => {
      let result = ''
      codeList.forEach(codeObj => {
        result = result + state.areaState.flatCitys?.[codeObj]?.name
      })
      return result + ' ' + detail
    }
    watch(() => props.result, (val, preVal) => {
    }, { immediate: true })
    return {
      slots,
      getAddress,
      ...toRefs(state)
    }
  },
}
</script>
<style lang="stylus" scoped>
.p-main
  border 1px solid #F2F2F6
</style>
