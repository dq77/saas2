import { reactive, toRefs, computed } from '@vue/composition-api'
import useAsync from 'hooks/useAsync'
import ajaxStore from '@/apis'
import { toAmountStr } from '@/utils/util'

export default function() {
  const state = reactive({
    credit: { // 赊销
      task: {
        title: '评估任务总数',
        desc: '进行中任务数',
        sum: '0',
        ongoing: '0',
        percent: '0',
      },
      customer: {
        title: '评估客户总数',
        desc: '评估中客户数',
        sum: '0',
        ongoing: '0',
        percent: '0',
      },
      charts: {
        quick: {
          sum: 0,
          ongoing: 0,
          percent: '0.00',
          success: 0,
          successPercent: 0,
          reject: 0,
          rejectPercent: 0,
        },
        standard: {
          sum: 0,
          ongoing: 0,
          percent: '0.00',
          success: 0,
          successPercent: 0,
          reject: 0,
          rejectPercent: 0,
        },
        accurate: {
          sum: 0,
          ongoing: 0,
          percent: '0.00',
          success: 0,
          successPercent: 0,
          reject: 0,
          rejectPercent: 0,
        }
      }
    },
    project: { // 项目
      task: {
        title: '评估任务总数',
        desc: '进行中任务数',
        sum: '0',
        ongoing: '0',
        percent: '0',
      },
      customer: {
        title: '评估客户总数',
        desc: '评估中客户数',
        sum: '0',
        ongoing: '0',
        percent: '0',
      },
      charts: {
        quick: {
          sum: 0,
          ongoing: 0,
          percent: '0.00',
        },
        deep: {
          sum: 0,
          ongoing: 0,
          percent: '0.00',
        }
      }
    },
    loading: false,
  })
  const { loading: loadingCredit } = useAsync({
    request: ajaxStore.riskExperts.workbench.getCreditEvaluateTask,
    init: true,
    successCallBack: (res) => {
      if (res?.code === '0') {
        const data = res?.data ?? {}
        state.credit.task.sum = toAmountStr(data.totalCount, 0, true)
        state.credit.task.ongoing = toAmountStr(data.inProgressTaskCount, 0, true)
        state.credit.task.percent = data.inProgressTaskProportion
        state.credit.customer.sum = toAmountStr(data.customerTotalCount, 0, true)
        state.credit.customer.ongoing = toAmountStr(data.inProgressCustomerCount, 0, true)
        state.credit.customer.percent = data.inProgressCustomerProportion
        state.credit.charts.quick.sum = data.reCreditTasksMap.FAST_MODE?.totalTaskCount ?? 0
        state.credit.charts.quick.ongoing = data.reCreditTasksMap.FAST_MODE?.accomplishCount ?? 0
        state.credit.charts.quick.percent = data.reCreditTasksMap.FAST_MODE?.taskProportion ?? '0.00'
        state.credit.charts.quick.success = data.reCreditTasksMap.FAST_MODE?.passCount ?? 0
        state.credit.charts.quick.successPercent = Number(data.reCreditTasksMap.FAST_MODE?.passProportion ?? 0)
        state.credit.charts.quick.reject = data.reCreditTasksMap.FAST_MODE?.rejectCount ?? 0
        state.credit.charts.quick.rejectPercent = Number(data.reCreditTasksMap.FAST_MODE?.rejectProportion ?? 0)
        state.credit.charts.standard.sum = data.reCreditTasksMap.STANDARD_MODE?.totalTaskCount ?? 0
        state.credit.charts.standard.ongoing = data.reCreditTasksMap.STANDARD_MODE?.accomplishCount ?? 0
        state.credit.charts.standard.percent = data.reCreditTasksMap.STANDARD_MODE?.taskProportion ?? '0.00'
        state.credit.charts.standard.success = data.reCreditTasksMap.STANDARD_MODE?.passCount ?? 0
        state.credit.charts.standard.successPercent = Number(data.reCreditTasksMap.STANDARD_MODE?.passProportion ?? 0)
        state.credit.charts.standard.reject = data.reCreditTasksMap.STANDARD_MODE?.rejectCount ?? 0
        state.credit.charts.standard.rejectPercent = Number(data.reCreditTasksMap.STANDARD_MODE?.rejectProportion ?? 0)
        state.credit.charts.accurate.sum = data.reCreditTasksMap.ACCURATE_MODE?.totalTaskCount ?? 0
        state.credit.charts.accurate.ongoing = data.reCreditTasksMap.ACCURATE_MODE?.accomplishCount ?? 0
        state.credit.charts.accurate.percent = data.reCreditTasksMap.ACCURATE_MODE?.taskProportion ?? '0.00'
        state.credit.charts.accurate.success = data.reCreditTasksMap.ACCURATE_MODE?.passCount ?? 0
        state.credit.charts.accurate.successPercent = Number(data.reCreditTasksMap.ACCURATE_MODE?.passProportion ?? 0)
        state.credit.charts.accurate.reject = data.reCreditTasksMap.ACCURATE_MODE?.rejectCount ?? 0
        state.credit.charts.accurate.rejectPercent = Number(data.reCreditTasksMap.ACCURATE_MODE?.rejectProportion ?? 0)
      }
    }
  })

  const { loading: loadingProject } = useAsync({
    request: ajaxStore.riskExperts.workbench.getProjectEvaluateTask,
    init: true,
    successCallBack: (res) => {
      if (res?.code === '0') {
        const data = res?.data ?? {}
        state.project.task.sum = toAmountStr(data?.all ?? 0, 0, true)
        state.project.task.ongoing = toAmountStr(data?.alling ?? 0, 0, true)
        state.project.task.percent = ((data?.alling ?? 0) / (data?.all || 1) * 100).toFixed(2)
        state.project.customer.sum = toAmountStr(data?.allCustom ?? 0, 0, true)
        state.project.customer.ongoing = toAmountStr(data?.allingCustom ?? 0, 0, true)
        state.project.customer.percent = ((data?.allingCustom ?? 0) / (data?.allCustom || 1) * 100).toFixed(2)
        state.project.charts.quick.sum = data?.allFast ?? 0
        state.project.charts.quick.ongoing = data?.allDoneFast ?? 0
        state.project.charts.quick.percent = ((data?.allFast ?? 0) / (data?.all || 1) * 100).toFixed(2)
        state.project.charts.deep.sum = data?.allDeep ?? 0
        state.project.charts.deep.ongoing = data?.allDoneDeep ?? 0
        state.project.charts.deep.percent = ((data?.allDeep ?? 0) / (data?.all || 1) * 100).toFixed(2)
      }
    }
  })

  state.loading = computed(() => loadingCredit || loadingProject)

  return {
    ...toRefs(state)
  }
}
