import { reactive, toRefs } from '@vue/composition-api'
import { Message } from 'element-ui'
import { deepCopy } from '@/utils/qjd'
// import useAsync from 'hooks/useAsync'
// import ajaxStore from '@/apis'

export default ({dataSource, single = false, transformMethod}) => {
  // const {
  //   credit: { getCreditAccountList },
  // } = ajaxStore
  dataSource && dataSource.forEach(element => {
    element.loading = false
  })
  const state = reactive({
    single,
    fileList: [],
    dataSource: deepCopy(dataSource),
    loading: false
  })

  const handleChange = (res, index) => {
    const { data, message } = res
    state.dataSource[index].loading = false
    if (data) {
      state.fileList = []
      const fileResult = transform(data)
      state.dataSource[index] = fileResult
    } else {
      Message.error(message)
    }
  }

  const transform = (data) => {
    data.loading = false
    if (transformMethod) return transformMethod(data)
    return data
  }

  const onSuccess = (response, file, files) => {
    const { data, message } = response
    state.fileList = []
    state.loading = false
    if (data) {
      Message.success('上传成功')
      single && (state.dataSource = [])
      const fileResult = transform(data)
      state.dataSource.push(fileResult)
      return true
    } else {
      Message.error(message)
      return false
    }
  }
  const onError = (index) => {
    if (index || index === 0) {
      state.dataSource[index].loading = false
    } else {
      state.loading = false
    }
  }

  const onProgress = (index) => {
    if (index || index === 0) {
      state.dataSource[index].loading = true
    } else {
      state.loading = true
    }
  }

  const deleteRow = (row) => {
    const newDataSource = state.dataSource.filter(item => {
      return item.fileKey !== row.fileKey
    })
    state.dataSource = newDataSource
  }

  return {
    handleChange,
    onSuccess,
    onError,
    onProgress,
    deleteRow,
    ...toRefs(state),
  }
}
