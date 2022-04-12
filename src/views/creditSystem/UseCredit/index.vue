<template lang="pug">
.page-main
  //- form
  Form.golbal_search_box(
    ref="formRef"
    :formData="formState.formData",
    :formConfig="formState.formConfig"
  )
    .global-search-btn
      el-button.search-button(type="primary", @click="searchFormHandle", :loading="tableState.loading") 搜索
      el-button.search-button(@click="resetFormHandle") 重置
  div(style="background: #fff;")
    //- 新建用信、批量导入等按钮操作
    Operate(
      @createCreditHandle="createCreditState.openHandle"
      @leadHandle="uploadState.openHandle"
      @operateRecordHandle="recordState.openHandle"
      @closeHandle="closeHandle"
      :dataSource="checkBoxState.selectDatas"
      :checkInfo="checkInfo"
    )
    //- table
    div(style="padding: 20px;")
      Table(
        :dataSource="tableState.dataSource"
        :columns="columns"
        :loading="tableState.loading"
        :checkbox="true"
        :reserveSelection="false"
        @buttonHandle="buttonHandle"
        @selectHandle="checkBoxState.selectHandle"
        @selectionHandle="checkBoxState.selectionHandle"
        @selectAll="checkBoxState.selectAll"
        @sortChange="sortChange"
      )
        template(slot="orderCloseAmount" slot-scope="{ row }")
          //- 处理无法出发验证的问题
          //- span(style="position: absolute; left: -100000000px") {{ checkBoxState.isError }}
          span(v-if="!row.isCheck") {{ percent2(row.availableOrderCloseAmount) }}
          .custom-slot(v-else)
            el-input-number(
              :class="row.isError ? 'custom_error' : ''"
              style="width: 100%;"
              v-model="row.orderCloseAmount"
              :max="row.availableOrderCloseAmount ? row.availableOrderCloseAmount : 0"
              :min="0"
              :precision="2"
              @change="() => checkBoxState.validate(row)"
            )
            span.custom_error_info(v-show="row.isError") 请填写关单金额
    //- page
    Pagination(:pagination="tableState.pagination")
    //- 新建用信-modal
    CreateCredit(
      :title="createCreditState.title"
      :visible="createCreditState.visible"
      :setInfo="setInfo"
      :noticeInfo="noticeInfo"
      :checkInfo="checkInfo"
      @cancleHandle="createCreditState.cancleHandle"
      @successHandle="() => tableState.searchHandle(tableState.searchInfo)"
    )
    //- 批量导入-modal
    UploadModal(
      :title="uploadState.title"
      :visible="uploadState.visible"
      :setInfo="setInfo"
      :noticeInfo="noticeInfo"
      @cancleHandle="uploadState.cancleHandle"
    )
    //- 操作记录-modal
    RecordModal(
      :title="recordState.title"
      :visible="recordState.visible"
      @cancleHandle="recordState.cancleHandle"
    )
    //- 批量关单确定
    SureModal(
      :title="sureState.title"
      :visible="sureState.visible"
      :detail="sureState.detail"
      @cancleHandle="sureState.cancleHandle"
      @successHandle="() => tableState.searchHandle(tableState.searchInfo)"
    )
  //- 提示
  Notice(
    v-if="noticeInfo && noticeInfo.errorMsgList && noticeInfo.errorMsgList.length"
    :type="noticeInfo && noticeInfo.limitType ? noticeInfo.limitType === '1' ? 'warn' : noticeInfo.limitType === '2' ? 'error' : '' : ''"
    :member="noticeInfo ? noticeInfo.targetName : ''"
    :rules="noticeInfo ? noticeInfo.errorMsgList : []"
  )
