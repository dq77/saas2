<template lang="pug">
.page-main
  .quota-edit(style="min-width: 1200px;")
    //- 提示信息
    Info
    //- 渠道类型
    Types(
      :dataSoure="typeDatas"
      :currentType="currentState.currentType"
      @selectHandle="currentState.selectHandle"
    )
    //- form
    .quota_form_box(v-show="formState.formData.creditType")
      .quota_title {{ currentState.title }}-填写资料
      Form(
        style="width: 45%;"
        ref="formRef"
        :labelPosition="'right'"
        :labelWidth="'100px'"
        :isShadow="false"
        :inline="false"
        :formData="formState.formData"
        :formConfig="formState.formConfig"
        :formRules="formState.formRules"
        @selectChange="currentState.selectChange"
      )
        template(slot="fileList")
          //- 文件
          div(
            style="width: 410px; display: flex; margin-bottom: 10px; position: relative;"
            v-for="item in (currentState.materials || [])"
            :key="item.id"
          )
            div.upload_title {{ item.materialsName }}
            Upload(
              style="width: 340px;"
              :action="toPrefixUrl('/fs/file/doUploadWithFile')"
              :accept="'.zip,.doc,.docx,.pdf,.jpg'"
              :max="50"
              :defaultFileList="item.defaultFileList"
              @onPreview="data => uploadState.onPreview(data, item)"
              @onChange="data => uploadState.onChange(data, item)"
              @onRemove="data => uploadState.onRemove(data, item)"
            )
              el-tooltip(
                placement='top'
                content='请上传文件'
              )
                el-button(plain type='primary') 选择文件
            .u-tips(:style="`position: absolute; left: 160px; top: 0;`")
              span(style="color: red; margin-right: 5px;") {{ item.mustPass === '1' ? '必传' : '' }}
              span 支持格式：.zip/.doc/.docx/.pdf/.jpg
      .quto-btns
        el-button(
          type="primary"
          weblogs-anchor="common-credit-submit"
          @click="okHandle"
          :disabled="!!(noticeInfo && noticeInfo.errorMsgList && noticeInfo.errorMsgList.length && noticeInfo.limitType === '2')"
        ) 提交
  //- 二次确认
  SureModal(
    :title="sureState.title"
    :visible="sureState.visible"
    :formData="formState.formData"
    :isRequireInfo="uploadState.isRequireInfo"
    :noticeInfo="noticeInfo"
    @cancleHandle="sureState.cancleHandle"
  )
  //- 提示
  Notice(
    v-if="noticeInfo && noticeInfo.errorMsgList && noticeInfo.errorMsgList.length"
    :type="noticeInfo && noticeInfo.limitType ? noticeInfo.limitType === '1' ? 'warn' : noticeInfo.limitType === '2' ? 'error' : '' : ''"
    :member="noticeInfo ? noticeInfo.targetName : ''"
    :rules="noticeInfo ? noticeInfo.errorMsgList : []"
  )
</template>
<script>
import { reactive, ref, toRefs } from '@vue/composition-api'
import Notice from '@/components/qjd/notice'
import Info from '../components/info'
import Types from '../components/types'
import Form from '@/components/qjd/form'
import Upload from '@/components/qjd/upload'
import SureModal from './sureModal'
import useForm from 'hooks/useForm'
import useCurrent from './index.js'
import useUpload from '@/hooks/credit/upload.js'
import useSure from './sureModal/useSure'
import { cFormData, cFormConfig, cFormRules, typeDatas } from './config'
import { toPrefixUrl } from '@/utils/util'

export default {
  components: {
    Info,
    Form,
    Upload,
    Types,
    SureModal,
    Notice
  },
  setup(props, { root }) {
    const { $route: { params: { id }, query: { creTy } } } = root
    const formRef = ref()
    // 存储展示提示信息
    const noticeInfo = ref({})
    // form
    const formState = useForm({
      formRef,
      formData: cFormData,
      formConfig: cFormConfig,
      formRules: cFormRules
    })
    // 合同文件upload
    const uploadState = useUpload({ formState })
    // 切换是否展示
    const setInfo = value => { noticeInfo.value = value }
    // 清空上传文件
    const clearFiles = () => {
      currentState.materials.forEach(item => { item.defaultFileList = [] })
    }
    // 当前细小逻辑
    const currentState = useCurrent({
      id,
      creTy,
      formState,
      clearFiles,
      uploadState,
      setInfo
    })
    // 二次确认逻辑
    const sureState = useSure()
    // 提交
    const okHandle = () => formState.submitHandle().then(valid => valid && sureState.openHandle())
    // state
    const state = reactive({
      formState,
      currentState,
      uploadState,
      sureState
    })

    return {
      formRef,
      noticeInfo,
      toPrefixUrl,
      typeDatas,
      okHandle,
      ...toRefs(state)
    }
  },
}
</script>
<style lang="stylus" scoped>
@import './index.styl';
</style>
