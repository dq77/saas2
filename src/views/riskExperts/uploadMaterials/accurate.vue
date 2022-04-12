<template lang="pug">
.upload-materials(v-loading='getUploadLoading')
  //- 驳回提示框
  WarningTips(:remark='remark' v-if='dataInfo.evaluateStatus === "REPEAT_AUTH" && remark')
  el-button.upload-materials__back(type='infor' @click='goBack') 返回
  .upload-materials__title 精准评估数据上传
    span.upload-materials__tips 请按标准要求上传资料包
  Form.upload-materials__form(
    ref="formRef"
    :inline='false'
    :formData="formApis.formData",
    :formConfig="formApis.formConfig"
    :formRules='formApis.formRules'
  )
    template(slot="unit")
      span 万元
    template(slot="year")
      span 年
    template(slot="shipmentHistory")
      ShipmentHistory(ref='shipmentHistoryRef' @change='setShipmentHistory' :dataSource='dataInfo.evaluateObject.shipmentHistory')
  //- 资料包上传
  FileForm(:evaluateObject='dataInfo.evaluateObject' :relevantList='dataInfo.relevantList' @change='setFileData')
  .upload-materials__button
    el-button(type='primary' @click='submit(false)' :loading='uploadLoading' v-weblogs.click='"赊销评估-精准评估-资料包提交页-提交评估"') 提交评估
    el-button(type='infor' @click='submit(true)' :loading='stagingUploadLoading') 任务暂存
</template>

<script>
import Form from '@/components/qjd/form'
import useForm from 'hooks/useForm'
import { reactive, ref, toRefs, watch } from '@vue/composition-api'
import { formData, formConfig, formRules } from './config'
import ShipmentHistory from './shipmentHistory'
import FileForm from './fileForm'
import Apis from './apis'
import { weblogsDom } from '@/utils/qjd/weblogs'
import WarningTips from '../components/warningTips'
export default {
  components: {
    Form,
    FileForm,
    ShipmentHistory,
    WarningTips
  },
  setup(props, { root }) {
    weblogsDom('赊销评估-精准评估-资料包提交页')
    const state = reactive({
      formApis: {},
      dataInfo: {
        evaluateObject: {
          shipmentHistory: []
        },
        relevantList: []
      },
      evaluateId: '',
      fileData: [],
      remark: '',
      needSave: false
    })
    state.evaluateId = root.$route.query.id
    const formRef = ref(null)
    const shipmentHistoryRef = ref(null)
    state.formApis = useForm({ formRef, formData, formConfig, formRules })
    const { getUploadDoResult, stagingUploadDoResult, uploadDoResult, getUploadLoading, uploadLoading, stagingUploadLoading } = Apis()

    // 校验文件，并获取提交接口数据
    const validFiles = () => {
      let result = true
      const data = []
      // 文件个数与企业数量一一对应，但不支持多个文件，不够灵活，有时间待优化
      if (state.fileData.length === 1 + state.dataInfo.relevantList.length) {
        for (const key in state.fileData) {
          if (!state.fileData[key].fileList.length) { result = false }
          data.push({
            evaluateId: state.evaluateId,
            ...state.fileData[key],
            ...state.formApis.formData,
          })
        }
      } else {
        result = false
      }
      return {
        result,
        data
      }
    }

    // 提交
    const submit = (isSave) => {
      shipmentHistoryRef.value.valid().then((valid) => {
        // 历史出货没有校验通过
        if (!valid) return
        state.formApis.submitHandle().then((valid) => {
          // 表单字段没有校验通过并且不为暂存
          if (!valid && !isSave) return
          // 校验文件
          const { result, data } = validFiles()
          // 文件校验不通过并且不为暂存
          if (!result && !isSave) {
            root.$message.error('请上传企业资料')
            return
          }
          if (isSave) {
            // 暂存
            stagingUploadDoResult(data).then(({code}) => {
              if (code === '0') {
                root.$router.push({
                  name: 'creditTaskList',
                })
                state.needSave = false
                root.$message.success('暂存成功')
              }
            })
          } else {
            // 提交
            uploadDoResult(data).then(({code}) => {
              if (code === '0') {
                root.$router.push({
                  name: 'evaluationSubmitSuccess',
                  query: {
                    setp: 'last'
                  }
                })
              }
            })
          }
        })
      })
    }

    // 设置历史出货金额
    const setShipmentHistory = (data) => {
      state.formApis.setFormItem('shipmentHistory', data)
      state.formApis.validateField('shipmentHistory')
      state.needSave = true
    }

    // 获取初始化数据或历史数据
    getUploadDoResult({
      evaluateId: state.evaluateId
    }).then(({code, data}) => {
      if (code === '0') {
        // 主体企业资料
        data.evaluateObject.fileList = data.evaluateObject.fileList || []
        const {
          shipmentHistory,
          expectedShipment,
          housePropertyValue,
          cooperationPeriod,
          fileList
        } = data.evaluateObject

        for (const key in fileList) {
          const { fileTitle, filePath } = fileList[key]
          fileList[key].name = fileTitle
          fileList[key].url = filePath
        }
        state.fileData.push(data.evaluateObject)

        // 关联企业资料
        for (const index in data.relevantList) {
          data.relevantList[index].fileList = data.relevantList[index].fileList || []
          const { fileList: relevantFileList } = data.relevantList[index]
          for (const key in relevantFileList) {
            const { fileTitle, filePath } = relevantFileList[key]
            relevantFileList[key].name = fileTitle
            relevantFileList[key].url = filePath
          }
          data.relevantList[index].fileList = relevantFileList
          state.fileData.push(data.relevantList[index])
        }

        // 表单赋值
        state.formApis.setFormData({
          shipmentHistory,
          expectedShipment,
          housePropertyValue,
          cooperationPeriod,
        })
        state.dataInfo = data
        state.remark = data.remark
      }
    })

    // 设置资料包字段
    const setFileData = (data) => {
      state.fileData = data
      state.needSave = true
    }

    // 返回按钮逻辑，判断是否有修改过表单数据
    const goBack = () => {
      if (state.needSave) {
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
      } else {
        root.$router.go(-1)
      }
    }

    watch(
      () => state.formApis.formData,
      (value) => {
        state.needSave = true
      }
    )

    return {
      formRef,
      shipmentHistoryRef,
      submit,
      setShipmentHistory,
      setFileData,
      getUploadLoading,
      uploadLoading,
      stagingUploadLoading,
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
  &__remark
    margin-bottom 20px
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
