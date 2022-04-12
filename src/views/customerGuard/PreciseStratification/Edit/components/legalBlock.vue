<template lang="pug">
.p-main
  //- .p-head
  //-   el-button(type='primary' :loading='loading' @click='reFresh') 获取基础信息
  .p-card
    Card(title='法人信息')
      Form(
        ref='formRef'
        :formData='formState.formData'
        :formConfig='formState.formConfig'
        :formRules='formState.formRules'
        labelPosition='right'
        labelWidth='120px'
        @selectChange='val => selectChange(val, "1", legalInfo.code)'
        @inputChange='val => inputChange(val, "1", legalInfo.code)'
      )
      SourceUpload(:uploadObj='uploadObj' :isSpouse='false' ref='uploadRef' :owner='legalInfo.code')
  .p-card
    Card(title='法人配偶信息')
      Form(
        ref='spouseFormRef'
        :formData='spouseFormState.formData'
        :formConfig='spouseFormState.formConfig'
        :formRules='spouseFormState.formRules'
        labelPosition='right'
        labelWidth='120px'
        @inputChange='val => inputChange(val, "2", spouseLegalInfo.code)'
      )
      SourceUpload(:uploadObj='spouseUploadObj' :hasSpouse='formState.formData.maritalStatus === "1"' :isSpouse='true' ref='spouseUploadRef' :owner='spouseLegalInfo.code')
  .p-card
    Card(title='房产信息')
      Table(
        :dataSource="tableState.dataSource"
        :columns="columns"
        :loading="tableState.loading"
      )
        template(slot='operate' slot-scope='{row, $index}')
          //- 操作
          .u-nowrap
            el-button.u-btn(type='text' @click='deleteRow(row)') 删除
        template(slot='fileKey' slot-scope="{ row, $index }")
          TableUpload(:row='row' @changeTableFile='(val) => changeTableFile(val, $index)' @deleteTableFile='() => deleteTableFile($index)')
        template(slot='locateLocationCode' slot-scope="{ row }")
          AreaCascader(:row='row' :options='areaState.citys')
      .p-append
        el-button.p-add(size='small' type='text' @click="tableState.addDataSource(dataSample)") +添加
</template>
<script>
import ajaxStore from '@/apis'
import { ref, reactive, toRefs, watch } from '@vue/composition-api'
import Card from './card'
import SourceUpload from './sourceUploadLegal'
import TableUpload from './tableUpload'
import AreaCascader from './areaCascader'
import Form from '@/components/qjd/form'
import Table from '@/components/qjd/table'
import useSubmitLegal from '../hooks/useSubmitLegal'
import useAsync from 'hooks/useAsync'
import useForm from 'hooks/useForm'
import useTable from 'hooks/useTable'
import useArea from '@/hooks/common/useArea'
import { toPrefixUrl } from '@/utils/util'
import { cFormData, cFormConfig, formRules, spouseFormData, spouseFormConfig, setSpouseFormRules, columns, dataSample } from '../config/legalConfig'

