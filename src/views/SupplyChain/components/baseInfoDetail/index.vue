<template lang="pug">
.p-base-info
  .u-detail-mode(v-if='formData && formData.id')
    .u-detail-col
      .u-row(v-if='showSupplier')
        span.u-label 客户：
        span.u-value {{ formData.customerName }}
      .u-row(v-if='formData.purchaseType === "1"')
        span.u-label 项目：
        span.u-value {{ formData.projectName }}
      .u-row
        span.u-label 收货人：
        span.u-value {{ formData.receiptPerson }}
      .u-row
        span.u-label 收货人电话：
        span.u-value {{ formData.receiptPhone}}
      .u-row
        span.u-label 收货地址：
        span.u-value {{ formData.province + formData.city + formData.area + formData.address }}
      .u-row
        span.u-label 开票信息：
        span.u-value {{ formData.orderInvoiceVO && formData.orderInvoiceVO.invoiceCompany }}
    .u-detail-col
      .u-row
        span.u-label 下单方式：
        span.u-value {{ enums.placeOrderType[sourceType] }}
      .u-row(v-if='formData.purchaseType')
        span.u-label 采购方式：
        span.u-value {{ enums.purchaseTypeMode[formData.purchaseType] }}
      .u-row
        span.u-label 付款条件：
        span.u-value {{ formData.orderOptionsVOS[0].valueTitle }}
      //- 付款条件为赊销支付时
      template(v-if='formData.orderOptionsVOS[0].value === "creditPay" && formData.orderOptionsVOS[0].payCategory === "1"')
        .u-row(v-if='formData.ruleConfigInfoForOrder.businessTypeConfigEnabled')
          span.u-label 业务类型：
          span.u-value {{ formData.businessTypeName }}
        .u-row(v-if='formData.ruleConfigInfoForOrder.customerLevelConfigEnabled')
          span.u-label 产品策略：
          span.u-value {{ formData.ruleConfigName }}
        .u-row(v-if='formData.approvalMaterialsEnabled')
          span.u-label 赊销相关文件：
          span.u-value
            template(v-for='fileBox in formData.fileArrayList')
              div(v-if='fileBox.fileList && fileBox.fileList.length>0')
                div {{ fileBox.label }}：
                div(v-for='file in fileBox.fileList')
                  a(:href='`${creditFileUrl}${file.fileId}`') {{ file.fileName }}
      .u-row
        span.u-label 汇款单：
        span.u-value
          template(v-if='formData.moneyOrderList && formData.moneyOrderList.fileId')
            a(:href='`${creditFileUrl}${formData.moneyOrderList.fileId}`') {{ formData.moneyOrderList.fileName}}
          template(v-else) --
      .u-row
        span.u-label 运费支付方式：
        span.u-value {{ formData.orderFreightPayVO.name }}
          div(v-if='formData.orderFreightPayVO.dictCode === "manufacturerConditionalPay"') {{ formData.orderFreightPayVO.description }}
    .u-detail-col
      .u-row
        span.u-label 期望发货日期：
        span.u-value {{ formData.receiveTime }}
      .u-row
        span.u-label 期望提货日期：
        span.u-value {{ formData.sendTime }}
      .u-row
        span.u-label 备注：
        span.u-value {{ formData.description || '--' }}
  .p-order-addition(v-if='formData')
    span.u-item 订单完成时间：{{formData.endTime || '--'}}
    span.u-item(v-if='formData.orderBlankFileKey') 订货单：
      el-button.p-sign-btn(
        v-if='showSignBtn'
        type='primary'
        @click='clickSign'
      ) 签署订货单
      a(:href='`${orderFileUrl}${formData.orderBlankFileKey}`') 预览订货单（{{formData.isSign === '1' ? '已签署' : '未签署' }}）
    span.u-item 创建日期：{{formData.createdTime || '--'}}
    span.u-item 创建人：{{formData.createdByName || '--'}}
</template>

<script>
import { computed, onMounted, ref } from '@vue/composition-api'
import { MessageBox } from 'element-ui'
import store from '@/store'
import { placeOrderType, purchaseTypeMode } from '@/utils/enumsSaas'
import { toPrefixUrl } from '@/utils/util'

export default {
  props: {
    mode: {
      type: String,
      default: 'factory' // 可选factory\dealer
    },
    formData: {
      type: Object
    },
    sourceType: { // 下单方式默认为代客下单
      type: String,
      default: '0'
    },
  },
  setup(props, { emit }) {
    // 订货单下载地址
    const orderFileUrl = toPrefixUrl('/saas-ofc/org/order/downLoad?fileKey=')
    // 赊销相关文件下载地址
    const creditFileUrl = toPrefixUrl('/proof/file/rawFile?fileKey=')

    // 是否显示客户名称
    const showSupplier = computed(() => props.mode === 'factory')
    const signerOfPerson = ref()
    // 是否显示签收订货单按钮
    const showSignBtn = computed(() => {
      return (props.mode === 'dealer' &&
        props.formData.isSign !== '1' &&
        [0, 1, 2].indexOf(props.formData.status) >= 0 &&
        props.formData.orderBlankFileKey
      )
    })
    const clickSign = () => {
      function valid() {
        const customerType = store.state?.curFactory?.customerType
        if (customerType === 1) {
          return signerOfPerson.value?.realNameStatus === 2
        } else {
          return true
        }
      }
      if (valid()) {
        emit('clickSign')
      } else {
        MessageBox.confirm(
          '您未完成时实名认证，请前往订货大师App完成实名认证',
          '提示',
          {
            type: 'warning',
            showCancelButton: false,
          }
        )
      }
    }
    onMounted(async () => {
      if (store.state?.curFactory?.customerType === 1) { // 个人用户时
        signerOfPerson.value = await store.dispatch('user/getSignerOfPerson')
      }
    })
    return {
      showSupplier,
      showSignBtn,
      orderFileUrl,
      creditFileUrl,
      enums: {
        placeOrderType,
        purchaseTypeMode,
      },
      clickSign,
    }
  },
}
</script>

<style lang="stylus" scoped>
.p-base-info
  margin-top: 20px
  .u-detail-mode
    position: relative
    display: flex
    padding 20px
    background: #f4f9fd
    .u-detail-col
      flex: 1
      padding-left 20px
      padding-right 20px
      border-left 2px dotted #cdd0d4
      &:first-child
        padding-left 0
        border-left 0
    .u-row
      display: flex
      margin 10px 0
    .u-label
      color #738a9e
      white-space: nowrap
    .u-btn-modify
      position: absolute
      top: 73px
      right: 20px
.p-order-addition
  padding 10px 20px
  line-height 36px
  .u-item
    margin-right 20px
.p-sign-btn
  margin-right 10px
</style>
