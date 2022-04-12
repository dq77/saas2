<!--
 * @Date: 2021-06-23 14:08:16
 * @LastEditors: 掉漆
 * @LastEditTime: 2021-07-15 20:37:17
-->
<template lang="pug">
.message-subscribe-edit-page.page-main
  Card(noTitle noWrap)
    .edit-card
      .welcome 尊敬的客户：
      .sub-info 仟金顶将为您提供更为全面的消息订阅服务，除了本平台站内信外，您还可以选择通过微信、邮件等方式接受仟金顶为您推送的重要业务消息及风险信息。
      .subtitle 请设置您希望收到消息的方式：
      .way-block
        .way-item(v-loading='loading')
          .item-top
            .title 微信
            .btn-block
              el-switch(v-model="wechatSwitch" @change='changeSwitch(1001, wechatSwitch)' :disabled='!wechatInfo.nickname' active-color="#25BECD" inactive-color="#E05E62")
          .item-cnt
            .step 步骤1：关注仟金顶微信公众号
            .detail 方法：打开微信，扫描下方二维码，关注微信公众号“仟金顶服务平台”。
            img.qrcode(:src='`${$assetsBaseUrl}/common/home/gzh-qrcode.png`')
            .step 步骤2：绑定微信和仟金顶厂家服务平台账号
            .detail(v-if='wechatInfo.nickname')
              span 已绑定微信账号：{{ wechatInfo.nickname }}
              el-button.unbind-btn(@click='unbindWechat' type='text') 解绑
            .detail(v-else)
              .detail 方法：
              .detail &nbsp; &nbsp; &nbsp; ①进入公众号，点击 “仟会员”-“厂家账户绑定” ，按步骤提示绑定微信账号；
              .detail &nbsp; &nbsp; &nbsp; ②使用微信登录仟金顶厂家服务平台；
              .detail &nbsp; &nbsp; &nbsp; ③打开微信，扫描下方二维码，绑定微信账号。
              .qrcode-area
                img(:src='qrcodeUrl')
                .cover(v-if='qrcodeUrl !== "" && wxState === ""')
                  .reload-btn(@click='initWxLogin') 点击刷新
            .step 步骤3：绑定成功，您可以通过微信服务通知接收仟金顶推送的业务消息及风险信息。
        .way-item(v-loading='loading')
          .item-top
            .title 邮箱
            .btn-block
              el-switch(v-model="mailSwitch" @change='changeSwitch(1002, mailSwitch)' :disabled='!userInfo.email' active-color="#25BECD" inactive-color="#E05E62")
          .item-cnt
            .step 步骤1：绑定邮箱
            el-form(ref='mailForm' :model='form' inline :rules='formRule')
              el-form-item(prop='mail' label='邮箱地址')
                span.mail-input(v-if='userInfo.email') {{ userInfo.email }}
                el-input.mail-input(v-else type='text' placeholder='请输入邮箱' v-model='form.mail')
              el-form-item
                el-button(type="primary" @click="onSubmit") {{ userInfo.email ? '解绑' : '绑定' }}
