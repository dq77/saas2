<template lang="pug">
.page-main
  //- 提示
  PromptInfo(:title="'通过库存盘点功能，您可以对各仓库的产品库存数量进行盘点调整'")
  //- form
  Form.golbal_search_box(
    ref="formRef"
    :formData="formApis.formData",
    :formConfig="formApis.formConfig"
  )
    .global-search-btn-feed
      el-button.search-button(
        type="primary"
        :loading="tableApis.loading"
        @click="currentApis.searchFormHandle"
      ) 搜索
      el-button.search-button(@click="currentApis.resetFormHandle") 重置
  div(style="background: #fff; padding: 20px;")
    //- 新建盘点
    el-button(
      type="primary"
      style="margin-bottom: 20px;"
      @click="currentApis.createHandle"
    ) 新建盘点
    //- table
    Table(
      :dataSource="tableApis.dataSource"
      :columns="columns"
      :loading="tableApis.loading"
    )
      template(slot='operate' slot-scope='{row}')
        Operate(
          :dataSource="row"
          :tableApis="tableApis"
        )
    //- 分页
    Pagination(:pagination="tableApis.pagination")
  //- Modal
  Modal(
    :visible="modalApis.visible"
    :title="modalApis.title"
    :options="currentApis.result"
    @cancleHandle="modalApis.cancleHandle"
  )
</template>
<script>
import { reactive, ref, toRefs } from '@vue/composition-api'
import PromptInfo from '../../Components/PromptInfo.vue'
import Form from '@/components/qjd/form/index.vue'
import Table from '@/components/qjd/table/index.vue'
import Pagination from '@/components/qjd/pagination/index.vue'
import Operate from './components/operate.vue'
import useForm from 'hooks/useForm'
import useTable from 'hooks/useTable'
import ajaxStore from '@/apis'
import useCurrent from './useCurrent'
import { columns, formConfig, formData } from './config'
// 新建盘点选择仓库
import Modal from './components/modal/index.vue'
import useModal from './components/modal/useModal'

export default {
  components: {
    PromptInfo,
    Form,
    Table,
    Pagination,
    Operate,
    Modal
  },
  setup(props, { root: { $router } }) {
    // ref
    const formRef = ref()
    // ajax
    const { factory: { getInvenToryList } } = ajaxStore
    // form
    const formApis = useForm({ formRef, formData, formConfig })
    // table & page
    const tableApis = useTable({ request: getInvenToryList })
    // useModal
    const modalApis = useModal()
    // useCurrent
    const currentApis = useCurrent({ formApis, tableApis, modalApis })
    // state
    const state = reactive({ formApis, tableApis, currentApis, modalApis })

    return {
      formRef,
      columns,
      ...toRefs(state)
    }
  }
}
</script>
