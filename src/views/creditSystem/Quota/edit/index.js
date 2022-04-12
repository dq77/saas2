import { onMounted, ref } from '@vue/composition-api'
import useApis from './api'
import useCreditType from './select-hooks/creditType'
import useCustomerId from './select-hooks/customerId'
import useSalesAreaCode from './select-hooks/salesAreaCode'
import useProjectId from './select-hooks/projectId'
import useContractCode from './select-hooks/contractCode'
import useParentCredit from './select-hooks/parentCreditSourceId'
import useCredit from '@/hooks/credit'
import { deepCopy } from '@/utils/qjd'
import { getFile } from '@/utils/qjd/credit'

export default ({
  formState,
  clearFiles,
  id,
  creTy,
  uploadState,
  setInfo
}) => {
  // 存储非直签使用授信材料
  const materials = ref([])
  // 编辑时存储记录当前授信类型
  const currentType = ref()
  // 各个api接口 & 暴露的相关数据
  const {
    isOrg,
    orgOptions,
    getCustomerList,
    customerList,
    getSales,
    saleSource,
    getCreditSales,
    getProject,
    proSource,
    getProCode,
    codeSource,
    getCreditCustomer,
    getCreDetail,
    checkInfo,
  } = useApis({ formState })
  // 赊销公共模块
  const { getMaterial } = useCredit()
  // 存储title
  const title = ref()
  // 切换授信类型相关逻辑
  const { checkType } = useCreditType({
    formState,
    id,
    getCustomerList,
    getCreditCustomer,
    getSales,
    clearFiles
  })
  // 选择客户相关逻辑
  const { checkCustom } = useCustomerId({ formState })
  // 选择额度来源相关逻辑
  const { checkSales } = useSalesAreaCode({ formState })
  // 选择项目相关逻辑
  const { checkPro } = useProjectId({ formState, getProCode })
  // 选择合同编号相关逻辑
  const { checkCode } = useContractCode({ formState })
  // 选择直签额度客户时查询额度来源
  const { checkParCredit } = useParentCredit({ formState, getCreditSales })
  // 设置授信材料
  const setMaterial = (applicationScenario, dataSource = {}) => {
    // 获取材料
    getMaterial({ applicationScenario }).then(({ code, data }) => {
      if (code === '0') {
        const isRequireInfo = {}
        data.forEach(item => {
          if (item.mustPass === '1') isRequireInfo[item.id] = item
          if (id && creTy === formState.formData.creditType) {
            item.defaultFileList = dataSource?.[item.id]?.data
          } else {
            item.defaultFileList = []
          }
        })
        uploadState.setIsRequireInfo(isRequireInfo)
        if (data && data.length) {
          formState.setConfig('fileList', 'isHidden', false)
          materials.value = deepCopy(data)
        } else {
          formState.setConfig('fileList', 'isHidden', true)
        }
      }
    })
  }
  // 编辑模式数据初始化
  onMounted(() => id && getCreDetail({ creditApplyId: id }).then(({ code, data }) => {
    if (code === '0' && data) {
      // 合同信息
      const { orgProjectContractResponse, fileList = [] } = data || {}
      const { contractAmount } = orgProjectContractResponse || {}
      // 文件
      const fileObjs = {}
      data.fileList = fileList.map(item => {
        fileObjs[item.businessType] = { key: item.fileId, name: item.fileName, businessType: item.businessType, response: { key: item.fileId, fileName: item.fileName, businessType: item.businessType } }
        return { key: item.fileId, name: item.fileName, businessType: item.businessType, response: { key: item.fileId, fileName: item.fileName, businessType: item.businessType } }
      })
      uploadState.setFileObjs(fileObjs)
      // 授信类型
      currentType.value = data.creditType
      checkType(data.creditType, isOrg.value, orgOptions.value || [])
      // 客户
      getCustomerList({ customerName: data.customerName }).then(() => {
        checkCustom({
          value: data.customerId,
          id,
          customerList: customerList.value || [],
          getProject: params => getProject(params).then(() => checkPro({
            value: data.projectId,
            proSource: proSource.value || [],
            customerList: customerList.value || [],
            id
          }))
        })
      })
      // 赋值formData
      formState.loopFormData((item, key) => {
        if (data[key]) item[key] = data[key]
        if (orgProjectContractResponse && orgProjectContractResponse[key]) item[key] = orgProjectContractResponse[key]
      })
      // 单独对合同金额设置
      formState.setFormItem('amount', contractAmount)
      // 设置授信材料
      const newFile = getFile(fileList)
      setMaterial(creTy, newFile)
    }
  }))
  // 各个下拉框逻辑
  const selectChange = ({ value, key }) => {
    // 选择客户
    if (key === 'customerId') {
      checkCustom({ value, customerList: customerList.value || [], getProject })
      checkInfo({ appScenario: 'creditApply', customerId: value }).then(({ code, data }) => code === '0' && setInfo(data ?? {}))
    }
    // 选择额度来源
    key === 'salesAreaCode' && checkSales(value, saleSource.value || [])
    // 选择项目
    key === 'projectId' && checkPro({ value, proSource: proSource.value || [], customerList: customerList.value || [] })
    // 选择合同编号
    key === 'contractCode' && checkCode(value, codeSource.value || [])
    // 选择直签额度客户时查询额度来源
    key === 'parentCreditSourceId' && checkParCredit(value)
  }
  // 选择授信模式
  const selectHandle = item => {
    // 切换类型各项操作
    checkType(item.type, isOrg.value, orgOptions.value || [])
    formState.setFormItem('creditType', item.type)
    title.value = item.title
    setMaterial(item.type)
    setInfo({})
    checkInfo({ appScenario: 'creditApply' }).then(({ code, data }) => code === '0' && setInfo(data ?? {}))
  }

  return {
    title,
    selectChange,
    selectHandle,
    currentType,
    materials
  }
}
