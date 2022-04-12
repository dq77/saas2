<template lang="pug">
//- .header-nav
//-   template(v-for='(item, index) in collapseItems')
//-     .nav-item(:class='item.key === currentKey? "active" :""' @click='() => clickTest(item.key)') {{item.label}}
.page-main-layout(style='padding-top: 0px')
  top-nav(:collapseItems='collapseItems' @changeTopNav='changeTopNav' :currentKey='currentKey' v-if="isPage")
  .page-main-container
    HeaderSection(v-if='id && isPage' :dataSource='headerDataSource')
    el-collapse(v-model='activeNames')
      el-collapse-item(title='项目基本信息' name='a1' id='a1')
        Form(
          style="width: 500px;"
          ref='formRef'
          :formData='basicFormState.formData'
          :formRules='basicFormRules'
          :formConfig='basicFormState.formConfig'
          :isShadow='false'
          labelPosition='right'
          labelWidth='120px'
          :inline="false"
        )
      el-collapse-item(title='项目概况' name='a2' id='a2')
        Form(
          style="width: 500px;"
          ref='surveyFormRef'
          :formData='surveyFormState.formData'
          :formConfig='surveyFormState.formConfig'
          :isShadow='false'
          @datePickerChange='surveyFormState.datePickerChange'
          labelPosition='right'
          labelWidth='150px'
          :inline="false"
        )
      el-collapse-item(title='项目文件' name='a3' id='a3')
        Files(ref="fileRef")
      el-collapse-item(title='合同信息' name='a5' id='a5')
        Contract(ref="contractRef")
      el-collapse-item(title='项目预计回款信息' name='a4' id='a4')
        payment-info(
          :tableData='paymentState.tableData'
          :surveyData='surveyFormState.formData'
          @addRow='paymentState.addRow'
          @deleteRow='paymentState.deleteRow'
          @caculatePayRatioFunc='paymentState.caculatePayRatio'
          @caculatePayAmountFunc='paymentState.caculatePayAmount'
          @clickPayCalculateType='paymentState.clickPayCalculateType'
        )
  .page-operate(v-if="isPage")
    el-button(type='primary' plain @click="$router.go(-1)" :weblogs-anchor='id?"":"supplyChain-factory-project-create-cancle"') 取消
    el-button(type='primary' :loading="addLoading || editLoading" @click='createProjectClick' :weblogs-anchor='id?"":"supplyChain-factory-project-create-sure"') 确认
  //- 提交
  .sure_box(v-else)
    el-button(@click="cancleHandle") 取消
    el-button(type="primary" :loading="addLoading || editLoading" @click="createProjectClick") 确定
</template>

<script>
import { reactive, ref, toRefs } from '@vue/composition-api' // reactive onMounted
import HeaderSection from './HeaderSection.vue'
import PaymentInfo from './PaymentInfo.vue'
import Contract from './contract/index.vue'
import Files from './files/index.vue'
import ajaxStore from '@/apis'
import useAsync from 'hooks/useAsync'
import useBasic from './jsBasicInfo'
import useSurvey from './jsSurveyInfo'
import usePayment from './jsPaymentInfo'
import Form from '@/components/qjd/form'
import {basicFormRules, projectSoueceMap, collapseItems} from './const.js'
import TopNav from '@/views/SupplyChain/Factory/Components/TopNav'
import { deepCopy, uuid } from '@/utils/qjd'
import { Message } from 'element-ui'

