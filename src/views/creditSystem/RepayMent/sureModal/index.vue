<template lang="pug">
Modal(
  :title="title"
  :visible="visible"
  :width="'800px'"
  :loading="loading"
  @cancleHandle="cancleHandle"
  @sureHandle="sureHandle"
)
  Table(
    :dataSource="detail"
    :columns="columns"
  )
  .amount 本次退款总金额：{{ percent2(amout) }}
</template>
<script>
import { watch, ref } from '@vue/composition-api'
import Modal from '@/components/qjd/modal'
import { columns } from './config'
import Table from '@/components/qjd/table'
import ajaxStore from '@/apis'
import useAsync from 'hooks/useAsync'
import { Message } from 'element-ui'
import { percent2 } from '@/utils/qjd'

export default {
  components: {
    Modal,
    Table,
  },
  props: {
    title: String,
    visible: Boolean,
    detail: {
      type: Array,
      default: () => ([])
    }
  },
  setup(props, { emit }) {
    const { credit: { backCreateBatch } } = ajaxStore
    const amout = ref(0)
    // 成功回调
    const successCallBack = ({ code }) => {
      if (code === '0') {
        cancleHandle()
        emit('successHandle')
        Message.success('退货成功')
      }
    }
    // 确定-接口
    const { doResult, loading } = useAsync({ request: backCreateBatch, init: false, successCallBack })
    // 取消
    const cancleHandle = () => emit('cancleHandle')
    const getAmount = () => {
      const { detail } = props
      detail && detail.length && detail.forEach(item => { amout.value += item.backAmount })
    }
    // 总关单金额
    watch(
      () => props.visible,
      val => {
        val && getAmount()
        if (!val) amout.value = 0
      }
    )
    // 确定
    const sureHandle = () => {
      const { detail } = props
      const cancelWebAddRequestList = []
      detail && detail.length && detail.forEach(item => {
        const { backAmount, extDeliveryCode, extOrderCode } = item || {}
        cancelWebAddRequestList.push({ deliveryCancelCreditAmount: backAmount, extDeliveryCode, extOrderCode })
      })
      doResult({ cancelWebAddRequestList })
    }

    return {
      loading,
      cancleHandle,
      columns,
      sureHandle,
      amout,
      percent2
    }
  },
}
</script>
<style lang="stylus" scoped>
.amount
  text-align right
  padding-top 20px
  font-size 12px
</style>
