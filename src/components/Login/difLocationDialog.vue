<template lang="pug">
  //- 非常用地登录提示
  el-dialog.p-diflocation-dialog(
    title='提醒'
    width='410px'
    center
    :visible.sync='difLocationDialogShow'
    :close-on-click-modal='false'
    :before-close='handleClose'
  )
    div.p-dialog-text 系统检测到您不在常用地登录，为保障您的数据安全，请进行短信验证码验证
    el-form(ref='difLocationForm' :model='difLocationForm')
      el-row(:gutter="10")
        el-col(:span="16")
          el-form-item(prop='difLocationVerCode' :rules='[{ required: true, message: "请输入验证码", trigger: "change" }]')
            el-input(ref='difLocationVerCode' placeholder='请输入验证码' clearable v-model='difLocationForm.difLocationVerCode' maxlength='6')
        el-col(:span="8")
          el-button.width-100.u-code-btn(type='primary' @click='clickSendDifLocationCode' :disabled='count !== 0' :loading='difLocationDialogLoading') {{count === 0 ? '获取验证码' : (count + '秒后重新发送')}}
    p.u-dialog-tip2 系统将发送验证码至{{account | toWordHide('mobile')}}手机上，请注意查收

    div(slot='footer')
      el-button.width-100(type='primary' size='big' :loading='verifyLoading' :disabled='difLocationForm.difLocationVerCode.length !== 6' @click='clickDifLocationVerify') 登录
</template>

<script>
// import { mapState } from 'vuex'

export default {
  props: {
    difLocationDialogShow: {
      type: Boolean,
      default: false
    },
    account: {
      type: String,
      default: ''
    },
  },
  data() {
    return {
      // - 非常用地登录相关：
      difLocationDialogLoading: false,
      verifyLoading: false,
      difLocationForm: {
        difLocationVerCode: '',
      },
      count: 0,
    }
  },
  methods: {
    handleClose() {
      this.$emit('close')
    },

    // 发送验证码
    async clickSendDifLocationCode () {
      this.difLocationDialogLoading = true
      if (this.count === 0) {
        const res = await this.$http.common.sendUpdatePwdCode({
          sendCodeType: 'SMS',
          toUser: this.account
        })
        this.difLocationDialogLoading = false
        if (res.data && res.data.code === '0') {
          this.$message.success('发送成功')
          this.countCode(60)
          this.$refs.difLocationVerCode.focus()
        }
      }
    },
    // 验证码倒计时
    countCode (count) {
      if (count === 0) {
      } else {
        count--
        this.count = count
        setTimeout(() => {
          this.countCode(count)
        }, 1000)
      }
    },
    // 校验验证码是否正确
    async clickDifLocationVerify () {
      this.$refs.difLocationForm.validateField('difLocationVerCode', async (errorMsg) => {
        if (!errorMsg) {
          this.verifyLoading = true
          const res = await this.$http.common.confirmCode({
            code: this.difLocationForm.difLocationVerCode,
            sendCodeType: 'SMS',
            toUser: this.account
          })
          this.verifyLoading = false
          if (res.data && res.data.code === '0') {
            this.$message.success('验证成功')
            this.$emit('clickLogin')
          }
        }
      })
    },
  },
}
</script>

<style lang="stylus">
.p-diflocation-dialog
  .el-dialog--center .el-dialog__body
    padding 20px 30px
  .el-dialog__footer
    padding 10px 30px 30px
  .p-dialog
    .u-code-btn
      padding 9px
    .el-button + .el-button
      margin-left 30px
  .el-button--small
    padding 9px 0px

  .p-dialog-text
    color #3B3C5A
    font-size 14px
    line-height 24px
    margin-bottom 30px
  .u-dialog-tip
    color #1989FA
  .u-dialog-tip2
    color #3B3C5A
    font-size 12px
    line-height 16px
    margin 0
</style>
