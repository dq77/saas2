// 赊销获取应上传材料列表
import useAsync from 'hooks/useAsync'
import ajaxStore from '@/apis'

export default () => {
  // ajax
  const { credit: { getMaterialByScenario } } = ajaxStore
  // 根据应用场景获取场景下需要材料 getMaterialByScenario
  const { doResult: getMaterial, result: materials } = useAsync({
    init: false,
    isLoading: false,
    request: getMaterialByScenario
  })

  return {
    getMaterial,
    materials
  }
}
