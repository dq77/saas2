<!--  -->
<template lang="pug">
.box
  Form(ref="formRef" :formData="formState.formData" :formConfig="formState.formConfig")
    .global-search-btn
      el-button.search-button(
          type="primary"
          @click="tableState.searchHandle({dictCategoryCode: dictCategoryCode,dictName:formState.formData.dictName})"
        ) 搜索
  div(style="padding: 20px;")
    el-button(
      type="primary"
      style="margin-bottom: 20px;"
      @click="()=> modalState.handleEdit('新建字典数据',{dictCategoryCode},'add')"
    ) 新增
    //- table
    Table(
      :dataSource="tableState.dataSource"
      :columns="columns"
      :loading="tableState.loading"
    )
      template(slot='operate' slot-scope='{row}')
        el-button(type="text" @click="()=> modalState.handleEdit('编辑字典数据',{...row,dictCategoryCode},'edit')") 编辑
        el-button(type="text" v-if="row.dictStatus==='0'" @click="handelChangeStatus(row)") 启用
        el-button(type="text" v-else @click="handelChangeStatus(row)") 停用
    Pagination(:pagination="tableState.pagination")
    Modal(
    :visible="modalState.visible"
    :title="modalState.title"
    :detail="modalState.detail"
    :type="modalState.type"
    :createUrl="createDict"
    :updateUrl="updateDict"
    @cancleHandle="modalState.cancleHandle"
    @successHandle="tableState.searchHandle({dictCategoryCode: dictCategoryCode})"
    )
</template>

<script>
import { reactive, ref, toRefs, watch } from '@vue/composition-api'
import Form from '@/components/qjd/form'
import Table from '@/components/qjd/table'
import Pagination from '@/components/qjd/pagination'
import useForm from 'hooks/useForm'
import useTable from 'hooks/useTable'
import ajaxStore from '@/apis'
import Modal from './modal.vue'
import useModal from './useModal'
import { columns, cFormConfig, cFormData } from './config'
import { MessageBox, Message } from 'element-ui'
import useAsync from 'hooks/useAsync'

export default {
  components: {Form, Table, Pagination, Modal},
  props: {
    dictCategoryCode: {
      type: String,
      default: ''
    }
  },
  setup(props) {
    const formRef = ref()
    const modalState = useModal()
    const { getDictListPage, createDict, updateDict } = ajaxStore.common.openPlat
    const formState = useForm({
      formRef,
      formData: cFormData,
      formConfig: cFormConfig
    })
    const tableState = useTable({ request: getDictListPage, isInit: false })
    const handelChangeStatus = item => {
      const text = item.dictStatus === '1' ? '停用' : '启用'
      MessageBox.confirm(`确认${text}该字典项？`, '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(async () => {
        const {id} = item
        useAsync({
          request: updateDict,
          isLoading: false,
          params: {id, dictStatus: item.dictStatus === '1' ? '0' : '1'},
          successCallBack: ({code}) => {
            if (code === '0') {
              Message.success('修改成功')
              tableState.searchHandle({dictCategoryCode: props.dictCategoryCode})
            }
          }
        })
      })
    }
    const state = reactive({
      formState,
      tableState,
      modalState
    })
    // 初始化函数，父组件可调用
    const init = () => {
      tableState.clearHandle()
    }

    watch(
      () => props.dictCategoryCode,
      () => init()
    )
    return {
      ...toRefs(state),
      columns,
      createDict,
      updateDict,
      handelChangeStatus,
      init,
    }
  }
}

</script>
<style lang='stylus' scoped>
.box
  width 68%
  min-height 719px
  background #FFFFFF
  box-shadow 0px 8px 16px 0px rgba(0, 0, 0, 0.05)
  border 1px solid #EAEBEE
  padding 20px
</style>
