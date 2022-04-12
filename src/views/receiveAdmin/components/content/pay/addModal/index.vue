<template lang="pug">
el-drawer(
  :title="`${type === 'add' ? '添加' : '编辑'}${title}`"
  :visible.sync="visible"
  :direction="'rtl'"
  :before-close="cancleHandle"
  :destroy-on-close="true"
  :wrapperClosable="false"
)
  el-scrollbar(style="width: 100%; height: 100%;")
    Form(
      ref="formRef"
      style="padding-right: 40px; padding-bottom: 80px;"
      :formData="formApis.formData"
      :formConfig="formApis.formConfig"
      :inline="false"
      :labelPosition="'right'"
      :labelWidth="'110px'"
      :formRules="formRules"
      :isShadow="false"
      @radioChange="currentApis.radioChange"
      @selectChange="currentApis.selectChange"
      @inputNumberChange="currentApis.inputNumberChange"
      @datePickerChange="currentApis.datePickerChange"
    )
      template(slot="receivableAmountAppend")
        span 元
      template(slot="fundType")
        Info
      template(slot="receivableProportion" slot-scope="{ data }")
        .last_data(v-if="(data && data.receivableCalculationType === 2) || data.createType === 2") 剩余可添加比例: {{ (moneyInfo.notPlanProportion + ( detail ? detail.receivableProportion : 0 )).toFixed(2) }}%
      template(slot="receivableAmount" slot-scope="{ data }")
        .last_data(v-if="data && data.receivableCalculationType === 1 && data.createType !== 2") 剩余可添加金额: {{ (moneyInfo.notPlanAmount + ( detail ? detail.receivableAmount : 0 )).toFixed(2) }}
      template(slot="saArmBusinessFileCreateDTO")
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
  //- 提交
  .sure_box
    el-button(@click="cancleHandle") 取消
    el-button(type="primary" @click="sureHandle" :loading="apiApis.createLoading || apiApis.updateLoading") 确定
</template>
<script>
import { reactive, ref, toRefs, watch } from '@vue/composition-api'
import Upload from '@/components/qjd/upload'
import useTimeout from 'hooks/useTimeout'
import useUpload from 'hooks/useUpload'
import Form from '@/components/qjd/form'
import useForm from 'hooks/useForm'
import { formData, formConfig, formRules } from './config'
import Info from './info'
import { toPrefixUrl } from '@/utils/util'
import { percent2, preview } from '@/utils/qjd'
import useCurrent from './useCurrent'
import useApis from './useApis'

export default {
  components: {
    Form,
    Info,
    Upload
  },
  props: {
    title: String,
    visible: Boolean,
    detail: {
      type: Object,
      default: () => ({})
    },
    type: String,
    moneyInfo: {
      type: Object,
      default: () => ({})
    }
  },
  setup(props, { emit, root }) {
    // ref
    const formRef = ref()
    const uploadRef = ref()
    // useTimeout
    const { perTimeout } = useTimeout()
    // formApis
    const formApis = useForm({ formRef, formData, formConfig })
    // upload
    const uploadApis = useUpload({
      uploadRef,
      formApis,
      key: 'saArmBusinessFileCreateDTO',
      cName: 'fileName',
      cKey: 'fileKey',
      otherParams: { fileType: 1 },
      preview
    })
    // useCurrent
    const currentApis = useCurrent({ formApis, props })
    // 取消
    const cancleHandle = () => {
      uploadApis.clearFiles()
      formApis.resetHandle()
      formApis.resetFormData()
      formApis.resetFormConfig()
      emit('cancleHandle')
    }
    // apis
    const apiApis = useApis({
      callBack: () => {
        cancleHandle()
        emit('successHandle')
      }
    })
    // 确定
    const sureHandle = () => {
      const { submitHandle, formData } = formApis
      const { moneyInfo, detail } = props
      submitHandle(() => {
        // 新增
        !detail && apiApis.createHandle({ receivablePlanId: moneyInfo?.id, ...formData })
        // 修改
        detail && apiApis.updateHandle({ receivablePlanId: moneyInfo?.id, ...formData, id: detail?.id })
      })
    }
    // state
    const state = reactive({ formApis, uploadApis, currentApis, apiApis })
    // watch - 监听计算方式变化
    watch(
      () => state.formApis.formData.receivableCalculationType,
      value => {
        const { formData: { createType } } = formApis
        formApis.setConfig('receivableProportion', 'disabled', createType === 2 || value === 1)
        formApis.setConfig('receivableAmount', 'disabled', createType === 2 || value !== 1)
        formApis.setFormItem('receivableAmount', undefined)
      }
    )
    // 动态设置最大值
    const setMax = value => {
      const { receivableAmount, notPlanProportion, notPlanAmount } = value ?? {}
      formApis.setFormItem('amount', percent2(receivableAmount ?? 0))
      formApis.setConfig('receivableProportion', 'max', notPlanProportion)
      formApis.setConfig('receivableAmount', 'max', notPlanAmount)
    }
    // 编辑设置最大值
    const setEditMax = (value, data) => {
      const { receivableAmount, notPlanProportion, notPlanAmount } = value ?? {}
      formApis.setFormItem('amount', percent2(receivableAmount ?? 0))
      formApis.setConfig('receivableProportion', 'max', Number((notPlanProportion + data?.receivableProportion).toFixed(2)))
      formApis.setConfig('receivableAmount', 'max', Number((notPlanAmount + data?.receivableAmount).toFixed(2)))
    }
    // 监听计划总金额信息变化
    watch(
      () => props.moneyInfo,
      value => setMax(value)
    )
    // 文件信息-数据回显
    const getFiles = data => {
      if (!data) return []
      const arr = []
      data.forEach(item => {
        arr.push({ key: item.fileKey, name: item.fileName, response: { key: item.fileKey, name: item.fileName, fileName: item.fileName } })
      })
      return arr
    }
    // 监听是否有详情数据
    watch(
      () => props.visible,
      value => {
        // 设置应收总额
        const { moneyInfo, detail } = props
        // 获取个下拉数据
        currentApis.getPayKinds()
        currentApis.getPayTypes()
        currentApis.getReceive()
        if (value) {
          const { id } = detail ?? {}
          // 新增设置最大值
          value && !id && setMax(moneyInfo)
          // 编辑时数据回显
          id && apiApis.getDetail({ saArmReceivablePlanItemId: id }).then(res => {
            const { data } = res ?? {}
            const { saArmBusinessFileList } = data ?? {}
            // 编辑设置最大值
            setEditMax(moneyInfo, data)
            // 应收款添加方式触发
            currentApis.radioChange({ key: 'createType', value: data?.createType })
            formApis.loopFormData((item, key) => {
              if (data?.[key] || data?.[key] === 0) item[key] = data[key]
            })
            const { receivableAmount } = moneyInfo ?? {}
            formApis.setFormItem('amount', percent2(receivableAmount ?? 0))
            // 异步设置计划应收金额
            perTimeout(() => formApis.setFormItem('receivableAmount', data?.receivableAmount ?? 0), 100)
            // form-文件赋值
            formApis.setFormItem('saArmBusinessFileCreateDTO', saArmBusinessFileList)
            // upload-设置文件
            uploadApis.setFileList(getFiles(saArmBusinessFileList))
          })
        }
      }
    )

    return {
      formRef,
      formRules,
      uploadRef,
      cancleHandle,
      sureHandle,
      toPrefixUrl,
      ...toRefs(state)
    }
  },
}
</script>
<style lang="stylus" scoped>
@import './index.styl';
</style>
