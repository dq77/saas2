<template lang="pug">
Modal(
  :title="title"
  :visible="visible"
  :width="'820px'"
  :footer="'custom'"
  @cancleHandle="cancleHandle"
)
  Table(
    :columns="columns"
    :dataSource="tableApis.dataSource"
    :loading="tableApis.loading"
  )
    template(slot="files" slot-scope="{ row }")
      .file_list(
        v-for="(item, index) in row.saArmBusinessFileList || []"
        :key="index"
        @click="() => onPreview(item.fileKey)"
      ) {{ item.fileName }}
  template(slot="footer")
    .custom_modal_footer(style="justify-content: center;")
      el-button(@click="cancleHandle") 关闭
</template>
<script>
import { toRefs, reactive, watch } from '@vue/composition-api'
import ajaxStore from '@/apis'
import Modal from '@/components/qjd/modal'
import Table from '@/components/qjd/table'
import useTable from 'hooks/useTable'
import { columns } from './config'
import { toPrefixUrl } from '@/utils/util'

export default {
  components: {
    Modal,
    Table
  },
  props: {
    title: String,
    visible: Boolean,
    detail: {
      type: Object,
      default: () => ({})
    },
  },
  setup(props, { emit }) {
    // ajax
    const { receive: { getRecord } } = ajaxStore
    // table
    const tableApis = useTable({
      request: getRecord,
      isInit: false,
      isPage: false,
      callback: res => ({
        dataSource: res ?? []
      })
    })
    // 预览
    const onPreview = fileKey => window.open(toPrefixUrl(`/fs/file/download?fileKey=${fileKey}`))
    // 取消
    const cancleHandle = () => emit('cancleHandle')
    // state
    const state = reactive({ tableApis })
    // watch
    watch(
      () => props.visible,
      value => {
        if (value) {
          tableApis.searchHandle({ sourcePlanItemId: props?.detail?.id })
        }
      }
    )

    return {
      columns,
      cancleHandle,
      onPreview,
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
.file_list
  color: #3B68F0
  margin-bottom: 5px
  cursor pointer
</style>
