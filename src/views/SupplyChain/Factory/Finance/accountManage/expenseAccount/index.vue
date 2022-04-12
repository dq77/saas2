<template lang="pug">
.page-main
  Card(noTitle)
    el-form(
      label-width='170px'
      ref='formRef'
      :model='formData'
      :rules='formRules'
    )
      el-row(:gutter='20')
        el-col(:span='20')
          el-form-item(label='出账客户名称：')
            span {{ customerName }}
      el-row(:gutter='20')
        el-col(:span='20')
          el-form-item(label='结算方式：' prop='settlementType' :required='true')
            el-radio-group(v-model='formData.settlementType' :disabled='isDetailPage')
              el-radio(
                v-for='option in settlementTypesOptions'
                :key='option.key'
                :label='option.key'
              ) {{ option.value }}
      el-row(:gutter='20')
        el-col(:span='20')
          el-form-item(label='出账账户与金额（元）：' prop='outBillDetails' :required='true')
            template(v-for='(row, index) in formData.outBillDetails')
              el-row.p-account-list-row(
                style='overflow: hidden;'
                :gutter='20'
              )
                el-col(:span='10')
                  el-select.width-100(
                    placeholder='请选择出账账户'
                    :disabled='isDetailPage'
                    v-model='row.accountTypeCode'
                    @change='accountTableState.changeAccount'
                  )
                    el-option(
                      v-for='option in accountTableState.accountOptions'
                      :key='option.accountTypeCode'
                      :label='option.accountTypeNameText'
                      :value='option.accountTypeCode'
                      :disabled='option.disabled'
                    )
                  div(
                    v-if='row.accountTypeCode'
                  ) 账户可用余额（元）：{{ accountTableState.accountMap[row.accountTypeCode].amountAvailable }}
                el-col(:span='10')
                  el-input-number.width-100.text-left(
                    controls-position='right'
                    placeholder='请输入出账金额（元）'
                    :min='0'
                    :precision='2'
                    :step='1'
                    :disabled='isDetailPage'
                    v-model='row.amount'
                    @change='accountTableState.changeAmount'
                  )
                el-col(:span='4' v-if='!isDetailPage')
                  el-button(
                    icon='el-icon-delete'
                    v-if='formData.outBillDetails.length>1'
                    @click='accountTableState.clickRemoveAccount(row, index)'
                  ) 移除
      el-row(
        :gutter='20'
        v-show='accountTableState.hasMoreAccount'
        v-if='!isDetailPage'
      )
        el-col(:span='20')
          el-form-item
            el-button(
              icon='el-icon-circle-plus-outline'
              @click='accountTableState.clickAddAccount'
            ) 添加其他账户
      el-row(:gutter='20')
        el-col(:span='20')
          el-form-item(label='出账总金额（元）：')
            span {{ toAmountStr(formData.amount, 2, true) }}
      template(v-if='formData.settlementType === "1"')
        el-row(:gutter='20')
          el-col(:span='10')
            el-form-item(label='打款银行：' prop='outBank')
              el-input.width-100(v-model='formData.outBank' :disabled='isDetailPage')
          el-col(:span='10')
            el-form-item(label='打款账号：' prop='outAccount')
              el-input.width-100(v-model='formData.outAccount' :disabled='isDetailPage')
        el-row(:gutter='20')
          el-col(:span='10')
            el-form-item(label='客户收款银行：' prop='inBank')
              el-input.width-100(v-model='formData.inBank' :disabled='isDetailPage')
          el-col(:span='10')
            el-form-item(label='客户收款账号：' prop='inAccount')
              el-input.width-100(v-model='formData.inAccount' :disabled='isDetailPage')
        el-row(:gutter='20')
          el-col(:span='10')
            el-form-item(label='银行流水号：' prop='bankSerialNumber')
              el-input.width-100(v-model='formData.bankSerialNumber' :disabled='isDetailPage')
          el-col(:span='10')
            el-form-item(label='实际出账时间：' prop='inOutTime' :required='true')
              el-date-picker.width-100(
                type='datetime'
                format='yyyy-MM-dd HH:mm'
                :clearable='false'
                :disabled='isDetailPage'
                v-model='formData.inOutTime'
              )
      template(v-if='formData.settlementType === "2"')
        el-row(:gutter='20')
          el-col(:span='10')
            el-form-item(label='实际出账时间：' prop='inOutTime')
              el-date-picker.width-100(
                type='datetime'
                format='yyyy-MM-dd HH:mm'
                :clearable='false'
                :disabled='isDetailPage'
                v-model='formData.inOutTime'
              )
      el-row(:gutter='20')
        el-col(:span='10')
          el-form-item(label='出账凭证：' prop='fileAddRequestList')
            Upload(
              v-if='!isDetailPage'
              ref='uploadRef'
              :action='uploadUrl'
              :max='10'
              @onSuccess='uploadState.successHandle'
              @onPreview='uploadState.previewHandle'
            )
              template(slot='trigger')
                el-button 上传出账凭证
            template(v-else)
              ul.el-upload-list.el-upload-list--text(v-if='formData.fileAddRequestList.length > 0')
                li.el-upload-list__item.is-success(v-for='file in formData.fileAddRequestList')
                  a.el-upload-list__item-name(@click='uploadState.previewHandle(file)')
                    i.el-icon-document
                    | {{ file.name }}
              span(v-else) --
      el-row(:gutter='20')
        el-col(:span='20')
          el-form-item(label='备注：' prop='remark')
            el-input.width-100(
              type='textarea'
              maxlength='500'
              :row='2'
              :show-word-limit='true'
              :disabled='isDetailPage'
              v-model='formData.remark'
            )
    .p-virtual
    .p-btns(v-if='!isDetailPage')
      el-button(
        type='primary'
        :loading='submitState.submitLoading'
        @click='submitState.clickSubmit'
      ) 保存
