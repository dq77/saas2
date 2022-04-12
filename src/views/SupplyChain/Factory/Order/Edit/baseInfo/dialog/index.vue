<template lang="pug">
el-dialog(
  custom-class='el-dialog-new'
  width='600px'
  :visible='visible'
  @close='clickCancel'
)
  template(slot='title')
    div(v-if='mode === "init"')
      span.p-dialog-title 基础信息
    div(v-else)
      span.p-dialog-title 编辑信息
      span.p-dialog-title-info
        i.el-icon-info
        span 如修改采购模式/客户/项目，已添加的产品将被清空
  Form(
    ref='formRef'
    :inline="false"
    :labelPosition="'right'"
    :labelWidth="'100px'"
    :formConfig='formState.formConfig'
    :formData='formState.formData'
    :formRules='formState.formRules'
    @selectChange='selectChange'
    @radioChange='radioChange'
    @selectFocus='selectFocus'
  )
    //- 收货人
    template(v-slot:receiptPerson="{config}")
      el-select(
        style='width: 100%;'
        value-key='id'
        :filterable='true'
        :allow-create='true'
        :disabled="config.disabled ? config.disabled : false"
        :placeholder="config.placeholder ? config.placeholder: `请选择${config.label}`"
        v-model="formState.formData.receiptPerson"
        @change="value => selectChange({value, key: config.key, item: config})"
      )
        el-option(
          v-for="(child, index) in config.options"
          :key="index"
          :label="config.otherKeys ? child[config.otherKeys.label] : child.label"
          :value="config.otherKeys ? child[config.otherKeys.value] : child.value"
        ) {{ `${child[config.otherKeys.value].receiptPerson} ${child[config.otherKeys.value].receiptPhone}` }}
    //- 可用赊销额度
    template(v-slot:creditAmount="{config}")
      span.p-green(v-if='formState.formData.creditAmount > 0') ￥{{ toAmountStr(formState.formData.creditAmount, 2, true) }}
      span.p-red(v-else) ￥0.00
    //- 赊销相关文件
    template(v-slot:creditFileList="{config}")
      div
        .p-file-box(v-for='fileConfig in formState.formData.creditFileList')
          .u-label {{ fileConfig.label }}
          .u-upload
            Upload(
              accept=".zip,.doc,.docx,.pdf,.jpg"
              :action="uploadState.uploadUrl"
              :max="50"
              :defaultFileList="fileConfig.fileList"
              @onSuccess='(fileRes) => uploadState.uploadChange(fileRes, fileConfig)'
              @onRemove='(fileRes) => uploadState.uploadChange(fileRes, fileConfig)'
              @onPreview='(file) => uploadState.previewFile(file.key)'
            )
              el-button(plain type='primary') 选择文件
            .u-tips
              span.u-must-icon {{ fileConfig.mustPass === '1' ? '必传' : '' }}
              span 支持格式：.zip/.doc/.docx/.pdf/.jpg
    //- 汇款单
    template(v-slot:moneyOrderList="{config}")
      .p-file-box
        .u-upload
          Upload(
            accept=".zip,.doc,.docx,.pdf,.jpg"
            :action="uploadState.uploadUrl"
            :max="50"
            :defaultFileList="formState.formData.moneyOrderList.fileList"
            @onSuccess='(fileRes) => uploadState.uploadChange(fileRes, formState.formData.moneyOrderList)'
            @onRemove='(fileRes) => uploadState.uploadChange(fileRes, formState.formData.moneyOrderList)'
            @onPreview='(file) => uploadState.previewFile(file.key)'
          )
            el-button(plain type='primary') 选择文件
          .u-tips 支持格式：.zip/.doc/.docx/.pdf/.jpg
  div(slot='footer')
    el-button(@click='clickCancel' plain) 取消
    el-button(@click='clickSure' type='primary') 确定
</template>

