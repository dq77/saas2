<!--
 * @Date: 2021-08-02 15:34:44
 * @LastEditors: 掉漆
 * @LastEditTime: 2021-08-16 19:03:37
-->
<template lang="pug">
.repayment-list-dialog
  el-dialog(title="支付明细" :visible.sync="show" width="900px" :before-close="handleClose")
    .title 应付信息
    table
      tr
        th 订单编号
        th 货款编号
        th 客户名称
        th 项目名称
        th(style='width: 90px') 订单金额
        th(style='width: 90px') 赊销金额
        th(style='width: 84px') 到期时间
        th(style='width: 90px') 已付金额
        th(style='width: 100px') 剩余未付金额
      tr
        td {{ row.qjdOrderCode }}
        td {{ row.loanOrderCode }}
        td {{ row.companyName }}
        td {{ row.projectName }}
        td {{ row.orderAmount ? `¥${toAmountStr(row.orderAmount, 2, true)}` : '' }}
        td {{ row.creditAmount ? `¥${toAmountStr(row.creditAmount, 2, true)}` : '' }}
        td {{ row.principalExpiredTime }}
        td {{ row.principalRepaidAmount ? `¥${toAmountStr(row.principalRepaidAmount, 2, true)}` : '' }}
        td {{ row.principalRemainAmount ? `¥${toAmountStr(row.principalRemainAmount, 2, true)}` : '' }}
    .title 已付信息
    table
      tr
        th 付款日期
        th 付款金额
        th 付款方式
        th.wide &nbsp;
      tr(v-for='item in detailInfo' :key='item.loanOrderCode')
        td {{ item.repaymentDate }}
        td {{ item.repaymentAmount ? `￥ ${toAmountStr(item.repaymentAmount, 2, true)}` : '' }}
        td {{ item.repaymentMethod }}
        td &nbsp;
</template>
<script>
import ajaxStore from '@/apis'
import { toAmountStr } from '@/utils/util'
import { ref, watch } from '@vue/composition-api'

export default {
  props: {
    show: {
      type: Boolean,
      defaultValue: false
    },
    row: {
      type: Object,
      defaultValue: () => {}
    }
  },
  components: {
  },
  setup(props, context) {
    const { geRepayDetail } = ajaxStore.factoryService.qjd
    const loading = ref(true)
    const detailInfo = ref([])
    const getDetailInfo = async () => {
      loading.value = true
      const res = await geRepayDetail({loanOrderCode: props.row.loanOrderCode})
      loading.value = false
      if (res.data && res.data.code === '0') {
        detailInfo.value = res.data.data
      }
    }
    watch(() => props.show, (val, preVal) => {
      if (val) {
        getDetailInfo()
      }
    })
    const handleClose = () => { context.emit('close') }

    return {
      loading,
      detailInfo,
      toAmountStr,
      handleClose
    }
  },
}
</script>
<style lang="stylus">
.repayment-list-dialog
  .el-dialog__body
    padding-top 0
  .title
    color #494949
    margin 20px 0 10px
  table
    width 100%
    border 1px solid #F2F2F6
  td,th
    font-size 12px
    color #494949
    padding 16px 10px
  th
    background-color #728BC2
    color #FFF
    font-weight normal
    text-align left
  .wide
    width 60%
</style>
