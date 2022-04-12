<template lang="pug">
.bind-phone-dialog(v-if='isShow')
  .title 请绑定微信账号
  .pic-area
    img.icon(:src='`${$assetsBaseUrl}/common/qjd-icon.png`')
    img.icon.change(:src='`${$assetsBaseUrl}/common/change.png`')
    img.icon(:src='`${$assetsBaseUrl}/common/wechat-icon.png`')
  .sub-title
    span 您已通过
    span.wechat 微信
    span 授权，完善以下登录信息即可完成绑定
  .bind-content
    .title
      .bind-way {{ activeName === 'message' ? '短信验证绑定' : '账号密码绑定'}}
      .change-way(@click='clickTab') {{ activeName === 'message' ? '切换账号密码绑定' : '切换短信验证绑定'}}
    //- 密码登录
    el-form.u-content(:class='{"u-on": activeName === "password"}' :model='form' ref='passwordForm')
      el-form-item.input-item(:rules='[{ required: true, message: "厂家服务平台账号不能为空" }]' prop='mobile')
        el-input.u-input(type='text' placeholder='请填写厂家服务平台的账号' v-model='form.mobile')
      el-form-item.input-item(:rules='[{ required: true, message: "密码不能为空" }]' prop='password')
        el-input.u-input(type='password' placeholder='请输入密码' v-model='form.password' @keyup.enter.native='clickLogin')
    //- 验证码登录
    el-form.u-content(:class='{"u-on": activeName === "message"}' :model='form' ref='messageForm')
      el-form-item.input-item(ref='mobile' :rules='mobileRules' prop='mobile')
        el-input.u-input(ref='mobileInput' type='text' placeholder='请输入手机号' v-model='form.mobile')
      el-form-item.input-item.check-code(:rules='[{ required: true, message: "验证码不能为空" }]' prop='smsCode')
        el-input.u-input(ref='smsCode' type='text' placeholder='请输入验证码' v-model='form.smsCode' @keyup.enter.native='clickLogin')
        el-button.u-message-btn(type='primary' v-if='count === 0' @click='sendMessage' plain) 获取验证码
        el-button.u-message-btn(type='primary' v-else disabled plain) {{count + '秒后重新发送'}}
    el-button.u-submit-btn(type='primary' :loading='loading' @click='clickLogin') 登录并绑定已有账号
    .inst-tip
      .left-tip 同意
        span(@click='clickProtocolUser') 《用户协议》
        span(@click='clickProtocolPrivate') 《隐私政策》
      .other-way
        .way-item(@click='isShow = false') 免密登录
        .fiker |
        .way-item(@click='isShow = false') 密码登录
</template>

