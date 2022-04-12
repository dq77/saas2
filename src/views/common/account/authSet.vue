<template lang="pug">
  .page-main(v-loading='loading')
    .auth-base-info
      Card.compony-info(title='公司信息')
        .list-item
          .item-label 公司名称：
          .item-value {{ companyAuth.corpName }}
        .list-item
          .item-label 统一社会信用代码：
          .item-value {{ companyAuth.socialCode }}
        .list-item
          .item-label 公司地址：
          .item-value {{ getAddressStr(companyAuth.provinceCode, companyAuth.cityCode, companyAuth.areaCode, companyAuth.address) }}
        .list-item
          .item-label 联系人姓名：
          .item-value {{ companyAuth.contactPerson }}
        .list-item
          .item-label 联系人手机号：
          .item-value {{ companyAuth.contactPhone }}
      Card(title='法定代表人信息')
        .list-item
          .item-label 法定代表人姓名：
          .item-value {{ companyAuth.name }}
        .list-item
          .item-label 法人代表身份证号：
          .item-value {{ companyAuth.idCardNo | toWordHide('id') }}
    Card.agent-info(title='授权人信息')
      el-table(:data='donorList')
        el-table-column(type='index' label='序号' width='350px')
        el-table-column(label='姓名' prop='name' width='380px')
        el-table-column(label='身份证号' prop='idCardNo')
          span(slot-scope='{ row }') {{row.idCardNo | toWordHide('id')}}
    Card.auth-list(title='实名认证列表')
      el-table.auth-table(v-if='companyAuth.corpName' :data='donorList')
        el-table-column(label='名称')
          el-table-column(:label='companyAuth.corpName' prop='name')
        el-table-column(label='实名认证类型')
          el-table-column(label='企业')
            span(slot-scope='{ row }') {{ row.relationType === 0 && row.authorizerType === 1 ? '法人/授权人' : row.relationType === 0 ? '法人' : '授权人' }}
        el-table-column(label='实名认证状态')
          el-table-column(:label='authStatus[companyAuth.realNameStatus] || "未认证"')
            span(slot-scope='{ row }') {{ authStatus[row.realNameStatus] || '未认证' }}
        el-table-column(label='操作')
          el-table-column
            template(slot="header" slot-scope="scope")
              el-button(type='text' v-if='companyAuth.realNameStatus === 2'
                @click='() => {companyShow = true}'
                weblogs-anchor='common-account-lookVerified'
              ) 查看信息
              el-button(type='text' v-if='companyAuth.realNameStatus === 2'
                @click='checkCompanyFlow'
                weblogs-anchor='common-account-reverified'
              ) 重新认证
              el-button(type='text' v-else-if='companyAuthDialog.step === 3'
                @click='checkCompanyFlow'
              ) 打款认证中
              el-button(type='text' v-else
                @click='checkCompanyFlow'
                weblogs-anchor='common-account-verified'
              ) 立即认证
            template(slot-scope='{ row, $index }')
              el-button(type='text' v-if='row.realNameStatus === 2'
                @click='openPersonInfo(row, "donor")'
                weblogs-anchor='common-account-lookVerified'
              ) 查看信息
              el-button(type='text' v-if='row.realNameStatus === 2'
                @click='openPersonDialog(row, "donor")'
                weblogs-anchor='common-account-reverified'
              ) 重新认证
              el-button(type='text' v-else
                @click='openPersonDialog(row, "donor")'
                weblogs-anchor='common-account-verified'
              ) 立即认证
    el-dialog(width='420px'
      :visible='paymentShow'
      :before-close='()=> {this.paymentShow = false}'
    )
      .payment
        .payment-label 打款进度：
        .payment-value {{paymentStatus}} ({{paymentMessage}})
      .dialog-btns-main
        el-button(@click='()=> {this.paymentShow = false}' size="medium" type='primary') 确认
    //- 企业认证信息查看
    el-dialog(width='480px'
      title='企业实名认证信息'
      :visible='companyShow'
      :before-close='()=> {this.companyShow = false}'
    )
      .dialog-main
        .dialog-item
          .dialog-label 企业信息
        .dialog-item
          .dialog-label 企业名称：
          .dialog-value {{companyAuth.corpName}}
        .dialog-item
          .dialog-label 社会统一信用代码：
          .dialog-value {{companyAuth.socialCode}}
        .dialog-item
          .dialog-label 法人：
          .dialog-value {{companyAuth.name}}
        .dialog-item
          .dialog-head 实名认证记录
        .dialog-item
          .dialog-label 状态：
          .dialog-value {{authStatus[companyAuth.realNameStatus]}}
        .dialog-item
          .dialog-label 认证方式：
          .dialog-value {{authType[companyAuth.realNameType]}}
        .dialog-item
          .dialog-label 办理人：
          .dialog-value {{handlePerson}}
        .dialog-item
          .dialog-label 认证时间：
          .dialog-value {{companyAuth.authTime}}
    //- 自然人认证信息查看
    el-dialog(width='420px'
      :title="titleObj[personType].info"
      :visible='personShow'
      :before-close='()=> {this.personShow = false}'
    )
      .dialog-main
        .dialog-item
          .dialog-label 个人信息
        .dialog-item
          .dialog-label 姓名：
          .dialog-value {{personInfo.name}}
        .dialog-item
          .dialog-label 身份证号：
          .dialog-value {{personInfo.idCardNo | toWordHide('id')}}
        .dialog-item
          .dialog-label 认证银行卡号：
          .dialog-value {{personInfo.personBankCardNo | toWordHide('bank')}}
        .dialog-item
          .dialog-label 预留手机号：
          .dialog-value {{personInfo.personPhone | toWordHide('mobile')}}
        .dialog-item
          .dialog-head 实名认证记录
        .dialog-item
          .dialog-label 状态：
          .dialog-value {{authStatus[personInfo.realNameStatus]}}
        .dialog-item
          .dialog-label 认证方式：
          .dialog-value {{authPersonType[personInfo.realNameType]}}
        .dialog-item
          .dialog-label 认证时间：
          .dialog-value {{personInfo.authTime}}
    //- 个人实名
    el-dialog(width='480px'
      :title="titleObj[personType].auth"
      center
      :visible='authPersonShow'
      :before-close='()=> {this.authPersonShow = false}'
    )
      .dialog-main.dialog-main-auth
        el-form(ref='authPersonCheck' size='big' :rules='personAuthForm.rules' :model='personAuthForm' label-position='top')
          el-form-item(label='姓名')
            el-input(style='width: 360px' size='big' disabled
              v-model='personAuthForm.name'
            )
          el-form-item(label='身份证号' prop='idCardNo')
            el-input(style='width: 360px' size='big' placeholder='请填写身份证号码' disabled
              v-model='personAuthForm.idCardNoHide'
            )
          el-form-item(label='银行卡号' prop='personBankCardNo')
            el-tooltip(placement='top')
              .tooltip(slot='content') 选择认证银行卡号需要注意以下事项：
              .tooltip(slot='content') 1、邮政储蓄银行、交通银行、平安银行、上海银行、</br>北京银行、浦发银行、兴业银行、华夏银行需要开通</br>无卡支付，中信银行需要开通无卡支付和金融短信通，</br>光大银行需要开通光大银行的电子支付功能；
              .tooltip(slot='content') 2、地方性城商行需要开通银联在线支付；
              .tooltip(slot='content') 3、不支持浦发银行621793开头的卡号、浙江省农村</br>信用社的卡进行认证；
              i.iconfont.iconinfo
            el-input(style='width: 360px' size='big' placeholder='请填写银行卡号' maxlength='24'
              v-model='formartBankCard'
              @input='formartBank()'
              @change='getBanKCard()'
            )
          el-form-item(label='预留手机号' prop='personPhone')
            el-input(style='width: 360px' size='big' placeholder='请输入手机号'
              v-model='personAuthForm.personPhone'
            )
          el-form-item(label='验证码' prop='code')
            el-input(style='width: 360px' size='big' placeholder='请输入验证码'
              v-model='personAuthForm.code'
            )
            el-button.send-msg-btn(
              :class='{"counting-active": counting}'
              @click="sendMsgHandler"
              :loading="sendLoading"
            ) {{sendLoading ? '发送中...' : (counting ? countNumber + '秒后再次发送' : (haveSend ? '再次发送验证码' : '发送短信验证码'))}}
      .dialog-btns-main
        el-button(@click='()=> {this.authPersonShow = false}' size="medium" plain weblogs-anchor='common-account-verifiedCancel') 返回
        el-button(@click='()=> clickSavePerson()' size="medium" type='primary' weblogs-anchor='common-account-verifiedSave') 立即认证
    //- 企业实名-选择办理人
    HandleDialog(
      :donorList='donorList'
      :signShow="signShow"
      @close="() => {this.signShow = false}"
      @choseSigner="choseSigner"
    )
    //- 企业实名认证
    CompanyAuthDialog(
      formartBankCard='',
      :thirdFlowId='thirdFlowId'
      :personType='personType'
      :isShow="companyAuthDialog.isShow"
      :step="companyAuthDialog.step"
      :companyStepOneAuthForm='companyStepOneAuthForm'
      :companyStepTwoAuthForm='companyStepTwoAuthForm'
      :paymentLoading='paymentLoading'
      :reStartLoading='reStartLoading'
      @stepOneSavePerson='(form, eFLowId)=> {this.stepOneSavePerson(form, eFLowId)}'
      @clickSaveCompany='(form, currentBank) => {this.clickSaveCompany(form, currentBank)}'
      @clickSubmitAmount='(amount) => {this.clickSubmitAmount(amount)}'
      @searchProgress='() => {this.searchProgress()}'
      @clickSubmitReStart='() => {this.clickSubmitReStart()}'
      @close="() => {this.companyAuthDialog.isShow = false}"
    )
    //- 认证结果
    AuthResultDialog(
      :resultShow='resultShow'
      :resultType='resultType'
      :isResultSuccess='isResultSuccess'
      :resultReson='resultReson'
      @restart='restart'
      @close="() => {this.resultShow = false}"
    )
