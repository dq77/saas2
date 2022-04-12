import getDataViewApis from './dataView'
import getSmartContractApis from './smartContract'
import getLayeredApis from './layered'
import getRiskEngineApis from './riskEngine'
import realEstateApis from './realEstate'
import qjdApis from './qjd'
import homeApis from './home'
import programmeApis from './programme'

const getApis = (instanceQuiet) => {
  return {
    dataView: getDataViewApis(instanceQuiet),
    smartContract: getSmartContractApis(instanceQuiet),
    layered: getLayeredApis(instanceQuiet),
    riskEngine: getRiskEngineApis(instanceQuiet),
    realEstate: realEstateApis(instanceQuiet),
    qjd: qjdApis(instanceQuiet),
    home: homeApis(instanceQuiet),
    programme: programmeApis(instanceQuiet),
  }
}

export default getApis
