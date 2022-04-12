<template lang="pug">
.p-login-main
  .left-area
    .header
      img(:src="`${$assetsBaseUrl}/common/logo.png`")
    .main-area
      .login-main-block(v-if='!bindPhoneModal')
        .tabs-list(v-if='activeName === "password" || activeName === "message"')
          .tab-item(@click='clickTab("message")' :class='{"tab-active": activeName === "message"}') 免密登录
          .tab-item(@click='clickTab("password")' :class='{"tab-active": activeName === "password"}') 密码登录
        .form-block(v-if='activeName === "message"')
          el-form(:model='form' ref='messageForm')
            el-form-item(ref='mobile' :rules='mobileRules' prop='mobile')
              el-input.login-input(ref='mobileInput' type='text' placeholder='请输入手机号' v-model='form.mobile')
            el-form-item.message-code-area(:rules='[{ required: true, message: "验证码不能为空" }]' prop='smsCode')
              el-input.login-input(ref='smsCode' type='text' placeholder='请输入验证码' v-model='form.smsCode' @keyup.enter.native='clickLogin')
              el-button.message-send-btn(v-if='count === 0' @click='sendMessage') 获取验证码
              el-button.message-send-btn(v-else) {{count + '秒后重新发送'}}
        .form-block(v-if='activeName === "password"')
          el-form(:model='form' ref='passwordForm')
            el-form-item(:rules='[{ required: true, message: "用户名不能为空" }]' prop='mobile')
              el-input.login-input(type='text' placeholder='请输入用户名' v-model='form.mobile')
            el-form-item(:rules='[{ required: true, message: "密码不能为空" }]' prop='password')
              el-input.login-input(type='password' placeholder='请输入密码' v-model='form.password' @keyup.enter.native='clickLogin')
            el-form-item.p-login-form-item(v-if='showVerifyCode' prop='verifyCode' :rules='verifyCodeRules')
              el-input.p-code(placeholder='验证码' v-model='form.verifyCode' maxlength='4' @keyup.enter.native='clickLogin')
              img.p-code-pic(:src='verifyCodeImg' @click='getVerifyCodeImg')
        .inst-tip(v-if='activeName === "password" || activeName === "message"')
          .left-tip 同意
            span(@click='clickProtocolUser') 《用户协议》
            span(@click='clickProtocolPrivate') 《隐私政策》
          router-link.right-tip(:to='{name: "forgetPassword"}') 忘记密码？
        .btn-area(v-if='activeName === "password" || activeName === "message"')
          el-button.saas2-login-btn(type='primary' :loading='loading' @click='clickLogin') 登录
          el-button.saas2-login-btn.register(type='primary' :disabled='loading' @click='clickRegister') 注册
        .third-area(v-if='activeName === "password" || activeName === "message"')
          .title 第三方登录
          .wechat-login-icon
            img(:src='`${$assetsBaseUrl}/common/login-icon-wechat.png`' @click='clickTab("wechat")')
        .wechat-login(v-if='activeName === "wechat"')
          .title 扫码登录
          .sub-title 打开微信，扫一扫登录
          .login-qrcode(v-loading='qrcodeUrl === ""')
            img(:src='qrcodeUrl')
            .cover(v-if='qrcodeUrl !== "" && wxState === ""')
              .reload-btn(@click='initWxLogin') 点击刷新
          .wx-register 您还没有账号，点击
            span(@click='clickRegister') 注册
          .other-way
            .way-item(@click='clickTab("message")') 免密登录
            .fiker |
            .way-item(@click='clickTab("password")') 密码登录
      //- 微信登录绑定提示
      bindPhone(:bindPhoneModal='bindPhoneModal' @changeShow='val => bindPhoneModal = val' :wxState='wxState')
    .footer ©{{ year }}
      | &nbsp;仟金顶网络科技有限公司 浙公网安备33010802004638号 浙ICP备15003727号 浙B2-20171093

    //- 密码简单提示放在layout里了

    //- 非常用地登录提示
    difLocationDialog(:difLocationDialogShow='difLocationDialogShow' :account='account' @close="() => {this.difLocationDialogShow = false}" @clickLogin='clickLogin')
  .right-area
    img(:src='`${$assetsBaseUrl}/common/right-pic.png`')
</template>

