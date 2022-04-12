<template lang="pug">
.p-main
  .p-title
    .center
      span.red(v-if='status') *
      span {{title}}
  .p-content
    div(v-if='uploadState.dataSource.length > 0')
      .p-file(v-for='(item, index) in uploadState.dataSource' :key='index')
        .p-file-left
          .file-success(v-if='item.status === "2"')
            a.ocr-parent(:href='`${baseUrl}/partner/common/file/download?fileKey=${item.fileKey}`', target='_blank') {{item.fileName}}
              img.ocr(:src='`${$assetsBaseUrl}/customerGuard/ocr.png`' v-if='item.type === "C0001" || item.type === "C0004"')
          .file-loading(v-if='item.status === "1"')
            i.icon.el-icon-loading
            span.gray {{ (item.type === "C0001" || item.type === "C0004") ? 'ocr识别中，请稍后…' : '上传中，请稍后…' }}
          .file-error(v-if='item.status === "3"')
            i.icon.el-icon-warning
            span.gray {{ (item.type === "C0001" || item.type === "C0004") ? 'ocr识别失败，请重新上传' : '上传失败，请重新上传' }}
        .p-file-right(v-if='item.fileKey')
          //- .file-btn.gray
          //-   el-upload(
          //-     :disabled='!uploadParam.owner'
          //-     :action='toPrefixUrl("/riskmanagement/jzfc/uploadMaterial")'
          //-     :show-file-list='false'
          //-     multiple
          //-     :limit="1"
          //-     :file-list="uploadState.fileList || []"
          //-     :on-success='(res) => uploadState.handleChange(res, index)'
          //-     :on-error="() => uploadState.onError(index)"
          //-     :on-progress="() => uploadState.onProgress(index)"
          //-     :data="{...uploadParam, code: item.code}"
          //-     accept='.pdf'
          //-   )
          //-     el-button.gray(size="small" type="text" :disabled='item.loading')
          //-       i.icon.el-icon-loading(v-if='item.loading')
          //-       span {{ item.type === "C0001" || item.type === "C0004" ? '重新上传识别' : '重新上传' }}
          .file-btn(v-if='item.type === "C0001" && item.status === "2"')
            router-link.gray(
              :to='{name: "parseCompany", query: {companyBasicCode: item.materialCode}}'
              target="_blank"
            ) 查看解析结果
          .file-btn(v-if='item.type === "C0004" && item.status === "2"')
            router-link.gray(
              :to='{name: "parsePerson", query: {personBasicCode: item.materialCode}}'
              target="_blank"
            ) 查看解析结果
          .file-btn
            el-button.gray(size="small" type="text" @click='deleteUpload(item)' :disabled='item.loading') 删除
    .p-add(v-else)
      el-upload(
        :disabled='!uploadParam.owner'
        :action='toPrefixUrl("/riskmanagement/jzfc/uploadMaterial")'
        :show-file-list='false'
        multiple
        :limit="1"
        :file-list="uploadState.fileList"
        :on-success="uploadState.onSuccess"
        :on-error="() => uploadState.onError()"
        :on-progress="() => uploadState.onProgress()"
        :data="uploadParam"
        accept='.pdf'
      )
        el-button(size="small" type="text" :disabled='uploadState.loading')
          i.icon.el-icon-loading(v-if='uploadState.loading')
          span +点击上传{{uploadParam.owner ? '' : '(请先完善个人信息)'}}
</template>
<script>
import ajaxStore from '@/apis'
import { ref, reactive, toRefs, watch } from '@vue/composition-api'
import useAsync from 'hooks/useAsync'
import useUpload from '../hooks/useUpload'
import { toPrefixUrl } from '@/utils/util'
import { baseUrl } from '@/utils/config'
import {} from '../config/companyConfig'

export default {
  props: {
    title: {
      type: String,
      default: ''
    },
    status: {
      type: Boolean,
      default: false
    },
    uploadParam: {
      type: Object,
      defaultValue: () => {
        return {}
      }
    },
    info: {
      type: Array,
      defaultValue: () => {
        return []
      }
    }
  },
  components: {
  },
  setup(props, {emit, root}) {
    const {
      customer: { precise: { deleteMaterial } }
    } = ajaxStore
    // state
    const state = reactive({
      uploadState: {}
    })
    const formRef = ref()
    const getState = () => {
      return state.uploadState
    }
    const { doResult } = useAsync({
      request: deleteMaterial,
      init: false
    })
    const deleteUpload = (item) => {
      doResult({
        code: item.code
      }).then(({code}) => {
        code === '0' && state.uploadState.deleteRow(item)
      })
    }
    // 初始化
    const init = (val) => {
      state.uploadState = useUpload({
        dataSource: val,
        single: true,
      })
    }
    watch(() => props.info, (val, preVal) => {
      init(val)
    }, { immediate: true })
    watch(() => props.uploadParam, (val, preVal) => {
    }, { immediate: true })
    return {
      formRef,
      getState,
      baseUrl,
      toPrefixUrl,
      deleteUpload,
      ...toRefs(state)
    }
  },
}
</script>
<style lang="stylus" scoped>
.p-main
  display flex
  align-items stretch
  justify-content flex-start
  border-bottom 1px solid #F2F2F6
  min-height 40px
  .p-title
    flex 160px 0 0
    background #F8F9FA
    border-right 1px solid #F2F2F6
    display flex
    align-items center
    padding-left 10px
    color #494949
  .p-content
    flex 1
    .p-file
      height 40px
      display flex
      justify-content space-between
      align-items center
      padding 0 10px
      border-bottom 1px solid #F2F2F6
      .icon
        margin-right 5px
      .p-file-right
        display flex
        align-items center
        .file-btn
          margin-right 10px
    .p-add
      height 40px
      padding 0 10px
      display flex
      align-items center
.gray
  color #848484
.ocr-parent
  position relative
  .ocr
    color #3B68F0
    background #F8F9FA
    font-size 12px
    text-align center
    position absolute
    top 3px
    right -30px
    width 25px
.red
  color #FF0028
  margin-right 5px
  position relative
  top 1px
</style>
