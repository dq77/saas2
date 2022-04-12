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
      ) 新增仓库
    //- table
    Table(
      :dataSource='tableState.dataSource'
      :columns='columns'
      :loading='tableState.loading'
    )
      template(slot='operate' slot-scope='{row}')
        //- 操作 停用、启用、编辑
        BtnStop.p-mg-r-20(
          v-if='row.status === 1'
          :rowData='row'
          @success='searchFormHandle'
        )
        BtnActive.p-mg-r-20(
          v-if='row.status === 0'
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
      request: ajaxStore.factory.setBase.getWarehouseList,
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
        editData: {}
      },
    })

    // 点击新增
    const clickCreate = (row) => {
      state.dialogEdit.mode = 'create'
      state.dialogEdit.visible = true
    }

    // 点击编辑
    const clickEdit = (row) => {
      state.dialogEdit.mode = 'edit'
      const { id, name, code, provinceCode, cityCode, regionCode, detailAddress } = row
      state.dialogEdit.editData = {
        id: id,
        name: name,
        code: code,
        address: regionCode ? [provinceCode, cityCode, regionCode] : [provinceCode, cityCode],
        detailAddress: detailAddress,
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
