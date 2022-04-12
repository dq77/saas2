/*
 * @Date: 2021-07-29 10:19:03
 * @LastEditors: 掉漆
 * @LastEditTime: 2021-08-02 11:01:54
 */
const ExportList = () => import(/* webpackChunkName: "group-common" */ '@/views/common/dataExport/exportList/index.vue')

const pages = [
  { path: 'dataCenter/exportList', name: 'exportList', components: { default: ExportList }, meta: { menuTag: 'data_center', hasMenuTag: true, crumbs: ['批量中心'] } },
]

export default pages
