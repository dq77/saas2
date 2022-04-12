<template lang="pug">
.upload-materials(v-loading='getUploadLoading || getApplicationLoading')
  .upload-materials__title 标准评估数据上传
    span.upload-materials__tips 请按标准要求上传资料包
  el-button.upload-materials__back(type='infor' @click='goBack') 返回
  Form.upload-materials__form(
    ref="formRef"
    :inline='false'
    :formData="formApis.formData",
    :formConfig="formApis.formConfig"
    :formRules='formApis.formRules'
    @radioChange="radioChange"
  )
    template(slot="unit")
      span 万元
    template(slot="year")
      span 年
    template(slot="shipmentHistory")
      ShipmentHistory(ref='shipmentHistoryRef' @change='setShipmentHistory' :dataSource='formApis.formData.shipmentHistory')
  .upload-materials__button
    el-button(type='primary' @click='submit(false)' :loading='loading' v-weblogs.click='"赊销评估-标准评估-资料提交页-下一步点击"') 下一步
    el-button(type='infor' @click='submit(true)' :loading='saveLoading') 任务暂存
</template>

<script>
import Form from '@/components/qjd/form'
import useForm from 'hooks/useForm'
import { reactive, ref, toRefs } from '@vue/composition-api'
import { formData, formConfig, formRules, standardFormConfig, standardFormData, standardFromRules } from './config'
import ShipmentHistory from './shipmentHistory'
import useAsync from 'hooks/useAsync'
import ajaxStore from '@/apis'
import Apis from './apis'
import { weblogsDom } from '@/utils/qjd/weblogs'
export default {
  components: {
    Form,
    ShipmentHistory
  },
  setup(props, { root }) {
    weblogsDom('赊销评估-标准评估-资料提交页')
    const state = reactive({
      formApis: {},
      companyBase: '',
    })
    state.companyBase = root.$route.params ? root.$route.params.formData : ''
    const { id } = root.$route.query
    if (!id && !state.companyBase) {
      root.$router.go(-1)
    }
    const formRef = ref(null)
    const shipmentHistoryRef = ref(null)
    state.formApis = useForm({ formRef, formData, formConfig, formRules })
    state.formApis.setConfigs(formConfig.concat(standardFormConfig))
    state.formApis.setFormData({
      ...formData,
      ...standardFormData,
    })
    state.formApis.setFormRules({
      ...formRules,
      ...standardFromRules
    })
    const { standardCreate, saveStandardTemporary } = ajaxStore.riskExperts.creditEvaluation
    const { loading, doResult } = useAsync({
      request: standardCreate,
      init: false,
      successCallBack: ({code, data}) => {
        if (code === '0') {
          root.$router.push({
            name: 'normalAuth',
            query: {
              taskId: data.id,
              mode: 'standard'
            }
          })
        }
      }
    })
    const { loading: saveLoading, doResult: saveDoResult } = useAsync({
      request: saveStandardTemporary,
      init: false,
      successCallBack: ({code, data}) => {
        if (code === '0') {
          root.$router.push({
            name: 'creditTaskList',
          })
          root.$message.success('暂存成功')
        }
      }
    })

    // 提交
    const submit = (isSave) => {
      shipmentHistoryRef.value.valid().then((valid) => {
        if (valid) {
          state.formApis.submitHandle().then((valid) => {
            if (valid || isSave) {
              if (state.formApis.formData.representativeIsController === 'Y') {
                state.formApis.formData.actualController = state.companyBase.corporateRepresentative
              }
              const data = ({
                id,
                ...state.companyBase,
                ...state.formApis.formData,
              })
              if (isSave) {
                saveDoResult(data)
              } else {
                doResult(data)
              }
            }
          })
        }
      })
    }
    // 是否为实控人
    const radioChange = ({ key, value }) => {
      if (value === 'Y') {
        state.formApis.setConfig('actualController', 'isHidden', true)
      } else {
        state.formApis.setConfig('actualController', 'isHidden', false)
      }
    }

    const setShipmentHistory = (data) => {
      state.formApis.setFormItem('shipmentHistory', data)
      state.formApis.validateField('shipmentHistory')
    }

    const { getUploadDoResult, getUploadLoading, getApplicationDoResult, getApplicationLoading } = Apis()
    if (id) {
      getApplicationDoResult({
        id
      }).then(({code, data}) => {
        if (code === '0') {
          const { customerName, uniformCreditCode, corporateRepresentative, actualController, representativeIsController } = data
          state.companyBase = {
            customerName,
            uniformCreditCode,
            corporateRepresentative
          }
          if (representativeIsController === 'N') {
            state.formApis.setFormItem('actualController', actualController)
            state.formApis.setFormItem('representativeIsController', 'N')
            state.formApis.setConfig('actualController', 'isHidden', false)
          } else {
            state.formApis.setFormItem('representativeIsController', 'Y')
            state.formApis.setConfig('actualController', 'isHidden', true)
          }
        }
      })
      getUploadDoResult({
        evaluateId: id
      }).then(({code, data}) => {
        if (code === '0') {
          const { shipmentHistory, expectedShipment, housePropertyValue, cooperationPeriod } = data.evaluateObject
          state.formApis.setFormItem('shipmentHistory', shipmentHistory)
          state.formApis.setFormItem('expectedShipment', expectedShipment)
          state.formApis.setFormItem('housePropertyValue', housePropertyValue)
          state.formApis.setFormItem('cooperationPeriod', cooperationPeriod)
          state.dataInfo = data
          state.remark = data.remark
        }
      })
    }
    const goBack = () => {
      root.$confirm('返回将不保存修改内容，确认不保存么？', {
        type: 'warning',
        beforeClose: async (action, instance, done) => {
          if (action === 'confirm') {
            root.$router.go(-1)
            done()
          } else {
            done()
          }
        }
      }).then(() => {
      }).catch(() => {})
    }

    return {
      getApplicationLoading,
      getUploadLoading,
      formRef,
      shipmentHistoryRef,
      submit,
      setShipmentHistory,
      radioChange,
      loading,
      saveLoading,
      doResult,
      goBack,
      ...toRefs(state)
    }
  }
}
</script>

<style lang='stylus' scoped>
.upload-materials
  background #ffffff
  padding 25px 33px
  position relative
  &__back
    position absolute
    right 20px
    top 20px
  &__title
    color #494949
    font-size 18px
    margin-bottom 24px
  &__tips
    color #A8A8A8
    font-size 12px
    margin-left 12px
  &__button
    margin-top 65px
</style>
