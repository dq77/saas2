<template lang="pug">
  el-dialog(width='480px' :visible='isShow' :before-close='beforeClose')
    .p-main
      .title 企业对公打款认证
      .company-info-check-step.clearfix
        .company-info-check-step-round(:class='{"round-active" : step > 0}') 1
        .company-info-check-step-line(:class='{"line-active" : step > 1}')
        .company-info-check-step-round(:class='{"round-active" : step > 1}') 2
        .company-info-check-step-line(:class='{"line-active" : step === 3}')
        .company-info-check-step-round(:class='{"round-active" : step > 2}') 3
      .company-info-check-step-text.clearfix
        .identity-text 经办人实名认证
        .new-phone-text 填写企业信息
        .success-text  打款信息验证
      .u-form(v-show="step === 1")
        el-form(ref='companyStepOneAuthCheck' size='big' :rules='companyStepOneAuthForm.rules' :model='companyStepOneAuthForm' label-position='top')
          el-form-item(label='姓名')
            el-input(style='width: 360px' size='big' disabled
              v-model='companyStepOneAuthForm.name'
            )
          el-form-item(label='身份证号' prop='personIdCard')
            el-input(style='width: 360px' size='big' placeholder='请填写身份证号码' disabled
              v-model='companyStepOneAuthForm.personIdCard'
              @change='companyStepOneAuthForm.personIdCard = companyStepOneAuthForm.personIdCard.toUpperCase()'
            )
          el-form-item(label='银行卡号' prop='bankCard')
            el-tooltip(placement='top')
              .tooltip(slot='content') 选择认证银行卡号需要注意以下事项：
              .tooltip(slot='content') 1、邮政储蓄银行、交通银行、平安银行、上海银行、</br>北京银行、浦发银行、兴业银行、华夏银行需要开通</br>无卡支付，中信银行需要开通无卡支付和金融短信通，</br>光大银行需要开通光大银行的电子支付功能；
              .tooltip(slot='content') 2、地方性城商行需要开通银联在线支付；
              .tooltip(slot='content') 3、不支持浦发银行621793开头的卡号、浙江省农村</br>信用社的卡进行认证；
              i.iconfont.iconinfo
            el-input(style='width: 360px' size='big' placeholder='请填写银行卡号'
              autocomplete='off'
              v-model='formartBankCard'
              @input='formartBank()'
              @change='getBanKCard()'
            )
          el-form-item(label='预留手机号' prop='personPhone')
            el-input(style='width: 360px' size='big' placeholder='请输入手机号'
              v-model='companyStepOneAuthForm.personPhone'
            )
          el-form-item(label='验证码' prop='code')
            el-input(style='width: 360px' size='big' placeholder='请输入验证码'
              v-model='companyStepOneAuthForm.code'
            )
            el-button.send-msg-btn(
              :class='{"counting-active": counting}'
              @click="sendMsgHandler"
              :loading="sendLoading"
            ) {{sendLoading ? '发送中...' : (counting ? countNumber + '秒后再次发送' : (haveSend ? '再次发送验证码' : '发送短信验证码'))}}
        .p-btns-main
          el-button(@click='clickBack' size="medium" plain weblogs-anchor='common-account-verifiedCancel') 返回
          el-button(@click='stepOneSavePerson' size="medium" type='primary' weblogs-anchor='common-account-verifiedSave') 立即认证
      .u-form(v-show="step === 2")
        el-form(ref='companyStepTwoAuthCheck' size='big' :rules='companyStepTwoAuthForm.rules' :model='companyStepTwoAuthForm' label-position='top')
          el-form-item(label='开户名称')
            el-input(style='width: 360px' size='big' disabled
              v-model='companyStepTwoAuthForm.name'
            )
          el-form-item(label='开户银行' prop='bankIndex')
            el-select(
              style='width: 360px'
              filterable
              clearable
              remote
              placeholder='请输入开户银行名称'
              v-model='companyStepTwoAuthForm.bankIndex'
              :remote-method='searchBankList'
              :loading='bankLoading'
              :default-first-option='true'
              @change='setBank')
              el-option(v-for='(item, index) in bankList' :key='index' :label='`${item.bank}(${item.bankName})`' :value='index')
                div {{ item.bank }}({{item.bankName}})
          el-form-item(label='对公银行账户' prop='bankCommonCard')
            el-input(style='width: 360px' size='big' placeholder='请输入对公银行账号'
              v-model='companyStepTwoAuthForm.bankCommonCard'
            )
        .p-btns-main
          el-button(@click='clickBack' size="medium" plain) 返回
          //- el-button(@click='clickSubmitReStart' size="medium" type='primary' :loading='reStartLoading') 重新发起认证
          el-button(@click='clickSaveCompany' size="medium" type='primary') 确认无误，提交企业信息
      .u-form(v-show="step === 3")
        el-form(ref='companyStepThreeAuthCheck' size='big' :rules='loanForm.rules' :model='loanForm' label-position='top')
          el-form-item(label='验证金额' prop='loan')
            el-input(style='width: 360px' size='big' type='Number'
              v-model='loanForm.loan'
            )
        .company-check-tips 提示：
          div 贵司对公账户会在2小时内收到的一笔随机金额。
          div 请在72小时内填写金额数字，验证金额。
          div 信息填写错误或超时会导致验证失败。
        .p-btns-main-step3
          el-button(@click='clickSubmitAmount' size="medium" type='primary') 立即验证
        .p-btns-main-step3
          el-button(@click='searchProgress' size="medium" type='primary' :loading='paymentLoading') 查看打款进度
        .p-btns-main-step3
          el-button(@click='clickSubmitReStart' size="medium" type='primary' :loading='reStartLoading') 重新发起认证
