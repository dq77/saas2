<template lang="pug">
Modal(
  :title="title"
  :visible="visible"
  :loading="loading"
  @cancleHandle="cancleHandle"
  @sureHandle="sureHandle"
)
  Form(
    ref="formRef"
    style="padding-right: 20px;"
    :formData="formApis.formData"
    :formConfig="formApis.formConfig"
    :inline="false"
    :labelPosition="'right'"
    :labelWidth="'110px'"
    :formRules="formRules"
    :isShadow="false"
    @radioChange="radioChange"
  )
    template(slot="saArmBusinessFileList")
      Upload(
        ref="uploadRef"
        :action="toPrefixUrl('/fs/file/doUploadWithFile')"
        @onChange="uploadApis.onChange"
        @onRemove="uploadApis.onRemove"
        @onPreview="uploadApis.onPreview"
        @onError="uploadApis.onError"
        @onSuccess="uploadApis.onSuccess"
        @beforeUpload="uploadApis.beforeUpload"
      )
        .upload_btn(slot="trigger") 点击上传
        Info(:content="'此处可以上传任何您需要关联至本计划的文件，例如：发货单、签收单等'" :right="210")
</template>
<script>
import { ref, toRefs, reactive, watch } from '@vue/composition-api'
import ajaxStore from '@/apis'
import useAsync from 'hooks/useAsync'
import Modal from '@/components/qjd/modal'
import Form from '@/components/qjd/form'
import useForm from 'hooks/useForm'
import Upload from '@/components/qjd/upload'
import useUpload from 'hooks/useUpload'
import Info from '../addModal/info'
import { formData, formConfig, formRules } from './config'
import { toPrefixUrl } from '@/utils/util'
import { percent2, getDate, preview } from '@/utils/qjd'
import { Message } from 'element-ui'

export default {
  components: {
    Modal,
    Form,
    Upload,
    Info
  },
  props: {
    title: String,
    visible: Boolean,
    detail: {
      type: Object,
      default: () => ({})
    },
    moneyInfo: {
      type: Object,
      default: () => ({})
    },
    getList: Function
  },
  setup(props, { emit }) {
    // ref
    const formRef = ref()
    const uploadRef = ref()
    const list = ref([])
    // ajax
    const { receive: { ajustPlain } } = ajaxStore
    // formApis
    const formApis = useForm({ formRef, formData, formConfig })
    // upload
    const uploadApis = useUpload({
      uploadRef,
      formApis,
      key: 'saArmBusinessFileList',
      cName: 'fileName',
      cKey: 'fileKey',
      otherParams: { fileType: 1 },
      preview
    })
    // 取消
    const cancleHandle = () => {
      formApis.resetHandle()
      formApis.resetFormData()
      uploadApis.clearFiles()
      emit('cancleHandle')
    }
    // 保存接口
    const { doResult, loading } = useAsync({
      request: ajustPlain,
      init: false,
      successCallBack: res => {
        const { code } = res ?? {}
        if (code === '0') {
          cancleHandle()
          Message.success('保存成功')
          emit('successHandle')
        }
      }
    })
    // 保存
    const sureHandle = () => {
      const { submitHandle, formData } = formApis
      submitHandle(() => doResult({ ...formData, sourcePlanItemId: props.detail?.id }))
    }
    // 计划调整方式选择
    const radioChange = ({ key, value }) => {
      if (value === 2) {
        const len = list.value?.length ?? 0
        const current = list.value?.[len - 1] ?? {}
        formApis.setFormItem('targetPlanItemId', current?.id ?? '')
        formApis.setConfig('targetPlanItemId', 'disabled', true)
      } else {
        formApis.setFormItem('targetPlanItemId', undefined)
        formApis.setConfig('targetPlanItemId', 'disabled', false)
      }
    }
    // state
    const state = reactive({ formApis, uploadApis })
    // watch
    watch(
      () => props.visible,
      value => {
        if (value) {
          const { fundType, fundTypeName, receivableAmount, id: receivablePlanItemIdNotIn } = props?.detail ?? {}
          const { id } = props?.moneyInfo ?? {}
          formApis.setFormItem('fundTypeName', fundTypeName)
          formApis.setFormItem('fundType', fundType)
          formApis.setConfig('adjustAmount', 'max', receivableAmount)
          formApis.setFormItem('receivableAmount', percent2(receivableAmount))
          props.getList && props.getList({ receivablePlanId: id, receivablePlanItemIdNotIn }).then(res => {
            const { code, data } = res ?? {}
            if (code === '0') {
              data && data.forEach(item => {
                item.label = `${item.fundTypeName} | ${getDate(item.planEndDate)}`
              })
              formApis.setConfig('targetPlanItemId', 'options', data ?? [])
              // 存储款项
              list.value = data
            }
          })
        }
      }
    )

    return {
      formRef,
      uploadRef,
      loading,
      formRules,
      toPrefixUrl,
      cancleHandle,
      sureHandle,
      radioChange,
      ...toRefs(state)
    }
  },
}
</script>
<style lang="stylus" scoped>
.upload_btn
  width: 81px;
  height: 30px;
  background: #FFFFFF;
  border-radius: 4px;
  border: 1px solid #3B68F0;
  line-height: 30px;
  text-align: center;
  font-size: 12px;
  font-family: PingFangTC-Regular, PingFangTC;
  font-weight: 400;
  color: #3B68F0;
</style>