</template>
<script>
import Card from '@/components/Card'
import { mapState, mapMutations, mapActions } from 'vuex'
import QRCode from 'qrcode'
export default {
  components: {
    Card
  },
  data() {
    return {
      loading: false,
      wechatSwitch: false,
      mailSwitch: false,
      form: {
        mail: ''
      },
      qrcodeUrl: '', // 显示二维码地址
      wxState: '', // 本次登录的唯一识别号
      getting: false, // 轮询状态
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
      }
    }
  },
  computed: {
    ...mapState(['userInfo']),
    ...mapState('wechat', ['wechatInfo']),
  },
  methods: {
    onSubmit() {
      if (this.userInfo.email) {
        this.$confirm(`确定要解绑邮箱${this.userInfo.email}吗?`, '邮箱解绑', { type: 'warning' }).then(async () => {
          const res = await this.ajaxStore.common.unBindEmail()
          if (res.data && res.data.code === '0') {
            this.$message.success('解绑成功')
            this.save({ userInfo: Object.assign(this.userInfo, { email: '' }) })
            this.mailSwitch = false
          }
        })
      } else {
        this.$refs.mailForm.validate(async (valid) => {
          if (valid) {
            const res = await this.ajaxStore.common.bindEmail({email: this.form.mail})
            if (res.data.code === '0') {
              this.bindMailShow = false
              this.$message({ message: '邮箱绑定成功', type: 'success' })
              this.save({ userInfo: Object.assign(this.userInfo, { email: this.form.mail }) })
              this.mailSwitch = true
            }
          }
        })
      }
    },
    unbindWechat() {
      this.$confirm(`确定要解绑微信${this.wechatInfo.nickname}吗?`, '微信解绑', { type: 'warning' }).then(async () => {
        const res = await this.unBindWechat()
        if (res.data && res.data.code === '0') {
          this.$message.success('解绑成功')
          this.wechatSwitch = false
          this.initWxLogin()
        }
      })
    },

    async changeSwitch(switchType, switchValue) {
      const params = {
        switchType,
        switchValue: switchValue ? 1 : 0
      }
      const res = await this.ajaxStore.message.setSwitchState(params)
      if (res.data && res.data.code === '0') {}
    },

    async initWxLogin() {
      this.qrcodeUrl = ''
      const randRes = await this.ajaxStore.common.getWxState()
      this.wxState = randRes.data ? randRes.data.data : ''
      const url = `https://open.weixin.qq.com/connect/oauth2/authorize?appid=wx450c87636664d2c4&redirect_uri=https%3A%2F%2F${process.env.VUE_APP_WEBTOOLS_HOST}%2FfactoryWxLogin&response_type=code&scope=snsapi_userinfo&state=${this.wxState}#wechat_redirect`
      const res = await QRCode.toDataURL(url, { width: 180, height: 180, margin: 0 })
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

    async getSwitchState() {
      this.loading = true
      const res = await this.ajaxStore.message.getSwitchState()
      this.loading = false
      if (res.data && res.data.code === '0' && res.data.data.length !== 0) {
        const wechatSwitch = res.data.data.find(item => { return item.switchType === 1001 })
        const mailSwitch = res.data.data.find(item => { return item.switchType === 1002 })
        this.wechatSwitch = (wechatSwitch && wechatSwitch.switchValue === 1)
        this.mailSwitch = (mailSwitch && mailSwitch.switchValue === 1)
      }
      if (!this.wechatSwitch) {
        this.initWxLogin()
      }
      this.$watch('wechatInfo', function (newVal, oldVal) {
        this.wechatSwitch = !!(newVal && newVal.nickname)
      })
    },
    ...mapMutations(['save']),
    ...mapActions('wechat', ['save', 'bindWechatApi', 'unBindWechat']),
  },
  mounted() {
    this.getSwitchState()
  },
  watch: {
    // wechatInfo: function(val) {
    //   this.wechatSwitch = !!val
    // }
  }
}
</script>
<style lang="stylus">
.message-subscribe-edit-page
  color #494949
  .edit-card
    padding 30px 20px 40px
    .welcome
      font-size 14px
      margin-bottom 10px
    .sub-info
      color #738A9E
    .subtitle
      margin-top 30px
      margin-bottom 20px
    .way-block
      display flex
      margin 0 -10px
      .way-item
        margin 0 10px
        width 200px
        border 1px solid #EAEBEE
        flex 1 1 auto
        .item-top
          font-size 14px
          border-bottom 1px solid #EAEBEE
          display flex
          justify-content space-between
          padding 15px 20px
        .item-cnt
          padding 20px
          .step
            margin-bottom 10px
          .detail
            margin-bottom 10px
            color #738A9E
            .unbind-btn
              color #25BECD
              margin-left 15px
            .qrcode-area
              display block
              width 200px
              height 200px
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
          .qrcode
            display block
            width 120px
            height 120px
            margin-bottom 20px
          .mail-input
            width 300px
</style>
