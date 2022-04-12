<template lang="pug">
.page-main
  PromptInfo(title='系统可支持您针对不同的项目，不同的产品去配置项目专属价格信息。在此页面中，找到您要配置价格的项目，然后点击“编辑项目价格”进行配置。')
  Card(noTitle style='margin-bottom: 10px;')
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
  Card(noTitle)
    //- table
    el-button(style='margin-bottom: 20px' type='primary' @click='toBatchImport') 批量导入
    Table(
      :dataSource='tableState.dataSource'
      :columns='columns'
      :loading='tableState.loading'
      @sortChange="sortChange"
    )
      template(slot='operate' slot-scope='{row}')
        //- 操作
        el-button(type='text' @click='seeHandle(row)' weblogs-anchor="supplyChain-factory-price-project-detail") 查看
        el-button(type='text' @click='editHandle(row)' weblogs-anchor="supplyChain-factory-price-project-edit") 编辑项目价格
    Pagination(:pagination='tableState.pagination')
</template>
<script>
import { reactive, ref, toRefs } from '@vue/composition-api'
import Form from '@/components/qjd/form'
import Table from '@/components/qjd/table'
import Pagination from '@/components/qjd/pagination'
import Card from '@/components/Card'
import useForm from 'hooks/useForm'
import useTable from 'hooks/useTable'
import ajaxStore from '@/apis'
import { columns, cFormConfig, cFormData } from './config'
import { uppertoline } from '@/utils/qjd'
import { orderVals } from '@/consts'
import Router from '@/router'
import PromptInfo from '../../Components/PromptInfo.vue'

export default {
  components: {
    Form,
    Table,
    Pagination,
    Card,
    PromptInfo
  },
  setup(props, { root }) {
    const formRef = ref()
    const { factory: { getProjectPriceList } } = ajaxStore
    // form
    const formState = useForm({
      formRef,
      formData: cFormData,
      formConfig: cFormConfig
    })
    // table & page
    const tableState = useTable({ request: getProjectPriceList })

    const seeHandle = (row) => root.$router.push({ name: 'projectPriceDetail', query: {projectId: row.id, projectName: row.name} })
    const editHandle = (row) => root.$router.push({ name: 'projectPriceEdit', query: {projectId: row.id, projectName: row.name} })
    // 查询
    const searchFormHandle = () => formState.submitHandle(tableState.searchHandle)
    // 重置
    const resetFormHandle = () => {
      formState.resetHandle()
      tableState.resetHandle()
    }
    // 产品数量排序
    const sortChange = ({ prop, order }) => {
      const key = `${orderVals[order]}s`
      tableState.searchHandle({...tableState.searchInfo, [key]: [uppertoline(prop)]})
    }
    const toBatchImport = () => { Router.push({ name: 'projectPriceImport' }) }
    // state
    const state = reactive({
      formState,
      tableState,
    })
    return {
      formRef,
      columns,
      ...toRefs(state),
      searchFormHandle,
      resetFormHandle,
      seeHandle,
      editHandle,
      sortChange,
      toBatchImport
    }
  },
}
</script>
