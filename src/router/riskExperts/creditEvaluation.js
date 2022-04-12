const CreditEvaluation = () => import(/* webpackChunkName: "group-risk" */ '@/views/riskExperts/creditTaskList/index')
const ChooseCreditMode = () => import(/* webpackChunkName: "group-risk" */ '@/views/riskExperts/chooseCreditMode/index')
const ChooseCompany = () => import(/* webpackChunkName: "group-risk" */ '@/views/riskExperts/chooseCompany/index')
const UploadMaterials = () => import(/* webpackChunkName: "group-risk" */ '@/views/riskExperts/uploadMaterials/index')
const ProcessLoading = () => import(/* webpackChunkName: "group-risk" */ '@/views/riskExperts/processLoading/index')
// 评估授权
const NormalAuth = () => import(/* webpackChunkName: "group-risk" */ '@/views/riskExperts/authorize/normal/index')
const AccurateAuth = () => import(/* webpackChunkName: "group-risk" */ '@/views/riskExperts/authorize/accurate/index')
// 评估结果
const FastResult = () => import(/* webpackChunkName: "group-risk" */ '@/views/riskExperts/creditResult/fast/index')
const NormalResult = () => import(/* webpackChunkName: "group-risk" */ '@/views/riskExperts/creditResult/normal/index')
const AccurateResult = () => import(/* webpackChunkName: "group-risk" */ '@/views/riskExperts/creditResult/accurate/index')
const EvaluationSubmitSuccess = () => import(/* webpackChunkName: "group-risk" */ '@/views/riskExperts/evaluationSubmitSuccess/index')

const pages = [
  // 标准授权
  { path: 'normalAuth', name: 'normalAuth', components: { default: NormalAuth }, meta: { menuTag: 'credit_evaluation', hasMenuTag: true, crumbs: ['风险专家', '标准评估'] } },
  // 精准授权
  { path: 'accurateAuth', name: 'accurateAuth', components: { default: AccurateAuth }, meta: { menuTag: 'credit_evaluation', hasMenuTag: true, crumbs: ['风险专家', '精准评估'] } },
  // 快速评估结果
  { path: 'fastResult', name: 'fastResult', components: { default: FastResult }, meta: { menuTag: 'credit_evaluation', hasMenuTag: true, crumbs: ['风险专家', '快速评估报告'] } },
  // 标准评估结果
  { path: 'normalResult', name: 'normalResult', components: { default: NormalResult }, meta: { menuTag: 'credit_evaluation', hasMenuTag: true, crumbs: ['风险专家', '标准评估报告'] } },
  // 精准评估结果
  { path: 'accurateResult', name: 'accurateResult', components: { default: AccurateResult }, meta: { menuTag: 'credit_evaluation', hasMenuTag: true, crumbs: ['风险专家', '精准评估报告'] } },
  // 赊销评估任务
  { path: 'creditTaskList', name: 'creditTaskList', components: { default: CreditEvaluation }, meta: { menuTag: 'credit_task_management', hasMenuTag: true, crumbs: ['风险专家', '评估任务管理', '赊销评估任务'] } },
  // 评估提交成功
  { path: 'evaluationSubmitSuccess', name: 'evaluationSubmitSuccess', components: { default: EvaluationSubmitSuccess }, meta: { menuTag: 'credit_evaluation', hasMenuTag: true, crumbs: ['风险专家', '发起赊销评估'] } },
  // loading过渡页
  { path: 'processLoading', name: 'processLoading', components: { default: ProcessLoading }, meta: { menuTag: 'credit_evaluation', hasMenuTag: true, crumbs: ['风险专家', '发起赊销评估'] } },
  // 上传资料
  { path: 'uploadMaterials', name: 'uploadMaterials', components: { default: UploadMaterials }, meta: { menuTag: 'credit_evaluation', hasMenuTag: true, crumbs: ['风险专家', '发起赊销评估'] } },
  // 选择公司
  { path: 'chooseCompany', name: 'chooseCompany', components: { default: ChooseCompany }, meta: { menuTag: 'credit_evaluation', hasMenuTag: true, crumbs: ['风险专家', '发起赊销评估'] } },
  // 发起赊销评估
  { path: 'chooseCreditMode', name: 'chooseCreditMode', components: { default: ChooseCreditMode }, meta: { menuTag: 'credit_evaluation', hasMenuTag: true, crumbs: ['风险专家', '发起赊销评估'] } },
]

export default pages
