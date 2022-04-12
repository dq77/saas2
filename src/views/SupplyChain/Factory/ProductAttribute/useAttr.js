import { ref } from '@vue/composition-api'
import useAsync from 'hooks/useAsync'

export default ({ request, init = true, deleteHandle, getAttr, handleSearchItem }) => {
  const resultData = ref([])
  const isFirst = ref(true)
  const successCallBack = ({ data}) => {
    isFirst.value && handleSearchItem && handleSearchItem(data[0])
    isFirst.value = false
    resultData.value = data
  }
  // 左右两侧input查询
  const { loading, result, doResult } = useAsync({
    request,
    init,
    successCallBack
  })
  // 左侧删除
  const { doResult: delHandle } = useAsync({
    request: deleteHandle,
    init: false
  })
  // 根据产品查询属性
  const { result: fromPro, doResult: getAttrList, loading: listLoading } = useAsync({
    request: getAttr,
    init: false,
    successCallBack
  })

  const handleSearch = params => {
    console.log('pr------', params)
    doResult(params)
  }

  const handleDelete = val => delHandle({ id: val })

  return {
    handleSearch,
    handleDelete,
    result,
    fromPro,
    loading,
    listLoading,
    getAttrList,
    resultData
  }
}