</template>
<script>
import CompanyAuthDialog from '@/components/auth/CompanyAuthDialog'
import AuthResultDialog from '@/components/auth/AuthResultDialog'
import HandleDialog from '@/components/auth/HandleDialog'
import Card from '@/components/Card'
import { getRegionTextArr } from '@/utils/regionHandle'
import { authStatus, authType, authPersonType, agentStatus } from '@/utils/enums.js'
import { validatePhone, toWordHide } from '@/utils/util'
import {mapState} from 'vuex'
import ajaxStore from '@/apis'
// import { base_url } from '@/utils/config'
export default {
  data() {
    const vPhone = (rule, value, callback) => {
      if (!validatePhone(value)) return callback(new Error('请输入正确的联系人手机号'))
      return callback()
    }
    const validateBankCard = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('请输入银行卡号'))
      } else {
        const reg = /^(\d{9,50})$/g
        if (!reg.test(value)) {
          callback(new Error('请输入9-50位数字'))
        }
        callback()
      }
    }
    return {
      authStatus,
      authType,
      authPersonType,
      agentStatus,
      activeTab: 'self',
      // 打款进度弹窗
      paymentShow: false,
      paymentStatus: '',
      paymentMessage: '',
      paymentLoading: false,
      reStartLoading: false,
      loading: true,
      companyInfo: null,
      companyInfoForm: {
        loading: false,
        disabled: true,
        rules: {
          contactPerson: [
            { required: true, message: '请输入联系人姓名', trigger: 'blur' },
          ],
          contactPhone: [
            { required: true, validator: vPhone, trigger: 'blur' },
          ]
        },
        contactPerson: '',
        contactPhone: '',
      },
      // 短信验证码info
      counting: false,
      countInterval: null,
      countNumber: 60,
      haveSend: false,
      msgCode: '',
      sendLoading: false,

      formartBankCard: '',
      eFLowId: '',
      sendInfo: {
        flowId: '',
        mobileNo: '',
        bankCardNo: '',
      },
      companyShow: false,
      personShow: false,
      authPersonShow: false,
      authCompanyShow: false,
      signShow: false,
      resultShow: false,
      resultType: '1',
      resultReson: '',
      isResultSuccess: true,
      personType: 'legalInfo',
      titleObj: {
        legalInfo: {
          info: '法人实名认证信息',
          auth: '企业法人实名认证',
          value: 'LEGAL'
        },
        donor: {
          info: '自然人实名认证信息',
          auth: '自然人实名认证',
          value: 'AGENT'
        },
        guarantee: {
          info: '担保人实名认证信息',
          auth: '担保人实名认证',
          value: 'GUARANTOR'
        },
        transactor: {
          info: '办理人实名认证信息',
          auth: '办理人实名认证',
          value: 'TRANSACTOR'
        },
        entityLegalInfo: {
          info: '担保企业法人实名认证信息',
          auth: '担保企业法人实名认证',
          value: 'ENTITY'
        }
      },
      thirdFlowId: '',
      personInfo: {},
      companyAuth: {},
      handlePerson: '',
      legalInfo: {},
      donorInfo: {},
      donorList: [],
      guaranteeList: [],
      handlerPersonList: [],
      companyTaskId: '',
      personTaskId: '',
      companyFlowInfo: {},
      personFlowInfo: {},
      personAuthForm: {
        idCardNo: '',
        personBankCardNo: '',
        personPhone: '',
        code: '',
        rules: {
          // // 身份证
          // idCardNo: [
          //   { required: true, trigger: 'blur', validator: vIdentifyCode }
          // ],
          // 银行卡号
          personBankCardNo: [
            { required: true, trigger: 'blur', validator: validateBankCard }
          ],
          // 手机
          personPhone: [
            { required: true, trigger: 'blur', validator: vPhone }
          ],
          // 验证码
          code: [
            { required: true, message: '请输入验证码', trigger: 'blur' },
          ]
        }
      },
      companyStepOneAuthForm: {
        idCardNo: '',
        personBankCardNo: '',
        personPhone: '',
        code: '',
        rules: {
          // // 身份证
          // idCardNo: [
          //   { required: true, trigger: 'blur', validator: vIdentifyCode }
          // ],
          // 银行卡号
          personBankCardNo: [
            { required: true, trigger: 'blur', validator: validateBankCard }
          ],
          // 手机
          personPhone: [
            { required: true, trigger: 'blur', validator: vPhone }
          ],
          // 验证码
          code: [
            { required: true, message: '请输入验证码', trigger: 'blur' },
          ]
        }
      },
      companyStepTwoAuthForm: {
        bankIndex: '',
        bankCommonCard: '',
        rules: {
          // 开户行序号
          bankIndex: [
            { required: true, message: '请输入开户行', trigger: 'blur' },
          ],
          // 银行对公账号
          bankCommonCard: [
            { required: true, trigger: 'blur', validator: validateBankCard }
          ],
        }
      },
      companyAuthDialog: {
        isShow: false,
        step: 0,
      },
      agentShow: false,
      agentShowLoading: false,
      agentSignShow: false,
      agentInfo: {},
      agentStep: 1,
      agentContractCode: '',
      sendMsgloading: false,
    }
  },
  methods: {
    getAddressStr(provinceCode, cityCode, areaCode, address) {
      return getRegionTextArr(provinceCode, cityCode, areaCode) + address
    },
    formartBank() {
      // 四位空一格
      this.$nextTick(() => {
        this.formartBankCard = this.formartBankCard.replace(/\s/g, '').replace(/....(?!$)/g, '$& ')
      })
    },
    getBanKCard() {
      this.personAuthForm.personBankCardNo = this.formartBankCard.replace(/\s/g, '')
    },

    checkSendInfo() {
      if (this.sendInfo.flowId === this.eFLowId && this.sendInfo.mobileNo === this.personAuthForm.personPhone && this.sendInfo.bankCardNo === this.personAuthForm.personBankCardNo) {
        return true
      } else {
        return false
      }
    },

    // 实名认证部分 -自然人
    async clickSavePerson() {
      this.$refs.authPersonCheck.validate(async v => {
        if (v) {
          if (!this.eFLowId) {
            this.$message.warning('请点击发送验证码')
          } else if (!this.checkSendInfo()) {
            this.$message.warning('请点击发送验证码')
            this.countInterval && clearInterval(this.countInterval)
            this.haveSend = false
            this.counting = false
            this.countNumber = 60
          } else {
            await this.startPersonDialog(this.personInfo, this.personType)
            // 根据this.personType进行实名认证
            const res = await ajaxStore.common.account.processSubmit({
              memberId: this.personInfo.idCardNo,
              taskId: this.personTaskId,
              isPass: 'Y',
              bankAccount: this.personAuthForm.personBankCardNo,
              phoneNum: this.personAuthForm.personPhone,
              eFLowId: this.eFLowId,
              verifyCode: this.personAuthForm.code,
              // eFLowId: '1187840016072575030',
              // verifyCode: '377657'
            })
            if (res.data && res.data.code === '0') {
              this.authPersonShow = false
              this.resultShow = true
              this.resultType = this.personType
              this.isResultSuccess = res.data.data.resultCode === '0'
              this.resultReson = res.data.data.resultMessage
              this.personInfo.realNameStatus = res.data.data.resultCode === '0' ? '2' : '3'
              this.eFLowId = ''
            }
            // 刷新数据
            this.getCompanyAuth()
          }
        }
      })
    },

    openPersonInfo(currentInfo, personType) {
      this.personType = personType
      this.personShow = true
      this.personInfo = currentInfo
    },
    async openPersonDialog(currentInfo, personType) {
      this.personType = personType
      this.personInfo = currentInfo || {}
      // 清理短信计时器
      this.countInterval && clearInterval(this.countInterval)
      this.haveSend = false
      this.counting = false
      this.countNumber = 60
      this.personAuthForm.name = currentInfo.name
      this.personAuthForm.personBankCardNo = ''
      this.formartBankCard = ''
      this.personAuthForm.idCardNo = currentInfo.idCardNo
      this.personAuthForm.idCardNoHide = toWordHide(currentInfo.idCardNo, 'id')
      this.personAuthForm.personPhone = ''
      this.personAuthForm.code = ''
      this.authPersonShow = true
    },
    async startPersonDialog(currentInfo, personType) {
      // 根据currentInfo是否有流程id和流程状态认证中,有且状态未结束根据id获取信息，反之则发起自然人认证流程
      if (currentInfo.realNameStatus === 1 && currentInfo.processId) {
        const resStack = await ajaxStore.common.account.getProcessStack({
          processInstanceId: currentInfo.processId,
          taskId: ''
        })

        if (resStack.data && resStack.data.code === '0') {
          this.personTaskId = resStack.data.data.currentTask.taskId
        }
      } else {
        // 发起流程根据返回的信息赋值
        const res = await ajaxStore.common.account.startPersonAuth({
          processDefKey: 'SAAS_PERSON_IDENTITY_AUTH',
          appForm: {
            businessKey: currentInfo.idCardNo,
            applicant: currentInfo.idCardNo,
            personId: currentInfo.personId,
            name: currentInfo.name
          }
        })
        if (res.data && res.data.code === '0') {
          // 获取taskId
          this.personInfo.realNameStatus = 1
          this.personInfo.processId = res.data.data.processInstanceId
          const resStack = await ajaxStore.common.account.getProcessStack({
            processInstanceId: res.data.data.processInstanceId,
            taskId: ''
          })
          if (resStack.data && resStack.data.code === '0') {
            this.personTaskId = resStack.data.data.currentTask.taskId
          }
        }
      }
    },
    async sendMsgHandler() {
      let checkPhone = true
      await this.$refs.authPersonCheck.validateField('personPhone', (error) => {
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
        persionName: this.personAuthForm.name,
        idNum: this.personAuthForm.idCardNo,
        phoneNum: this.personAuthForm.personPhone,
        bankCardNo: this.personAuthForm.personBankCardNo,
        roleType: '3',
        // persionName: '吴洁峰',
        // idNum: '330681198809077816',
        // phoneNum: 13805789851,
        // bankCardNo: '6225571340245584',
        // roleType: '3',
      })
      this.sendLoading = false
      if (res.data && res.data.code === 0) {
        this.eFLowId = res.data.data.flowId
        this.sendInfo = {
          flowId: this.eFLowId,
          mobileNo: this.personAuthForm.personPhone,
          bankCardNo: this.personAuthForm.personBankCardNo
        }
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

    // 实名认证部分-企业
    checkCompanyFlow() {
      // 流程不存在，弹出代办人列表
      if (this.companyAuthDialog.step === 0) {
        this.signShow = true
      } else {
      // 流程存在，弹出企业实名认证
        this.companyAuthDialog.isShow = true
      }
    },
    // 选择代办人并发起企业流程
    choseSigner(currentSigner) {
      this.signShow = false
      // this.signerPersonType = currentSigner.personType
      // 根据发起流程根据返回id获取代办人信息,以及当前流程步骤
      const flowId = ''
      this.getCompanyFlow(flowId, currentSigner)
    },

    getPersonFlow(flowId) {
      if (flowId && flowId !== '') {
        this.personFlowInfo = {}
      } else {
        // 发起流程
        this.personFlowInfo = {}
      }
    },

    async getCompanyFlow(flowId, currentSigner) {
      // 根据flowId判断进入第几步
      if (flowId && flowId !== '') {
        await this.getCompanyFlowInfo(flowId)
      } else {
        // 发起流程
        this.companyFlowInfo = {}
        const res = await ajaxStore.common.account.startCorpAuth({
          processDefKey: 'SAAS_CUSTOMER_IDENTITY_AUTH',
          appForm: {
            businessKey: this.userInfo.corporationId,
            applicant: currentSigner.idCardNo,
            corporationId: this.userInfo.corporationId,
            realNameType: 1,
            companyName: this.companyAuth.corpName,
            socialCode: this.companyAuth.socialCode,
            legalPersonName: this.companyAuth.name,
            legalPersonIdNum: this.companyAuth.idCardNo,
            handlerPersonId: currentSigner.personId,
            handlerIdCard: currentSigner.idCardNo,
          }
        })
        if (res.data && res.data.code === '0') {
          this.companyAuthDialog.isShow = true
          // 刷新数据
          await this.getCompanyAuth()
        } else {
          // 刷新数据
          await this.getCompanyAuth()
        }
      }
    },

    async getCompanyAuth() {
      // const res = authInfo
      this.loading = false
      const res = await ajaxStore.common.account.getCustomerAuth({
        corporationId: this.userInfo.corporationId,
        type: 1 // 传0是全部，1是过滤后的办理人列表
      })
      if (res.data && res.data.code === '0') {
        this.companyAuth = res.data.data.corpIdentityVo
        this.donorList = res.data.data.personIdentityVo
        // this.donorList = res.data.data.personIdentityVo.filter(item => (item.relationType === 0 || item.authorizerType === 1))
        // 根据personId查询办理人
        this.getHandlerPerson(res.data.data.corpIdentityVo.processId)
        // // 根据companyAuth.processId来查询当前流程进度，如果是打款验证，按钮名称改为打款验证中

        this.companyAuthDialog.step = 0
        if (this.companyAuth.processId && this.companyAuth.realNameStatus === 1) {
          await this.getCompanyFlowInfo(this.companyAuth.processId)
        }
      }
    },
    async getHandlerPerson(processInstanceId) {
      if (processInstanceId) {
        const res = await ajaxStore.common.account.getHandlerPerson({
          processInstanceId: processInstanceId,
        })
        if (res.data && res.data.code === '0') {
          this.handlePerson = res.data.data.variables.handlerName
        }
      }
    },
    async getCompanyFlowInfo(processInstanceId) {
      const resStack = await ajaxStore.common.account.getProcessStack({
        processInstanceId: processInstanceId,
        taskId: ''
      })
      const res = await ajaxStore.common.account.getProcessInfo({
        processInstanceId: processInstanceId,
      })
      if (resStack.data && resStack.data.code === '0' && res.data && res.data.code === '0') {
        this.companyTaskId = resStack.data.data.currentTask.taskId
        this.companyFlowInfo = res.data.data
        switch (resStack.data.data.currentTask.taskDefKey) {
          case 'PERSON_FACTOR': // '自然人四要素验证':
            this.companyAuthDialog.step = 1
            this.companyStepOneAuthForm.name = res.data.data.appForm.handlerName || ''
            this.companyStepOneAuthForm.personIdCard = res.data.data.appForm.handlerIdCard || ''
            this.companyStepOneAuthForm.bankCard = res.data.data.appForm.handlerBankAccount || ''
            this.companyStepOneAuthForm.personPhone = res.data.data.appForm.handlerPhone || ''
            this.companyStepOneAuthForm.code = ''
            break
          case 'BANK_INFO': // '填写对公打款信息':
            this.companyAuthDialog.step = 2
            this.companyStepTwoAuthForm.name = res.data.data.appForm.companyName || ''
            await this.getBankFlowId()
            break
          case 'AMOUNT_CHECK': // '填写打款金额':
            this.companyAuthDialog.step = 3
            break
          default:
            this.companyAuthDialog.step = 0
        }
      }
    },
    async getBankFlowId() {
      const res = await ajaxStore.common.account.getMessageCheck({
        // idcardName: '林顾强',
        // companyName: '杭州仟金顶物流有限公司',
        // orgCode: '91330108MA2AX1HK4E'
        enterpriseName: this.companyAuth.corpName,
        persionName: this.companyAuth.name,
        orgCode: this.companyAuth.socialCode,
        roleType: '1',
      })
      if (res.data && res.data.data && res.data.code === 0) {
        this.thirdFlowId = res.data.data.flowId
      }
    },
    async stepOneSavePerson(form, eFLowId) {
      // 根据this.personType进行实名认证
      const res = await ajaxStore.common.account.processSubmit({
        memberId: this.companyAuth.corporationId,
        taskId: this.companyTaskId,
        isPass: 'Y',
        bankAccount: form.bankCard,
        phoneNum: form.personPhone,
        eFLowId: eFLowId,
        verifyCode: form.code,
        // eFLowId: '1187840016072575030',
        // verifyCode: '377657'
      })
      if (res.data && res.data.code === '0') {
        // 实名认证失败
        if (res.data.data.resultCode === '1') {
          this.companyAuthDialog.isShow = false
          this.resultShow = true
          this.resultType = '1'
          this.isResultSuccess = res.data.data.resultCode === '0'
          this.resultReson = res.data.data.resultMessage
        }
        // 刷新数据
        this.getCompanyAuth()
      }
    },
    async clickSaveCompany(bankForm, currentBank) {
      const res = await ajaxStore.common.account.processSubmit({
        memberId: this.companyAuth.corporationId,
        taskId: this.companyTaskId,
        isPass: 'Y',
        bankName: currentBank.bank,
        subBankName: currentBank.bankName,
        bankProvince: currentBank.province,
        bankCity: currentBank.city,
        cnapsCode: currentBank.cnapsCode,
        bankAccount: bankForm.bankCommonCard
      })
      if (res.data && res.data.code === '0') {
        // this.getCompanyFlowInfo(this.companyFlowInfo.processId)
        // 刷新数据
        this.getCompanyAuth()
      }
    },
    // 打款认证提交
    async clickSubmitAmount(amount) {
      const res = await ajaxStore.common.account.processSubmit({
        memberId: this.companyAuth.corporationId,
        taskId: this.companyTaskId,
        isPass: 'Y',
        amount: amount,
      })
      if (res.data && res.data.code === '0') {
        this.companyAuthDialog.step = 0
        this.companyAuthDialog.isShow = false
        this.resultShow = true
        this.resultType = '1'
        this.isResultSuccess = res.data.data.resultCode === '0'
        this.resultReson = res.data.data.resultMessage
        // 刷新数据
        this.getCompanyAuth()
      }
    },
    // 查询打款进度
    async searchProgress() {
      // 根据 this.companyAuth.processId 查询
      this.paymentLoading = true
      const res = await ajaxStore.common.account.getPaymentStatus({
        // processId: this.companyAuth.processId,
        corporationId: this.userInfo.corporationId,
      })
      this.paymentLoading = false
      if (res.data && res.data.code === '0') {
        const paymentObj = {
          INIT: '完成企业信息对比，但未发起打款',
          PAID: '打款申请完成',
          PAID_FAILED: '打款失败',
          PAID_SUCCESS: '打款成功',
          ORGANFINISHED: '打款回填成功，企业认证完成',
        }
        this.paymentStatus = paymentObj[res.data.data.data.process]
        this.paymentMessage = res.data.data.data.message
        this.paymentShow = true
      }
    },
    // 打款第三步取消，重新发起流程
    async clickSubmitReStart() {
      // 根据 this.companyAuth.processId 结束流程
      this.reStartLoading = true
      const res = await ajaxStore.common.account.processDelete({
        processId: this.companyAuth.processId,
        memberName: this.companyAuth.corpName,
        deleteReason: '用户取消流程'
      })
      this.reStartLoading = false
      if (res.data && res.data.code === '0') {
        this.$message.success('重新发起成功')
        this.companyAuthDialog.isShow = false
        // 刷新一下数据
        this.getCompanyAuth()
      }
    },
    // 再次认证
    restart() {
      this.resultShow = false
      switch (this.resultType) {
        case 1:
          this.checkCompanyFlow()
          break
        case 'donor':
          this.openPersonDialog(this.personInfo, 'donor')
          break
        default:
          this.checkCompanyFlow()
          break
      }
    },

  },
  computed: {
    ...mapState(['refreshNum', 'userInfo']),
  },
  mounted() {
    if (this.userInfo) {
      this.getCompanyAuth()
    }
  },
  watch: {
    userInfo (val) {
      if (val && val.corporationId) {
        this.getCompanyAuth()
      }
    }
  },
  components: {
    HandleDialog,
    CompanyAuthDialog,
    AuthResultDialog,
    Card,
  }
}
</script>

<style lang="stylus" scoped>
.auth-base-info
  display flex
  .compony-info
    margin-right 10px
  .list-item
    color #494949
    display flex
    margin-top 20px
    .item-label
      width 110px
      text-align right
    .item-value
      flex 1 0 auto
.agent-info,.auth-list
  margin-top 10px
.auth-list
  .auth-table
    >>>.is-group
      tr th
        background-color #728bc2
        border-right 0px
      tr:nth-child(2) th
        background-color #fff
        color #494949
        padding 8px 0
    >>>.el-table__body
      tr.el-table__row:nth-child(2n-1) td
        background-color #E8ECF7
      tr.el-table__row:nth-child(2n) td
        background-color #FFF
.dialog-main-auth
  margin auto
  width 360px
.dialog-main
  margin-bottom 10px
  .dialog-item
    display flex
    flex-flow row nowarp
    margin-bottom 10px
    color #43406C
    .dialog-head
      margin-top 20px
    .dialog-label
      text-align left
    .dialog-value
      padding-left 10px
      text-align left
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
.dialog-btns-main
  text-align center
  font-size 12px
.iconinfo
  color #f6b041
  top -41px
  position absolute
  left 60px
.tooltip
  line-height 20px
.tips-main
  margin 0
  margin-top -20px
  margin-bottom 30px
  font-size 14px
  color #43406C
  line-height 30px
.p-btns-main
  text-align center
.align-right
  text-align right
.payment
  margin-bottom 30px
  display flex
  justify-content center
  align-items flex-start
.payment-label
  flex 0 0 70px
</style>
