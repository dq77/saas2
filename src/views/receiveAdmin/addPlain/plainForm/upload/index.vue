<template lang="pug">
Upload(
  ref="uploadRef"
  style="width: 400px"
  :action="toPrefixUrl('/fs/file/doUploadWithFile')"
  @onChange="uploadApis.onChange"
  @onRemove="uploadApis.onRemove"
  @onPreview="uploadApis.onPreview"
  @onError="uploadApis.onError"
  @onSuccess="uploadApis.onSuccess"
  @beforeUpload="uploadApis.beforeUpload"
)
  .upload_btn 点击上传
</template>
<script>
import { ref } from '@vue/composition-api'
import Upload from '@/components/qjd/upload'
import { toPrefixUrl } from '@/utils/util'

export default {
  props: {
    uploadApis: {
      type: Object,
      default: () => ({})
    }
  },
  components: {
    Upload
  },
  setup() {
    // ref
    const uploadRef = ref()
    // 清空上传文件
    const clearFiles = () => uploadRef.value && uploadRef.value.clearFiles()
    // 设置文件
    const setFileList = files => uploadRef.value && uploadRef.value.setFileList(files)

    return {
      uploadRef,
      clearFiles,
      setFileList,
      toPrefixUrl
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
