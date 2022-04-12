import creditEvaluationApis from './creditEvaluation'
import projectEvaluationApis from './projectEvaluation'
import customerRiskAdminApis from './customerRiskAdmin'
import workbenchApis from './workbench'
import realestateWarningApis from './realestateWarning'
import newsRemindApis from './newsRemind'

const getApis = (instanceQuiet) => {
  return {
    creditEvaluation: creditEvaluationApis(instanceQuiet),
    projectEvaluation: projectEvaluationApis(instanceQuiet),
    customerRiskAdmin: customerRiskAdminApis(instanceQuiet),
    workbench: workbenchApis(instanceQuiet),
    realestateWarning: realestateWarningApis(instanceQuiet),
    newsRemind: newsRemindApis(instanceQuiet),
  }
}

export default getApis
