<template lang="pug">
el-drawer(
  :title="title"
  :visible.sync="visible"
  :direction="'rtl'"
  :before-close="cancleHandle"
  :destroy-on-close="true"
  :wrapperClosable="false"
)
  .detail_info
    .detail_label 款项编号：
    .detail_value {{ apiApis.detailInfo.receivablePlanItemCode }}
  .detail_info
    .detail_label 款项类型：
    .detail_value {{ apiApis.detailInfo.fundTypeName }}
  .detail_info
    .detail_label 添加方式：
    .detail_value {{ apiApis.detailInfo.createType === 1 ? '手动添加' : '导入应收方案' }}
  .detail_info
    .detail_label 应收方案：
    .detail_value {{ apiApis.detailInfo.receivableSolutionName || '- -' }}
    customInfo(v-if="apiApis.detailInfo.receivableSolutionName")
      div 收款周期：{{ apiApis.detailInfo.receivableCycle }}
      div 应收比例：{{ apiApis.detailInfo.solutionCodeProportion || apiApis.detailInfo.solutionCodeProportion === 0 ? `${percent2(apiApis.detailInfo.solutionCodeProportion)}%` : '' }}
  .detail_info
    .detail_label 计划应收时间：
    .detail_value {{ apiApis.detailInfo.planEndDate ? getDate(apiApis.detailInfo.planEndDate) : '' }}
  .detail_info
    .detail_label 计划应收比例：
    .detail_value {{ apiApis.detailInfo.receivableProportion || apiApis.detailInfo.receivableProportion === 0 ? `${percent2(apiApis.detailInfo.receivableProportion)}%` : '' }}
  .detail_info
    .detail_label 计划应收金额：
    .detail_value {{ apiApis.detailInfo.receivableAmount ? percent2(apiApis.detailInfo.receivableAmount) : '' }}
  .detail_info
    .detail_label 收款条件：
    .detail_value {{ apiApis.detailInfo.paymentConditions }}
  .detail_info
    .detail_label 付款方式：
    .detail_value {{ apiApis.detailInfo.paymentTypeName }}
  .detail_info
    .detail_label 备注：
    .detail_value {{ apiApis.detailInfo.memo }}
  .detail_info
    .detail_label 附件：
    .detail_value
      .file_list(
        v-for="(item, index) in apiApis.detailInfo.saArmBusinessFileList || []"
        :key="index"
        @click="() => onPreview(item.fileKey)"
      ) {{ item.fileName }}
  .sure_box
    el-button(@click="cancleHandle") 关闭
</template>
<script>
import { watch, reactive, toRefs } from '@vue/composition-api'
import customInfo from '../../../customInfo'
import useApis from '../addModal/useApis'
import { toPrefixUrl } from '@/utils/util'
import { getDate, percent2 } from '@/utils/qjd'

export default {
  components: {
    customInfo
  },
  props: {
    title: String,
    visible: Boolean,
    detail: {
      type: Object,
      default: () => ({})
    },
    type: String
  },
  setup(props, { emit }) {
    // useApis
    const apiApis = useApis()
    // 取消
    const cancleHandle = () => emit('cancleHandle')
    // 监听弹出展示
    watch(
      () => props.visible,
      value => {
        if (value) {
          const { id } = props?.detail ?? {}
          id && apiApis.getDetail({ saArmReceivablePlanItemId: id })
        }
      }
    )
    // 预览
    const onPreview = fileKey => window.open(toPrefixUrl(`/fs/file/download?fileKey=${fileKey}`))
    // state
    const state = reactive({ apiApis })

    return {
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
/deep/.el-drawer
  width: 500px !important
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
