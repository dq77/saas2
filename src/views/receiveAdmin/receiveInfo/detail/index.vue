<template lang="pug">
Modal(
  :title="title"
  :width="'600px'"
  :visible="visible"
  :showSure="false"
  :cancleTxt="'关闭'"
  @cancleHandle="cancleHandle"
)
  div(v-loading="loading")
    .detail_info
      .detail_label 收款时间：
      .detail_value {{ dataSource.repaymentTime }}
    .detail_info
      .detail_label 收款金额：
      .detail_value {{ dataSource.repaymentAmount }}
    .detail_info
      .detail_label 付款方：
      .detail_value {{ dataSource.payerName }}
    .detail_info
      .detail_label 付款方式：
      .detail_value {{ dataSource.paymentTypeName }}
    .detail_info
      .detail_label 收款备注：
      .detail_value {{ dataSource.memo }}
    .detail_info
      .detail_label 附件：
      .detail_value
        .file_list(
          v-for="(item, index) in (dataSource && dataSource.saArmBusinessFileList ? dataSource.saArmBusinessFileList : [])"
          :key="index"
          @click="() => onPreview(item.fileKey)"
        ) {{ item.fileName }}
</template>
<script>
import { watch, computed } from '@vue/composition-api'
import Modal from '@/components/qjd/modal'
import ajaxStore from '@/apis'
import useAsync from 'hooks/useAsync'
import { toPrefixUrl } from '@/utils/util'

export default {
  components: {
    Modal,
  },
  props: {
    title: String,
    visible: Boolean,
    detail: String
  },
  setup(props, { emit }) {
    // ajax
    const { receive: { getReceiveDetail } } = ajaxStore
    // 变更授信接口
    const { doResult, loading, result } = useAsync({ request: getReceiveDetail, init: false })
    // 结果处理
    const dataSource = computed(() => result.value ?? {})
    // 取消
    const cancleHandle = () => {
      emit('cancleHandle')
    }
    // watch
    watch(
      () => props.visible,
      value => {
        value && doResult({ saArmRepaymentItemId: props?.detail ?? '' })
      }
    )
    // 预览
    const onPreview = fileKey => window.open(toPrefixUrl(`/fs/file/download?fileKey=${fileKey}`))

    return {
      cancleHandle,
      loading,
      dataSource,
      onPreview
    }
  },
}
</script>
<style lang="stylus" scoped>
.detail_info
  display: flex
  font-size: 12px;
  font-weight: 400;
  line-height: 16px
  color: var(--fontColor);
  margin-bottom: 10px
  .detail_label
    color: #848484;
    width: 86px
.file_list
  color: #3B68F0
  margin-bottom: 5px
  cursor pointer
</style>
