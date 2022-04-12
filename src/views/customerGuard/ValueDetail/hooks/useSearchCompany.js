import useAsync from 'hooks/useAsync'
import { reactive, toRefs } from '@vue/composition-api'
import { filterGradeInfo } from '@/utils/util'

export default ({request}) => {
  const state = reactive({
    companyList: []
  })

  const { loading, doResult } = useAsync({
    init: false,
    request,
    successCallBack: ({ code, data }) => {
      if (code !== '0') return
      data && data.pagedRecords.forEach((item, key) => {
        data.pagedRecords[key].gradeInfo = filterGradeInfo(item)
      })
      state.companyList = data?.pagedRecords || []
    }
  })

  return {
    loading,
    doResult,
    ...toRefs(state)
  }
}