</template>

<script>
import { defineComponent, reactive, toRefs, ref } from '@vue/composition-api'
import Card from '@/components/Card'
import Upload from '@/components/qjd/upload/index'
import { toPrefixUrl, toAmountStr } from '@/utils/util'
import { settlementTypesOptions, getFormData, formRules } from './config'
import useAccountTable from './useAccountTable'
import useSubmit from './useSubmit'
import useUpload from './useUpload'
import useDetail from './useDetail'

export default defineComponent({
  components: {
    Card,
    Upload,
  },
  setup(props, { root }) {
    // billNo用于详情查询
    const { customerId, customerName, billNo } = root.$route?.query
    const isDetailPage = root.$route.name === 'supplyChain_factory_finance_expenseAccountDetail'
    const uploadUrl = toPrefixUrl('/fs/file/doUploadWithFile')
    const uploadRef = ref()
    const formRef = ref()

    const uploadState = useUpload({
      uploadRef
    })

    const state = reactive({
      customerName,
      formData: getFormData({ inOutTime: new Date() }),
      accountTableState: null,
      uploadState,
      submitState: null,
    })

    const accountTableState = useAccountTable({
      formData: state.formData,
      customerId
    })

    const submitState = useSubmit({
      customerId,
      uploadRef,
      formRef,
      formData: state.formData,
      accountTableState
    })

    state.accountTableState = accountTableState
    state.submitState = submitState

    formRules.outBillDetails[0].validator = (rule, value, callback) => {
      for (let i = 0; i < value.length; i++) {
        const item = value[i]
        if (!item.accountTypeCode || !(item.amount >= 0)) {
          callback(new Error(rule.message))
          return
        }
      }
      callback()
    }

    if (isDetailPage) {
      useDetail({
        billNo,
        formData: state.formData,
      })
    }
    return {
      isDetailPage,
      uploadRef,
      formRef,
      settlementTypesOptions,
      uploadUrl,
      formRules,
      ...toRefs(state),
      toAmountStr,
    }
  },
})
</script>

<style lang="stylus" scoped>
.p-virtual
  height: 60px
.p-btns
  position fixed
  bottom 0
  margin-left -20px
  width: calc(100% - 265px)
  min-width 940px
  height 60px
  line-height: 60px
  text-align: center
  background: #FFFFFF;
  box-shadow: 0px -2px 6px 0px rgba(51, 75, 133, 0.2);
  border: 1px solid #ECEDF1;
.p-account-list-row
  margin-top 18px
  &:first-child
    margin-top 0
// 以下样式只是覆盖复刻的文件列表样式，不覆盖全局
.el-upload-list__item:first-child
  margin-top 3px
</style>
