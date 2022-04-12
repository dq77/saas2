<template lang="pug">
  .page-wrap
    el-dialog(:title='dialogTitle' :visible='dialogVisible' :before-close="cancleHandle")
      div(v-if="type")
        span 请选择仓库：
        el-select(
          v-model="businessExtInfo"
          placeholder="请选择仓库"
        )
          el-option(
            v-for="(child, index) in options"
            :key="index"
            :label="child.name"
            :value="child.id"
          )
      .p-section
        span 下载导入模版
        el-button(type='text' @click='downlaodTemplate') 下载
      .p-section.section-upload
        span 上传导入模版
        el-upload(
          class='section-upload_item'
          ref="upload"
          style="margin-right: 10px"
          :action="type ? `${uploadUrl}&businessExtInfo=${businessExtInfo}` : uploadUrl"
          :auto-upload="false"
          :file-list="fileList"
          :on-success="onSuccess"
          :on-error="onError"
          :on-change="onChange"
          :on-remove="onRemove"
          :before-upload="beforeUpload"
          :accept="'.xlsx,.xls,.csv'"
        )
          el-button(type="text") 上传
          .section-upload-warning(ref='waringSection' v-show="isWarning") 请选择文件
      .p-footer
        el-button(@click="cancleHandle" :weblogs-anchor='weblogsAnchor + "-cancle"') 取消
        el-button(type="primary" :weblogs-anchor='weblogsAnchor + "-submit"' :disabled='fileList.length ? false : true' @click="submitHandle" :loading="loading") 提交
</template>

<script>
import { reactive, toRefs, nextTick } from '@vue/composition-api'
import { Message } from 'element-ui'
import { toPrefixUrl } from '@/utils/util'
import ajaxStore from '@/apis'
import useAsync from 'hooks/useAsync'

export default {
  props: {
    dialogTitle: {
      type: String,
      deFault: '批量导入'
    },
    dialogVisible: {
      type: Boolean,
      deFault: false
    },
    uploadUrl: String,
    code: String,
    weblogsAnchor: String
  },
  setup(props, {emit, root}) {
    const { code } = props
    // root
    const { $route: { query: { type } } } = root
    // ajax
    const { factory: { wmwarehouseinfoList } } = ajaxStore
    const uploadState = reactive({
      fileList: [],
      upload: null,
      waringSection: null,
      isWarning: false,
      loading: false,
      businessExtInfo: undefined,
      options: []
    })
    // 仓库 - 接口
    const { doResult } = useAsync({
      request: wmwarehouseinfoList,
      successCallBack: res => {
        uploadState.options = res?.data ?? []
      }
    })
    type && doResult()
    const cancleHandle = () => {
      nextTick(() => {
        uploadState.fileList = []
        uploadState.isWarning = false
        uploadState.businessExtInfo = undefined
        emit('update:dialogVisible', false)
      })
    }
    const downlaodTemplate = () => {
      window.open(toPrefixUrl(`/saas-boss/excel/downloadTemplate?businessType=${code}`))
    }
    const onRemove = () => {
      uploadState.fileList = []
    }
    const onSuccess = (response, file, files) => {
      const { data, message } = response
      uploadState.loading = false
      if (data) {
        Message.success('导入成功')
        emit('successHandle')
        cancleHandle()
      } else {
        Message.error(message)
      }
    }
    const onError = (res) => {
      uploadState.loading = false
      Message.error(JSON.stringify(res))
    }
    const onChange = (file, files) => {
      uploadState.isWarning = false
      uploadState.fileList = [file]
    }
    const beforeUpload = file => {
      const size = file.size / 1024 / 1024
      if (size > 5) {
        // console.log(uploadState.waringSection, 'waringSection')
        uploadState.waringSection.innerText = '上传文件不能超过5M'
        uploadState.isWarning = true
        uploadState.loading = false
        return false
      }
    }
    const submitHandle = () => {
      if (uploadState.fileList.length) {
        uploadState.isWarning = false
      } else {
        uploadState.isWarning = true
        return
      }
      if (type && !uploadState.businessExtInfo) {
        return Message.warning('请选择仓库')
      }
      uploadState.loading = true
      uploadState.upload.submit()
    }
    return {
      type,
      cancleHandle,
      downlaodTemplate,
      onRemove,
      onSuccess,
      onError,
      onChange,
      beforeUpload,
      submitHandle,
      ...toRefs(uploadState),
    }
  },
}
</script>

<style lang="stylus" scoped>
.page-wrap
  .p-section
    span
      margin-right 10px
  .section-upload
    display flex
    span
      padding-top 6px
    &-warning
      color #f56c6c
      position absolute
    &_item
      flex 1
  .p-footer
    text-align center
    margin-top 20px
</style>
