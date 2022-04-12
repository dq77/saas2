<template lang="pug">
Card.p-card(title='销售数据/拿地数据' v-loading='loading')
  Table(:columns='tableHeader' :dataSource='tableList' v-if='tableHeader && tableHeader.length > 1')
  .u-empty-tips(v-else) 暂无信息
</template>

<script>
import Card from '@/components/Card'
import { watch, toRefs, reactive } from '@vue/composition-api'
import { saleTableHeader, saleTableList, saleColumnsKey } from './config'
import { deepCopy } from '@/utils/qjd'
import Table from '@/components/qjd/table'
export default {
  props: {
    loading: {
      type: Boolean,
      default: false,
    },
    dataSource: {
      type: Array,
      default: () => ([])
    }
  },

  components: { Card, Table },

  setup(props, { root, emit }) {
    const state = reactive({
      tableHeader: deepCopy(saleTableHeader),
      tableList: saleTableList
    })

    watch(
      () => props.dataSource,
      (value) => {
        for (const key in value) {
          state.tableHeader.push(
            { label: `${key}年`, key, align: 'right' }
          )
          state.tableList.map((item, index) => {
            state.tableList[index][key] = value[key][saleColumnsKey[index]]
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
