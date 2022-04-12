<template lang="pug">
.page-main
  //- form
  Form.golbal_search_box(
    ref="formRef"
    :formData="formApis.formData",
    :formConfig="formApis.formConfig"
  )
    .global-search-btn-feed
      el-button.search-button(type="primary", @click="searchHandle") 搜索
      el-button.search-button(@click="resetHandle") 重置
  //- 操作
  div(style="background: #fff")
    Operate(
      ref="operateRef"
      :search="search"
      :formApis="formApis"
      :statusOptions="statusOptions"
      @uploadPlain="uploadPlainApis.openHandle"
      @uploadPay="uploadPayApis.openHandle"
    )
    div(style="padding: 20px;")
      Table(
        :columns="columns"
        :dataSource="tableApis.dataSource"
        :loading="tableApis.loading"
      )
        //- 最后应收时间
        template(slot="time" slot-scope="{ row }")
          span(:style="`color: ${ getIsPass(row.debtEndTime) ? '#E95257' : '' }`") {{ row.debtEndTime }}
        //- 操作
        template(slot="operate" slot-scope="{ row }")
          el-button(type="text" v-if="permissions['PTN:RECEIVABLE:SEARCH_MANAGEMENT:VIEW_PALN']" @click="() => seeHandle(row)") 查看
          el-button(type="text" v-if="permissions['PTN:RECEIVABLE:SEARCH_MANAGEMENT:MODIFY_PALN'] && row.receivableType !== 99" @click="() => editHandle(row)") 编辑计划
          el-button(type="text" v-if="permissions['PTN:RECEIVABLE:PAYMENT_MANAGEMENT:MANAGE'] && row.receivableType !== 99" @click="() => addPay(row)") 添加收款
    Pagination(:pagination="tableApis.pagination")
  //- 批量导入应收计划
  BatchUpload(
    :title="uploadPlainApis.title"
    :visible="uploadPlainApis.visible"
    :isSelf="true"
    :kind="'plain'"
    @cancleHandle="uploadPlainApis.cancleHandle"
    @successHandle="successHandle"
  )
  //- 批量添加收款
  BatchUpload(
    :title="uploadPayApis.title"
    :visible="uploadPayApis.visible"
    :isSelf="true"
    :kind="'pay'"
    @cancleHandle="uploadPayApis.cancleHandle"
    @successHandle="successHandle"
  )
</template>
<script>
import { reactive, ref, toRefs } from '@vue/composition-api'
import store from '@/store'
import ajaxStore from '@/apis'
import useAsync from 'hooks/useAsync'
import Form from '@/components/qjd/form'
import useForm from 'hooks/useForm'
import { formConfig, formData, columns } from './config'
import Operate from './operate'
import Table from '@/components/qjd/table'
import useTable from 'hooks/useTable'
import Pagination from '@/components/qjd/pagination'
import { getIsPass } from '../utils'
// 批量导入应收计划 & 批量添加收款
import BatchUpload from '../components/upload/index.vue'
import useUpload from '../components/upload/useUpload'
// 操作指引
import useGuide from '@/hooks/receiveAdmin/useGuide'

export default {
  components: {
    Form,
    Operate,
    Table,
    Pagination,
    BatchUpload
  },
  setup(props, { root: { $router, $route: { query } } }) {
    // query
    const { isGuide, ...ortherParams } = query
    // store
    const { state: { permissions } } = store
    // ref
    const formRef = ref()
    const operateRef = ref()
    // ajax
    const { receive: { getPlainLIst, getStatus } } = ajaxStore
    // 操作指引
    const { addHandle } = useGuide()
    isGuide && addHandle({ businessType: 'check_receivables' })
    // methods
    const setFormItem = () => {
      const keys = Object.keys(ortherParams)
      keys.forEach(key => {
        formApis.setFormItem(key, String(ortherParams[key]))
      })
    }
    // form
    const formApis = useForm({
      formRef,
      formData,
      formConfig
    })
    // 表单赋值
    ortherParams && setFormItem()
    // 批量导入应收计划
    const uploadPlainApis = useUpload({ customTitle: '批量导入应收计划' })
    // 批量添加收款
    const uploadPayApis = useUpload({ customTitle: '批量添加收款' })
    // table
    const defaultParams = ortherParams || null
    const tableApis = useTable({ request: getPlainLIst, defaultParams })
    // table-查询
    const search = (params) => {
      const { searchInfo } = tableApis ?? {}
      tableApis && tableApis.searchHandle(Object.assign(searchInfo, params))
    }
    // 应收总状态
    const { result: statusOptions } = useAsync({
      request: getStatus,
      successCallBack: res => {
        const { code, data } = res ?? {}
        code === '0' && formApis.setConfig('status', 'options', data ?? [])
      }
    })
    // form-查询
    const searchHandle = () => {
      const { formData } = formApis
      search({ ...formData, pageNo: 1 })
    }
    // 重置
    const resetHandle = () => {
      $router.push({ name: 'InfoSearch' })
      formApis.resetFormData()
      // 清空默认参数
      tableApis.clearDefaultParams()
      const params = operateRef.value?.getSortParams() ?? {}
      tableApis && tableApis.resetHandle(params)
    }
    // 编辑计划
    const editHandle = row => $router.push({ name: 'AddPlain', query: { id: row?.id } })
    // 添加收款
    const addPay = row => $router.push({ name: 'PayDetail', query: { id: row?.id } })
    // 查看
    const seeHandle = row => $router.push({ name: 'InforSearchDetail', query: { id: row?.id } })
    // 批量上传成功
    const successHandle = () => search(tableApis.searchInfo)
    // state
    const state = reactive({ formApis, tableApis, uploadPlainApis, uploadPayApis })

    return {
      formRef,
      operateRef,
      columns,
      statusOptions,
      search,
      getIsPass,
      searchHandle,
      resetHandle,
      successHandle,
      editHandle,
      addPay,
      seeHandle,
      permissions,
      ...toRefs(state)
    }
  },
}
</script>
<style lang="stylus" scoped>
.custom_btns
  position: relative
  top -20px
</style>
