import useAsync from 'hooks/useAsync'
import ajaxStore from '@/apis'
import { ref } from '@vue/composition-api'

export default () => {
  const tableTitle = ref('')
  const getProjectById = ajaxStore.factoryService.programme.getProjectById

  // 接口
  const { loading, doResult, result } = useAsync({
    request: getProjectById,
    init: false,
    callback: res => {
      const { data: {code, data} } = res
      const { pprovince, pcity, pcounty } = data
      if (code === '0') {
        return {
          data: {
            ...data,
            address: `${pprovince || ''}${pcity || ''}${pcounty || ''}`
          }
        }
      }
    },
    successCallBack: ({ data }) => {
      tableTitle.value = data.pname
    }
  })

  return {
    loading,
    doResult,
    result,
    tableTitle
  }
}
