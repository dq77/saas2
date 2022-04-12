import programmeRoutes from './programme'
import realestateRoutes from './realestate'
const RealestateMain = () => import(/* webpackChunkName: "group-index" */ '@/views/realestate/index.vue')

export default {
  module: 'realestate',
  children: [
    {
      name: 'realestate',
      path: 'realestate',
      redirect: { name: 'realEstateMarket' },
      component: RealestateMain,
      children: [
        ...realestateRoutes,
        ...programmeRoutes
      ]
    }
  ]
}

