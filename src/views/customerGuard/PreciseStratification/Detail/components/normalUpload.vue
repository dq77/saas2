<template lang="pug">
.p-main
  .p-title
    .center {{title}}
  .p-content
    template(v-if='!info || info.length === 0')
      .p-file 暂无数据
    template(v-else)
      .p-file(v-for='(item, index) in info' :key='index')
        .p-file-left
          .file-success(v-if='item.status === "2"')
            router-link.ocr-parent(
              v-if='item.type === "C0001"'
              :to='{name: "parseCompany", query: {companyBasicCode: item.materialCode}}'
              target="_blank"
            ) {{item.fileName}}
              img.ocr(:src='`${$assetsBaseUrl}/customerGuard/ocr.png`')
            a.ocr-parent(v-if='item.type === "C0003"' :href='`${baseUrl}/partner/common/file/download?fileKey=${item.fileKey}`', target='_blank') {{item.fileName}}
            router-link.ocr-parent(
              v-if='item.type === "C0004"'
              :to='{name: "parsePerson", query: {personBasicCode: item.materialCode}}'
              target="_blank"
            ) {{item.fileName}}
              img.ocr(:src='`${$assetsBaseUrl}/customerGuard/ocr.png`')
          .file-loading(v-if='item.status === "1"')
            i.icon.el-icon-loading
            span.gray {{ (item.type === "C0001" || item.type === "C0004") ? 'ocr识别中，请稍后…' : '上传中，请稍后…' }}
          .file-error(v-if='item.status === "3"')
            i.icon.el-icon-warning
            span.gray {{ (item.type === "C0001" || item.type === "C0004") ? 'ocr识别失败，请重新上传' : '上传失败，请重新上传' }}
</template>
<script>
import { watch } from '@vue/composition-api'
import { toPrefixUrl } from '@/utils/util'
import { baseUrl } from '@/utils/config'
import {} from '../config/companyConfig'

export default {
  props: {
    title: {
      type: String,
      default: ''
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
  setup(props, {emit}) {
    watch(() => props.info, (val, preVal) => {
    }, { immediate: true })
    return {
      baseUrl,
      toPrefixUrl,
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
      color #606266
      height 40px
      display flex
      justify-content space-between
      align-items center
      padding 0 10px
      border-bottom 1px solid #F2F2F6
      .icon
        margin-right 5px
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
</style>
