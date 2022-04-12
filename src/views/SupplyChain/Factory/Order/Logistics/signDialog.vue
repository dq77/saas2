<template lang="pug">
  Modal(
    :title="title"
    :visible="visible"
    :width="'400px'"
    @cancleHandle="cancleHandle"
    @sureHandle="sureHandle"
    :sureTxt="'立即签收'"
    :loading="loading"
  )
    div(style='text-align:center') 签收前请确认货物包装完好，数量正确
    div(style='text-align:center')
      //- a(:href='`${baseUrl}/proof/file/rawFile?fileKey=${detail ? detail.deliverFile : ''}`' target='__blank') 点击预览电子签收单
      a(:href='`${baseUrl}/proof/file/rawFile?fileKey=${detail ? detail.deliverFile : ""}`' target='__blank') 点击预览电子签收单
    el-form(ref='fromRef' :model='formData' label-position='top')
      el-form-item(label='选择签收人' prop='signPeople' :rules='[{ required: true, message: "请选择签收人" }]')
        el-select(v-model='formData.signPeople'  placeholder="请选择签收人" value-key='idCardNo' style='width:100%')
          el-option(v-for='item in signPeopleList' :label='item.name + item.personPhone' :value='item' :key='item.idCardNo')
      el-form-item(label='短信验证码签收' prop='verifyCode' :rules='[{ required: true, message: "请输入验证码" }]')
        el-input(ref="verifyRef" placeholder='请输入验证码' v-model='formData.verifyCode' @keyup.enter.native='sureHandle')
          el-button(slot='append' type='text' v-if='count === 0' style='padding: 0 12px' @click='sendMessage') 获取验证码
          el-button(slot='append' type='text' v-else style='padding: 0 12px') {{count + '秒后重新发送'}}
</template>

<script>
import { onMounted, reactive, ref, toRefs } from '@vue/composition-api'
import Modal from '@/components/qjd/modal'
import useAsync from 'hooks/useAsync'
import ajaxStore from '@/apis'
import store from '@/store'
import { Message } from 'element-ui'
import { baseUrl } from '@/utils/config'
import useLoading from 'hooks/useLoading'

export default {
  components: {
    Modal
  },
  props: {
    title: String,
    visible: Boolean,
    detail: {
      type: Object,
      default: () => ({})
    }
  },
  setup(props, { emit }) {
    const { factory: { phoneCodeReceipt, getMobileVerifyCode } } = ajaxStore
    const { state: { userInfo: { tenants } } } = store
    // console.log(props.detail, 'fff1')
    const fromRef = ref(null)
    const verifyRef = ref(null)
    const signState = reactive({
      signPeopleList: [],
      formData: {
        signPeople: '',
        verifyCode: ''
      },
      count: 0
    })
    const { loading, checkLoading } = useLoading()
    const { doResult: _getVerifiedAndAuthorize } = useAsync({
      request: ajaxStore.common.order.getVerifiedAndAuthorize,
      init: false,
      params: { corporationId: tenants[0].tenantId },
      successCallBack: ({data}) => {
        // debugger
        const { list } = data || []
        signState.signPeopleList = list
      }
    })
    const { doResult: _sureHandle } = useAsync({
      request: phoneCodeReceipt,
      init: false,
      successCallBack: ({ code, data }) => {
        checkLoading(false)
        if (code === '0') {
          emit('updateList')
          cancleHandle()
          Message.success('签收成功')
        }
      }
    })
    const { doResult: _getMobileVerifyCode } = useAsync({
      request: getMobileVerifyCode,
      init: false,
      successCallBack: ({ code }) => {
        if (code === '0') {
          signState.count = 60
          countCode(60)
          verifyRef.value.focus()
        }
      }
    })
    const cancleHandle = () => {
      signState.count = 0
      fromRef.value.resetFields()
      emit('cancleHandle')
    }
    const sureHandle = () => {
      fromRef.value.validate((valid) => {
        if (valid) {
          checkLoading(true)
          _sureHandle({
            deliverId: props.detail.id,
            signPhone: signState.formData.signPeople.personPhone,
            verifyCode: signState.formData.verifyCode,
            signIdNo: signState.formData.signPeople.idCardNo,
            signName: signState.formData.signPeople.name,
          })
        }
      })
    }
    const countCode = (count) => {
      if (signState.count === 0) {
      } else {
        count--
        signState.count = count
        setTimeout(() => {
          countCode(count)
        }, 1000)
      }
    }
    const sendMessage = () => {
      if (signState.count === 0) {
        fromRef.value.validateField('signPeople', (errorMsg) => {
          if (!errorMsg) {
            const { signPeople: { personPhone, idCardNo, name} } = signState.formData
            _getMobileVerifyCode({
              phoneNum: personPhone,
              idNum: idCardNo,
              persionName: name,
            })
          }
        })
      }
    }
    onMounted(() => {
      if (signState.signPeopleList.length === 0) {
        _getVerifiedAndAuthorize()
      }
    })
    return {
      cancleHandle,
      sureHandle,
      sendMessage,
      ...toRefs(signState),
      fromRef,
      verifyRef,
      baseUrl,
      loading,
    }
  },
}
</script>
