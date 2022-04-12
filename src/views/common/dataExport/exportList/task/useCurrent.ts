import store from '@/store'
import ajaxStore from '@/apis'
import useAsync from 'hooks/useAsync'
import { toPrefixUrl } from '@/utils/util'

export default ({
  formApis
}) => {
  // ajax
  const { common: { dataExport: { getUsingBusinessTypeList, getUsingModuleNameList } } } = ajaxStore
  // 任务模块
  useAsync({
    request: getUsingModuleNameList,
    successCallBack: res => {
      formApis.setConfig('moduleName', 'options', res?.data?.map(item => ({ label: item, value: item })) ?? [])
    }
  })
  // 任务类型
  useAsync({
    request: getUsingBusinessTypeList,
    successCallBack: res => formApis.setConfig('businessType', 'options', res?.data ?? [])
  })
  // 下载
  const downHandle = row => {
    // 下载触发数量数据更新
    store.dispatch('getHasDownNumber')
    window.open(toPrefixUrl(`/saas-boss/excel/exportErrorData?id=${row?.id}`))
  }

  return {
    downHandle
  }
}

