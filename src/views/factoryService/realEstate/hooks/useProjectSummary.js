import useAsync from 'hooks/useAsync'
import ajaxStore from '@/apis'

export default () => {
  const { getProjectSummary } = ajaxStore.factoryService.realEstate
  const { loading, doResult, result } = useAsync({
    request: getProjectSummary,
    init: false,
    callback: res => {
      const { data: { code, data } } = res
      if (code === '0') {
        const projectData = []
        data.map((item) => {
          projectData.push({
            name: item.province,
            value: item.num
          })
        })
        return {
          data: projectData
        }
      }
    }
  })

  return {
    loading,
    doResult,
    result
  }
}
