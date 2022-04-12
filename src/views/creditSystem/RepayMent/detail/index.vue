<template lang="pug">
.page-main
  .collapse-box
    Collapse(
      :columns="colColumns"
      :defaultActiveName="defaultActiveName"
    )
      //- 用信信息
      template(slot="user")
        Descriptions(
          :labelWidth="150"
          :columns="userColumns"
          :dataSource="repayTypeList"
          :num="1"
        )
      //- 订单信息
      template(slot="order")
        Descriptions(
          :labelWidth="150"
          :columns="orderColumns"
          :dataSource="repayInfo"
        )
      //- 货单信息
      template(slot="good")
        Descriptions(
          :labelWidth="150"
          :columns="goodColumns"
          :dataSource="repayInfo"
        )
      //- 还款信息
      template(slot="pay")
        Table(
          :columns="payColumns"
          :dataSource="dataSource"
          :isExpand="true"
        )
          template(slot="table-expand")
            ul(v-if="repayList && repayList.pagedRecords && repayList.pagedRecords.length")
              li.pay-item
                div 还款时间
                div 还款金额
              li.pay-item(v-for="(item, index) in repayList.pagedRecords" :key="index")
                div {{ item.repaymentTime ? item.repaymentTime : '--' }}
                div {{ percent2(item.repaymentAmount) }}
            Empty(v-else)
</template>
<script>
import { ref } from '@vue/composition-api'
import Collapse from '@/components/qjd/collapse'
import Descriptions from '@/components/qjd/descriptions'
import Table from '@/components/qjd/table'
import Empty from '@/components/qjd/empty'
import useAsync from 'hooks/useAsync'
import ajaxStore from '@/apis'
import { percent2 } from '@/utils/qjd'
import {
  defaultActiveName,
  colColumns,
  userColumns,
  orderColumns,
  goodColumns,
  payColumns
} from './config'

export default {
  components: {
    Collapse,
    Descriptions,
    Table,
    Empty
  },
  setup(props, { root }) {
    const dataSource = ref([])
    // id
    const { $route: { params: { id } } } = root

    const { credit: { getCreditRepayDetail, getCreditrepaymentplan, getRepayTypeList } } = ajaxStore
    // 还款信息-展开数据
    const { result: repayList, doResult: _getCreditrepaymentplan } = useAsync({ request: getCreditrepaymentplan, init: false })
    // 用信信息-授信类型
    const { result: repayTypeList, doResult: _getRepayTypeList } = useAsync({ request: getRepayTypeList, init: false })
    // 还款详情整体信息
    const {
      result: repayInfo
    } = useAsync({
      request: getCreditRepayDetail,
      params: { creditDeliveryId: id },
      successCallBack: ({ code, data }) => {
        if (code === '0') {
          dataSource.value = [data]
          const { deliveryNo, orderNo, billNo } = data || {}
          _getCreditrepaymentplan({ deliveryNo, orderNo, pageSize: 100 })
          _getRepayTypeList({ billNo, pageSize: 100 })
        }
      }
    })

    return {
      defaultActiveName,
      colColumns,
      userColumns,
      orderColumns,
      goodColumns,
      payColumns,
      repayTypeList,
      repayInfo,
      repayList,
      dataSource,
      percent2
    }
  },
}
</script>
<style lang="stylus" scoped>
@import './index.styl';
</style>
