import accountRoutes from './account'
import customerRoutes from './customer'
import helpCenterRoutes from './helpCenter'
import messageRoutes from './message'
import processRoutes from './process'
import dataExportRoutes from './dataExport'
import openPlatRoutes from './openPlat'
import projectRoutes from './project'

const OpenPlat = () => import('@/views/common/openPlat/index.vue')

export default {
  module: 'common',
  children: [
    ...accountRoutes,
    ...helpCenterRoutes,
    ...customerRoutes,
    ...processRoutes,
    ...messageRoutes,
    ...dataExportRoutes,
    ...projectRoutes,
    {
      name: 'openPlat',
      redirect: { name: 'developer' },
      path: '',
      component: OpenPlat,
      children: [
        ...openPlatRoutes
      ]
    }
  ]
}
