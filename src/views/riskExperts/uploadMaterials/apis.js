import ajaxStore from '@/apis'
import useAsync from 'hooks/useAsync'

export default () => {
  const { getUploadInfo, uploadInfo, stagingUploadInfo, getApplicationInfoById } = ajaxStore.riskExperts.creditEvaluation

  // 获取公司基本信息
  const { loading: getApplicationLoading, doResult: getApplicationDoResult, result: getApplicationResult } = useAsync({
    request: getApplicationInfoById,
    init: false,
  })
  // 获取上传资料信息
  const { loading: getUploadLoading, doResult: getUploadDoResult, result: uploadInfoResult } = useAsync({
    request: getUploadInfo,
    init: false,
  })
  // 上传资料
  const { loading: uploadLoading, doResult: uploadDoResult, result: uploadResult } = useAsync({
    isArray: true,
    request: uploadInfo,
    init: false,
  })
  // 暂存资料
  const { loading: stagingUploadLoading, doResult: stagingUploadDoResult, result: stagingUploadResult } = useAsync({
    isArray: true,
    request: stagingUploadInfo,
    init: false,
  })

  return {
    getUploadLoading,
    getUploadDoResult,
    uploadInfoResult,
    uploadLoading,
    uploadDoResult,
    uploadResult,
    stagingUploadLoading,
    stagingUploadDoResult,
    stagingUploadResult,
    getApplicationLoading,
    getApplicationResult,
    getApplicationDoResult,
  }
}