<script>
import ajaxStore from '@/apis'
import { getCookie } from '@/utils/util'
import { vPhone } from '@/utils/validateRules'
import { mapMutations, mapActions } from 'vuex'
export default {
  data () {
    const vVerifyCodeRules = async (rule, value, callback) => {
      if (!value) {
        callback(new Error('验证码不能为空'))
      } else if (!/^[0-9a-zA-Z]{4}$/.test(value)) {
        callback(new Error('验证码输入错误'))
      }
      callback()
    }
    return {
      mobileRules: [
        { required: true, message: '请输入手机号', trigger: 'change' },
        { validator: vPhone, trigger: 'blur' }
      ],
      verifyCodeRules: [
        { required: true, validator: vVerifyCodeRules, trigger: 'blur' }
      ],
      isShow: false,
      loading: false,
      showVerifyCode: false,
      verifyCodeImg: '',
      activeName: 'password',
      count: 0,
      form: {
        mobile: '',
        smsCode: '',
        username: '',
        password: '',
        verifyCode: ''
      }
    }
  },
  props: {
    bindPhoneModal: {
      type: Boolean,
      value: false,
    },
    wxState: {
      type: String,
      value: '',
    },
  },
  methods: {
    clickTab(type) {
      this.$refs.messageForm.clearValidate()
      this.$refs.passwordForm.clearValidate()
      if (this.activeName === 'password') {
        this.activeName = 'message'
      } else {
        this.activeName = 'password'
      }
    },
    clickRegister() {},
    clickProtocolUser() {
      window.open('https://qjdstatic.oss-cn-hangzhou.aliyuncs.com/public/fuwu/%E4%BB%9F%E9%87%91%E9%A1%B6%E7%94%A8%E6%88%B7%E5%8D%8F%E8%AE%AE.pdf')
    },
    clickProtocolPrivate() {
      window.open('https://qjdstatic.oss-cn-hangzhou.aliyuncs.com/public/fuwu/%E9%9A%90%E7%A7%81%E6%9D%83%E6%94%BF%E7%AD%96.pdf')
    },
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
        this.$refs.messageForm.validateField(['mobile'], async (errorMsg) => {
          if (!errorMsg) {
            const { mobile } = this.form
            const res = await ajaxStore.common.getSmscodeForSign({ mobile })
            if (res.data && res.data.code === '0') {
              this.countCode(60)
              this.$refs.smsCode.focus()
            }
          } else {
            this.$refs.mobileInput.focus()
          }
        })
      }
    },
    clickLogin () {
      try {
        if (this.loading === false) {
          const form = this.activeName
          this.$refs[`${form}Form`].validate(async (valid) => {
            if (valid) {
              this.loading = true
              const loginRes = await this.login()
              if (loginRes) {
                await this.getUserInfo()
                await this.getUserType({ isForce: true })
                await this.bindWechatApi({ state: this.wxState })
                this.$router.push({name: 'temphome'})
              }
              this.loading = false
            }
          })
        }
      } catch (error) {
        this.loading = false
        console.error(`error: ${error}`)
      }
    },
    async login () {
      try {
        const data = {}
        data.loginType = this.activeName === 'message' ? 1 : 0
        data.mobile = this.form.mobile
        data.smsCode = data.loginType === 1 ? this.form.smsCode : undefined
        data.username = this.form.username
        data.password = data.loginType === 0 ? this.form.password : undefined
        if (this.showVerifyCode) {
          data.header = {}
          data.header['x-captcha-pic-code'] = this.form.verifyCode
          data.header['x-captcha-pic-key'] = getCookie('x-captcha-pic-key')
        }
        const res = await ajaxStore.common.login(data)
        const { data: userInfo, code } = res?.data ?? {}
        if (code === '0') {
          this.save({ userInfo })
          return true
        }
      } catch (error) {
        console.error(`error: ${error}`)
      }
    },
    ...mapActions('wechat', ['bindWechatApi']),
    ...mapActions(['getUserInfo', 'getUserType']),
    ...mapMutations(['save']),
  },
  watch: {
    bindPhoneModal: function(val) {
      this.isShow = val
      if (val) {
        this.form.mobile = ''
        this.form.password = ''
      }
    },
    isShow: function(val) {
      this.$emit('changeShow', val)
    }
  },
  mounted () {
  }
}
</script>

<style lang="stylus">
.bind-phone-dialog
  width 462px
  height 470px
  color #494949
  box-shadow 0px 2px 27px 0px #F4F4F4
  border 1px solid #EAEBEE
  border-radius 4px
  padding 56px 50px 24px
  .title
    font-size 20px
    text-align center
    margin-bottom 15px
  .pic-area
    display flex
    justify-content center
    align-items center
    .icon
      display block
      width 48px
      height 48px
      &.change
        width 23px
        height 22px
        margin 0 26px
  .sub-title
    margin 10px 0 26px
    text-align center
    color #8997AE
    .wechat
      color #494949
      font-weight bold
      margin 0 4px
  .bind-content
    .title
      margin-bottom 14px
      display flex
      justify-content space-between
      .bind-way
        font-size 14px
      .change-way
        cursor pointer
        font-size 12px
        color #3B68F0
    .input-item
      margin-bottom 20px
      .el-input--small
        font-size 12px
        .el-input__inner
          height 40px
          line-height 40px
          border-radius 4px
    .u-submit-btn
      font-size 14px
      line-height 14px
      width 100%
      padding 9px 13px
      height 40px
      margin-bottom 14px
      background-color #3B68F0
      border 1px solid #3B68F0
      border-radius 4px
      &:focus
        background-color #3B68F0
      &:hover
        opacity: 0.9
    .inst-tip
      display flex
      padding-bottom 22px
      .left-tip
        flex 1 0 auto
        span
          color #3B68F0
          cursor pointer
      .other-way
        display flex
        justify-content center
        color #3B68F0
        .way-item
          cursor pointer
        .fiker
          margin 0 5px
    .u-content
      display none
      &.u-on
        display block
    .check-code
      .el-form-item__content
        display flex
        .el-input__inner,.u-input
          width 226px
        .u-message-btn
          color #3B68F0
          border 1px solid #3B68F0
          height 40px
          width 120px
          padding 9px 0
          text-align center
          font-size 14px
          line-height 14px
          margin-left 14px
          border-radius 4px
          &.is-disabled
            color #3B68F0
            background-color #FFF
          &:focus
            color #3B68F0
            background-color #FFF
</style>
