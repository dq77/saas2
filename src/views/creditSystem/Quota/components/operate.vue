<template lang="pug">
fragment
  fragment(v-if='dataSource && dataSource.creditStatus === "in_credit"')
    el-popconfirm(
      :title="'确定取消授信吗？'"
      style="margin-right: 10px;"
      @confirm="() => cancleHandle({ id: dataSource ? dataSource.id : '', creditStatus: 'cancelled' })"
    )
      el-button(type='text' weblogs-anchor="common-credit-cancle" slot="reference") 取消
  fragment(v-else-if='dataSource && (dataSource.creditStatus === "invalidation" || dataSource.creditStatus === "expired") && dataSource.creditType !== "project_credit"')
    el-popconfirm(
      :title="'确定重新授信吗？'"
      style="margin-right: 10px;"
      @confirm="() => againHandle({ id: dataSource ? dataSource.id : '' })"
    )
      el-button(type='text' slot="reference") 重新授信
  fragment(v-else-if='dataSource && dataSource.creditStatus === "credit_granted" && dataSource.creditType === "project_credit"')
    el-button(type='text' @click='() => proAgainHandle(dataSource)') 重新授信
  fragment(v-if="dataSource && dataSource.creditStatus === 'credit_granted'")
    el-button(type="text" :disabled="dataSource.containsProcessingChangeApply || dataSource.containsProcessingInvalidApply" @click="() => changeCreditHandle(dataSource)") 变更授信
    el-button(type="text" :disabled="dataSource.containsProcessingChangeApply || dataSource.containsProcessingInvalidApply" v-if="dataSource.creditStatusName !== '已失效'" @click="() => expireCreditHandle(dataSource)") 失效授信
  fragment
    el-button(type='text' weblogs-anchor="common-credit-see" @click='seeHandle(dataSource)') 查看
</template>
<script>
import ajaxStore from '@/apis'
import useAsync from 'hooks/useAsync'
import { Message } from 'element-ui'

export default {
  props: {
    dataSource: {
      type: Object,
      default: () => ({})
    }
  },
  setup(props, { emit, root }) {
    const { credit: { reCreditApply, updateCreditApplyStatus } } = ajaxStore
    // 成功回调
    const successCallBack = ({ code } = {}) => {
      code === '0' && Message.success('操作成功')
      code === '0' && emit('successHandle')
    }
    // 取消授信
    const { doResult: cancleHandle } = useAsync({
      init: false,
      request: updateCreditApplyStatus,
      successCallBack
    })
    // 非项目授信-重新授信
    const { doResult: againHandle } = useAsync({
      init: false,
      request: reCreditApply,
      successCallBack
    })
    // 项目授信-重新授信
    const proAgainHandle = dataSource => root.$router.push({ name: 'QuotaEdit', params: { id: dataSource?.id }, query: { creTy: dataSource?.creditType } })
    // 查看
    const seeHandle = (dataSource) => root.$router.push({ name: 'quotaDetail', params: { id: dataSource ? dataSource.id : '' } })
    // 变更授信
    const changeCreditHandle = dataSource => emit('changeCreditHandle', dataSource)
    // 失效授信
    const expireCreditHandle = dataSource => emit('expireCreditHandle', dataSource)

    return {
      cancleHandle,
      againHandle,
      proAgainHandle,
      seeHandle,
      changeCreditHandle,
      expireCreditHandle
    }
  },
}
</script>
