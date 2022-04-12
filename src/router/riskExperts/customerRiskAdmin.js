const CreditCustomerRiskAdmin = () => import(/* webpackChunkName: "group-risk" */ '@/views/riskExperts/customerRiskAdmin/credit')
const CustomerRiskCreditResult = () => import(/* webpackChunkName: "group-risk" */ '@/views/riskExperts/customerRiskAdmin/credit/result')
const CustomerRiskCreditNews = () => import(/* webpackChunkName: "group-risk" */ '@/views/riskExperts/customerRiskAdmin/credit/news')
const ProjectCustomerRiskAdmin = () => import(/* webpackChunkName: "group-risk" */ '@/views/riskExperts/customerRiskAdmin/project')
const CustomerRiskProjectResult = () => import(/* webpackChunkName: "group-risk" */ '@/views/riskExperts/customerRiskAdmin/project/result')
const CustomerRiskProjectWarning = () => import(/* webpackChunkName: "group-risk" */ '@/views/riskExperts/customerRiskAdmin/project/warning')

const pages = [
  // 客户风险查询-赊销评估客户
  { path: 'creditCustomerQuery', name: 'creditCustomerQuery', component: CreditCustomerRiskAdmin, meta: { menuTag: 'customer_risk_query_management', hasMenuTag: true, crumbs: ['风险专家', '客户风险查询', '赊销评估客户'] } },
  // 赊销-评估结果
  { path: 'creditCustomerResult', name: 'creditCustomerResult', component: CustomerRiskCreditResult, meta: { menuTag: 'customer_risk_query_management', hasMenuTag: false, crumbs: ['风险专家', '赊销评估结果'] } },
  // 赊销-舆情信息
  { path: 'creditCustomerNews', name: 'creditCustomerNews', component: CustomerRiskCreditNews, meta: { menuTag: 'customer_risk_query_management', hasMenuTag: false, crumbs: ['风险专家', '赊销舆情信息'] } },
  // 客户风险查询-项目评估客户
  { path: 'projectCustomerQuery', name: 'projectCustomerQuery', component: ProjectCustomerRiskAdmin, meta: { menuTag: 'customer_risk_query_management', hasMenuTag: false, crumbs: ['风险专家', '客户风险查询', '项目评估客户'] } },
  // 项目-评估结果
  { path: 'projectCustomerResult', name: 'projectCustomerResult', component: CustomerRiskProjectResult, meta: { menuTag: 'customer_risk_query_management', hasMenuTag: false, crumbs: ['风险专家', '项目评估结果'] } },
  // 项目-预警信息
  { path: 'projectCustomerWarning', name: 'projectCustomerWarning', component: CustomerRiskProjectWarning, meta: { menuTag: 'customer_risk_query_management', hasMenuTag: false, crumbs: ['风险专家', '项目舆情信息'] } },
]

export default pages
