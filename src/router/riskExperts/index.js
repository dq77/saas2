import creditEvaluationRoutes from './creditEvaluation'
import projectEvaluationRoutes from './projectEvaluation'
import customerRiskAdminRoutes from './customerRiskAdmin'
import newsRemindRoutes from './newsRemind'
import realestateWarningRoutes from './realestateWarning'
const RiskExpertsMain = () => import(/* webpackChunkName: "group-risk-experts" */ '@/views/riskExperts/index.vue')
const RiskWorkbench = () => import(/* webpackChunkName: "group-risk-experts" */ '@/views/riskExperts/riskWorkbench/index')

const pages = [
  // 风险工作台
  { path: 'riskWorkbench', name: 'riskWorkbench', component: RiskWorkbench, meta: { menuTag: 'risk_workbench', hasMenuTag: true, crumbs: ['风险专家', '风险工作台'] } },
]

export default {
  module: 'riskExperts',
  children: [
    {
      name: 'riskExperts',
      path: 'riskExperts',
      redirect: { name: 'creditTaskList' },
      component: RiskExpertsMain,
      children: [
        ...pages,
        ...projectEvaluationRoutes,
        ...creditEvaluationRoutes,
        ...customerRiskAdminRoutes,
        ...newsRemindRoutes,
        ...realestateWarningRoutes,
      ]
    }
  ]
}

