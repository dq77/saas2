<template lang="pug">
div
  list-page(
    ref='listPage'
    :config='listPageConfig'
  )
    template(v-slot:headerTop)
      el-upload.p-btn-upload(
        :multiple='false'
        :show-file-list="false"
        :action='toPrefixUrl("/saas-flow/deployment/create")'
        :before-upload='beforeUpload'
        :on-success="uploadSuccessHandler")
        el-button(type='primary' :loading='loadingUpload' @click='uploadBtn') 流程文件上传
      el-button(@click='clickDoc') 接口文档
</template>

<script>
import ListPage from '@/components/ListPage'
// import moment from 'moment'
import { toPrefixUrl } from '@/utils/util'
import ajaxStore from '@/apis'
export default {
  components: { ListPage },
  data () {
    return {
      loadingUpload: false,
      uploadFiles: [],
    }
  },
  computed: {
    listPageConfig () {
      const getUploadList = ajaxStore.common.process.getUploadList
      return {
        searchParams: [],
        tableHeader: [
          { name: '流程key', property: 'key', width: 300 },
          { name: '流程名称', property: 'name'},
          { name: '文件名称', property: 'resourceName'},
          { name: '流程版本', property: 'version'},
          // { name: '流程提交时间', property: 'createTime', formatter: v => v ? moment(v).format('YYYY-MM-DD hh:mm:ss') : '-'},
          // { name: '操作', property: 'operate', tdSlotName: 'operate' },
        ],
        getTableList: {
          type: 'component',
          fn: getUploadList
        }
      }
    }
  },
  methods: {
    toPrefixUrl,
    beforeUpload(file) {
      const arr = file.name.split('.')
      if ('bpmn'.indexOf(arr[arr.length - 1].toLowerCase()) < 0) {
        this.$message.error('仅支持如下格式的文件：bpmn')
        return false
      }
      // if (file.size / 1024 / 1024 > 200) {
      //   this.$message.error('上传文件不能超过200MB')
      //   return false
      // }
    },
    uploadBtn() {
    },
    clickDoc() {
      window.open(process.env.VUE_APP_API_HOST)
    },
    async uploadSuccessHandler(res) {
      if (res.code === '0') {
        this.$message.success('上传成功')
        this.$refs.listPage.getTableList()
      }
    },
  },
  mounted() {
  }
}
</script>

<style lang="stylus" scoped>
.p-btn-upload
  display inline-block
  margin-right 20px
</style>
