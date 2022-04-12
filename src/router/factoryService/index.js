import dataViewRoutes from './dataView'
import homeRoutes from './home'
import layeredRoutes from './layered'
import qjdRoutes from './qjd'
import riskEngineRoutes from './riskEngine'
import smartContractRoutes from './smartContract'

const FactoryService = () => import(/* webpackChunkName: "group-index" */ '@/views/factoryService/index.vue')

export default {
  module: 'factoryService',
  children: [
    {
      name: 'factoryService',
      redirect: { name: 'riskMarket' },
      path: '',
      component: FactoryService,
      children: [
        ...homeRoutes,
        ...dataViewRoutes,
        ...smartContractRoutes,
        ...layeredRoutes,
        ...riskEngineRoutes,
        ...qjdRoutes,
      ]
    }
  ]
}
