import { ref } from '@vue/composition-api'
// 全局use
import useForm from 'hooks/useForm'
import useTable from 'hooks/useTable'
import useAsync from 'hooks/useAsync'
// 公共方法
import { filterSearchParams } from '../../../Common'

export default function useGetList(props, root, emit) {
  const { $route } = root
  const formRef = ref(null)

  // form
  const {
    formData,
    formConfig,
    resetHandle,
    setConfig,
  } = useForm({
    formRef,
    formData: props.formDatas,
    formConfig: props.formConfigs
  })

  // select且是通过接口请求数据
  props.formConfigs.forEach(el => {
    if (el.type === 'select' && el.api) {
      useAsync({
        isLoading: false,
        request: el.api,
        successCallBack: ({ data }) => {
          if (data?.length) {
            setConfig && setConfig(el.key, 'options', data)
            console.log(formConfig)
          }
        }
      })
    }
  })

  // table
  const {
    loading,
    dataSource,
    pagination,
    searchHandle,
    searchInfo,
    resetHandle: resetTableHandle
  } = useTable({
    request: props.listApi,
    isPage: true,
    defaultParams: { ...$route.params },
    callback: data => {
      const { totalCount = 0, pagedRecords = [] } = data || {}
      return {
        totalCount,
        dataSource: pagedRecords
      }
    }
  })

  // table中的项需要接口获取枚举值的
  // props.tableColumns
  // columns.forEach(el => {
  //   if (el.api) {
  //     console.log(el)
  //     useAsync({
  //       isLoading: false,
  //       request: el.api,
  //       successCallBack: ({ data }) => {
  //         if (data?.length) {
  //           el.render = (row, val) => data.filter(el => val === el.code)?.[0]?.name
  //         }
  //       }
  //     })
  //   }
  // })

  // 查询
  const searchFormHandle = () => {
    const searchData = filterSearchParams(formData.value) || {}
    props.formConfigs.forEach(el => {
      // 时间区间处理
      if (el.kind === 'daterange') {
        for (const key in searchData) {
          if (key === el.key && searchData[key]?.length) {
            searchData[el.key1] = searchData[key][0] + ' 00:00:00'
            searchData[el.key2] = searchData[key][1] + ' 23:59:59'
            delete searchData[key]
          }
        }
      }
    })
    console.log(searchData)
    searchHandle({ ...searchData })
    // emit('searchFormHandle', {
    //   searchHandle,
    //   formData
    // })
  }
  // 重置
  const resetFormHandle = () => {
    resetHandle()
    resetTableHandle()
  }

  // 操作按钮
  const buttonHandle = (detail) => {
    console.log(111)
    emit('buttonHandle', detail)
  }

  // 排序
  const sortChange = ({ prop, order }) => {
    emit('sortChange', {
      prop, order, searchInfo, searchHandle
    })
  }

  return {
    formRef,
    formData,
    formConfig,
    setConfig,
    loading,
    dataSource,
    pagination,
    searchFormHandle,
    resetFormHandle,
    buttonHandle,
    sortChange,
    resetTableHandle,
  }
}
