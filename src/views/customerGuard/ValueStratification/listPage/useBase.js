import ajaxStore from '@/apis'
import useAsync from 'hooks/useAsync'
import Router from '@/router'
import useSaveAll from '../../hooks/useSaveAll'
import useFollow from '@/views/customerGuard/hooks/useFollow'
import { ref, reactive, toRefs } from '@vue/composition-api'
import { companyType } from '@/views/customerGuard/EnterpriseSearchList/config'

export default () => {
  const listPage = ref()
  const list = ref([])
  const state = reactive({
    companyType,
    hasFollow: [],
    applyReportDialogShow: false,
    reportCompanyName: ''
  })
  // useFollow
  const {
    getFollowCompanyList,
    checkHasFollowed,
    followCompanys,
    unFollowCompany
  } = useFollow()
  // useSaveAll
  const { doResult: saveDoResult } = useSaveAll()

  // 检查单个公司是否已关注
  const check = async (companyName) => {
    return await checkHasFollowed({
      companyName,
      cache: true
    })
  }
  // 关注操作
  const follow = async (companyName) => {
    await followCompanys([{companyName}])
    getFollowResult(list.value)
  }
  // 取消关注操作
  const unFollow = async (companyName) => {
    await unFollowCompany(companyName)
    getFollowResult(list.value)
  }
  // 获取列表数据关注情况
  const getFollowResult = async (companyList) => {
    await getFollowCompanyList(true)
    state.hasFollow = []
    companyList.map(async (item) => {
      const result = await check(item.corpName)
      state.hasFollow.push(result)
    })
  }
  // 查看导出历史文件
  const checkFile = (filekey) => {
    window.open(toPrefixUrl(`/partner/common/file/download?fileKey=${filekey}`))
  }
  // 查看详情
  const toDetail = (row) => {
    saveDoResult({ companyName: row.corpName })
    Router.push({
      name: 'valueDetail',
      query: {
        corpName: row.corpName,
        id: row.id
      }
    })
  }
  const initFollowResult = (data) => {
    list.value = data
    getFollowResult(data)
  }
  const applyReport = (isShow) => {
    state.applyReportDialogShow = isShow === false ? isShow : !state.applyReportDialogShow
  }
  const setReportName = (row) => {
    state.reportCompanyName = row.corpName
    // applyReport()
  }

  /** 表格操作 */
  const { deleteById, updateScore, checkCompanyInfoById, getTaskCount } = ajaxStore.risk
  // 更新
  const { loading: updateRatingLoading, doResult: updateRating } = useAsync({
    init: false,
    request: updateScore
  })
  // 移除
  const { loading: removeLoading, doResult: removeRating } = useAsync({
    init: false,
    request: deleteById
  })
  // 获取当前信息公司
  const { loading: checkCompanyInfoLoading, doResult: checkCompanyInfo } = useAsync({
    init: false,
    request: checkCompanyInfoById
  })
  // 获取taskCode
  const { doResult: taskCountDoResult } = useAsync({
    init: false,
    request: getTaskCount
  })

  return {
    check,
    follow,
    unFollow,
    listPage,
    list,
    initFollowResult,
    checkFile,
    toDetail,
    applyReport,
    setReportName,
    updateRatingLoading,
    updateRating,
    removeLoading,
    removeRating,
    checkCompanyInfoLoading,
    checkCompanyInfo,
    saveDoResult,
    taskCountDoResult,
    ...toRefs(state)
  }
}
