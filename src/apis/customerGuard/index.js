import getEnterpriseApis from './enterprise'
import getValueStratificationApis from './valueStratification'
import getPreciseStratificationApis from './preciseStratification' // 精准分层

const getApis = (instanceQuiet) => {
  return {
    enterprise: getEnterpriseApis(instanceQuiet),
    stratify: getValueStratificationApis(instanceQuiet),
    precise: getPreciseStratificationApis(instanceQuiet)
  }
}

export default getApis