export default {
  components: {
    HeaderSection,
    Form,
    PaymentInfo,
    TopNav,
    Contract,
    Files
  },
  props: {
    isPage: {
      type: Boolean,
      default: true
    },
    projectSource: {
      type: Number,
      default: 2
    }
  },
  setup(props, {root, emit}) {
    const formRef = ref()
    const contractRef = ref()
    const fileRef = ref()
    const { id: _id } = root.$route.query || {}
    const id = props.isPage ? _id : null
    const activeNames = ref(['a1', 'a2', 'a3', 'a4', 'a5'])
    const headerDataSource = ref({})
    const { factory: { getProjectDetail, createProject, editProject } } = ajaxStore
    // 项目基本信息
    const basicFormState = useBasic({id, formRef})
    // 项目概况
    const surveyFormState = useSurvey()
    // 项目预计回款信息
    const paymentState = usePayment()
    // 回显文件
    const setFiles = files => {
      const obj = {}
      const dataSource = []
      files.forEach(item => {
        obj[item.fileType] = item
      })
      Object.keys(obj).forEach(key => {
        const currentData = {}
        const currentFiles = []
        const defaultFileList = []
        files.forEach(item => {
          if (item.fileType === key) {
            currentFiles.push({ response: { fileType: key, fileName: item.fileName, key: item.fileKey } })
            if (item.fileName || item.fileKey) {
              defaultFileList.push({ key: item.fileKey, name: item.fileName, response: { fileType: key, fileName: item.fileName, key: item.fileKey } })
            }
          }
        })
        currentData.fileType = key
        currentData.files = currentFiles
        currentData.defaultFileList = defaultFileList
        dataSource.push({ ...currentData, isError: false, _id: uuid() })
      })
      fileRef.value && fileRef.value.tableApis.resetDataSource(dataSource)
    }
    // 回显合同信息
    const setContract = data => {
      data.forEach(item => {
        const currentFiles = []
        const defaultFileList = []
        item.projectContractFileList && item.projectContractFileList.forEach(item => {
          currentFiles.push({ response: { fileName: item.fileName, key: item.fileKey } })
          defaultFileList.push({ key: item.fileKey, name: item.fileName, response: { fileName: item.fileName, key: item.fileKey } })
        })
        item.files = currentFiles
        item.defaultFileList = defaultFileList
        item.time = item.validTime && item.invalidTime ? [item.validTime, item.invalidTime] : []
        item._id = uuid()
      })
      contractRef.value && contractRef.value.tableApis.resetDataSource(data)
    }
    const { result } = useAsync({ // 详情接口
      request: getProjectDetail,
      init: !!id,
      params: { id },
      successCallBack: ({ data }) => {
        const files = deepCopy(data?.projectContractFileList ?? [])
        setFiles(files)
        setContract(deepCopy(data?.orgProjectContractDetailResponses ?? []))
        basicFormState.handerBasicForm(data)
        surveyFormState.handerSurveyForm(data)
        paymentState.handlePaymentData(data)
        headerDataSource.value = data
      },
    })
    const { doResult: createFunc, loading: addLoading } = useAsync({ // 创建项目
      request: createProject,
      init: false,
      successCallBack: ({code, data}) => {
        if (code === '0') {
          Message.success('添加成功')
          props.isPage && root.$router.push({name: 'projectManage'})
          !props.isPage && emit('sureHandle', data)
        }
      },
    })
    const { doResult: editFunc, loading: editLoading } = useAsync({ // 编辑项目
      request: editProject,
      init: false,
      successCallBack: ({code}) => {
        code === '0' && root.$router.push({name: 'projectManage'})
      },
    })
    const handleSubmitParams = () => {
      const basicInfoPrams = basicFormState.formData
      const surveyInfoPrams = surveyFormState.formData
      const projectPayList = paymentState.tableData
      // 项目基础信息参数
      const {addressCode} = basicInfoPrams
      basicInfoPrams.provinceCode = addressCode[0]
      basicInfoPrams.cityCode = addressCode[1]
      basicInfoPrams.regionCode = addressCode[2]
      const regionTextArr = basicFormState.getRegionTextArr(addressCode[0], addressCode[1], addressCode[2])
      basicInfoPrams.province = regionTextArr[0]
      basicInfoPrams.city = regionTextArr[1]
      basicInfoPrams.region = regionTextArr[2]
      // 项目概况参数
      const {projectDuration} = surveyInfoPrams || {}
      surveyInfoPrams.startTime = projectDuration && projectDuration[0]
      surveyInfoPrams.endTime = projectDuration && projectDuration[1]
      // 项目文件
      const { dataSource: projectContractFileList } = fileRef.value.getDataSource()
      // 合同信息
      const projectContractAddRequestList = contractRef.value.getDataSource()
      // 所有提交参数
      const params = Object.assign(basicInfoPrams, surveyInfoPrams, {id: id}, { projectPayList: projectPayList })
      return { ...params, projectContractAddRequestList, projectContractFileList, projectSource: props.projectSource }
    }
    const createProjectClick = () => {
      const { error } = fileRef.value.getDataSource()
      if (error) return
      // 合同信息入参
      paymentState.hasPaymentList(paymentState.tableData.value) && basicFormState.submitHandle(
        id ? () => editFunc(handleSubmitParams()) : () => createFunc(handleSubmitParams())
      )
    }
    // const clickTest = (val) => {
    //   currentKey.value = val
    //   const toEle = document.querySelector(`#${val}`)
    //   getElScrollBar().scrollTo({ top: toEle.offsetTop - 40 } )
    //   // toEle && toEle.scrollIntoView(true)
    // }
    // 获取滚动元素-element-ui滚动容器
    // const getElScrollBar = () => {
    //   let wrap
    //   const wraps = document.querySelectorAll('.el-scrollbar__wrap')
    //   console.log(wraps, 'wraps')
    //   wraps.forEach((item) => {
    //     if (item.parentNode.id ===  'content_view') wrap = item
    //   })
    //   return wrap
    // }
    // 当前点击的锚点
    const currentKey = ref(`${collapseItems[0].key}`)
    const changeTopNav = (val) => {
      currentKey.value = val
    }
    // 取消
    const cancleHandle = () => emit('cancleHandle')
    const state = reactive({
      basicFormState,
      surveyFormState,
      paymentState
    })
    return {
      id,
      contractRef,
      fileRef,
      activeNames,
      headerDataSource,
      result,
      projectSoueceMap,
      basicFormRules,
      createProjectClick,
      formRef,
      ...toRefs(state),
      collapseItems,
      currentKey,
      cancleHandle,
      changeTopNav,
      addLoading,
      editLoading
    }
  },
}
</script>

<style lang="stylus" scoped>
// .page-main
//   position relative
.page-main-container
  background-color #fff
  padding 10px 20px
  // margin-top 100px
>>>.el-range-editor--small.el-input__inner
    height 31px
>>>.el-range-editor.el-input__inner
    padding 2px 10px
.page-operate
  text-align center
  margin-top 30px
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
