<template lang="pug">
Modal(
  :title="title"
  :visible="visible"
  :sureTxt="'确认'"
  :loading="loading"
  @cancleHandle="cancleHandle"
  @sureHandle="sureHandle"
)
  Form(
    ref="formRef"
    :formData="formApis.formData",
    :formConfig="formApis.formConfig"
    :inline="false"
    :labelPosition="'right'"
    :labelWidth="'60px'"
  )
</template>
<script>
import { reactive, ref, toRefs, watch } from '@vue/composition-api'
import Modal from '@/components/qjd/modal'
import ajaxStore from '@/apis'
import useAsync from 'hooks/useAsync'
import Form from '@/components/qjd/form'
import useForm from 'hooks/useForm'
import { Message } from 'element-ui'
import { formData, formConfig } from './config'

export default {
  components: {
    Modal,
    Form
  },
  props: {
    title: String,
    visible: Boolean,
    detail: Object
  },
  setup(props, { emit }) {
    // ref
    const formRef = ref()
    // ajax
    const { factory: { chooseAssignFollower, orgprojectmemberCreate } } = ajaxStore
    // form
    const formApis = useForm({ formRef, formData, formConfig })
    // 获取跟进员信息
    useAsync({
      request: chooseAssignFollower,
      successCallBack: res => {
        formApis.setConfig('memberId', 'options', res?.data ?? [])
      }
    })
    // // 提交接口
    const { loading, doResult } = useAsync({
      init: false,
      request: orgprojectmemberCreate,
      successCallBack: ({ code }) => {
        if (code === '0') {
          Message.success('分配成功')
          emit('successHandle')
          cancleHandle()
        }
      }
    })
    // 取消
    const cancleHandle = () => {
      formApis.resetFormData()
      emit('cancleHandle')
    }
    // 确定
    const sureHandle = () => {
      doResult({
        memberIdList: formApis.formData.memberId ?? [],
        projectId: props.detail?.id
      })
    }
    // watch
    watch(
      () => props.visible,
      val => {
        if (val) {
          console.log('props.detail.projectMemberDetailResponseList---', props.detail.projectMemberDetailResponseList)
          const memberId = props.detail.projectMemberDetailResponseList?.map(item => item.memberId) ?? []
          const { name } = props.detail ?? {}
          formApis.setFormItem('name', name)
          formApis.setFormItem('memberId', memberId)
        }
      }
    )
    // state
    const state = reactive({ formApis })

    return {
      formRef,
      cancleHandle,
      sureHandle,
      loading,
      ...toRefs(state)
    }
  },
}
</script>
