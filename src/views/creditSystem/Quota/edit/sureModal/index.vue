<template lang="pug">
Modal(
  :title="title"
  :visible="visible"
  :sureTxt="'确认'"
  :loading="loading"
  @cancleHandle="cancleHandle"
  @sureHandle="sureHandle"
)
  span 点击提交后将进入授信审批流程
</template>
<script>
import Modal from '@/components/qjd/modal'
import ajaxStore from '@/apis'
import useAsync from 'hooks/useAsync'
import { typeParams } from '../config'
import { Message } from 'element-ui'
import { valiFile, getFiles } from '../../../util'
import store from '@/store'

export default {
  components: {
    Modal,
  },
  props: {
    title: String,
    visible: Boolean,
    formData: Object,
    isRequireInfo: Object,
    noticeInfo: Object
  },
  setup(props, { emit, root }) {
    const { credit: { creditCreate } } = ajaxStore
    // 提交接口
    const { doResult, loading } = useAsync({
      init: false,
      request: creditCreate,
      successCallBack: ({ code, message }) => {
        if (code === '0') {
          Message.success('发起成功')
          emit('cancleHandle')
          root.$router.push({ name: 'creditSuccess', query: { key: 'credit' } })
        } else {
          Message.error(message)
        }
      }
    })
    // 获取参数
    const _getParams = (type, form) => {
      const params = {}
      typeParams[type].forEach(item => {
        params[item] = form[item]
      })
      return params
    }
    // 取消
    const cancleHandle = () => emit('cancleHandle')
    // 确定
    const sureHandle = () => {
      const { state: { userInfo } } = store
      const { memberId, name } = userInfo ?? {}
      const { isRequireInfo, formData, noticeInfo } = props
      noticeInfo.memberId = memberId
      noticeInfo.memberName = name
      const params = _getParams(formData.creditType, formData)
      params.fileList = getFiles(params.fileList)
      const { isHas, id } = valiFile(isRequireInfo, params.fileList)
      if (!isHas) {
        Message.warning(`请上传${isRequireInfo[id].materialsName}`)
        return
      }
      doResult({ ...params, ruleReminderContext: noticeInfo ? JSON.stringify(noticeInfo) : ''})
    }

    return {
      cancleHandle,
      sureHandle,
      loading
    }
  },
}
</script>
