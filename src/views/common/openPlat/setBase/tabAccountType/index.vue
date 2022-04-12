<template lang="pug">
div
  Card(noTitle useFor='search')
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
    .p-table-header-btns
      el-button(
        type='primary'
        :loading='tableState.loading'
        @click='clickCreate'
      ) 新增账户类型
    //- table
    Table(
      :dataSource='tableState.dataSource'
      :columns='columns'
      :loading='tableState.loading'
    )
      template(slot='useRuleTh' slot-scope='{column}')
        span {{ column.label }}
        el-tooltip
          div(
            slot='content'
            style='width: 200px;'
          ) 首次为客户开通对应的账户时，此配置将作为开通后的默认配置，您也可以进入下游账户配置菜单，针对不同的客户进行不同的配置。
          i.el-icon-info
      template(slot='operate' slot-scope='{row}')
        //- 操作 停用、启用、编辑
        BtnStop.p-mg-r-20(
          v-if='row.type !== 0 && row.status === 1'
          :rowData='row'
          @success='searchFormHandle'
        )
        BtnActive.p-mg-r-20(
          v-if='row.status === 2'
          :rowData='row'
          @success='searchFormHandle'
        )
        el-button(
          type='text'
          @click='clickEdit(row)'
        ) 编辑
    Pagination(:pagination='tableState.pagination')
  DialogEdit(
    :visible='dialogEdit.visible'
    :mode='dialogEdit.mode'
    :accountType='dialogEdit.accountType'
    :editData='dialogEdit.editData'
    @close='dialogEdit.visible=false'
    @success='saveAccountSuccess'
  )
</template>

<script>
import { ref, reactive, toRefs } from '@vue/composition-api'
import { MessageBox } from 'element-ui'
import Form from '@/components/qjd/form'
import Table from '@/components/qjd/table'
import Pagination from '@/components/qjd/pagination'
import Card from '@/components/Card'
import useForm from 'hooks/useForm'
import useTable from 'hooks/useTable'
import ajaxStore from '@/apis'
import BtnStop from './btnStop'
import BtnActive from './btnActive'
import DialogEdit from './dialogEdit/index'
import { formData, formConfig, columns } from './config'
export default {
  components: {
    Form,
    Table,
    Pagination,
    Card,
    BtnStop,
    BtnActive,
    DialogEdit,
  },
  setup() {
    const formRef = ref()
    // form
    const formState = useForm({
      formRef,
      formData,
      formConfig
    })
    // table & page
    const tableState = useTable({
      request: ajaxStore.factory.finance.getAccountTypeList,
    })

    // 查询
    const searchFormHandle = () => formState.submitHandle(tableState.searchHandle)
    // 重置
    const resetFormHandle = () => {
      formState.resetHandle()
      tableState.resetHandle()
    }

    // state
    const state = reactive({
      formState,
      tableState,
      dialogEdit: {
        visible: false,
        mode: '',
        accountType: '',
        editData: {}
      },
    })

    // 点击新增
    const clickCreate = (row) => {
      // 是否为内置账户
      const isBaseAccount = tableState.pagination.total <= 0
      if (isBaseAccount) {
        MessageBox.confirm('首次创建账户类型时，需先初始化基础账户类型，是否继续？', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          state.dialogEdit.mode = 'first'
          state.dialogEdit.accountType = '0'
          state.dialogEdit.visible = true
        })
      } else {
        state.dialogEdit.mode = 'create'
        state.dialogEdit.accountType = '1'
        state.dialogEdit.visible = true
      }
    }

    // 点击编辑
    const clickEdit = (row) => {
      state.dialogEdit.mode = 'edit'
      state.dialogEdit.accountType = String(row.type)
      state.dialogEdit.editData = {
        id: row.id,
        accountTypeName: row.accountTypeName,
        accountTypeExtCode: row.accountTypeExtCode,
        useRule: String(row.useRule),
      }
      state.dialogEdit.visible = true
    }

    // 保存账户类型成功
    const saveAccountSuccess = () => {
      state.dialogEdit.visible = false
      searchFormHandle()
    }
    return {
      formRef,
      columns,
      ...toRefs(state),
      searchFormHandle,
      resetFormHandle,
      clickCreate,
      clickEdit,
      saveAccountSuccess,
    }
  }
}
</script>

<style lang="stylus" scoped>
.p-mg
  margin-top 10px
.p-mg-r-20
  margin-right 10px
.p-table-header-btns
  margin-bottom 20px
</style>
