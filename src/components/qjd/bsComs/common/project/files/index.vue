<template lang="pug">
.file_box
  .file_content(
    v-for="item in tableApis.dataSource"
    :key="item._id"
  )
    .file_item(
      @mouseover="_id = item._id"
      @mouseout="_id = null"
    )
      .file_title 项目文件类型：
      //- 删除
      i.el-icon-error.file_delete(
        v-show="_id === item._id"
        @click="tableApis.deleteDataSource(item._id)"
      )
      //- 项目文件类型
      el-select(v-model="item.fileType" @change="val => changeHandle(val, item)")
        el-option(
          v-for="(child, index) in fileList"
          :key="index"
          :label="child.dictName"
          :value="child.dictCode"
        )
      //- 上传文件
      Upload(
        style="width: 200px; margin-left: 20px"
        :defaultFileList="item.defaultFileList"
        :action="uploadApis.action"
        :accept="'.zip,.doc,.docx,.pdf,.jpg'"
        @onPreview="uploadApis.onPreview"
        @onChange="({ files }) => uploadApis.onChange(files, item)"
        @onRemove="({ files }) => uploadApis.onRemove(files, item)"
        :customBeforeUpload="() => customBeforeUpload(item)"
      )
        el-tooltip(slot="trigger" placement="top" :content="'支持格式：.zip,.doc,.docx,.pdf,.jpg'")
          el-button 点击上传
    .file_error(v-show="item.isError" style="color: #F56C6C; margin-left: 83px") 请选择文件类型
  //- 添加
  el-button(type="text" @click="addHandle") 添加文件
  //- 全部删除
  el-button(
    type="text"
    v-if="tableApis.dataSource.length"
    style="color: #F56C6C; margin-left: 238px"
    @click="tableApis.resetDataSource([])"
  ) 删除全部项目文件
</template>
<script>
import { ref, reactive, toRefs, computed } from '@vue/composition-api'
import ajaxStore from '@/apis'
import useAsync from 'hooks/useAsync'
import Upload from '@/components/qjd/upload/index.vue'
import useTable from 'hooks/useTable'
import { dataSample } from './config'
import useUpload from './useUpload'

export default {
  components: {
    Upload
  },
  setup() {
    // _id
    const _id = ref()
    // ajax
    const { common: { openPlat: { getDictListPage } } } = ajaxStore
    // 获取项目文件列表
    const { result } = useAsync({ request: getDictListPage, params: { pageNo: 1, pageSize: 1000, dictCategoryCode: 'project_contract_file_type' } })
    // 获取列表数据
    const fileList = computed(() => {
      return result.value?.pagedRecords ?? []
    })
    // table
    const tableApis = useTable({ request: [], isPage: false, editDataSource: true })
    // useUpload
    const uploadApis = useUpload({ tableApis })
    // 添加
    const addHandle = () => tableApis.addDataSource(dataSample)
    // changeHandle
    const changeHandle = (val, item) => {
      item.isError = !val
    }
    // customBeforeUpload
    const customBeforeUpload = item => {
      if (!item.fileType) {
        item.isError = true
        return false
      }
      return true
    }
    // 获取数据
    const getDataSource = () => {
      let error = false
      const dataSource = []
      tableApis.dataSource.forEach(item => {
        if (!item.fileType) {
          error = true
          item.isError = true
        } else {
          item.isError = false
        }
      })
      // 处理数据为后端需要的数据结构
      if (!error) {
        tableApis.dataSource.forEach(item => {
          const { files, fileType } = item ?? {}
          if (files && files.length) {
            files.forEach(file => {
              const { fileName, key } = file?.response ?? {}
              dataSource.push({ fileType, fileName, fileKey: key })
            })
          } else {
            dataSource.push({ fileType, fileName: null, fileKey: null })
          }
        })
      }

      return {
        error,
        dataSource
      }
    }
    // state
    const state = reactive({ tableApis, uploadApis })

    return {
      _id,
      fileList,
      changeHandle,
      addHandle,
      getDataSource,
      customBeforeUpload,
      ...toRefs(state)
    }
  }
}
</script>
<style lang="stylus" scoped>
.file_box
  padding 20px
.file_content
  margin-bottom: 20px
.file_item
  display: flex
  align-items: flex-start
  position relative
.file_delete
  font-size: 16px
  position: absolute
  left: 76px
  top: -5px
  z-index 9
  cursor pointer
.file_title
  height: 32px
  line-height: 32px
</style>