</template>
<script>
import ajaxStore from '@/apis'
import { AreaData } from '@/utils/area'
import { getRegionTextArr } from '@/utils/regionHandle'
// import { encryptIdentityCode } from '@/utils/util'
export default {
  props: {
    step: {
      default: 0
    },
    isShow: {
      type: Boolean,
      default: false,
    },
    paymentLoading: {
      type: Boolean,
      default: false,
    },
    reStartLoading: {
      type: Boolean,
      default: false,
    },
    personType: {
      type: String,
      default: 'legalInfo'
    },
    thirdFlowId: {
      default: 'aaa'
    },
    companyStepOneAuthForm: {
      type: Object,
      default() {
        return {}
      }
    },
    companyStepTwoAuthForm: {
      type: Object,
      default() {
        return {}
      }
    },
    formartBankCard: {
      type: String,
      default: ''
    },
  },
  data() {
    const validateLoan = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('请输入正确的验证金额'))
      } else {
        if (value < 0) {
          callback(new Error('请输入正确的验证金额'))
        }
        callback()
      }
    }
    return {
      loanForm: {
        loan: '',
        rules: {
          // 金额
          loan: [
            { required: true, trigger: 'blur', validator: validateLoan }
          ],
        }
      },
      bankLoading: false,
      // formartBankCard: '',
      flowId: '',
      bankList: [],
      currentBank: {},
      eFLowId: '',
      // 短信验证码info
      counting: false,
      countInterval: null,
      countNumber: 60,
      haveSend: false,
      msgCode: '',
      sendLoading: false,

      loading: false,
      AreaData,
      submitLoading: false,
      formLabelAlign: {
        accountName: '',
        accountBankName: '',
        accountBackAddress: [],
        accountChildBackName: '',
        bankCard: ''
      },
      viewFormText: {
        amount: ''
      }
    }
  },
  methods: {
    // encryptIdentityCode,
    getAddressStr() {
      return getRegionTextArr(this.formLabelAlign.accountBackAddress[0], this.formLabelAlign.accountBackAddress[1], this.formLabelAlign.accountBackAddress[2] || '')
    },
    formartBank() {
      // 四位空一格
      this.$nextTick(() => {
        this.formartBankCard = this.formartBankCard.replace(/\s/g, '').replace(/....(?!$)/g, '$& ')
      })
    },
    getBanKCard() {
      this.companyStepOneAuthForm.bankCard = this.formartBankCard.replace(/\s/g, '')
    },
    async sendMsgHandler() {
      let checkPhone = true
      await this.$refs.companyStepOneAuthCheck.validateField('personPhone', (error) => {
        if (error) {
          checkPhone = false
        }
      })
      if (!checkPhone) {
        return false
      }
      if (this.counting || this.sendLoading) {
        return false
      }
      this.sendLoading = true
      const res = await ajaxStore.common.account.getMessageCheck({
        idcardName: this.companyStepOneAuthForm.name,
        idcardNumber: this.companyStepOneAuthForm.personIdCard,
        mobileNo: this.companyStepOneAuthForm.personPhone,
        bankCardNo: this.companyStepOneAuthForm.bankCard
        // idcardName: '吴洁峰',
        // idcardNumber: '330681198809077816',
        // mobileNo: 13805789851,
        // bankCardNo: '6222600260001072444',
        // idcardName: '周琳',
        // idcardNumber: '33250219940912288X',
        // mobileNo: 18268108449,
      })
      this.sendLoading = false
      if (res.data && res.data.code === 0) {
        this.eFLowId = res.data.data.flowId
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
    },
    beforeClose() {
      this.$emit('close')
    },
    clickBack() {
      this.$emit('close')
    },
    // 设置当前选择银行信息
    setBank() {
      this.currentBank = this.bankList[this.companyStepTwoAuthForm.bankIndex]
    },
    // 查询银行列表
    async searchBankList(keyWord) {
      if (keyWord.length < 4) {
        return false
      }
      const res = await ajaxStore.common.account.getSubbranch({
        flowId: this.thirdFlowId,
        keyWord: keyWord
      })
      if (res.data && res.data.code === 0) {
        this.bankList = res.data.data.list
      }
    },
    // 实名认证部分 -自然人
    stepOneSavePerson() {
      this.$refs.companyStepOneAuthCheck.validate(async v => {
        if (v) {
          // 根据this.personType进行实名认证
          // 根据实名认证结果返回
          // this.step = 2
          this.$emit('stepOneSavePerson', this.companyStepOneAuthForm, this.eFLowId)
        }
      })
    },
    // 实名认证部分 -公司
    clickSaveCompany() {
      this.$refs.companyStepTwoAuthCheck.validate(async v => {
        if (v) {
          // 根据this.personType进行实名认证
          // 根据实名认证结果返回
          // this.step = 3
          this.$emit('clickSaveCompany', this.companyStepTwoAuthForm, this.currentBank)
        }
      })
    },
    // 实名认证部分 -打款认证
    async clickSubmitAmount() {
      this.$refs.companyStepThreeAuthCheck.validate(async v => {
        if (v) {
          this.$emit('clickSubmitAmount', this.loanForm.loan)
        }
      })
    },

    // 查询打款进度
    async searchProgress() {
      this.$emit('searchProgress')
    },
    // 重新发起流程
    async clickSubmitReStart() {
      this.$emit('clickSubmitReStart')
    }
  },
  watch: {
    companyname(val) {
      this.formLabelAlign.accountName = val
    },
    thirdFlowId(val) {
      this.flowId = val
    }
  }
}
</script>
<style lang="stylus">
.el-form-item
  margin-bottom 10px
