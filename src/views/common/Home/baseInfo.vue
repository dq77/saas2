<template lang='pug'>
.p-home-base-info
  .card
    .top-info
      .avator
        img(:src="`${$assetsBaseUrl}/common/home/avator.png`")
      .main-info
        .company(v-if='userInfo.userType !== 2') {{ userInfo.company }}
        .phone-name
          .phone-num {{ userInfo ? userInfo.mobile : '' }}
          div(v-if='userInfo.userType !== 2') {{ userInfo.name }}
    .detail-list
      .item(v-if='userInfo.userType !== 2')
        .left-info
          span 实名认证：
          span(v-if='!loading' :class='authStatus?"":"gray"') {{ authStatus ? '已实名' : '未实名' }}
        .right-btn(v-if='!loading' @click='toPage("authSet")' weblogs-anchor='common-temphome-realname') {{ authStatus ? '重新认证' : '前往实名' }}
      .item(v-if='userInfo.userType !== 2')
        .left-info
          span 绑定邮箱：
          span(:class='userInfo.email?"":"gray"') {{ userInfo.email ? userInfo.email : '未绑定' }}
        .right-btn(@click='setMail' weblogs-anchor='common-temphome-bindEmail') {{ userInfo.email ? '解除绑定' : '立即绑定' }}
      .item
        .left-info
          span 绑定微信：
          span(:class='wechatInfo.nickname?"":"gray"') {{ wechatInfo.nickname ? wechatInfo.nickname : '未绑定' }}
        .right-btn(@click='bindWechat' weblogs-anchor='common-temphome-bindWeixin') {{ wechatInfo.nickname ? '解除绑定' : '立即绑定' }}
    el-dialog.bind-dialog(:visible.sync="bindWechatShow" :modal-append-to-body='false' title='绑定微信' width='330px')
      .title 打开微信，扫描下方二维码，绑定微信账号
      .login-qrcode(v-loading='qrcodeUrl === ""')
        img(:src='qrcodeUrl')
        .cover(v-if='qrcodeUrl !== "" && wxState === ""')
          .reload-btn(@click='initWxLogin') 点击刷新
      span(slot='footer' class='dialog-footer')
        el-button(@click='bindWechatShow = false' weblogs-anchor='common-temphome-bindWeixin-cancel') 取 消
        el-button(type='primary' @click='bindWechatShow = false' weblogs-anchor='common-temphome-bindWeixin-sure') 确 定
    el-dialog.bind-dialog(:visible.sync='bindMailShow' :modal-append-to-body='false' title='邮箱设置' width='330px')
      .label 邮箱地址
      el-form(ref='mailForm' :model='form' :rules='formRule')
        el-form-item(prop='mail')
          el-input.mail-input(type='text' placeholder='请输入邮箱' v-model='form.mail')
      span(slot='footer' class='dialog-footer')
        el-button(@click='bindMailShow = false' weblogs-anchor='common-temphome-bindEmain-cancel') 取 消
        el-button(type='primary' @click='submitMail' weblogs-anchor='common-temphome-bindEmain-sure') 确 定
</template>

<script>
import { mapState, mapMutations, mapActions } from 'vuex'
import QRCode from 'qrcode'

