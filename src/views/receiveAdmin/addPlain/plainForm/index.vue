<template lang="pug">
.page-main
  div(style="background: #fff; padding-bottom: 100px;")
    Form(
      ref="formRef"
      :formData="formApis.formData"
      :formConfig="formApis.formConfig"
      :inline="false"
      :labelPosition="'right'"
      :labelWidth="'140px'"
      :formRules="formRules"
      :isShadow="false"
      @selectChange="customApis.selectChange"
    )
      template(slot="basic")
        Header(:title="'应收基本信息'")
      template(slot="progress")
        Header(:title="'关联项目信息'")
      template(slot="constract")
        Header(:title="'关联合同信息'")
      template(slot="filelists")
        Header(:title="'文件信息'")
      template(slot="proFiles")
        Upload(:uploadApis="proUploadApis" ref="proUploadRef")
      template(slot="bsFiles")
        Upload(:uploadApis="bsUploadApis" ref="bsUploadRef")
      template(slot="otherFiles")
        Upload(:uploadApis="otherUploadApis" ref="otherUploadRef")
      template(slot="customerName")
        //- 添加
        Info(@addHandle="() => drawerApis.check(true)")
      template(slot="customerProject")
        el-button(type="text" style="margin-left: 10px" @click='addProjectHandle') 新增项目
        el-button(type="text" @click='searchProjectHandle') 筛选项目
  //- 添加收款对象
  AddUser(
    :visible="drawerApis.visible"
    @closeHandle="() => drawerApis.check(false)"
  )
  //- 新增项目
  //- Test
  AddProject(
    :visible="addProjectApis.visible"
    :title="addProjectApis.title"
    :detail="addProjectApis.detail"
    @cancleHandle="addProjectApis.cancleHandle()"
    @sureHandle="data => projectApis.setOtherPro(data)"
  )
  //- 公共筛选
  ProjectSearch(
    :visible="searchApis.visible"
    :title="searchApis.title"
    :detail="searchApis.detail"
    @cancleHandle="searchApis.cancleHandle()"
    @sureHandle="data => projectApis.setOtherPro(data)"
  )
  //- 确定 or 取消
  Sure(:loading="currentApis.addLoading || currentApis.editLoading" @sureHandle="currentApis.sureHandle")
</template>
<script>
import { reactive, ref, toRefs } from '@vue/composition-api'
import store from '@/store'
import Header from '../../components/header'
import Sure from '../../components/sure'
import Form from '@/components/qjd/form'
import useForm from 'hooks/useForm'
import { formData, formConfig, formRules } from './config'
import Upload from './upload/index.vue'
import useUpload from 'hooks/useUpload'
import { preview } from '@/utils/qjd'
import useCurrent from './useCurrent'
import Info from './addUser/info'
import AddUser from './addUser'
import useDrawer from './addUser/useDrawer'
// 收款对象
import useCustom from './useCustom'
// 项目切换相关逻辑
import useProject from './useProject'
// useModal
import useModal from 'hooks/useModal'
// 帅选项目
import ProjectSearch from '@/components/qjd/bsComs/common/projectSearch/index.vue'
// 新增项目
import AddProject from './addProject/index.vue'

export default {
  components: {
    Form,
    Header,
    Upload,
    Sure,
    Info,
    AddUser,
    ProjectSearch,
    AddProject
  },
  setup(props, { root: { $route: { query: { id } } } }) {
    // store
    const { state: { permissions } } = store
    // ref
    const formRef = ref()
    const proUploadRef = ref()
    const bsUploadRef = ref()
    const otherUploadRef = ref()
    // formApis
    const formApis = useForm({ formRef, formData, formConfig })
    // 收款对象
    const customApis = useCustom({ formApis })
    // 项目切换逻辑
    const projectApis = useProject({ formApis })
    // 项目合同：upload
    const proUploadApis = useUpload({ formApis, key: 'proFiles', uploadRef: proUploadRef, preview })
    // 标书：upload
    const bsUploadApis = useUpload({ formApis, key: 'bsFiles', uploadRef: bsUploadRef, preview })
    // 其他项目文件：upload
    const otherUploadApis = useUpload({ formApis, key: 'otherFiles', uploadRef: otherUploadRef, preview })
    // 帅选项目 - modal
    const searchApis = useModal('筛选项目')
    // 新增项目
    const addProjectApis = useModal('新增项目')
    // useDrawer
    const drawerApis = useDrawer()
    // 设置项目文件
    const setFileList = (proFiles, bsFiles, otherFiles) => {
      proUploadApis.setFileList(proFiles)
      bsUploadApis.setFileList(bsFiles)
      otherUploadApis.setFileList(otherFiles)
    }
    // useCurrent
    const currentApis = useCurrent({ formApis, id, customApis, setFileList })
    // 新增项目
    const addProjectHandle = () => {
      if (!permissions['PTN:SUPPLIER:CHAIN_PROJECT:MANAGE']) return Message.warning('无权限')
      addProjectApis.openHandle()
    }
    // 帅选项目
    const searchProjectHandle = () => {
      if (!permissions['PTN:SUPPLIER:CHAIN_PROJECT:MANAGE']) return Message.warning('无权限')
      searchApis.openHandle()
    }
    // state
    const state = reactive({ formApis, proUploadApis, bsUploadApis, otherUploadApis, currentApis, drawerApis, projectApis, customApis, searchApis, addProjectApis })

    return {
      formRef,
      proUploadRef,
      bsUploadRef,
      otherUploadRef,
      formRules,
      addProjectHandle,
      searchProjectHandle,
      ...toRefs(state)
    }
  },
}
</script>
