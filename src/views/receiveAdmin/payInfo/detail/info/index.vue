<template lang="pug">
el-drawer(
  :title="title"
  :visible.sync="visible"
  :direction="'rtl'"
  :before-close="cancleHandle"
  :destroy-on-close="true"
  :wrapperClosable="false"
)
  el-scrollbar(style="width: 100%; height: 100%; padding-bottom: 80px;")
    .detail_title 计划信息
    .detail_info
      .detail_label 款项编号：
      .detail_value {{ detail ? detail.receivablePlanItemCode : '' }}
    .detail_info
      .detail_label 款项类型：
      .detail_value {{ detail ? detail.fundTypeName : '' }}
    .detail_info
      .detail_label 计划应收时间：
      .detail_value {{ detail && detail.planEndDate ? getDate(detail.planEndDate) : '' }}
    .detail_info
      .detail_label 计划应收金额：
      .detail_value {{ detail && detail.receivableAmount ? percent2(detail.receivableAmount) : '' }}
    .detail_info
      .detail_label 应收金额占比：
      .detail_value {{ detail && (detail.receivableProportion || detail.receivableProportion === 0) ? `${percent2(detail.receivableProportion)}%` : '' }}
    .detail_info
      .detail_label 添加方式：
      .detail_value {{ detail ? detail.createType === 1 ? '手动添加' : '导入应收方案' : '' }}
    .detail_info
      .detail_label 应收方案：
      .detail_value {{ detail ? detail.receivableSolutionName : '' }}
    .detail_info
      .detail_label 收款条件：
      .detail_value {{ detail ? detail.paymentConditions : '' }}
    .detail_info
      .detail_label 付款方式：
      .detail_value {{ detail ? detail.paymentTypeName : '' }}
    .detail_info
      .detail_label 应收备注：
      .detail_value {{ detail ? detail.memo : '' }}
    .detail_info
      .detail_label 附件：
      .detail_value
        .file_list(
          v-for="(item, index) in (detail && detail.saArmBusinessFileList ? detail.saArmBusinessFileList : [])"
          :key="index"
          @click="() => onPreview(item.fileKey)"
        ) {{ item.fileName }}
    .detail_title 调整记录
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
    .detail_title 收款记录
    Table(
      :columns="receiveColumns"
      :dataSource="receiveTableApis.dataSource"
      :loading="receiveTableApis.loading"
    )
      template(slot="files" slot-scope="{ row }")
        .file_list(
          v-for="(item, index) in row.saArmBusinessFileList || []"
          :key="index"
          @click="() => onPreview(item.fileKey)"
        ) {{ item.fileName }}
  .sure_box
    el-button(@click="cancleHandle") 关闭
</template>
<script>
import ajaxStore from '@/apis'
import useTable from 'hooks/useTable'
import { reactive, toRefs, watch } from '@vue/composition-api'
import { toPrefixUrl } from '@/utils/util'
import { getDate, percent2 } from '@/utils/qjd'
import Table from '@/components/qjd/table'
import { columns, receiveColumns } from './config'

export default {
  props: {
    title: String,
    visible: Boolean,
    detail: {
      type: Object,
      default: () => ({})
    },
    type: String
  },
  components: {
    Table
  },
  setup(props, { emit }) {
    // ajax
    const { receive: { getRecord, getPayRecord } } = ajaxStore
    // 获取调整记录
    const tableApis = useTable({
      request: getRecord,
      isInit: false,
      isPage: false,
      callback: res => ({
        dataSource: res ?? []
      })
    })
    // 获取收款记录
    const receiveTableApis = useTable({
      request: getPayRecord,
      isInit: false,
      isPage: false,
      callback: res => ({
        dataSource: res ?? []
      })
    })
    // useApis
    const apiApis = {}
    // 取消
    const cancleHandle = () => emit('cancleHandle')
    // 预览
    const onPreview = fileKey => window.open(toPrefixUrl(`/fs/file/download?fileKey=${fileKey}`))
    // watch
    watch(
      () => props.visible,
      val => {
        if (val) {
          tableApis.searchHandle({ sourcePlanItemId: props?.detail?.id })
          receiveTableApis.searchHandle({ receivablePlanItemId: props?.detail?.id })
        }
      }
    )
    // state
    const state = reactive({ apiApis, tableApis, receiveTableApis })

    return {
      columns,
      receiveColumns,
      cancleHandle,
      onPreview,
      toPrefixUrl,
      getDate,
      percent2,
      ...toRefs(state)
    }
  },
}
</script>
<style lang="stylus" scoped>
.detail_title
  padding: 10px 0
  border-bottom: 1px solid #f7f7f7
  margin-bottom 10px
/deep/.el-drawer
  width: 800px !important
/deep/ #el-drawer__title
  font-size 14px
.detail_info
  display: flex
  font-size: 12px;
  font-weight: 400;
  line-height: 16px
  color: var(--fontColor);
  margin-bottom: 10px
  .detail_label
    color: #848484;
    width: 86px
.sure_box
  position: absolute
  bottom: 0
  left: -20px
  width: calc(100% + 40px);
  height: 60px;
  background: #FFFFFF;
  box-shadow: 0px -2px 6px 0px rgba(51, 75, 133, 0.2);
  border: 1px solid #ECEDF1;
  box-sizing: border-box
  display: flex
  justify-content: center
  align-items: center
.file_list
  color: #3B68F0
  margin-bottom: 5px
  cursor pointer
</style>
