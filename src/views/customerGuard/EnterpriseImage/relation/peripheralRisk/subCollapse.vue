<template lang="pug">
.sub-collapse
  el-collapse(v-if='dataSource && dataSource.length' v-model='activeName' @change='handleChange(dataSource)')
    el-collapse-item.sub-collapse(v-for='(item, key) in dataSource' :name='key' :key='key' :class='{"active": activeName && activeName.includes(key)}')
      template(slot='title')
        .sub-title
          span {{item.title}}
          span.number ({{item.riskCount}}）
      TableDetail(:ref='`table-${index}-${key}`' :type='item.type')
  .u-empty-tips(v-else) 暂无数据
</template>

<script>
import { reactive, toRefs, ref, getCurrentInstance } from '@vue/composition-api'
import TableDetail from './tableDetail'
export default {
  components: {
    TableDetail
  },
  props: {
    index: {
      type: Number,
    },
    dataSource: {
      type: Array,
      default: () => []
    },
  },
  setup(props, { root }) {
    const state = reactive({
      activeName: [],
      lastActiveName: []
    })

    const refs = ref(null)
    refs.value = getCurrentInstance().refs

    const handleChange = (item) => {
      if (state.activeName.length < state.lastActiveName.length) {
        return
      }
      state.lastActiveName = state.activeName
      const { activeName } = state
      const currentActiveName = activeName[activeName.length - 1]
      const { id, type } = item[currentActiveName]
      const target = refs.value[`table-${props.index}-${currentActiveName}`]
      target && target.length && target[0].doResult({
        id,
        type
      })
    }

    return {
      handleChange,
      ...toRefs(state)
    }
  }
}
</script>

<style lang="stylus">
.peripheral-risk-main
  .sub-collapse.active
    .el-collapse-item__header
      background-color #F8F9FD
</style>

<style lang="stylus" scoped>
.peripheral-risk-main
  .number,
  .active
    color #3B68F0
.sub-collapse
  .sub-title
    text-indent 2em
    width 100%
.relation-table
  padding 20px 0
</style>
