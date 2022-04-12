import useTimeout from 'hooks/useTimeout'
import { reactive, toRefs } from '@vue/composition-api'
import useAsync from 'hooks/useAsync'

/*
@request 如果需要请求接口，则穿请求方法
@params 请求方法的请求参数
@pageSize  分页大小
@allData  如果不需要请求，直接传所有数据的数组
@timeout 模拟请求时间间隔
*/

function useTable({
  request = {},
  params = {},
  pageSize = 10,
  allData = null,
  timeout = 300
}) {
  const state = reactive({
    allData: null,
    dataSource: null,
    pagination: {
      current: 1,
      total: 0,
      pageSize,
      onChange: (page) => {},
    },
  })

  const { perTimeout } = useTimeout()

  const onChange = (page) => {
    const { pageSize } = state.pagination
    loading.value = true
    // 模拟异步请求
    perTimeout(() => {
      loading.value = false
      state.current = page
      state.dataSource = state.allData.slice(pageSize * (page - 1), pageSize * page)
    }, timeout)
  }

  const successHandle = (data) => {
    state.allData = data
    state.pagination.total = data.length
    const { current, pageSize } = state.pagination
    state.dataSource = data.slice(pageSize * (current - 1), pageSize * current)
    state.pagination.onChange = onChange
  }

  const { loading, doResult } = useAsync({
    request,
    init: false,
    params,
    successCallBack: ({ code, data }) => {
      code === '0' && successHandle(data)
    }
  })

  if (allData) {
    state.allData = allData
    successHandle(allData)
  } else {
    doResult()
  }

  return {
    loading,
    ...toRefs(state),
  }
}

export default useTable
