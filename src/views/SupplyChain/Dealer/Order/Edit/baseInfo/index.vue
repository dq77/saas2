<template lang="pug">
.p-base-info
  .u-init-mode(v-if='mode === "init"')
    el-button(@click='clickShowDialog') 添加基础信息
  .u-detail-mode(v-else-if='formResult')
    .u-detail-col
      .u-row
        span.u-label 项目：
        span.u-value {{ formResult.projectId.projectName }}
      .u-row
        span.u-label 收货人：
        span.u-value {{ formResult.receiptPerson ? (formResult.receiptPerson.receiptPerson || formResult.receiptPerson) : '--' }}
      .u-row
        span.u-label 收货人电话：
        span.u-value {{ formResult.receiptPhone }}
      .u-row
        span.u-label 收货地址：
        span.u-value {{ formResult.addressName + ',' + formResult.address }}
      .u-row
        span.u-label 开票信息：
        span.u-value {{ formResult.invoiceCompany }}
    .u-detail-col
      .u-row
        span.u-label 下单方式：
        span.u-value {{ enums.placeOrderType[sourceType] }}
      .u-row(v-if='formResult.purchaseType')
        span.u-label 采购方式：
        span.u-value {{ enums.purchaseTypeMode[formResult.purchaseType] }}
      .u-row
        span.u-label 付款条件：
        span.u-value {{ formResult.paymentMethod.dictName }}
      //- 付款条件为赊销支付时
      template(v-if='formResult.paymentMethod.dictCode === "creditPay" && formResult.paymentMethod.payCategory === "1"')
        .u-row(v-if='formResult.businessTypeConfigEnabled')
          span.u-label 业务类型：
          span.u-value {{ formResult.businessTypeCode.label }}
        .u-row(v-if='formResult.customerLevelConfigEnabled')
          span.u-label 产品策略：
          span.u-value {{ formResult.ruleConfig.label }}
        .u-row(v-if='formResult.approvalMaterialsEnabled')
          span.u-label 赊销相关文件：
          span.u-value
            template(v-for='fileBox in formResult.creditFileList')
              div(v-if='fileBox.fileList && fileBox.fileList.length>0')
                div {{ fileBox.label }}：
                div(v-for='file in fileBox.fileList')
                  a(:href='`${creditFileUrl}${file.key}`') {{ file.name}}
      .u-row
        span.u-label 汇款单：
        span.u-value
          template(v-if='formResult.moneyOrderList && formResult.moneyOrderList.fileList && formResult.moneyOrderList.fileList.length')
            div(v-for='file in formResult.moneyOrderList.fileList')
              a(:href='`${creditFileUrl}${file.key}`') {{ file.name}}
          template(v-else) --
      .u-row
        span.u-label 运费支付方式：
        span.u-value {{ formResult.freightPayId.dictName }}
          div(v-if='formResult.freightPayId.dictCode === "manufacturerConditionalPay"') {{ formResult.freightPayDescription }}
    .u-detail-col
      .u-row
        span.u-label 期望发货日期：
        span.u-value {{ formResult.receiveTime }}
      .u-row
        span.u-label 期望提货日期：
        span.u-value {{ formResult.sendTime }}
      .u-row
        span.u-label 备注：
        span.u-value {{ formResult.description || '--' }}
    el-button.u-btn-modify(v-if='mode === "edit"' @click='clickShowDialog') 修改基础信息
  DialogEditBaseInfo(
    ref='dialogRef'
    :visible='dialogVisible'
    :mode='mode'
    @close='dialogVisible=false'
    @sure='sureBaseInfoDialog'
  )
</template>

<script>
import { ref } from '@vue/composition-api'
import { placeOrderType, purchaseTypeMode } from '@/utils/enumsSaas'
import { toPrefixUrl } from '@/utils/util'
import DialogEditBaseInfo from './dialog'

export default {
  props: {
    sourceType: { // 下单方式固定为代客下单
      type: String,
      default: '0'
    }
  },
  components: {
    DialogEditBaseInfo
  },
  setup(props, { emit }) {
    const dialogRef = ref()
    // 赊销相关文件下载地址
    const creditFileUrl = toPrefixUrl('/proof/file/rawFile?fileKey=')
    /**
     * mode：交互模式
     *   init 初始模式，无数据，有新建按钮
     *   edit：编辑模式，有数据，有修改按钮
     *   detail：详情模式，有数据，无修改按钮
     */
    const mode = ref('init')
    // 是否显示编辑基本信息弹框
    const dialogVisible = ref(false)
    // 表单数据
    const formResult = ref(null)

    // 点击创建、编辑
    const clickShowDialog = () => {
      dialogVisible.value = true
    }

    // 确认基础信息
    const sureBaseInfoDialog = (res, needRestProduct) => {
      // 防止编辑的时候影响详情的展示
      formResult.value = JSON.parse(JSON.stringify(res))
      dialogVisible.value = false
      mode.value = 'edit'
      emit('complete', formResult.value, needRestProduct)
    }

    // 用于父组件重置静态数据，适用于草稿数据
    const initCacheBaseInfo = (newData) => {
      if (Object.keys(newData).length > 0) {
        formResult.value = newData
        mode.value = 'edit'
        dialogRef.value.initCacheBaseInfo(formResult.value)
        emit('complete', formResult.value)
      }
    }

    return {
      dialogRef,
      dialogVisible,
      creditFileUrl,
      mode,
      formResult,
      enums: {
        placeOrderType,
        purchaseTypeMode,
      },
      clickShowDialog,
      sureBaseInfoDialog,
      initCacheBaseInfo,
    }
  },
}
</script>

<style lang="stylus" scoped>
.p-base-info
  margin-top: 20px
  .u-init-mode
    height: 218px
    line-height: 218px
    background: #f4f9fd
    text-align: center
  .u-detail-mode
    position: relative
    display: flex
    padding 20px 150px 20px 20px
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
</style>
