import { reactive, toRefs } from '@vue/composition-api'
import ajaxStore from '@/apis'
import useAsync from 'hooks/useAsync'
import { Message } from 'element-ui'

export default ({
  companyBasicCode,
  refCompanySubmit,
  refPersonSubmit,
  refLegalSubmit,
  goToList,
  initPage,
}) => {
  // ajax
  const {
    customer: { precise: { getResidualNumber, apply, updateCompanyBasic, updateCompanyStockholder, addHouse, addPeronBasic } }
  } = ajaxStore
  // state
  const state = reactive({
    loading: false,
    checkObj: {
      one: false,
      two: false,
      three: false,
    },
    companyState: {},
    stockState: {},
    houseState: {},
    personState: {},
    getResidualNumberState: {},
    residualNumber: 0,
    modalVisible: false,
    modalLoading: false,
  })
  // 提交-接口
  const { doResult } = useAsync({
    request: apply,
    init: false,
    successCallBack: ({ code, data }) => {
      state.loading = false
      if (code === '0') {
        Message.success('新建成功')
        goToList(data.companyBasicCode)
      }
    }
  })
  // 查询剩余提交次数
  state.getResidualNumberState = useAsync({
    request: getResidualNumber,
    init: false,
    successCallBack: ({ code, data }) => {
      state.loading = false
      if (code === '0') {
        state.residualNumber = data
        state.modalVisible = true
      }
    }
  })
  // 各类资料保存接口
  state.companyState = useAsync({
    request: updateCompanyBasic,
    init: false
  })
  state.stockState = useAsync({
    request: updateCompanyStockholder,
    init: false,
    isArray: true
  })
  state.houseState = useAsync({
    request: addHouse,
    init: false,
    isArray: true
  })
  state.personState = useAsync({
    request: addPeronBasic,
    init: false
  })
  // 转换提交数据
  const transformCompany = () => {
    const { getSubmitState: getCompanyState } = refCompanySubmit.value ?? {}
    const { baseInfo, tableInfo, delTableInfo, uploadInfo } = getCompanyState().getFormData()
    const basic = {
      ...baseInfo,
      fromTime: baseInfo.time.fromTime,
      toTime: baseInfo.time.toTime
    }
    delete basic.time
    const stock = [...tableInfo, ...delTableInfo].map(item => {
      item.companyBasicCode = companyBasicCode
      return item
    })
    return {
      basic,
      stock,
      uploadInfo
    }
  }
  const transformPerson = () => {
    const { getSubmitState: getPersonState } = refPersonSubmit.value ?? {}
    const {baseInfo, spouseBaseInfo, tableInfo, delTableInfo, uploadInfo, spouseUploadInfo} = getPersonState().getFormData()
    const basic = {
      ...baseInfo,
    }
    const spouseBasic = {
      ...spouseBaseInfo
    }
    const house = []
    const spouseHouse = []
    const all = [...tableInfo, ...delTableInfo]
    all.forEach(item => {
      item.companyBasicCode = companyBasicCode
      item.locateLocationProvinceCode = item.locateLocationCode?.[0] ?? item.locateLocationProvinceCode
      item.locateLocationCityCode = item.locateLocationCode?.[1] ?? item.locateLocationCityCode
      item.locateLocationAreaCode = item.locateLocationCode?.[2] ?? item.locateLocationAreaCode
      delete item.locateLocationCode
      if (item.rightHolder === '2') {
        item.type = '4'
        item.owner = spouseBaseInfo.code
        spouseHouse.push(item)
      } else {
        item.type = '3'
        item.owner = baseInfo.code
        house.push(item)
      }
    })
    return {
      basic,
      spouseBasic,
      house,
      spouseHouse,
      uploadInfo,
      spouseUploadInfo
    }
  }
  const transformLegal = () => {
    const { getSubmitState: getLegalState } = refLegalSubmit.value ?? {}
    const {baseInfo, spouseBaseInfo, tableInfo, delTableInfo, uploadInfo, spouseUploadInfo} = getLegalState().getFormData()
    const basic = {
      ...baseInfo,
    }
    const spouseBasic = {
      ...spouseBaseInfo
    }
    const house = []
    const spouseHouse = []
    const all = [...tableInfo, ...delTableInfo]
    all.forEach(item => {
      item.companyBasicCode = companyBasicCode
      item.locateLocationProvinceCode = item.locateLocationCode?.[0] ?? item.locateLocationProvinceCode
      item.locateLocationCityCode = item.locateLocationCode?.[1] ?? item.locateLocationCityCode
      item.locateLocationAreaCode = item.locateLocationCode?.[2] ?? item.locateLocationAreaCode
      delete item.locateLocationCode
      if (item.rightHolder === '2') {
        item.type = '4'
        item.owner = spouseBaseInfo.code
        spouseHouse.push(item)
      } else {
        item.type = '3'
        item.owner = baseInfo.code
        house.push(item)
      }
    })
    return {
      basic,
      spouseBasic,
      house,
      spouseHouse,
      uploadInfo,
      spouseUploadInfo
    }
  }
  const checkUpload = (uploadInfo, baseInfo, type) => {
    if (uploadInfo.bankInfo.some(item => {
      return item.status === '1'
    })) {
      Message.warning(type + '银行流水还在识别中，无法进行提交')
      return false
    }
    if (uploadInfo.reportInfo.some(item => {
      return item.status === '1'
    })) {
      Message.warning(type + '征信还在识别中，无法进行提交')
      return false
    }
    if (uploadInfo.dealInfo.some(item => {
      return item.status !== '2'
    })) {
      Message.warning(type + '授权协议尚未上传成功')
      return false
    }
    if (type === '企业' && (!uploadInfo.bankInfo.length || uploadInfo.bankInfo.length === 0)) {
      Message.warning('请上传' + type + '银行流水（距今3个月内，周期大于6个月）')
      return false
    }
    if (type !== '企业' && baseInfo.idCardNo && (!uploadInfo.bankInfo.length || uploadInfo.bankInfo.length === 0)) {
      Message.warning('请上传' + type + '银行流水（距今3个月内，周期大于6个月）')
      return false
    }
    if (type === '企业' && !uploadInfo.bankInfo.some(item => {
      return item.status === '2'
    })) {
      Message.warning(type + '银行流水识别成功的文件数量必须大于0')
      return false
    }
    if (type !== '企业' && baseInfo.idCardNo && !uploadInfo.bankInfo.some(item => {
      return item.status === '2'
    })) {
      Message.warning(type + '银行流水识别成功的文件数量必须大于0')
      return false
    }
    if (type === '企业' && (!uploadInfo.dealInfo.length || uploadInfo.dealInfo.length === 0)) {
      Message.warning('请上传' + type + '授权协议')
      return false
    }
    if (type !== '企业' && baseInfo.idCardNo && (!uploadInfo.dealInfo.length || uploadInfo.dealInfo.length === 0)) {
      Message.warning('请上传' + type + '授权协议')
      return false
    }
    return true
  }
  // 保存接口
  const submit = async (isSubmit, isAuto) => {
    // 所有数据整合成params
    const companyInfo = transformCompany()
    const personInfo = transformPerson()
    const legalInfo = transformLegal()

    const res = await Promise.all([
      // 公司
      state.companyState.doResult(companyInfo.basic),
      state.stockState.doResult(companyInfo.stock),
      // 房产
      state.houseState.doResult(personInfo.house),
      state.houseState.doResult(personInfo.spouseHouse),
      state.houseState.doResult(legalInfo.house),
      state.houseState.doResult(legalInfo.spouseHouse),
      // 个人
      state.personState.doResult(personInfo.basic),
      state.personState.doResult(personInfo.spouseBasic),
      state.personState.doResult(legalInfo.basic),
      state.personState.doResult(legalInfo.spouseBasic),
    ])
    const isError = res.some(({code}) => code !== '0')
    if (!isError && isSubmit) {
      await doResult({ companyBasicCode })
    } else {
      state.loading = false
      initPage()
      !isAuto && Message.success('保存成功')
    }
    state.modalLoading = false
  }
  const modalCancleHandle = () => {
    state.modalVisible = false
  }
  const modalSureHandle = () => {
    state.modalLoading = true
    submit(true)
  }
  // 检查验证
  const check = async (withTip) => {
    // 所有数据整合成params
    const companyInfo = transformCompany()
    const personInfo = transformPerson()
    const legalInfo = transformLegal()
    const { getSubmitState: getCompanyState } = refCompanySubmit.value ?? {}
    const { getSubmitState: getLegalState } = refLegalSubmit.value ?? {}
    const { getSubmitState: getPersonState } = refPersonSubmit.value ?? {}
    const validList = await Promise.all([getCompanyState().check(), getLegalState().check(), getPersonState().check()])
    state.checkObj = {
      one: validList[0],
      two: validList[1],
      three: validList[2]
    }
    if (withTip) {
      if (!validList[0]) {
        Message.warning('企业信息未填写完整')
      } else if (!validList[1]) {
        Message.warning('法人信息未填写完整')
      } else if (!validList[2]) {
        Message.warning('实控人信息未填写完整')
      }
      if (!checkUpload(companyInfo.uploadInfo, companyInfo.basic, '企业')) return false
      if (!checkUpload(personInfo.uploadInfo, personInfo.basic, '实控人')) return
      if (!checkUpload(personInfo.spouseUploadInfo, personInfo.spouseBasic, '实控人配偶')) return false
      if (!checkUpload(legalInfo.uploadInfo, legalInfo.basic, '法人')) return false
      if (!checkUpload(legalInfo.spouseUploadInfo, legalInfo.spouseBasic, '法人配偶')) return false
    }
    const result = !validList.some(item => !item)
    return result
  }
  // 提交
  const save = async ({isSubmit, isAuto}) => {
    if (isSubmit) {
      await check(true) && (state.loading = true) && state.getResidualNumberState.doResult()
    } else {
      state.loading = true
      submit(false, isAuto)
    }
  }

  return {
    save,
    check,
    modalCancleHandle,
    modalSureHandle,
    ...toRefs(state)
  }
}
