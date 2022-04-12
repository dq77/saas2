import { computed } from '@vue/composition-api'
import ajaxStore from '@/apis'
import useAsync from 'hooks/useAsync'

export default () => {
  // ajax
  const { receive: { getOverdueStaticDataByTime } } = ajaxStore
  // 接口
  const { result, loading } = useAsync({ request: getOverdueStaticDataByTime })
  // 数据处理
  const dataSource = computed(() => result.value ?? {})

  return {
    loading,
    dataSource
  }
}