export default {
  props: {
    legalInfo: {
      type: Object,
      defaultValue: () => {}
    },
    legalMaterialList: {
      type: Array,
      defaultValue: () => []
    },
    legalHouseList: {
      type: Array,
      defaultValue: () => []
    },
    spouseLegalInfo: {
      type: Object,
      defaultValue: () => {}
    },
    spouseLegalMaterialList: {
      type: Array,
      defaultValue: () => []
    },
    spouseLegalHouseList: {
      type: Array,
      defaultValue: () => []
    },
  },
  components: {
    Card,
    SourceUpload,
    TableUpload,
    AreaCascader,
    Form,
    Table,
  },
  setup(props, {emit, root}) {
    const {
      customer: { precise: { addPeronBasic } }
    } = ajaxStore
    // state
    const state = reactive({
      loading: false,
      areaState: {},
      submitState: {},
      formState: {},
      spouseFormState: {},
      tableState: {},
      tableEditState: {},
      // 混合后的房产列表
      tableList: [],
      delTableList: [],
      houseList: [],
      spouseHouseList: [],
      uploadObj: {
        bankInfo: [],
        reportInfo: [],
        dealInfo: [],
      },
      spouseUploadObj: {
        spouseBankInfo: [],
        spouseReportInfo: [],
        spouseDealInfo: []
      },
    })
    const formRef = ref()
    const uploadRef = ref()
    const spouseFormRef = ref()
    const spouseUploadRef = ref()

    state.areaState = useArea()
    state.areaState.doResult()
    const { doResult } = useAsync({
      request: addPeronBasic,
      init: false
    })
    // 校验逻辑
    state.submitState = useSubmitLegal({
      formRef,
      spouseFormRef,
      getFormState: () => { return state.formState },
      getSpouseFormState: () => { return state.spouseFormState },
      getTableState: () => { return state.tableState },
      getDelTable: () => { return state.delTableList },
      uploadRef,
      spouseUploadRef,
    })
    const getSubmitState = () => {
      return state.submitState
    }
    // form
    state.formState = useForm({
      formRef,
      formData: cFormData,
      formConfig: cFormConfig,
      formRules: formRules,
    })
    state.spouseFormState = useForm({
      formRef: spouseFormRef,
      formData: spouseFormData,
      formConfig: spouseFormConfig,
      formRules: setSpouseFormRules()
    })
    // form表单select change事件设置
    const inputChange = ({value, key, item}, identity, owner) => {
      if (identity === '1') {
        !owner && state.formState.submitHandle((formData) => doResult({
          ...formData,
          companyBasicCode: root.$route.query.companyBasicCode,
          identity
        }).then(({data}) => {
          data && emit('addPersonInfo', {code: data, identity, formData})
        }))
      } else {
        !owner && state.spouseFormState.submitHandle((formData) => doResult({
          ...formData,
          companyBasicCode: root.$route.query.companyBasicCode,
          identity
        }).then(({data}) => {
          data && emit('addPersonInfo', {code: data, identity, formData})
        }))
      }
    }
    const selectChange = ({value, key, item}, identity, owner) => {
      !owner && state.formState.submitHandle((formData) => doResult({
        ...formData,
        companyBasicCode: root.$route.query.companyBasicCode,
        identity
      }).then(({data}) => {
        data && emit('addPersonInfo', {code: data, identity, formData})
      }))
      if (key === 'maritalStatus') {
        const maritalStatus = state.formState.formData.maritalStatus
        state.spouseFormState.setFormRules(setSpouseFormRules(maritalStatus))
      }
    }
    // table
    state.tableState = useTable({
      edit: true,
      editDataSource: true,
      request: state.tableList,
    })
    // table上传资料
    const changeTableFile = (val, index) => {
      state.tableState.dataSource[index].fileKey = val
    }
    const deleteTableFile = (index) => {
      state.tableState.dataSource[index].fileKey = undefined
    }
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
    const initLegalInfo = (val) => {
      const formData = {...val}
      state.formState.formData = formData
      state.spouseFormState.setFormRules(setSpouseFormRules(val.maritalStatus))
    }
    const initLegalMaterialList = (val) => {
      const uploadObj = {
        bankInfo: [],
        reportInfo: [],
        dealInfo: [],
      }
      // 根据type 资料类型 企业征信报告 C0001 银行流水 C0002 授权书 C0003 个人征信报告 C0004 房产证 C0005
      val.forEach(item => {
        switch (item.type) {
          case 'C0004':
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
    const initLegalHouseList = (val) => {
      state.houseList = val
      state.tableList = [...val, ...state.spouseHouseList]
      state.tableState.resetDataSource(state.tableList)
    }
    const initSpouseLegalInfo = (val) => {
      const formData = {...val}
      state.spouseFormState.formData = formData
    }
    const initSpouseLegalMaterialList = (val) => {
      const uploadObj = {
        spouseBankInfo: [],
        spouseReportInfo: [],
        spouseDealInfo: []
      }
      // 根据type 资料类型 企业征信报告 C0001 银行流水 C0002 授权书 C0003 个人征信报告 C0004 房产证 C0005
      val.forEach(item => {
        switch (item.type) {
          case 'C0004':
            uploadObj.spouseReportInfo.push(item)
            break
          case 'C0002':
            uploadObj.spouseBankInfo.push(item)
            break
          case 'C0003':
            uploadObj.spouseDealInfo.push(item)
            break
        }
        state.spouseUploadObj = {...uploadObj}
      })
    }
    const initSpouseLegalHouseList = (val) => {
      state.spouseHouseList = val
      state.tableList = [...state.houseList, ...val]
      state.tableState.resetDataSource(state.tableList)
    }
    // 重新获取公司信息
    const reFresh = () => {
      state.loading = true
      emit('reFresh', 'legal')
      setTimeout(() => {
        state.loading = false
      }, 5000)
    }
    watch(() => props.legalInfo, (val, preVal) => {
      initLegalInfo(val)
    }, { immediate: true })
    watch(() => props.legalMaterialList, (val, preVal) => {
      initLegalMaterialList(val)
    }, { immediate: true })
    watch(() => props.legalHouseList, (val, preVal) => {
      initLegalHouseList(val)
    }, { immediate: true })
    watch(() => props.spouseLegalInfo, (val, preVal) => {
      initSpouseLegalInfo(val)
    }, { immediate: true })
    watch(() => props.spouseLegalMaterialList, (val, preVal) => {
      initSpouseLegalMaterialList(val)
    }, { immediate: true })
    watch(() => props.spouseLegalHouseList, (val, preVal) => {
      initSpouseLegalHouseList(val)
    }, { immediate: true })
    return {
      formRef,
      spouseFormRef,
      uploadRef,
      spouseUploadRef,
      toPrefixUrl,
      reFresh,
      inputChange,
      selectChange,
      changeTableFile,
      deleteTableFile,
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
  padding 10px 20px 20px
  position relative
  .el-input-number.is-controls-right .el-input__inner
    text-align left
.p-append
  width 100%
  border 1px solid #F2F2F6
  border-top none
  padding 0 15px
</style>
