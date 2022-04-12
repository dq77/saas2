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
    //- 新建还款、批量导入等按钮操作
    Operate(
      @createCreditHandle="createCreditState.openHandle"
      @leadHandle="uploadState.openHandle"
      @operateRecordHandle="recordState.openHandle"
      @closeHandle="closeHandle"
      :dataSource="checkBoxState.selectDatas"
    )
    div(style="padding: 20px;")
      //- list
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
        //- 还款周期编辑
        template(slot='debtPeriodDays' slot-scope='{row}')
          EditCycle(
            :dataSource="row"
            @clickEdit="clickEdit"
          )
        template(slot="backAmount" slot-scope="{ row }")
          //- 处理无法出发验证的问题
          //- span(style="position: absolute; left: -100000000px") {{ checkBoxState.isError }}
          span(v-if="!row.isCheck") {{ percent2(row.leftLoanAmount) }}
          .custom-slot(v-else)
            el-input-number(
              :class="row.isError ? 'custom_error' : ''"
              style="width: 100%;"
              v-model="row.backAmount"
              :max="row.leftLoanAmount ? row.leftLoanAmount : 0"
              :min="0"
              :precision="2"
              @change="() => checkBoxState.validate(row)"
            )
            span.custom_error_info(v-show="row.isError") 请填写退款金额
    //- 分页
    Pagination(:pagination="tableState.pagination")
  //- 修改还款周期
  CycleModal(
    :title="cycleState.title"
    :visible="cycleState.visible"
    :detail="cycleState.detail"
    @cancleHandle="cycleState.cancleHandle"
    @successHandle="tableState.searchHandle(tableState.searchInfo)"
  )
  //- 新建还款-modal
  CreateCredit(
    :title="createCreditState.title"
    :visible="createCreditState.visible"
    @cancleHandle="createCreditState.cancleHandle"
    @successHandle="() => tableState.searchHandle(tableState.searchInfo)"
  )
  //- 批量导入-modal
  UploadModal(
    :title="uploadState.title"
    :visible="uploadState.visible"
    @cancleHandle="uploadState.cancleHandle"
  )
  //- 操作记录-modal
  RecordModal(
    :title="recordState.title"
    :visible="recordState.visible"
    @cancleHandle="recordState.cancleHandle"
  )
  //- 批量退款确定
  SureModal(
    :title="sureState.title"
    :visible="sureState.visible"
    :detail="sureState.detail"
    @cancleHandle="sureState.cancleHandle"
    @successHandle="() => tableState.searchHandle(tableState.searchInfo)"
  )
</template>
<script>
import { reactive, ref, toRefs } from '@vue/composition-api'
import Form from '@/components/qjd/form'
import Table from '@/components/qjd/table'
import Pagination from '@/components/qjd/pagination'
import EditCycle from './components/editCycle'
import useForm from 'hooks/useForm'
import useTable from 'hooks/useTable'
import ajaxStore from '@/apis'
import { columns, cFormConfig, cFormData } from './config'
import { percent2, uppertoline } from '@/utils/qjd'
import { orderVals } from '@/consts'
import { weblogsDom } from '@/utils/qjd/weblogs'
// 个按钮操作组件
import Operate from './components/operate.vue'
// 还款周期修改
import CycleModal from './cycleModal/index.vue'
import useCycle from './cycleModal/useCycle'
// 新建还款
import CreateCredit from './createCredit/index.vue'
import useCreateCredit from './createCredit/useCreateCredit'
// 批量导入
import UploadModal from './uploadModal/index.vue'
import useUpload from './uploadModal/useUpload'
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
    CycleModal,
    EditCycle,
    Operate,
    CreateCredit,
    UploadModal,
    RecordModal,
    SureModal
  },
  setup(props, { root }) {
    // root
    const { $route: { query: { date } } } = root
    // ref
    const formRef = ref()
    // ajax
    const { credit: { getCreditRepayList } } = ajaxStore
    // form
    const formState = useForm({
      formRef,
      formData: cFormData,
      formConfig: cFormConfig
    })
    // 若router携带参数，设置表单信息
    date && formState.setFormItem('endTime', [date, date])
    // 新建用信-modal
    const createCreditState = useCreateCredit()
    // 批量上传-modal
    const uploadState = useUpload()
    // 操作记录-modal
    const recordState = useRecord()
    // table & page
    const tableState = useTable({
      request: getCreditRepayList,
      defaultParams: date ? { debtEndStartDate: date, debtEndEndDate: date } : {},
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
    // modal
    const cycleState = useCycle()
    // 查询
    const searchFormHandle = () => formState.submitHandle().then(() => {
      const { formData: { goodTime, endTime, ...others } } = formState
      let params = {}
      if (goodTime && goodTime.length) {
        params.deliveryStartDate = goodTime[0]
        params.deliveryEndDate = goodTime[1]
      }
      if (endTime && endTime.length) {
        params.debtEndStartDate = endTime[0]
        params.debtEndEndDate = endTime[1]
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
      weblogsDom('还款列表-查看')
      root.$router.push({ name: 'repayMentDetail', params: { id } })
    }
    // 批量关单
    const closeHandle = () => {
      const { selectDatas, validate } = checkBoxState
      if (!validate()) return
      sureState.openHandle()
      sureState.setDetail(selectDatas || [])
    }
    // 编辑还款周期
    const clickEdit = row => cycleState.cycleEditHandle(row || {})
    // state
    const state = reactive({
      formState,
      tableState,
      cycleState,
      createCreditState,
      uploadState,
      recordState,
      checkBoxState,
      sureState
    })

    return {
      formRef,
      columns,
      searchFormHandle,
      resetFormHandle,
      buttonHandle,
      clickEdit,
      closeHandle,
      percent2,
      sortChange,
      ...toRefs(state)
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