<script>
import ajaxStore from '@/apis'
import QRCode from 'qrcode'
import { toPrefixUrl, getCookie } from '@/utils/util'
import { Message } from 'element-ui'
import { vPhone } from '@/utils/validateRules'
import difLocationDialog from '@/components/Login/difLocationDialog'
import { mapMutations, mapActions } from 'vuex'
import bindPhone from './bindPhone'
import { redirectHandle } from '@/utils/qjd/redirect'

export default {
  components: {
    difLocationDialog,
    bindPhone,
  },
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
      loading: false,
      form: {
        mobile: '',
        smsCode: '',
        username: '',
        password: '',
        verifyCode: ''
      },
      qrcodeUrl: '', // 显示二维码地址
      wxState: '', // 本次登录的唯一识别号
      getting: false, // 轮询状态
      timer: '',
      bindPhoneModal: false,
      showVerifyCode: false,
      verifyCodeImg: '',
      activeName: 'password',
      count: 0,
      agreementChecked: true,
      // 等保加固相关：
      ifComplexPwd: false, // 是否复杂密码
      difLocationDialogShow: false, // 非常用地登录弹窗显示
      account: ''
    }
  },
  computed: {
    year () {
      return window.systemYear || new Date().getFullYear()
    },
  },
  methods: {
    clickTab(type) {
      if (this.activeName !== type) {
        this.$refs.messageForm && this.$refs.messageForm.clearValidate()
        this.$refs.passwordForm && this.$refs.passwordForm.clearValidate()
        this.activeName = type
      }
    },
    clickRegister() {
      this.$router.push({ name: 'register' })
    },
    clickProtocolUser() {
      window.open('https://qjdstatic.oss-cn-hangzhou.aliyuncs.com/public/fuwu/%E4%BB%9F%E9%87%91%E9%A1%B6%E7%94%A8%E6%88%B7%E5%8D%8F%E8%AE%AE.pdf')
    },
    clickProtocolPrivate() {
      window.open('https://qjdstatic.oss-cn-hangzhou.aliyuncs.com/public/fuwu/%E9%9A%90%E7%A7%81%E6%9D%83%E6%94%BF%E7%AD%96.pdf')
    },
    async initWxLogin() {
      try {
        this.qrcodeUrl = ''
        const randRes = await ajaxStore.common.getWxState()
        this.wxState = randRes.data ? randRes.data.data : ''
        const url = `https://open.weixin.qq.com/connect/oauth2/authorize?appid=wx450c87636664d2c4&redirect_uri=https%3A%2F%2F${process.env.VUE_APP_WEBTOOLS_HOST}%2FfactoryWxLogin&response_type=code&scope=snsapi_userinfo&state=${this.wxState}#wechat_redirect`
        const res = await QRCode.toDataURL(url, { width: 200, height: 200, margin: 0 })
        this.qrcodeUrl = res
        this.initTimeHelling()
      } catch (error) {
        console.error(`error: ${error}`)
      }
    },
    initTimeHelling() {
      let count = 0
      this.timer = setInterval(async () => {
        count++
        if (count > 30) {
          clearInterval(this.timer)
          this.wxState = ''
          return
        }
        if (this.getting) return
        this.getting = true
        const res = await ajaxStore.common.getBindState({state: this.wxState})
        this.getting = false
        if (res.data && res.data.code === '0') {
          clearInterval(this.timer)
          if (res.data.data === -1) {
            // 第一次扫码需要绑定厂服账号
            this.bindPhone()
          } else if (res.data.data === 1) {
            // 绑定过账号的 扫码后直接登录
            this.qrcodeUrl = ''
            const params = { mobile: 'wx', password: '', state: this.wxState }
            const res = await ajaxStore.common.login(params)
            this.save({ userInfo: res?.data?.data ?? {} })
            await this.getUserInfo()
            await this.getUserType({ isForce: true })
            const redirect = decodeURIComponent(this.$route.query.redirect || '')
            if (redirect && !/login/.test(redirect) && redirect !== '/') {
              // 重定向前判断是否有权限
              redirectHandle(redirect)
            } else {
              this.$router.push({name: 'temphome'})
            }
          }
        }
      }, 1000)
    },
    bindPhone() {
      this.clickTab('password')
      this.bindPhoneModal = true
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
        this.$refs.messageForm.validateField('mobile', async (errorMsg) => {
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
                const redirect = decodeURIComponent(this.$route.query.redirect || '')
                if (redirect && !/login/.test(redirect) && redirect !== '/') {
                  redirectHandle(redirect)
                } else {
                  // 首页必定有，无需做权限逻辑判断，直接跳转saas2首页即可
                  this.$router.push({name: 'temphome'})
                }

                setTimeout(() => {
                  // 登录后是否展示弱密码提示
                  this.$store.commit('setIfShowLoginTip', !this.ifComplexPwd)
                }, 1000)
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
        // 弱密码提示：
        const regPwd = /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9]).{8,32}$/
        if (regPwd.test(this.form.password)) {
          this.ifComplexPwd = true
        } else {
          this.ifComplexPwd = false
        }
        // 后端只根据是否传passwor来判断登录方式，loginType没有接收，这里接口设计不合理
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
        } else if (code === 'D00001') {
          this.getVerifyCodeImg()
          this.showVerifyCode = true
          Message.error('登录失败')
          return false
        } else if (code === '100000112') { // 密码过于简单不让登录
          // 简单密码提示弹窗
          this.$store.commit('setIfShowLoginTip', true)
          return false
        } else if (code === '100000110') { // 非常用地登录
          this.account = res.data.data
          // 非常用地 邮箱验证弹窗
          this.difLocationDialogShow = true
          return false
        } else if (this.showVerifyCode) {
          this.getVerifyCodeImg()
        }
      } catch (error) {
        console.error(`error: ${error}`)
      }
    },
    getVerifyCodeImg () {
      const t = new Date().getTime()
      this.verifyCodeImg = toPrefixUrl(`/partner/captcha/picture?t=${t}`)
    },
    tabChange() {
    },
    ...mapMutations(['save']),
    ...mapActions(['getUserInfo', 'getUserType'])
  },
  mounted () {
    this.save({ userInfo: {}, permissions: {} })
  },
  watch: {
    activeName (val) {
      if (val === 'wechat') {
        this.initWxLogin()
      } else {
        this.timer && clearInterval(this.timer)
        this.timer = ''
      }
    }
  }
}
</script>
<style lang="stylus">
.p-login-main
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
        .tabs-list
          display flex
          margin-bottom 30px
          .tab-item
            cursor pointer
            font-size 20px
            line-height 24px
            margin-right 48px
            color #8997AE
            &.tab-active
              color #3B68F0
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
        .inst-tip
          display flex
          padding-bottom 22px
          .left-tip
            flex 1 0 auto
            span
              color #3B68F0
              cursor pointer
          .right-tip
            color #3B68F0
            cursor pointer
        .btn-area
          .saas2-login-btn
            display block
            font-size 14px
            background-color #3B68F0
            width 360px
            height 42px
            border 1px solid #3B68F0
            border-radius 4px
            &.register
              margin 14px 0 0 0
              background-color #fff
              color #3B68F0
            &:hover
              opacity: 0.9
        .third-area
          margin-top 30px
          color #8997AE
          border-top 1px dashed #EAEBEE
          .title
            text-align center
            margin 0 auto
            width 90px
            margin-top -10px
            background-color #fff
          .wechat-login-icon
            text-align center
            img
              width 25px
              margin-top 14px
              cursor pointer
        .wechat-login
          text-align center
          color #494949
          .title
            font-size 20px
          .sub-title
            margin 16px 0 14px
          .login-qrcode
            display block
            width 220px
            height 220px
            margin 0 auto
            padding 10px
            position relative
            .cover
              position absolute
              top 0
              left 0
              width 100%
              height 100%
              background-color rgba(0,0,0,0.8)
              display flex
              justify-content center
              align-items center
              .reload-btn
                cursor pointer
                color #EEE
                font-size 14px
                padding 10px
                letter-spacing 1px
          .wx-register
            margin-top 22px
            span
              color #3B68F0
              cursor pointer
          .other-way
            margin-top 15px
            display flex
            justify-content center
            color #3B68F0
            .way-item
              cursor pointer
            .fiker
              margin 0 5px
    .footer
      text-align center
      padding-bottom 50px
      color #8997AE
  .right-area
    width 74.444444vh
    min-width 446px
    img
      height 100%
      width: 100%
</style>
