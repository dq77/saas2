import useAsync from 'hooks/useAsync'
import ajaxStore from '@/apis'

export default () => {
  const { getHolder } = ajaxStore.factoryService.realEstate
  const { loading, doResult, result } = useAsync({
    request: getHolder,
    init: false,
    callback: res => {
      const { data: { code, data } } = res
      if (code === '0') {
        const gdjgData = []
        data.map((item) => {
          gdjgData.push({
            name: item.name,
            holdingRatio: item.capital.length ? item.capital[0].percent : '-',
            holdingNum: item.capital.length ? item.capital[0].amomon : '-',
          })
        })
        return {
          data: gdjgData
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
