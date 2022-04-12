<template lang="pug">
.p-forget-password
  .left-area
    .header
      img(:src="`${$assetsBaseUrl}/common/logo.png`")
    .main-area
      .login-main-block
        .title 修改密码
        .form-block
          el-form(:model='form' ref='form')
            el-form-item(ref='mobile' prop='mobile' :rules='mobileRules')
              el-input(ref='mobileInput' type='text' placeholder='请输入手机号' v-model='form.mobile' prop='mobile')
            el-form-item.message-code-area(:rules='[{ required: true, message: "验证码不能为空" }]' prop='smsCode')
              el-input(ref="validPwd" placeholder='请输入验证码' v-model='form.smsCode' @keyup.enter.native='clickLogin')
              el-button.message-send-btn(v-if='count === 0' @click='sendMessage') 获取验证码
              el-button.message-send-btn(v-else) {{count + '秒后重新发送'}}
            el-form-item(:rules='pwdRules' prop='passwordNew')
              input(name='password' type='password' style='position: absolute; left: -10000px;')
              el-input(name='password' type='password' placeholder='新密码' autocomplete='new-password' v-model='form.passwordNew' @keyup.enter.native='clickLogin')
            el-form-item(:rules='repeatPwdRules' prop='pwdRepeat')
              el-input(type='password' placeholder='确认密码' autocomplete='new-password' v-model='form.pwdRepeat' @keyup.enter.native='clickLogin')
            .p-tips
              .left （注：新密码必须8-32位，必须含 大、小写字母、数字）
              .toLogin(type='text' @click='toLogin') 返回登录
        .btn-area
          el-button.saas2-login-btn(type='primary' :loading='loading' @click='clickLogin') 确定
    .footer ©{{year}} 仟金顶网络科技有限公司    浙公网安备33010802004638号    浙ICP备15003727号    浙B2-20171093
  .right-area
    img(:src='`${$assetsBaseUrl}/common/right-pic.png`')
</template>

<script>
import ajaxStore from '@/apis'
import { vPhone, vPasswrod } from '@/utils/validateRules'
import { Message } from 'element-ui'
export default {
  data () {
    const repeatPwdValid = async (rule, value, callback) => {
      if (!value) {
        callback(new Error('请确认密码'))
      } else if (value !== this.form.passwordNew) {
        callback(new Error('两次输入密码不一致'))
      }
      callback()
    }
    return {
      mobileRules: [
        { required: true, message: '请输入手机号', trigger: 'change' },
        { validator: vPhone, trigger: 'blur' }
      ],
      pwdRules: [
        { validator: vPasswrod, trigger: 'blur' }
      ],
      repeatPwdRules: [
        { validator: repeatPwdValid, trigger: 'blur' }
      ],
      loading: false,
      form: {
        mobile: '',
        smsCode: '',
        passwordNew: ''
      },
      count: 0,
      showVerifyCode: false,
      agreementChecked: true
    }
  },
  computed: {
    year () {
      const d = new Date()
      return d.getFullYear()
    },
    isIE () {
      if (!!window.ActiveXObject || 'ActiveXObject' in window) {
        return true
      } else {
        return false
      }
    }
  },
  methods: {
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
    async sendMessage () {
      if (this.count === 0) {
        this.$refs.form.validateField('mobile', async (errorMsg) => {
          if (!errorMsg) {
            // const { mobile } = this.form
            const res = await ajaxStore.common.getSmscodeForReset({
              sendCodeType: 'SMS',
              toUser: this.form.mobile
            })
            if (res.data && res.data.code === '0') {
              this.countCode(60)
              this.$refs.validPwd.focus()
            }
          } else {
            this.$refs.mobileInput.focus()
          }
        })
      }
    },
    toLogin () {
      this.$router.push({ name: 'login' })
    },
    clickLogin () {
      if (this.loading === false) {
        this.$refs.form.validate(async (valid) => {
          if (valid) {
            this.loading = true
            const loginRes = await this.resetPassword()
            if (loginRes) {
              Message.success('修改密码成功')
              this.$router.push({ name: 'login' })
            }
            this.loading = false
          } else {
            return false
          }
        })
      }
    },
    async resetPassword () {
      const { mobile, smsCode, passwordNew } = this.form
      const res = await ajaxStore.common.resetPassword({
        code: smsCode,
        newPwd: passwordNew,
        sendCodeType: 'SMS',
        toUser: mobile
      })
      if (res.data && res.data.code === '0') {
        return true
      }
    }
  },
  mounted () {
    this.$store.commit('save', { userInfo: {}, permissions: {} })
  }
}
</script>

<style lang="stylus">
.p-forget-password
  margin 0 auto
  height 100%
  min-width 1200px
  min-height 600px
  display flex
  .left-area
    position relative
    flex 1 0 auto
    display flex
    flex-direction column
    .header img
      width 80px
      margin 30px 40px 0
    .main-area
      flex 1 0 auto
      display flex
      justify-content center
      align-items center
      .login-main-block
        width 462px
        height 470px
        box-shadow 0px 2px 27px 0px #F4F4F4
        border 1px solid #EAEBEE
        border-radius 4px
        padding 56px 50px 24px
        .title
          font-size 20px
          margin-bottom 30px
        .form-block
          .el-input__inner
            width 360px
            height 42px
            line-height 42px
            font-size 14px
          .message-code-area
            .el-form-item__content
              display flex
              .el-input__inner,.u-input
                width 226px
              .message-send-btn
                height 42px
                flex 1 0 120px
                margin-left 14px
                color #8997AE
                border 1px solid #DCDFE6
                border-radius 4px
                &:hover
                  background-color #FAFAFA
                &:active
                  background-color #FFF
          .p-tips
            font-size 12px
            display flex
            margin-bottom 22px
            .left
              flex 1 0 auto
            .toLogin
              cursor pointer
              color #3B68F0
        .btn-area
          .saas2-login-btn
            display block
            font-size 14px
            background-color #3B68F0
            width 360px
            height 42px
            border 1px solid #3B68F0
            border-radius 4px
            &:hover
              opacity: 0.9
    .footer
      text-align center
      padding-bottom 50px
      color #8997AE
  .right-area
    width 74.444444vh
    img
      height 100%
</style>
