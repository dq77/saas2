<template lang="pug">
Modal(
  :title="title"
  :visible="visible"
  :width="'600px'"
  :sureTxt="status === '1' || status === '3' ? '确定' : status === '2' ? '前往查看' : ''"
  :loading="loading"
  @cancleHandle="cancleHandle"
  @sureHandle="sureHandle"
)
  Upload(
    v-if="status === '1'"
    ref="uploadRef"
    :auto="false"
    :single="true"
    :action="action"
    :otherData="uploadInfo.otherData"
    @onSuccess="onSuccess"
    @onError="onError"
    @onRemove="onRemove"
  )
    el-button(slot="trigger") 选择文件
    el-button(
      type="text"
      style="margin-left: 10px;"
      @click="temHandle"
    ) 下载模板
  div(
    v-else
    style="padding-bottom: 20px;"
  ) {{ status === '2' ? '添加成功，请前往“应收信息查询”查看详情' : status === '3' ? '添加失败，请重新上传' : '' }}
</template>
<script>
import { ref, computed, watch } from '@vue/composition-api'
import Modal from '@/components/qjd/modal'
import Upload from '@/components/qjd/upload'
import { Message } from 'element-ui'
import { toPrefixUrl } from '@/utils/util'
import useLoading from 'hooks/useLoading'
import useTimeout from 'hooks/useTimeout'

const action = toPrefixUrl('/saas-boss/excel/upload')

export default {
  components: {
    Modal,
    Upload
  },
  props: {
    title: String,
    visible: Boolean,
    isSelf: Boolean,
    kind: String
  },
  setup(props, { emit, root: { $router } }) {
    // 上传状态 1: 初始状态，2： 成功，3： 失败
    const status = ref('1')
    // ref
    const uploadRef = ref()
    // loading
    const { loading, checkLoading } = useLoading()
    // useTimeout
    const { perTimeout } = useTimeout()
    // 上传相关信息
    const uploadInfo = computed(() => {
      const { kind } = props
      const url = toPrefixUrl(kind === 'plain' ? '/saas-arm/org/saArmReceivablePlanItem/getTemplate' : '/saas-arm/org/saArmRepaymentItem/getTemplate')
      const otherData = { businessType: kind === 'plain' ? 'arm_receivable_plan_bulk_import' : kind === 'pay' ? 'arm_receivable_payment_bulk_import' : '' }

      return {
        url,
        otherData
      }
    })
    // clearFiles
    const clearFiles = () => {
      perTimeout(() => {
        uploadRef.value && uploadRef.value.clearFiles()
        uploadRef.value && uploadRef.value.setFileList([])
      })
    }
    // 取消
    const cancleHandle = () => {
      clearFiles()
      emit('cancleHandle')
    }
    // success
    const onSuccess = ({ response }) => {
      const { code, message } = response || {}
      checkLoading(false)
      const { isSelf } = props
      if (code === '0') {
        isSelf && cancleHandle()
        // 若是在当前页面无需更改状态，隐藏弹窗抛出事件即可
        if (!isSelf) {
          status.value = '2'
        }
        Message.success('上传成功')
        isSelf && emit('successHandle')
      } else {
        // 若是在当前页面无需更改状态，隐藏弹窗抛出事件即可
        if (!isSelf) status.value = '3'
        Message.error(message)
      }
    }
    // error
    const onError = error => {
      checkLoading(false)
      status.value = '3'
      Message.error(JSON.stringify(error))
    }
    // remove
    const onRemove = ({ files }) => uploadRef.value && uploadRef.value.setFileList(files)
    // 提交
    const sureHandle = () => {
      try {
        if (status.value === '1') {
          const { value: { getFileList, uploadSubmit } } = uploadRef
          const fileList = getFileList()
          if (!fileList.length) return Message.warning('请选择文件')
          checkLoading(true)
          uploadSubmit()
        } else if (status.value === '2') {
          $router.push({ name: 'InfoSearch' })
        } else if (status.value === '3') {
          status.value = '1'
        }
      } catch (error) {
        checkLoading(false)
        console.error(`error: ${error}`)
      }
    }
    // 下载模板
    const temHandle = () => window.open(uploadInfo.value?.url)
    // watch
    watch(
      () => props.visible,
      value => {
        status.value = '1'
      }
    )

    return {
      uploadRef,
      action,
      sureHandle,
      cancleHandle,
      onSuccess,
      onError,
      onRemove,
      temHandle,
      loading,
      status,
      uploadInfo
    }
  },
}
</script>
