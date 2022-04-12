<template lang="pug">
Modal(
  :title="title"
  :width="'480px'"
  :visible="visible"
  :footer='null'
  @cancleHandle="cancleHandle"
)
  .p-type
    .p-desc 方式一：复制授权链接至微信，进行授权
    .p-content
      .p-copy
        el-input.input(v-model="url", disabled)
        el-button(type="primary", @click="copyHandle") 一键复制授权链接
  .p-type
    .p-desc 方法二：引导客户扫描二维码，进行授权
    .p-content
      .qrcode(v-loading='qrcodeUrl === ""')
        img(:src='qrcodeUrl')
  .p-type
    .p-desc 方式三：发送短信邀请客户进行授权
    .p-content
      el-form(:model='form' ref='formRef')
        el-form-item.message-code-area(:rules='mobileRules' prop='mobile')
          el-input.input(ref='mobileRef' type='text' placeholder='请输入手机号' v-model='form.mobile')
          el-button.message-send-btn(v-if='count === 0' @click='sendMessage') 发送短信
          el-button.message-send-btn(v-else) {{count + '秒后重新发送'}}
</template>
<script>
import { reactive, ref, toRefs, watch } from '@vue/composition-api'
import QRCode from 'qrcode'
import { copyToClipboard } from '@/utils/copyToClipboard'
import { vPhone } from '@/utils/validateRules'
import Modal from '@/components/qjd/modal'
import { Message } from 'element-ui'
import ajaxStore from '@/apis'
import { weblogsDom } from '@/utils/qjd/weblogs'

export default {
  components: {
    Modal,
  },
  props: {
    title: String,
    visible: Boolean,
    detail: {
      type: Object,
      default: () => ({})
    },
    mode: String,
  },
  setup(props, { emit }) {
    // ref
    const formRef = ref()
    const mobileRef = ref()
    // validate
    const mobileRules = [
      { required: true, message: '请输入手机号', trigger: 'change' },
      { validator: vPhone, trigger: 'blur' }
    ]
    // state
    const state = reactive({
      url: '',
      qrcodeUrl: '',
      count: 0,
      form: {
        mobile: '',
      }
    })
    // ajax
    const { riskExperts: { creditEvaluation: { sendAuthSms } } } = ajaxStore
    // 取消
    const cancleHandle = () => {
      emit('cancleHandle')
    }
    // 一键复制
    const copyHandle = () => {
      copyToClipboard(state.url, () => {
        Message.success('复制成功')
      })
      weblogsDom(mode === 'normal' ? '赊销评估-标准评估-授权列表页-发起授权-点击一键复制链接' : '赊销评估-精准评估-授权列表页-发起授权-点击一键复制链接')
    }
    // 发送短信
    const sendMessage = () => {
      if (state.count === 0) {
        formRef.value.validateField('mobile', async (errorMsg) => {
          if (!errorMsg) {
            const { mobile } = state.form
            const res = await sendAuthSms({
              mobile,
              authPath: props.detail.url,
              templateCode: props.detail.role === '企业' ? '5120254' : '5120256'
            })
            if (res.data && res.data.code === '0') {
              countCode(60)
              mobileRef.value.focus()
            }
          } else {
            mobileRef.value.focus()
          }
        })
      }
      weblogsDom(mode === 'normal' ? '赊销评估-标准评估-授权列表页-发起授权-点击发送短信' : '赊销评估-精准评估-授权列表页-发起授权-点击发送短信')
    }
    const countCode = (count) => {
      if (!props.visible) {
        count = 0
        state.count = 0
      } else if (count === 0) {
      } else {
        count--
        state.count = count
        setTimeout(() => {
          countCode(count)
        }, 1000)
      }
    }
    const init = async () => {
      state.url = props.detail.url
      const res = await QRCode.toDataURL(state.url, { width: 200, height: 200, margin: 0 })
      state.qrcodeUrl = res
    }
    // watch
    watch(
      () => props.visible,
      value => {
        if (value) {
          init()
        }
      }
    )

    return {
      formRef,
      mobileRef,
      mobileRules,
      cancleHandle,
      copyHandle,
      sendMessage,
      ...toRefs(state)
    }
  },
}
</script>
<style lang="stylus" scoped>
.p-type
  margin-top 20px
  .p-desc
    font-size 12px
  .p-content
    margin-top 10px
.p-copy
  display flex
  justify-items flex-start
  align-items center
.qrcode
  width 114px
  height 114px
  padding 10px
  border 1px solid #E1E1E1
  border-radius 4px
  img
    width 100%
    height 100%
.input
  width 260px
  margin-right 20px
</style>
