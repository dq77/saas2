<template lang="pug">
.p-bar.u-bac(v-loading='loading')
  .u-list-item
    .u-left
      svg.icon(aria-hidden='true')
        use(:xlink:href='`#iconjine`')
    .u-right
      .u-label 应收金额（元）
      .u-content {{ info.incomeAmountText }}
  .u-list-item
    .u-left
      svg.icon(aria-hidden='true')
        use(:xlink:href='`#iconlishi`')
    .u-right
      .u-label 应收余额（元）
      .u-content {{ info.incomeBalanceText }}
  .u-list-item
    div
      .u-label 状态
      .u-content-lighter {{ info.statusText }}
  .u-list-item
    div
      .u-label 关联发货单号
      .u-content-lighter
        span {{ info.deliverSn }}
        span.u-link(@click='clickDetail') 查看 &rsaquo;
  .u-list-item
    div
      .u-label 应收创建日期
      .u-content-lighter {{ info.createdTime }}
</template>

<script>
import { defineComponent, ref } from '@vue/composition-api'
import useAsync from 'hooks/useAsync'
import ajaxStore from '@/apis'
import { receivableStatus } from '@/utils/enumsSaas'
import { toAmountStr } from '@/utils/util'

export default defineComponent({
  props: {
    incomeSn: String
  },
  setup(props, {root}) {
    const info = ref({})
    const { loading } = useAsync({
      request: ajaxStore.factory.finance.getReceivablesBaseInDetail,
      params: {
        incomeSn: props.incomeSn
        // id: '1475366308595404801'
      },
      successCallBack: res => {
        if (res?.code === '0') {
          const data = res?.data ?? {}
          // 应收金额
          data.incomeAmountText = toAmountStr(data.incomeAmount, 2, true)
          // 应收余额
          data.incomeBalanceText = toAmountStr(data.incomeBalance, 2, true)
          // 状态
          data.statusText = data.isCheck >= 0 ? receivableStatus[data.isCheck] : '- -'
          info.value = data
        }
      }
    })
    const clickDetail = () => {
      root.$router.push({
        name: 'deliverDetail',
        query: {
          id: info.value.invoiceId,
          status: '-1', // 只要有值即可
          type: 'look'
        }
      })
    }
    return {
      loading,
      info,
      clickDetail
    }
  },
})
</script>

<style lang="stylus" scoped>
.p-bar
  display: flex
  padding 20px
  &.u-bac
    background: url('//cdn.qjdchina.com/static-online/saas/SupplyChain/orderMaster/bar-bac.jpg') no-repeat
    background-position: top right
    background-size: auto 100%
  .u-label
    color #494949
    font-size: 12px
    line-height: 17px
  .u-content
    margin-top 3px
    color #494949
    font-size: 22px
    line-height: 31px
  .u-content-lighter
    margin-top 7px
    color #494949
    font-size: 12px
    line-height: 31px
  .u-link
    margin-left 6px
    font-size: 12px
    color #3B68F0
    cursor: pointer
  .u-list-item
    display: flex
    align-items: center
    flex 1
    padding-left 20px
    width 0
    &:nth-child(2)
      border-right 1px solid #F2F2F6
    .u-left
      .icon
        width: 40px
        height: 40px
    .u-right
      margin-left 8px
</style>
