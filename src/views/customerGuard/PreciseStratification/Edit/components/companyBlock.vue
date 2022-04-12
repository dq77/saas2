<template lang="pug">
.p-main
  .p-head
    el-button(type='primary' :loading='loading' @click='reFresh') 获取企业基础工商信息
  .p-card
    Card(:title='companyInfo.name ? `基础信息（${companyInfo.name}）` : "基础信息"')
      Form(
        ref='formRef'
        :formData='formState.formData'
        :formConfig='formState.formConfig'
        :formRules='formState.formRules'
        labelPosition='right'
        labelWidth='120px'
        @longDatePickerChange='longDatePickerChange'
      )
  .p-card
    Card(title='股东及出资信息')
      Table(
        :dataSource="tableState.dataSource"
        :columns="columns"
        :loading="tableState.loading"
      )
        template(slot='operate' slot-scope='{row, $index}')
          //- 操作
          .u-nowrap
            el-button.u-btn(type='text' @click='deleteRow(row)') 删除
      .p-append
        el-button.p-add(size='small' type='text' @click="tableState.addDataSource(dataSample)") +添加
  .p-card
    Card(title='影像及协议资料')
      SourceUpload(:uploadObj='uploadObj' ref='uploadRef' :owner='companyInfo.companyBasicCode')
</template>
<script>
import { ref, reactive, toRefs, watch } from '@vue/composition-api'
import Card from './card'
import SourceUpload from './sourceUploadCompany'
import Form from '@/components/qjd/form'
import Table from '@/components/qjd/table'
import useSubmitCompany from '../hooks/useSubmitCompany'
import useForm from 'hooks/useForm'
import useTable from 'hooks/useTable'
import { cFormData, cFormConfig, cFormRules, columns, dataSample } from '../config/companyConfig'

export default {
  props: {
    companyInfo: {
      type: Object,
      defaultValue: () => {}
    },
    companyStockList: {
      type: Array,
      defaultValue: () => []
    },
    companyMaterialList: {
      type: Array,
      defaultValue: () => []
    }
  },
  components: {
    Card,
    SourceUpload,
    Form,
    Table,
  },
  setup(props, {emit}) {
    // state
    const state = reactive({
      loading: false,
      submitState: {},
      formState: {},
      tableState: {},
      tableEditState: {},
      tableList: [],
      delTableList: [],
      uploadObj: {
        bankInfo: [],
        reportInfo: [],
        dealInfo: [],
      }
    })
    const formRef = ref()
    const uploadRef = ref()
    state.submitState = useSubmitCompany({
      formRef,
      getFormState: () => { return state.formState },
      getTableState: () => { return state.tableState },
      getDelTable: () => { return state.delTableList },
      uploadRef,
    })
    const getSubmitState = () => {
      return state.submitState
    }
    state.formState = useForm({
      formRef,
      formData: cFormData,
      formConfig: cFormConfig,
      formRules: cFormRules
    })
    // 长期时间选择设置
    const longDatePickerChange = ({value, key, type, item }) => {
      const newModal = { ...state.formState.formData[key] }
      newModal[type] = value
      if (type === item.isLong) {
        newModal[item.longEnd] = undefined
      } else if (type === item.longEnd) {
        newModal[item.isLong] = false
      }
      state.formState.setFormItem(key, newModal)
    }
    // table
    state.tableState = useTable({
      edit: true,
      editDataSource: true,
      request: state.tableList,
    })
    // table删除行
    const deleteRow = (row) => {
      if (row.id) {
        state.tableState.deleteDataSource(row.id, 'id')
        row.isDeleted = '1'
        state.delTableList.push(row)
      } else {
        state.tableState.deleteDataSource(row._id)
      }
    }
    // 初始化
    const initCompanyInfo = (val) => {
      const formData = {...val}
      formData.time = {
        fromTime: val.fromTime,
        toTime: val.toTime,
        isLong: !val.toTime,
      }
      delete formData.fromTime
      delete formData.toTime
      state.formState.formData = formData
    }
    const initCompanyStockList = (val) => {
      state.tableList = [...val]
      state.tableState.resetDataSource(state.tableList)
      state.delTableList = []
    }
    const initCompanyMaterialList = (val) => {
      const uploadObj = {
        bankInfo: [],
        reportInfo: [],
        dealInfo: [],
      }
      // 根据type 资料类型 企业征信报告 C0001 银行流水 C0002 授权书 C0003 个人征信报告 C0004 房产证 C0005
      val.forEach(item => {
        switch (item.type) {
          case 'C0001':
            uploadObj.reportInfo.push(item)
            break
          case 'C0002':
            uploadObj.bankInfo.push(item)
            break
          case 'C0003':
            uploadObj.dealInfo.push(item)
            break
        }
        state.uploadObj = {...uploadObj}
      })
    }
    // 重新获取公司信息
    const reFresh = () => {
      state.loading = true
      emit('reFresh', 'company')
      setTimeout(() => {
        state.loading = false
      }, 5000)
    }
    watch(() => props.companyInfo, (val, preVal) => {
      initCompanyInfo(val)
    }, { immediate: true })
    watch(() => props.companyStockList, (val, preVal) => {
      initCompanyStockList(val)
    }, { immediate: true })
    watch(() => props.companyMaterialList, (val, preVal) => {
      initCompanyMaterialList(val)
    }, { immediate: true })
    return {
      formRef,
      uploadRef,
      reFresh,
      longDatePickerChange,
      columns,
      dataSample,
      deleteRow,
      getSubmitState,
      ...toRefs(state)
    }
  },
}
</script>
<style lang="stylus" scoped>
.p-main
  padding 20px
  position relative
  .el-input-number.is-controls-right .el-input__inner
    text-align left
.p-append
  width 100%
  border 1px solid #F2F2F6
  border-top none
  padding 0 15px
</style>
