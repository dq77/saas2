<template lang="pug">
  Modal(
    :title="title"
    :visible="visible"
    :width="'400px'"
    @cancleHandle="cancleHandle"
    @sureHandle="sureHandle"
    :sureTxt="'立即签署'"
    :cancleTxt="'稍后再签'"
    :loading="loading"
  )
    div(style='text-align:center') 您的订单已提交成功，请完成电子订货单签署
    div(style='text-align:center')
      a(:href='`${baseUrl}/proof/file/rawFile?fileKey=${detail ? detail.deliverFile : ""}`' target='__blank') 点击预览电子订货单
    el-form(ref='fromRef' :model='formData' label-position='top')
      el-form-item(label='选择签署人' prop='signPeople' :rules='[{ required: true, message: "请选择签署人" }]')
        el-select(v-model='formData.signPeople'  placeholder="请选择签署人" value-key='idCardNo' style='width:100%')
          el-option(v-for='item in signPeopleList' :label='item.label' :value='item' :key='item.idCardNo' :disabled='item.disabled')
      el-form-item(label='短信验证码签署' prop='verifyCode' :rules='[{ required: true, message: "请输入验证码" }]')
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
import { weblogsDom } from '@/utils/qjd/weblogs'

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
  setup(props, { emit, root }) {
    const { dealer: { orderPhoneCodeReceipt, getMobileVerifyCode } } = ajaxStore
    const { state: { userInfo: { corporationId } } } = store
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
      params: { corporationId },
      successCallBack: ({data}) => {
        const { list } = data || []
        signState.signPeopleList = list.map(item => {
          const label = item.hasAuthorizeAgreement ? (item.name + (item.personPhone || '')) : item.name + '（授权失效）'
          const disabled = !item.hasAuthorizeAgreement
          return {
            label,
            idCardNo: item.idCardNo,
            obj: item,
            disabled
          }
        })
      }
    })
    const { doResult: _sureHandle } = useAsync({
      request: orderPhoneCodeReceipt,
      init: false,
      successCallBack: ({ code, data }) => {
        checkLoading(false)
        // console.log(data, 'data')
        if (code === '0') {
          Message.success('签约成功')
          emit('success')
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
      emit('close')
    }
    const sureHandle = () => {
      weblogsDom('经销商-订单管理-签收单')
      fromRef.value.validate((valid) => {
        if (valid) {
          checkLoading(true)
          const signPeople = signState.formData.signPeople
          _sureHandle({
            orderId: props.detail.id,
            verifyCode: signState.formData.verifyCode,
            signIdNo: signPeople.idCardNo,
            signPhone: signPeople.obj.personPhone,
            signName: signPeople.obj.name,
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
            const signPeople = signState.formData.signPeople
            _getMobileVerifyCode({
              idNum: signPeople.idCardNo,
              phoneNum: signPeople.obj.personPhone,
              persionName: signPeople.obj.name,
            })
          }
        })
      }
    }
    const getPersonSigners = async () => {
      const res = await store.dispatch('user/getSignerOfPerson')
      signState.signPeopleList = [{
        label: res.name + (res.personPhone || ''),
        idCardNo: res.idCardNo,
        obj: {
          idCardNo: res.idCardNo,
          personPhone: res.personPhone,
          name: res.name,
        }
      }]
    }
    onMounted(async () => {
      const curFactory = store.state.curFactory
      if (curFactory.customerType === 1) { // 当前登录人是个人客户
        getPersonSigners()
      } else if (signState.signPeopleList.length === 0) {
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
      loading
    }
  },
}
</script>
