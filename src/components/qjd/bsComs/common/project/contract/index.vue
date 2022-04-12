<template lang="pug">
div
  Table(
    :rowKey="'_id'"
    :dataSource="tableApis.dataSource"
    :columns="columns"
    @buttonHandle="({ row }) => tableApis.deleteDataSource(row._id)"
  )
    template(slot="files" slot-scope="{ row }")
      Upload(
        :defaultFileList="row.defaultFileList"
        :action="uploadApis.action"
        :accept="'.zip,.doc,.docx,.pdf,.jpg'"
        @onPreview="uploadApis.onPreview"
        @onChange="({ files }) => uploadApis.onChange(files, row)"
        @onRemove="({ files }) => uploadApis.onRemove(files, row)"
      )
        el-tooltip(slot="trigger" placement="top" :content="'支持格式：.zip,.doc,.docx,.pdf,.jpg'")
          el-button 点击上传
  .table-add(@click="addHandle")
    span 继续添加
</template>
<script>
import { reactive, toRefs } from '@vue/composition-api'
import Table from '@/components/qjd/table/index.vue'
import Upload from '@/components/qjd/upload/index.vue'
import useTable from 'hooks/useTable'
import { columns, dataSample } from './config'
import useUpload from './useUpload'
import { getDaterange } from '@/utils/qjd'

export default {
  components: {
    Table,
    Upload
  },
  setup() {
    // table
    const tableApis = useTable({ request: [], isPage: false, editDataSource: true })
    // useUpload
    const uploadApis = useUpload()
    // 添加
    const addHandle = () => tableApis.addDataSource(dataSample)
    // 获取数据
    const getDataSource = () => {
      const dataSource = tableApis.dataSource.filter(item => Object.keys(item).some(key => {
        if (Array.isArray(item[key])) {
          return item[key].length && key !== '_id'
        } else {
          return (!!item[key] || item[key] === 0) && key !== '_id'
        }
      }))
      dataSource && dataSource.length && dataSource.forEach(item => {
        const { start, end } = getDaterange(item?.time)
        item.invalidTime = end
        item.validTime = start
        if (item.files && item.files.length) {
          item.projectContractFileList = item.files.map(file => {
            const { fileName, key } = file?.response ?? {}
            return { fileType: 1, fileName, fileKey: key }
          })
        } else {
          item.projectContractFileList = null
        }
      })
      return dataSource ?? []
    }
    // state
    const state = reactive({ tableApis, uploadApis })

    return {
      columns,
      addHandle,
      getDataSource,
      ...toRefs(state)
    }
  }
}
</script>
<style lang="stylus" scoped>
.table-add
  height 47px
  line-height 47px
  padding-left 20px
  color #3b68f0
  border: 1px solid #ebeef5
  border-top: 0 none
  cursor pointer
</style>

