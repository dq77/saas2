const ProgrammeEvaluationMan = () => import(/* webpackChunkName: "group-market" */ '@/views/factoryService/programme/ProgrammeEvaluation/manHistory')
const ProgrammeEvaluationBase = () => import(/* webpackChunkName: "group-market" */ '@/views/factoryService/programme/ProgrammeEvaluation/baseHistory')
const ProgrammeBaseSearch = () => import(/* webpackChunkName: "group-market" */ '@/views/factoryService/programme/BaseSearch')
const EvaluationMan = () => import(/* webpackChunkName: "group-market" */ '@/views/factoryService/programme/EvaluationMan')
const ProgrammeDetail = () => import(/* webpackChunkName: "group-market" */ '@/views/factoryService/programme/ProgrammeDetail/index')

const pages = [
  // 基本项目评估历史列表
  {
    path: 'programme/programmeEvaluation/base',
    name: 'programmeEvaluationBase',
    components: { default: ProgrammeEvaluationBase },
    meta: {
      menuTag: 'supplier_menu_project_evaluation',
      hasMenuTag: true,
      crumbs: ['开发商评估', '项目评估']
    }
  },
  // 基本项目搜索
  {
    path: 'programme/baseSearch',
    name: 'programmeBaseSearch',
    components: { default: ProgrammeBaseSearch },
    meta: {
      menuTag: 'supplier_menu_project_evaluation',
      hasMenuTag: true,
      crumbs: ['开发商评估', '项目评估', '基本项目评估']
    }
  },
  // 项目详情
  {
    path: 'programme/programmeDetail',
    name: 'programmeDetail',
    components: { default: ProgrammeDetail },
    meta: {
      menuTag: 'supplier_menu_project_evaluation',
      hasMenuTag: true,
      crumbs: ['开发商评估', '项目评估', '项目详情']
    }
  },
  // 评估详情
  {
    path: 'programme/evaluationDetail',
    name: 'evaluationDetail',
    components: { default: ProgrammeDetail },
    meta: {
      menuTag: 'supplier_menu_project_evaluation',
      hasMenuTag: true,
      crumbs: ['开发商评估', '项目评估', '评估详情']
    }
  },
  // 人工项目评估表单
  {
    path: 'programme/evaluationMan',
    name: 'evaluationMan',
    components: { default: EvaluationMan },
    meta: {
      menuTag: 'supplier_menu_project_evaluation',
      hasMenuTag: true,
      crumbs: ['开发商评估', '项目评估', '人工项目评估']
    }
  },
  // 人工项目评估历史列表
  {
    path: 'programme/programmeEvaluation/man',
    name: 'programmeEvaluationMan',
    components: { default: ProgrammeEvaluationMan },
    meta: {
      menuTag: 'supplier_menu_project_evaluation',
      hasMenuTag: true,
      crumbs: ['开发商评估', '项目评估']
    }
  }
]

export default pages