</style>
<style lang="stylus" scoped>
.clearfix:after
  display block
  clear both
  content ''
.p-main
  padding 0px 40px
  margin-top -20px
  .u-form
    margin-top: 20px
.p-dialog
  width 480px
  box-sizing border-box
.title
 text-align center
 margin-bottom 20px
.company-info-check-step-round
  width 24px
  height 24px
  border-radius 50%
  color #fff
  text-align center
  background #cfcfda
  display block
  float left
  line-height 24px
  margin 0 14px
  font-size 14px
.line-active{
  border-bottom 1px solid #5E5F87!important
}
.company-info-check-step-line
  border-bottom 1px dashed #5E5F87
  margin-top 11px
  width 100px
  float left
  display block
.p-btns-main
  text-align center
  font-size 12px
  margin-top 30px
.p-btns-main-step3
  text-align center
  font-size 12px
  margin-top 20px
  button
    width 70%
.round-active
  background #5E5F87
.identity-text
  float left
  text-align center
  margin-left -22px
.company-info-check-step-text
  width 400px
  margin-top 15px
  font-size 12px
.new-phone-text
  float left
  margin-left 84px
  text-align center
.success-text
  float left
  margin-left 80px
  text-align center
.send-msg-btn
  color #0F8EE9
  position absolute
  right 1px
  top 1px
  padding 0 10px
  cursor pointer
  font-size 12px
  border none
  width 110px
  height 38px
  &:hover
    background none
    color #0F8EE9
.company-check-tips
  margin 30px 0
  font-size 12px
  color #43406C
  line-height 20px
.iconinfo
  color #f6b041
  top -41px
  position absolute
  left 60px
.tooltip
  line-height 20px
</style>
