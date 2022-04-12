import useAsync from 'hooks/useAsync'
import ajaxStore from '@/apis'
import { toPrefixUrl } from '@/utils/util'
import { reactive, toRefs } from '@vue/composition-api'
export default ({
  id = null,
  projectCompany = null,
  projectId = null,
  realEstateCompany = null,
}) => {
  const state = reactive({
    projectInfo: {
      name: '',
      provinceName: '',
      cityName: '',
      areaName: '',
      shareholderType: '',
      projectType: '',
      type: '',
      status: '',
      gmtModified: '',
      address: '',
      projectCompany: '',
      realEstateCompany: '',
      contractFiles: [],
      budget: '',
      area: '',
      undertakeMode: '',
      paymentMethod: '',
      paymentCycle: '',
      tenderDocuments: [],
      biddingDocuments: [],
      isTherePrepayment: 0,
      isThereHouseMortgage: 0,
      isThereCommercialDraft: 0,
      isItPossiblePaySevenPercent: 0,
      isThereEffectiveAccountsReceivable: 0
    }
  })

  const getProjectDetail = ajaxStore.factoryService.programme.getProjectDetail

  // 成功回调
  const successCallBack = ({ code, data }) => {
    if (code === '0') {
      const { attachments } = data
      attachments.map((item, key) => {
        attachments[key].url = _getFileUrl(item.fileKey)
      })
      data.contractFiles = attachments.filter((item) => { return item.type === '3' })
      data.tenderDocuments = attachments.filter((item) => { return item.type === '2' })
      data.biddingDocuments = attachments.filter((item) => { return item.type === '1' })
      state.projectInfo = data
    }
  }
  // 接口
  const { loading, doResult } = useAsync({
    request: getProjectDetail,
    init: false,
    successCallBack
  })

  if (id) {
    doResult({ id })
  } else {
    state.projectInfo = Object.assign(state.projectInfo, {
      projectCompany,
      projectId,
      realEstateCompany
    })
  }

  const _getFileUrl = (fileKey) => {
    if (!fileKey) return ''
    return toPrefixUrl(`/partner/common/file/download?fileKey=${fileKey}`)
  }

  return {
    loading,
    ...toRefs(state)
  }
}
