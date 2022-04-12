<template lang="pug">
Modal(
  :title="title"
  :visible="visible"
  :width="'600px'"
  :sureTxt="'提交'"
  :loading="loading"
  @cancleHandle="cancleHandle"
  @sureHandle="sureHandle"
)
  div(style="padding-bottom: 20px") 请按标准模板上传本次新增的还款单，上传Excel后系统会逐条校验还款信息，每次上传不能超过100条记录
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
import { ref } from '@vue/composition-api'
import Modal from '@/components/qjd/modal'
import Upload from '@/components/qjd/upload'
import { Message } from 'element-ui'
import { toPrefixUrl } from '@/utils/util'
import useLoading from 'hooks/useLoading'
import { weblogsDom } from '@/utils/qjd/weblogs'

const action = toPrefixUrl('/saas-credit/v1/credit/import/uploadDelivery')

export default {
  components: {
    Modal,
    Upload
  },
  props: {
    title: String,
    visible: Boolean
  },
  setup(props, { emit, root }) {
    const uploadRef = ref()
    // loading
    const { loading, checkLoading } = useLoading()
    // 取消
    const cancleHandle = () => {
      weblogsDom('还款列表-批量导入-取消')
      uploadRef.value.setFileList([])
      emit('cancleHandle')
    }
    // success
    const onSuccess = ({ response }) => {
      const { code, message } = response || {}
      checkLoading(false)
      if (code === '0') {
        Message.success('上传成功')
        root.$router.push({ name: 'repayMentRecord' })
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
      try {
        weblogsDom('还款列表-批量导入-提交')
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
    const temHandle = () => window.open('https://cdn.qjdchina.com/templates/%E6%89%B9%E9%87%8F%E5%AF%BC%E5%85%A5%E8%BF%98%E6%AC%BE%E5%8D%95%E6%A8%A1%E7%89%88.xlsx')

    return {
      uploadRef,
      action,
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
