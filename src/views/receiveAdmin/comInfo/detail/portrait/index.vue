<template lang="pug">
div(v-loading="loading")
  .portrait_box
    Header(:title="'应收计划还款情况'" style="padding-left: 20px;")
    Card(
      :columns="receiveColumns"
      :dataSource="dataSource"
    )
    //- 应收总金额 & 已收金额
    Receive(:dataSource="dataSource")
  .portrait_box
    Header(:title="'应收计划逾期情况'" style="padding-left: 20px;")
    Card(
      :columns="overColunms"
      :dataSource="dataSource"
    )
    //- 当前逾期金额
    Overdue(:dataSource="dataSource")
</template>
<script>
import { defineComponent, computed } from '@vue/composition-api'
import Header from '@/components/qjd/header'
import ajaxStore from '@/apis'
import useAsync from 'hooks/useAsync'
import Card from './components/card'
import Receive from './receive'
import Overdue from './overdue'
import { receiveColumns, overColunms } from './config'

export default defineComponent({
  components: {
    Card,
    Receive,
    Overdue,
    Header
  },
  props: {
    customerId: String
  },
  setup(props) {
    // ajax
    const { receive: { getCustomerImageDataView } } = ajaxStore
    // 获取画像数据
    const { result, loading } = useAsync({ request: getCustomerImageDataView, params: { customerId: props.customerId } })
    // 处理数据
    const dataSource = computed(() => result.value ?? {})

    return {
      receiveColumns,
      overColunms,
      dataSource,
      result,
      loading
    }
  },
})
</script>
<style lang="stylus" scoped>
@import './index.styl';
</style>
