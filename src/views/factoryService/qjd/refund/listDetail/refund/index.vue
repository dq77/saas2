<template lang="pug">
.page-main
  .collapse-box
    Collapse(
      :columns="colColumns2"
      :defaultActiveName="defaultActiveName"
    )
      //- 基础信息
      template(slot="info")
        Descriptions(
          style="margin-bottom: 20px;"
          :labelWidth="170"
          :columns="detailColumns2"
          :dataSource="info || {}"
        )
      //- 退款抵扣详情
      template(slot="refundDetail")
        Table(
          border
          index
          :columns="columns2"
          :dataSource="detail || []"
        )
</template>
<script>
import Collapse from '@/components/qjd/collapse'
import { computed } from '@vue/composition-api'
import Descriptions from '@/components/qjd/descriptions'
import {
  colColumns2,
  defaultActiveName,
  detailColumns2,
  columns2,
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
    const { $route: { query: { refundId, refundLoanNo } } } = root
    // ajax
    const {factoryService: { qjd: { getRefundOrderFlow, getRefundDeductionInfo } }} = ajaxStore
    // 获取详情
    const { result, loading } = useAsync({
      request: getRefundOrderFlow,
      params: { refundId, refundLoanNo }
    })
    const { result: _getRefundDeductionInfo } = useAsync({
      request: getRefundDeductionInfo,
      params: { refundId, refundLoanNo }
    })
    // 数据容错处理
    const detail = computed(() => (result?.value ?? []))
    const info = computed(() => (_getRefundDeductionInfo?.value ?? {}))

    return {
      colColumns2,
      defaultActiveName,
      detailColumns2,
      columns2,
      loading,
      info,
      detail,
    }
  },
}
</script>
<style lang="stylus" scoped>
.refund_etail
  background: #fff
  padding 20px 0
</style>