export default {
  data () {
    return {
      authStatus: false, // 是否实名认证
      bindWechatShow: false,
      bindMailShow: false,
      qrcodeUrl: '', // 显示二维码地址
      wxState: '', // 本次登录的唯一识别号
      getting: false, // 轮询状态
      form: {
        mail: '',
      },
      formRule: {
        mail: [
          { required: true, message: '请输入邮箱地址', trigger: ['change', 'blur'] },
          {
            validator(rule, value, callback) {
              const vEmail = /^[a-zA-Z0-9_-]+@[a-zA-Z0-9_-]+(\.[a-zA-Z0-9_-]+)+$/
              if (!(vEmail.test(value))) {
                callback(new Error('邮箱格式不正确'))
              } else {
                callback()
              }
            },
            trigger: 'blur'
          }
        ],
      },
      loading: true
    }
  },
  methods: {
    toPage(name) {
      this.$router.push({ name })
    },
    // 获取企业认证情况
    async getCustomerAuth(corporationId) {
      if (corporationId) {
        const res = await this.ajaxStore.common.account.getCustomerAuth({ corporationId, type: 1 })
        if (res.data && res.data.code === '0' && res.data.data.corpIdentityVo) {
          this.authStatus = (res.data.data.corpIdentityVo.realNameStatus === 2)
        }
      }
      this.loading = false
    },
    bindWechat() {
      if (this.wechatInfo.nickname) {
        this.$confirm(`确定要解绑微信${this.wechatInfo.nickname}吗?`, '微信解绑', { type: 'warning' }).then(async () => {
          const res = await this.unBindWechat()
          if (res.data && res.data.code === '0') {
            this.$message({ message: '解绑成功', type: 'success' })
          }
        })
      } else {
        this.bindWechatShow = true
        this.initWxLogin()
      }
    },
    setMail() {
      if (this.userInfo.email) {
        this.$confirm(`确定要解绑邮箱${this.userInfo.email}吗?`, '邮箱解绑', { type: 'warning' }).then(async () => {
          const res = await this.ajaxStore.common.unBindEmail()
          if (res.data && res.data.code === '0') {
            this.$message.success('解绑成功')
            this.save(Object.assign(this.userInfo, { email: '' }))
          }
        })
      } else {
        this.$refs.mailForm && this.$refs.mailForm.resetFields()
        this.bindMailShow = true
      }
    },
    async initWxLogin() {
      this.qrcodeUrl = ''
      const randRes = await this.ajaxStore.common.getWxState()
      this.wxState = randRes.data ? randRes.data.data : ''
      const url = `https://open.weixin.qq.com/connect/oauth2/authorize?appid=wx450c87636664d2c4&redirect_uri=https%3A%2F%2F${process.env.VUE_APP_WEBTOOLS_HOST}%2FfactoryWxLogin&response_type=code&scope=snsapi_userinfo&state=${this.wxState}#wechat_redirect`
      const res = await QRCode.toDataURL(url, { width: 200, height: 200, margin: 0 })
      this.qrcodeUrl = res
      this.initTimeHelling()
    },
    initTimeHelling() {
      let count = 0
      const timer = setInterval(async () => {
        count++
        if (count > 30) {
          clearInterval(timer)
          this.wxState = ''
          return
        }
        if (this.getting) return
        this.getting = true
        const res = await this.ajaxStore.common.getBindState({state: this.wxState})
        this.getting = false
        if (res.data && res.data.code === '0') {
          clearInterval(timer)
          if (res.data.data === -1) {
            // 厂服账号绑定微信
            const res2 = await this.bindWechatApi({ state: this.wxState })
            if (res2.data && res2.data.code === '0') {
              this.bindWechatShow = false
              this.$message({ message: '绑定成功', type: 'success' })
            }
          } else {
            this.$message({
              message: '当前微信已绑定其他厂服账号，请更换微信后重试',
              type: 'error',
              duration: '8000'
            })
          }
        }
      }, 1000)
    },
    async submitMail() {
      this.$refs.mailForm.validate(async (valid) => {
        if (valid) {
          this.loading = true
          const res = await this.ajaxStore.common.bindEmail({email: this.form.mail})
          if (res.data && res.data.code === '0') {
            this.bindMailShow = false
            this.$message({
              message: '邮箱绑定成功',
              type: 'success'
            })
            this.save({ userInfo: Object.assign(this.userInfo, { email: this.form.mail }) })
          }
          this.loading = false
        }
      })
    },
    ...mapActions('wechat', ['getWechatInfo', 'bindWechatApi', 'unBindWechat']),
    ...mapMutations(['save']),
  },
  mounted () {
    this.getWechatInfo()
    if (this.userInfo) {
      this.getCustomerAuth(this.userInfo.corporationId)
    }
  },
  computed: {
    ...mapState('wechat', ['wechatInfo']),
    ...mapState(['userInfo']),
  },
  watch: {
    userInfo (val) {
      if (val) {
        this.getCustomerAuth(val.corporationId)
      }
    }
  },
  components: {
  }
}
</script>

<style lang='stylus'>
.p-home-base-info
  .card
    padding 20px 20px 0
    .top-info
      display flex
      padding-bottom 18px
      border-bottom 1px solid #EAEBEE
      .avator
        padding-right 10px
        img
          width 60px
      .main-info
        display flex
        flex-direction column
        justify-content space-around
        .company
          font-size 16px
        .phone-name
          display flex
          line-height 16px
          .phone-num
            margin-right 20px
    .detail-list
      .item
        display flex
        margin 20px 0
        .left-info
          flex 1 0 auto
          .gray
            color #CBCBCD
        .right-btn
          color #3B68F0
          cursor pointer
    .bind-dialog
      >>>.el-dialog__body
        padding 10px 20px 20px
      .title
        text-align center
        color #494949
        margin-bottom 10px
      .label
        color #494949
        margin-bottom 8px
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
</style>
