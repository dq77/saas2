<template lang="pug">
.page-main
  Card(noTitle noWrap)
    CompanyNameBar(
      style='height: 120px;'
      :companyName='customerName'
      :listData='sumState.listData'
      v-loading='sumState.Loading'
    )
  Card.p-mg(noTitle useFor='search')
    //- form
    Form(
      ref='formRef'
      :formData='formState.formData',
      :formConfig='formState.formConfig'
    )
      .global-search-btn
        el-button.search-button(
          type='primary'
          @click='searchFormHandle'
          :loading='tableState.loading'
        ) 搜索
        el-button.search-button(@click='resetFormHandle') 重置
  Card.p-mg(noTitle)
    //- table
    Table(
      :dataSource='tableState.dataSource'
      :columns='columns'
      :loading='tableState.loading'
    )
      template(slot='operate' slot-scope='{row}')
        //- 操作
        BtnOpen.p-mg-r-20(
          v-if='row.status === 0'
          :customerId='customerId'
          :rowData='row'
          @success='searchFormHandle'
        )
        BtnStop.p-mg-r-20(
          v-else-if='row.status === 1'
          :customerId='customerId'
          :rowData='row'
          @success='searchFormHandle'
        )
        template(v-else)
          BtnActive.p-mg-r-20(
            :customerId='customerId'
            :rowData='row'
            @success='searchFormHandle'
          )
        el-button.p-mg-r-20(v-if='row.status !== 0' type='text' @click='clickEdit(row)') 编辑
    Pagination(:pagination='tableState.pagination')
  DialogEdit(
    :visible='dialogEdit.visible'
    :editData='dialogEdit.editData'
    @close='dialogEdit.visible=false'
    @success='searchFormHandle'
  )
</template>
<script>
import { reactive, ref, toRefs } from '@vue/composition-api'
import Form from '@/components/qjd/form'
import Table from '@/components/qjd/table'
import Pagination from '@/components/qjd/pagination'
import Card from '@/components/Card'
import useForm from 'hooks/useForm'
import useTable from 'hooks/useTable'
import useAsync from 'hooks/useAsync'
import ajaxStore from '@/apis'
import CompanyNameBar from '@/views/SupplyChain/Factory/Finance/components/companyNameBar/index'
import BtnStop from './btnStop'
import BtnActive from './btnActive'
import BtnOpen from './btnOpen'
import DialogEdit from './dialogEdit'
import useSum from './useSum'
import { columns, getFormConfig, formData, companyListData } from './config'

export default {
  components: {
    Form,
    Table,
    Pagination,
    Card,
    CompanyNameBar,
    BtnStop,
    BtnActive,
    BtnOpen,
    DialogEdit,
  },
  setup(props, { root }) {
    const { customerId, customerName } = root.$route?.query
    const formRef = ref()
    // 模糊查询账户类型
    const { doResult: getAaccountTypeCodeList } = useAsync({
      request: ajaxStore.factory.finance.getAccountTypeAllList,
      init: false,
      params: {
        status: 1
      }
    })
    // form
    const formState = useForm({
      formRef,
      formData,
      formConfig: getFormConfig({
        getAaccountTypeCodeList: async (query) => {
          const res = await getAaccountTypeCodeList({ accountTypeName: query, customerId })
          if (res?.code === '0') {
            const options = res?.data.map(item => {
              return {
                label: item.accountTypeName,
                value: item.accountTypeCode
              }
            })
            formState.setConfig('accountTypeCode', 'options', options)
          }
        }
      })
    })
    // table & page
    const tableState = useTable({
      request: ajaxStore.factory.finance.getAccountConfigList,
      defaultParams: { customerId }
    })

    // 查询
    const searchFormHandle = () => formState.submitHandle(tableState.searchHandle)
    // 重置
    const resetFormHandle = () => {
      formState.resetHandle()
      tableState.resetHandle()
    }
    // 顶部统计
    const sumState = useSum({
      listData: companyListData,
      params: { customerId }
    })
    // state
    const state = reactive({
      customerName,
      formState,
      tableState,
      sumState,
      dialogEdit: {
        visible: false,
        editData: {}
      }
    })

    // 点击编辑
    const clickEdit = (row) => {
      state.dialogEdit.editData = {
        accountId: row.accounId,
        useRule: String(row.useRule),
        accountType: String(row.accountType),
      }
      state.dialogEdit.visible = true
    }
    return {
      customerId,
      formRef,
      columns,
      ...toRefs(state),
      searchFormHandle,
      resetFormHandle,
      clickEdit,
    }
  },
}
</script>

<style lang="stylus" scoped>
.p-mg
  margin-top 10px
.p-mg-r-20
  margin-right 20px
</style>
