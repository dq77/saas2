<template lang="pug">
el-drawer(
  :title="title"
  :visible="visible"
  :direction="'rtl'"
  :before-close="cancleHandle"
)
  el-scrollbar(style="width: 100%; height: 100%; padding-bottom: 80px;")
    div(style="padding: 0 20px;")
      Form(
        ref="formRef"
        :formData="formApis.formData",
        :formConfig="formApis.formConfig"
        :inline="false"
        :labelPosition="'right'"
        :labelWidth="'60px'"
      )
      .search_box
        el-button(@click="resetHandle") 重置
        el-button(type="primary" @click="searchHandle") 搜索
      div
        .title 筛选结果
        Table(
          :dataSource="tableApis.dataSource"
          :columns="columns"
          :loading="tableApis.loading"
        )
          template(slot="radio" slot-scope="{ row }")
            el-radio(v-model="radioVal" :label="row.id" @change="() => change(row)") &nbsp;
        //- 分页
        Pagination(:pagination="tableApis.pagination")
  .sure_box
    el-button(@click="cancleHandle") 取消
    el-button(type="primary" @click="sureHandle") 确定
</template>
<script>
import { reactive, ref, toRefs, watch } from '@vue/composition-api'
import ajaxStore from '@/apis'
import Form from '@/components/qjd/form'
import Table from '@/components/qjd/table/index.vue'
import Pagination from '@/components/qjd/pagination/index.vue'
import useForm from 'hooks/useForm'
import useTable from 'hooks/useTable'
import { formData, formConfig, columns } from './config'
import { Message } from 'element-ui'

export default {
  components: {
    Form,
    Table,
    Pagination
  },
  props: {
    title: String,
    visible: Boolean,
    detail: Object
  },
  setup(props, { emit }) {
    // ref
    const radioVal = ref()
    const formRef = ref()
    const dataSource = ref(null)
    // ajax
    const { factory: { getProjectList } } = ajaxStore
    // form
    const formApis = useForm({ formRef, formData, formConfig })
    // table & page
    const tableApis = useTable({ request: getProjectList, isInit: false })
    // 重置
    const resetHandle = () => {
      formApis.resetHandle()
      tableApis.resetHandle()
    }
    // 搜索
    const searchHandle = () => tableApis.searchHandle(formApis.formData)
    // change
    const change = row => {
      dataSource.value = row
    }
    // 取消
    const cancleHandle = () => {
      resetHandle()
      radioVal.value = null
      dataSource.value = null
      emit('cancleHandle')
    }
    // 确定
    const sureHandle = () => {
      if (!radioVal.value) {
        return Message.warning('请先选择')
      }
      emit('sureHandle', dataSource.value)
      cancleHandle()
    }
    // watch
    watch(
      () => props.visible,
      val => {
        val && tableApis.searchHandle()
      }
    )
    // state
    const state = reactive({ formApis, tableApis })

    return {
      formRef,
      radioVal,
      columns,
      change,
      resetHandle,
      searchHandle,
      cancleHandle,
      sureHandle,
      ...toRefs(state)
    }
  },
}
</script>
<style lang="stylus" scoped>
/deep/.el-drawer
  width: 800px !important
/deep/ #el-drawer__title
  font-size 14px
.search_box
  display: flex
  justify-content: flex-end
.title
  font-size: 14px;
  font-family: PingFangTC-Medium, PingFangTC;
  font-weight: 500;
  color: #494949;
  padding: 25px 0 20px 0
.sure_box
  position: absolute
  bottom: 0
  left: -20px
  width: calc(100% + 40px);
  height: 60px;
  background: #FFFFFF;
  box-shadow: 0px -2px 6px 0px rgba(51, 75, 133, 0.2);
  border: 1px solid #ECEDF1;
  box-sizing: border-box
  display: flex
  justify-content: center
  align-items: center
  z-index: 2000
</style>