</template>
<script>
import { reactive, ref, toRefs } from '@vue/composition-api'
import Notice from '@/components/qjd/notice'
import Form from '@/components/qjd/form'
import Table from '@/components/qjd/table'
import Pagination from '@/components/qjd/pagination'
import useForm from 'hooks/useForm'
import useTable from 'hooks/useTable'
import ajaxStore from '@/apis'
import { columns, cFormConfig, cFormData } from './config'
import { percent2, uppertoline } from '@/utils/qjd'
import { orderVals } from '@/consts'
import useAsync from 'hooks/useAsync'
import { weblogsDom } from '@/utils/qjd/weblogs'
// 个按钮操作组件
import Operate from './components/operate.vue'
// 批量导入
import UploadModal from './uploadModal/index.vue'
import useUpload from './uploadModal/useUpload'
// 新建用信
import CreateCredit from './createCredit/index.vue'
import useCreateCredit from './createCredit/useCreateCredit'
// 操作记录
import RecordModal from './recordModal/index.vue'
import useRecord from './recordModal/useRecord'
// table-checkbox
import useCheckbox from './useCheckbox'
// 批量关单确定
import SureModal from './sureModal/index.vue'
import useSure from './sureModal/useSure'

export default {
  components: {
    Form,
    Table,
    Pagination,
    CreateCredit,
    UploadModal,
    Operate,
    RecordModal,
    SureModal,
    Notice
  },
  setup(props, { root }) {
    const formRef = ref()
    const { credit: { getCreditManageList, checkBusinessRules } } = ajaxStore
    // 存储消息提示信息
    const noticeInfo = ref({})
    // form
    const formState = useForm({
      formRef,
      formData: cFormData,
      formConfig: cFormConfig
    })
    // 新建用信-modal
    const createCreditState = useCreateCredit()
    // 批量上传-modal
    const uploadState = useUpload()
    // 操作记录-modal
    const recordState = useRecord()
    // table & page
    const tableState = useTable({
      request: getCreditManageList,
      callback: data => {
        const { totalCount = 0, pagedRecords = [] } = data || {}
        return {
          totalCount,
          dataSource: pagedRecords.map(item => {
            return {
              isError: false,
              ...item
            }
          }) || []
        }
      }
    })
    // table-checkbox
    const checkBoxState = useCheckbox({ tableState })
    // 批量关单确定
    const sureState = useSure()
    // 设置消息提示信息
    const setInfo = value => { noticeInfo.value = value }
    // 查询
    const searchFormHandle = () => formState.submitHandle().then(() => {
      const { formData: { time, ...others } } = formState
      let params = {}
      if (time && time.length) {
        params.queryStartDate = time[0]
        params.queryEndDate = time[1]
      }
      params = { ...params, ...others }
      tableState.searchHandle(params)
    })
    // 重置
    const resetFormHandle = () => {
      formState.resetHandle()
      tableState.resetHandle()
    }
    // 排序
    const sortChange = ({ prop, order }) => tableState.searchHandle({ ...tableState.searchInfo, sortField: order ? uppertoline(prop) : null, sortBy: orderVals[order] })
    // 跳转详情
    const buttonHandle = ({ row: { id } }) => {
      // 埋点
      weblogsDom('用信列表-查看')
      root.$router.push({ name: 'useCreditDetail', params: { id } })
    }
    // 批量关单
    const closeHandle = () => {
      const { selectDatas, validate } = checkBoxState
      if (!validate()) return
      sureState.openHandle()
      sureState.setDetail(selectDatas || [])
    }
    // 消息提示接口
    const { doResult: checkInfo } = useAsync({
      init: false,
      isLoading: false,
      request: checkBusinessRules,
      successCallBack: ({ code, data }) => code === '0' && setInfo(data ?? {})
    })
    // state
    const state = reactive({
      formState,
      tableState,
      createCreditState,
      uploadState,
      recordState,
      checkBoxState,
      sureState,
      sortChange
    })

    return {
      formRef,
      columns,
      searchFormHandle,
      resetFormHandle,
      buttonHandle,
      closeHandle,
      percent2,
      checkInfo,
      setInfo,
      noticeInfo,
      ...toRefs(state),
    }
  },
}
</script>
<style lang="stylus" scoped>
.custom-slot
  position relative
  padding 16px 0
  .custom_error
    >>> input
      border-color #F56C6C
  .custom_error_info
    color #F56C6C
    position absolute
    bottom -5px
    left 0
    font-size 12px
</style>
