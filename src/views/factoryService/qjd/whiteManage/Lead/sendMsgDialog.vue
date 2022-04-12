<template lang="pug">
  el-dialog(width='422px'
    class='create-order-send-msg'
    custom-class='el-dialog-new'
    :title="headTitle"
    :visible.sync='isVisible' :before-close='beforeClose'
  )
    .check-identity-main
      .change-phone-tips 短信验证码已发送至{{personInfo.personPhone | toWordHide('mobile')}}的手机
      .change-phone-input
        el-input(size="large" maxlength="6" minlength="6" v-model="msgCode" placeholder="请输入短信验证码")
        el-button.send-msg-btn(
          :class='{"counting-active": counting}'
          @click="sendMsgHandler"
          :loading="sendLoading"
        ) {{sendText}}
    .p-btns-main.align-right(v-if="status === 'error'")
      el-button(@click='handleClose' plain :disabled="loading") 取消
      el-button(@click='toComfirm' type='primary' :disabled="loading" :loading="loading") 确定
</template>
<script>
import { mapState } from 'vuex'
import ajaxStore from '@/apis'
export default {
  props: {
    headTitle: {
      type: String,
      default: '短信验证码核实身份'
    },
    isShowMsg: {
      type: Boolean,
      default: false,
    },
    status: {
      default: 'error'
    },
    personInfo: {},
    loading: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      msgCode: '',
      isVisible: this.isShowMsg,
      counting: false,
      countInterval: null,
      countNumber: 60,
      haveSend: false,
      sendLoading: false
    }
  },
  computed: {
    ...mapState(['userInfo']),
    sendText() {
      if (this.sendLoading) {
        return '发送中...'
      }
      return this.counting ? this.countNumber + '秒后再次发送' : (this.haveSend ? '再次发送验证码' : '发送验证码')
    },
  },
  methods: {
    handleClose() {
      this.msgCode = ''
      this.isVisible = false
      this.$emit('close')
    },
    async sendMsgHandler() {
      if (this.counting || this.sendLoading) {
        return false
      }
      this.sendLoading = true
      const params = {
        mobileNo: this.personInfo.personPhone,
        idcardName: this.personInfo.name,
        idcardNumber: this.personInfo.idCardNo
      }
      const { esignSendMsgNew } = ajaxStore.factoryService.qjd.white
      esignSendMsgNew(params).then((res = {}) => {
        this.sendLoading = false
        if (res.data.code === 0) {
          this.haveSend = true
          this.counting = true
          this.countInterval = setInterval(() => {
            if (this.countNumber === 1) {
              this.countInterval && clearInterval(this.countInterval)
              this.counting = false
              this.countNumber = 60
              return
            }
            this.countNumber = this.countNumber - 1
          }, 1000)
        }
      })
    },
    toComfirm() {
      this.haveSend = false
      this.$emit('createHandle', this.msgCode)
    },
    beforeClose() {
      if (!this.loading) {
        this.msgCode = ''
        this.isVisible = false
        this.countInterval && clearInterval(this.countInterval)
        this.counting = false
        this.countInterval = null
        this.countNumber = 60
        this.haveSend = false
        this.sendLoading = false
        this.$emit('close')
      }
    },
  },
  watch: {
    isShowMsg(val) {
      this.isVisible = val
      if (val) {
        this.msgCode = ''
        this.sendMsgHandler()
      }
    },
  }
}
</script>
<style>
.create-order-send-msg .p-btns-main.align-right .is-disabled{
  color: #FFF!important;
  background-color: rgb(175, 175, 195)!important;
  border-color: rgb(175, 175, 195)!important;
}
</style>
<style lang="stylus" scoped>
.check-identity-main
  padding 0px 20px
  // text-align center
  .change-phone-tips
    margin-bottom 8px
    font-size: 12px;
    color: #4C5E78;
  .change-phone-input
    margin-bottom 30px
    position relative
  .send-msg-btn
    background none !important
    color #3c5da4
    line-height 30px
    position absolute
    right 10px
    top 5px
    padding 0
    cursor pointer
    font-size 12px
    border none
.title
  font-size 16px
  text-align center
  margin-bottom 20px
.p-btns-main
  text-align center
.align-right
  text-align right
.counting-active
  font-size 12px
  color #8997AE
.no-msg
  font-family PingFangSC-Regular
  font-size 12px
  color #0091FF
  line-height: 12px
  float left
  margin-top 13px
  margin-left 20px
  cursor pointer
</style>
