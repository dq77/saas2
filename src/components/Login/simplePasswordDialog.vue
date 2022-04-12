<template lang="pug">
  //- 密码简单提示
  el-dialog.p-simple-password-dialog(
    title='温馨提醒'
    width='400px'
    center
    :visible='ifShowLoginTip'
    :close-on-click-modal='false'
    :before-close='close'
  )
    .p-dialog-text
      p 尊敬的用户：
      p.u-tip 您好，为提升账户的安全性，系统将于2021年4月28日0：00开始对平台进行安全升级，升级后密码强度不足的用户将无法登录平台，请及时主动修改密码。如有疑问请咨询在线客服或400-612-1666。
    span(slot='footer')
      el-button.u-footer-btn(type='primary' @click='goChangePwd') 立即修改
      el-button.u-footer-btn.u-footer-close(v-if='showLeftBtn' type='text' @click="close") 暂不修改
</template>

<script>
import { mapState } from 'vuex'

export default {
  data() {
    return {
    }
  },
  computed: {
    showLeftBtn() {
      return this.$route.name !== 'login'
    },
    ...mapState([
      'ifShowLoginTip' // 映射 this.ifShowLoginTip 为 store.state.ifShowLoginTip
    ]),
  },
  methods: {
    close() {
      this.$store.commit('setIfShowLoginTip', false)
    },
    goChangePwd() {
      this.$router.push({ name: 'forgetPassword' })
      this.close()
    }
  },
  mounted() {
    // console.log(this.$route.name)
  },
}
</script>

<style lang="stylus">
.p-simple-password-dialog
  .p-dialog-text
    color #738A9E
    font-size 14px
    line-height 20px
    p
      margin 0
    .u-tip
      text-indent 28px
  .u-title-img
    margin-top 10px
  .u-title
    color #3B3C5A
    font-size 18px
    line-height 24px
    margin 7px 0 0
  .u-code-btn
    padding 9px
  .el-dialog--center .el-dialog__body
    padding 8px 25px 30px
  .el-dialog__footer
    padding-bottom 30px
  .u-footer-btn
    width 172px
    display block
    margin 0 auto
  .u-footer-close
    color #738A9E
    font-size 12px
    line-height 17px
    margin-top 10px
    padding 0 15px
</style>
