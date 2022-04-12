import factoryRoutes from './factory/factory' // 厂家端
import dealerRoutes from './dealer/dealer' // 经销商

const Identify = () => import('@/views/SupplyChain/IdentitySelect/index.vue')
const SupplyChain = () => import(/* webpackChunkName: "group-index" */ '@/views/SupplyChain/index.vue')

export default {
  module: 'supplyChain',
  children: [
    {
      name: 'supplyChain',
      path: 'supplyChain',
      component: SupplyChain,
      children: [
        {
          name: 'factoryOrder',
          path: 'factory',
          component: SupplyChain,
          children: [
            ...factoryRoutes
          ]
        },
        {
          name: 'dealerOrder',
          path: 'dealer',
          component: SupplyChain,
          children: [
            ...dealerRoutes
          ]
        }
      ]
    },
    { path: 'identify', name: 'Identify', components: { default: Identify } },
  ]
}
