import useTable from 'hooks/useTable'
import { toPrefixUrl } from '@/utils/util'
import ajaxStore from '@/apis'
import { configData } from './const'

export default function useBatchImport(name) {
  // console.log(name, 'name===>dfdf')
  const { factory: { batchImportInterface } } = ajaxStore
  const {
    dataSource,
    loading,
    pagination,
    searchHandle,
    searchInfo
  } = useTable({
    request: batchImportInterface,
    defaultParams: {businessType: configData[name].code}
    // successCallBack: ({ code, message }) => {})
  })
  const buttonHandle = async ({label, row}) => {
    if (label === '刷新') {
      searchHandle(searchInfo.value)
    }
    if (label === '下载错误报告') {
      window.open(toPrefixUrl(`/saas-boss/excel/exportErrorData?id=${row.id}`))
    }
  }
  return {
    dataSource,
    loading,
    pagination,
    searchHandle,
    buttonHandle
  }
}