<script>
import { reactive, ref, toRefs, onMounted } from '@vue/composition-api'
import store from '@/store'
import Form from '@/components/qjd/form'
import Upload from '@/components/qjd/upload'
import useForm from 'hooks/useForm'
import { getRegionLabelArr } from '@/utils/regionHandle'
import { toAmountStr } from '@/utils/util'
import { vPaymentMethod, vFreightPayDescription, vCreditFileList } from '../../util'
import { formConfig, formData, getFormRules } from './config'
import useFormMode from './useFormMode'
import useUpload from './useUpload'
import useOptions from './useOptions'
import useCredit from './useCredit'

export default {
  components: {
    Form,
    Upload
  },
  props: {
    visible: {
      type: Boolean,
      default: false
    },
    mode: { // 弹框只会有两种mode：init,edit
      type: String,
      default: 'init'
    },
  },
  setup(props, { emit }) {
    // form ref
    const formRef = ref()
    // 是否重置产品表格数据，修改经销商、项目需要重置
    let needRestProduct = false
    // formState
    const formState = useForm({
      formRef,
      formConfig,
      formData,
      formRules: getFormRules({
        // 付款方式
        vPaymentMethod: (rule, value, callback) => vPaymentMethod(rule, value, callback, formState),
        // 运费支付方式的附加信息的校验
        vFreightPayDescription: (rule, value, callback) => vFreightPayDescription(rule, value, callback, formState),
        // 赊销相关文件的校验
        vCreditFileList: (rule, value, callback) => vCreditFileList(rule, value, callback, formState),
      })
    })

    // 文件上传
    const uploadState = useUpload()

    // 表单select options
    const {
      getCustomerOptions,
      getProjectIdOptions,
      getReceiptPersonOptions,
      getPaymentMethodOptions,
      getInvoiceOptions,
      getAddressCodeOptions,
      getFreightPayId,
    } = useOptions({ formState })

    // 赊销支付时，对表单的修改及外部可用的能力
    const {
      initCreditRules,
      changeCredit,
      getCreditAmount,
    } = useCredit({ formState })

    // 表单状态state
    const formModeState = useFormMode({
      formState,
      initCreditRules,
    })

    // state
    const state = reactive({
      // 1.工程业务 2.零售业务 3.工程业务和零售业务
      orderSalesType: store?.state?.userInfo?.tenants?.[0].orderSalesType,
      formState,
      uploadState,
    })

    // mounted时初始化采购模式表单项及其他表单项的显示隐藏
    const initPurchaseType = () => {
      if (state.orderSalesType === 1 || state.orderSalesType === 2) { // 工程-1  零售-2
        formState.setConfig('purchaseType', 'isHidden', true)
      } else { // 工程与零售-3
        formState.setConfig('purchaseType', 'isHidden', false)
      }
      if (state.orderSalesType === 3) {
        formState.setFormItem('purchaseType', '1')
      }
      changePurchaseType(state.orderSalesType)
    }
    // 经销商 remoteMethod
    formState.setConfig('customerId', 'remoteMethod', getCustomerOptions)

    // 开票信息 invoiceCompany
    formState.setConfig('invoiceCompany', 'remoteMethod', getInvoiceOptions)

    // 监听下拉框focus事件
    const selectFocus = async({key}) => {
      if (key === 'customerId') {
        if (!formState.formData.customerId) {
          await getCustomerOptions()
        }
      } else if (key === 'invoiceCompany') {
        if (!formState.formData.invoiceCompany) {
          await getInvoiceOptions()
        }
      }
    }
    // 监听下拉框变更事件
    const selectChange = async ({value, key}) => {
      if (key === 'customerId' && value) { // 变更经销商
        // 初始化项目options
        await getProjectIdOptions(value.customerId)
        // 解除disable
        formState.setConfig('projectId', 'disabled', false)
        formState.setConfig('paymentMethod', 'disabled', false)
        formState.setConfig('invoiceCompany', 'disabled', false)
        formState.setFormItem('projectId', null)
        formState.setFormItem('paymentMethod', null)
        needRestProduct = true
      } else if (key === 'projectId' && value) { // 项目
        const { provinceCode, province, cityCode, city, regionCode, region, detailAddress } = value
        if (provinceCode && province && cityCode && city && regionCode && region && detailAddress) {
          const addressCode = [provinceCode, cityCode, regionCode]
          const addressName = [province, city, region]
          formState.setFormItem('addressCode', addressCode)
          formState.setFormItem('addressName', addressName)
          formState.setFormItem('address', detailAddress)
        }
        formState.setFormItem('paymentMethod', null)
        needRestProduct = true
      } else if (key === 'paymentMethod' && value) { // 变更付款条件
        if (value.dictCode === 'qjdAllPay') { // 仟金顶支付
          formState.setFormItem('invoiceCompany', '仟金顶网络科技有限公司')
          formState.setConfig('invoiceCompany', 'disabled', true)
        } else {
          formState.setConfig('invoiceCompany', 'disabled', false)
        }
        if (value.dictCode === 'creditPay' && value.payCategory === '1') { // 赊销支付且payCategory="1"
          await changeCredit(true)
        } else {
          await changeCredit(false)
        }
      } else if (key === 'receiptPerson' && value) { // 变更收货人
        formState.setFormItem('receiptPhone', value.receiptPhone)
      } else if (key === 'addressCode' && value) { // 收货地址
        formState.setFormItem('addressName', getRegionLabelArr(...value, formState.getConfig('addressCode').options))
      } else if (key === 'freightPayId' && value) { // 运费支付方式
        if (value.dictCode === 'manufacturerConditionalPay') { // 为厂家有条件承担时，显示输入框
          formState.setConfig('freightPayDescription', 'isHidden', false)
        } else {
          formState.setConfig('freightPayDescription', 'isHidden', true)
        }
      }
    }

    // 变更采购模式时影响其他表单项
    const changePurchaseType = (v) => {
      if (v === '1') {
        formState.setConfig('projectId', 'isHidden', false)
        formState.setConfig('addressCode', 'disabled', true)
        formState.setConfig('address', 'disabled', true)
      } else if (v === '2') {
        formState.setConfig('projectId', 'isHidden', true)
        formState.setConfig('addressCode', 'disabled', false)
        formState.setConfig('address', 'disabled', false)
      }
    }

    // 变更采购模式
    const radioChange = ({ value, key }) => {
      if (key === 'purchaseType' && value) {
        changePurchaseType(value)
        needRestProduct = true
      }
    }

    const clickCancel = () => {
      emit('close')
    }
    const clickSure = () => {
      formState.submitHandle().then(v => {
        if (v) {
          emit('sure', formState.formData, needRestProduct)
          needRestProduct = false
        }
      })
    }

    // 父组件调用，根据缓存重置数据
    const initCacheBaseInfo = async (newFormData) => {
      // 表单有数据则执行inCache
      if (newFormData?.customerId?.customerId) {
        formModeState.inCache(newFormData)
      }
      if (newFormData.paymentMethod.dictCode === 'creditPay' && newFormData.paymentMethod.payCategory === '1') {
        getCreditAmount()
      }
    }
    // 父组件调用，根据查询接口重置数据
    const initEditData = async (newFormData) => {
      formModeState.inEdit(newFormData)
      if (newFormData.paymentMethod.dictCode === 'creditPay' && newFormData.paymentMethod.payCategory === '1') {
        getCreditAmount()
      }
    }

    onMounted(() => {
      initPurchaseType()
      getPaymentMethodOptions()
      getReceiptPersonOptions()
      getAddressCodeOptions()
      getFreightPayId()
    })
    return {
      formRef,
      ...toRefs(state),
      toAmountStr,
      selectFocus,
      selectChange,
      radioChange,
      clickCancel,
      clickSure,
      initCacheBaseInfo,
      initEditData,
    }
  },
}
</script>

<style lang="stylus" scoped>
.p-dialog-title
  font-size 14px
  color #494949
.p-dialog-title-info
  margin-left 10px
  color #fe8b32
.p-file-box
  display flex
  margin-bottom 10px
  .u-label
    width 60px
    overflow hidden
    white-space nowrap
    text-overflow ellipsis
  .u-upload
    position relative
    flex 1
    .u-tips
      position absolute
      left 100px
      top 0
  .u-must-icon
    margin-right 5px
    color red
.p-green
  color #67C23A
.p-red
  color #f56c6c
</style>
