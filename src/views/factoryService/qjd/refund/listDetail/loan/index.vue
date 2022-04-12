<template lang="pug">
.page-main
  .collapse-box
    Collapse(
      :columns="colColumns1"
      :defaultActiveName="defaultActiveName"
    )
      //- 基础信息
      template(slot="info")
        Descriptions(
          style="margin-bottom: 20px;"
          :labelWidth="170"
          :columns="detailColumns1"
          :dataSource="info || {}"
        )
      //- 退款抵扣详情
      template(slot="refundDetail")
        Table(
          border
          index
          :columns="columns1"
          :dataSource="detail || []"
        )
</template>
<script>
import Collapse from '@/components/qjd/collapse'
import { computed } from '@vue/composition-api'
import Descriptions from '@/components/qjd/descriptions'
import {
  colColumns1,
  defaultActiveName,
  detailColumns1,
  columns1,
} from '../config'
import Table from '@/components/qjd/table'
import useAsync from 'hooks/useAsync'
import ajaxStore from '@/apis'

export default {
  components: {
    Collapse,
    Descriptions,
    Table
  },
  setup(props, { root }) {
    const { $route: { query: { loanNo } } } = root
    // ajax
    const {factoryService: { qjd: { getRefundOrderFlow, getLoanDeductionInfo } }} = ajaxStore
    // 获取详情
    const { result, loading } = useAsync({
      request: getRefundOrderFlow,
      params: { loanNo }
    })
    const { result: _getLoanDeductionInfo } = useAsync({
      request: getLoanDeductionInfo,
      params: { loanNo }
    })
    // 数据容错处理
    const detail = computed(() => (result?.value ?? []))
    const info = computed(() => (_getLoanDeductionInfo?.value ?? {}))
    return {
      colColumns1,
      defaultActiveName,
      detailColumns1,
      columns1,
      loading,
      detail,
      info,
    }
  },
}
</script>
<style lang="stylus" scoped>
.refund_etail
  background: #fff
  padding 20px 0
</style>
