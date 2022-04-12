<template lang="pug">
Card.p-card(title='关键财务数据' v-loading='loading')
  Table(:columns='tableHeader' :dataSource='tableList' v-if='tableHeader && tableHeader.length > 1')
  .u-empty-tips(v-else) 数据暂未披露 敬请期待
</template>

<script>
import Card from '@/components/Card'
import { watch, toRefs, reactive } from '@vue/composition-api'
import { financeTableHeader, financeTableList, financeColumnsKey } from './config'
import { deepCopy } from '@/utils/qjd'
import Table from '@/components/qjd/table'
export default {
  props: {
    loading: {
      type: Boolean,
      default: false,
    },
    dataSource: {
      type: Object,
      default: () => ({})
    }
  },

  components: { Card, Table },

  setup(props, { root, emit }) {
    const state = reactive({
      tableHeader: deepCopy(financeTableHeader),
      tableList: financeTableList
    })

    watch(
      () => props.dataSource,
      (value) => {
        emit('change', value)
        for (const key in value) {
          state.tableHeader.push(
            { label: `${key}年`, key, align: 'right' }
          )
          state.tableList.map((item, index) => {
            state.tableList[index][key] = value[key][financeColumnsKey[index]] || '-'
          })
        }
      }
    )

    return {
      ...toRefs(state)
    }
  }
}
</script>

<style lang="stylus" scoped>
@import './index.styl';
</style>
