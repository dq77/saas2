<template lang="pug">
.page-main
  //- 提示
  PromptInfo(:title="'通过库存调拨功能，您可以实现跨仓库对产品进行调拨，实现产品库存调整'")
  //- form
  Form.golbal_search_box(
    ref="formRef"
    :formData="formApis.formData",
    :formConfig="formApis.formConfig"
  )
    .global-search-btn
      el-button.search-button(
        type="primary"
        :loading="tableApis.loading"
        @click="currentApis.searchFormHandle"
      ) 搜索
      el-button.search-button(@click="currentApis.resetFormHandle") 重置
  div(style="background: #fff; padding: 20px;")
    //- 新建调拨
    el-button(
      type="primary"
      style="margin-bottom: 20px;"
      @click="currentApis.createHandle"
    ) 新建调拨
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
          @inHandle="inHandle"
        )
    //- 分页
    Pagination(:pagination="tableApis.pagination")
  //- Modal
  Modal(
    :visible="modalApis.visible"
    :title="modalApis.title"
    :detail="modalApis.detail"
    @cancleHandle="modalApis.cancleHandle"
    @successHandle="tableApis.searchHandle(tableApis.searchInfo)"
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
import { columns, formConfig, formData } from './config'
import useCurrent from './useCurrent'
// 调入
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
  setup(props) {
    // ref
    const formRef = ref()
    // ajax
    const { factory: { getTransfersList } } = ajaxStore
    // form
    const formApis = useForm({ formRef, formData, formConfig })
    // table & page
    const tableApis = useTable({ request: getTransfersList })
    // useModal
    const modalApis = useModal()
    // useCurrent
    const currentApis = useCurrent({ formApis, tableApis })
    // 调入
    const inHandle = dataSource => {
      modalApis.openHandle()
      modalApis.setDetail({ id: dataSource?.id, time: dataSource?.businessOutDatetime})
    }
    // state
    const state = reactive({ formApis, tableApis, currentApis, modalApis })

    return {
      formRef,
      columns,
      inHandle,
      ...toRefs(state)
    }
  }
}
</script>
