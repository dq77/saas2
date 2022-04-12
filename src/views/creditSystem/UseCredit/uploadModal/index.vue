<template lang="pug">
Modal(
  :title="title"
  :visible="visible"
  :width="'600px'"
  :sureTxt="'提交'"
  :loading="loading"
  :disabled="disabled"
  @cancleHandle="cancleHandle"
  @sureHandle="sureHandle"
)
  div(style="padding-bottom: 20px") 请按标准模板上传本次新增的用信单，上传Excel后系统会逐条校验用信信息，每次上传不能超过100条记录。
  Upload(
    ref="uploadRef"
    :auto="false"
    :single="true"
    :action="action"
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
</template>
<script>
import { ref, computed } from '@vue/composition-api'
import Modal from '@/components/qjd/modal'
import Upload from '@/components/qjd/upload'
import { Message } from 'element-ui'
import { toPrefixUrl } from '@/utils/util'
import useLoading from 'hooks/useLoading'
import { weblogsDom } from '@/utils/qjd/weblogs'

const action = toPrefixUrl('/saas-credit/v1/credit/import/uploadOrder')

export default {
  components: {
    Modal,
    Upload
  },
  props: {
    title: String,
    visible: Boolean,
    setInfo: Function,
    noticeInfo: Object
  },
  setup(props, { emit, root }) {
    const uploadRef = ref()
    // loading
    const { loading, checkLoading } = useLoading()
    // 是否可提交
    const disabled = computed(() => !!(props?.noticeInfo?.errorMsgList?.length && props?.noticeInfo?.limitType === '2'))
    // 取消
    const cancleHandle = () => {
      // 埋点
      weblogsDom('用信列表-批量导入-取消')
      uploadRef.value.setFileList([])
      props.setInfo && props.setInfo({})
      emit('cancleHandle')
    }
    // success
    const onSuccess = ({ response }) => {
      const { code, message } = response || {}
      checkLoading(false)
      if (code === '0') {
        Message.success('上传成功')
        root.$router.push({ name: 'useRecord' })
      } else {
        Message.error(message)
      }
    }
    // error
    const onError = error => {
      checkLoading(false)
      Message.error(JSON.stringify(error))
    }
    // remove
    const onRemove = ({ files }) => uploadRef.value && uploadRef.value.setFileList(files)
    // 提交
    const sureHandle = () => {
      // 埋点
      weblogsDom('用信列表-批量导入-提交')
      try {
        checkLoading(true)
        const { value: { getFileList, uploadSubmit } } = uploadRef
        const fileList = getFileList()
        if (!fileList.length) return Message.warning('请选择文件')
        uploadSubmit()
      } catch (error) {
        checkLoading(false)
        console.error(`error: ${error}`)
      }
    }
    // 下载模板
    const temHandle = () => window.open('https://qjdstatic.oss-cn-hangzhou.aliyuncs.com/online/saas/credit/%E6%89%B9%E9%87%8F%E5%AF%BC%E5%85%A5%E7%94%A8%E4%BF%A1%E5%8D%95%E6%A8%A1%E7%89%88.xlsx')

    return {
      uploadRef,
      action,
      disabled,
      sureHandle,
      cancleHandle,
      onSuccess,
      onError,
      onRemove,
      temHandle,
      loading
    }
  },
}
</script>
