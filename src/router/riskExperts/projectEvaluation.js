const ProjectEvaluation = () => import(/* webpackChunkName: "group-risk" */ '@/views/riskExperts/projectTaskList/index')
const ChooseProjectMode = () => import(/* webpackChunkName: "group-risk" */ '@/views/riskExperts/chooseProjectMode/index')
// 项目评估
const ProjectAssess = () => import(/* webpackChunkName: "group-risk" */ '@/views/riskExperts/projectAssess/index')
const ProjectAssessDetail = () => import(/* webpackChunkName: "group-risk" */ '@/views/riskExperts/projectAssess/detail/index')
const ProjectResult = () => import(/* webpackChunkName: "group-risk" */ '@/views/riskExperts/projectResult/index')
const ProjectSubmitSuccess = () => import(/* webpackChunkName: "group-risk" */ '@/views/riskExperts/projectSubmitSuccess/index')

const pages = [
  // 项目深度评估查看
  { path: 'projectAssessDetail', name: 'projectAssessDetail', components: { default: ProjectAssessDetail }, meta: { menuTag: 'credit_task_management', hasMenuTag: true, crumbs: ['风险专家', '项目评估', '深度评估详情'] } },
  // 项目评估结果
  { path: 'projectResult', name: 'projectResult', components: { default: ProjectResult }, meta: { menuTag: 'credit_task_management', hasMenuTag: true, crumbs: ['风险专家', '项目评估', '深度评估', '评估详情'] } },
  // 评估提交成功
  { path: 'projectSubmitSuccess', name: 'projectSubmitSuccess', components: { default: ProjectSubmitSuccess }, meta: { menuTag: 'credit_task_management', hasMenuTag: true, crumbs: ['风险专家', '项目评估', '发起项目评估'] } },
  // 项目评估任务
  { path: 'projectTaskList', name: 'projectTaskList', components: { default: ProjectEvaluation }, meta: { menuTag: 'credit_task_management', hasMenuTag: true, crumbs: ['风险专家', '评估任务管理', '项目评估任务'] } },
  // 发起项目评估
  { path: 'chooseProjectMode', name: 'chooseProjectMode', components: { default: ChooseProjectMode }, meta: { menuTag: 'project_evaluation', hasMenuTag: true, crumbs: ['风险专家', '发起项目评估'] } },
  // 项目深度评估发起评估
  { path: 'projectAssess', name: 'projectAssess', components: { default: ProjectAssess }, meta: { menuTag: 'project_evaluation', hasMenuTag: true, crumbs: ['风险专家', '项目评估', '深度评估'] } },
]

export default pages
