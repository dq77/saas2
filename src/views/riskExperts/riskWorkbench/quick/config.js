import { assetsBaseUrl } from '@/utils/config'

export function getDataSource() {
  return [
    {
      title: '发起赊销评估',
      info: '针对预赊销客户发起风险评估任务',
      bgImg: `${assetsBaseUrl}/riskExperts/workbench/quick-1.jpg`,
      bgColor: '#E8F0FB',
      routeNames: ['chooseCreditMode'],
      menuTags: ['credit_evaluation'],
      hasPermission: false,
      routeName: '',
      weblogs: '风险工作台-快捷操作-发起赊销评估-点击操作'
    },
    {
      title: '发起项目评估',
      info: '针对项目发起风险评估任务',
      bgImg: `${assetsBaseUrl}/riskExperts/workbench/quick-2.jpg`,
      bgColor: '#FFF8E7',
      routeNames: ['projectAssess'],
      menuTags: ['project_evaluation'],
      hasPermission: false,
      routeName: '',
      weblogs: '风险工作台-快捷操作-发起项目评估-点击操作'
    },
    {
      title: '评估任务管理',
      info: '管理所有发起的评估任务详情',
      bgImg: `${assetsBaseUrl}/riskExperts/workbench/quick-3.jpg`,
      bgColor: '#EDF8F1',
      routeNames: ['creditTaskList', 'projectTaskList'],
      menuTags: ['credit_task_management', 'credit_task_management'],
      hasPermission: false,
      routeName: '',
      weblogs: '风险工作台-快捷操作-评估任务管理-点击操作'
    },
    {
      title: '客户风险查询',
      bgImg: `${assetsBaseUrl}/riskExperts/workbench/quick-4.jpg`,
      info: '查询客户所有评估结果及风险舆情',
      bgColor: '#E6E5FA',
      routeNames: ['creditCustomerQuery', 'projectCustomerQuery'],
      menuTags: ['customer_risk_query_management', 'customer_risk_query_management'],
      hasPermission: false,
      routeName: '',
      weblogs: '风险工作台-快捷操作-客户风险查询-点击操作'
    }
  ]
}
