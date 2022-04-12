import { taskStatus } from '@/utils/enums'
import { baseUrl } from '@/utils/config'

export const columns = [
  {label: '任务编号', key: 'taskSn'},
  {label: '创建时间', key: 'createdTime'},
  {label: '创建人', key: 'createdName'},
  {label: '任务状态', key: 'taskStatus', render: (row, key) => taskStatus[row.taskStatus]},
  {label: '导入数量', key: 'entityCompany', render: (row, key) => row.taskStatus === '0' ? '--' : row.totalNum},
  {label: '导入结果', key: 'invoiceType'},
  {label: '操作', key: 'operate', width: '180px', options: [{ label: '刷新', render: (row) => row.taskStatus === '0' ? '刷新' : row.failNum > 0 ? '下载错误报告' : ''}]},
]

export const configData = {
  projectImport: {
    title: '批量导入项目',
    uploadUrl: `${baseUrl}/saas-boss/excel/upload?businessType=project_bulk_import`,
    code: 'project_bulk_import',
    weblogsAnchor: 'supplyChain-factory-project-import'
  },
  productImport: {
    title: '批量导入产品',
    uploadUrl: `${baseUrl}/saas-boss/excel/upload?businessType=product_bulk_import`,
    code: 'product_bulk_import',
    weblogsAnchor: 'supplyChain-factory-product-import'
  },
  productAttrImport: {
    title: '批量导入产品属性',
    uploadUrl: `${baseUrl}/saas-boss/excel/upload?businessType=product_attribute_bulk_import`,
    code: 'product_attribute_bulk_import',
    weblogsAnchor: ''
  },
  customerPriceImport: {
    title: '批量导入客户价格',
    uploadUrl: `${baseUrl}/saas-boss/excel/upload?businessType=goods_customer_bulk_import`,
    code: 'goods_customer_bulk_import',
    weblogsAnchor: ''
  },
  projectPriceImport: {
    title: '批量导入产品价格',
    uploadUrl: `${baseUrl}/saas-boss/excel/upload?businessType=goods_project_bulk_import`,
    code: 'goods_project_bulk_import  ',
    weblogsAnchor: ''
  },
  // 入库 - 批量导入
  inListUpload: {
    title: '批量导入入库',
    uploadUrl: `${baseUrl}/saas-boss/excel/upload?businessType=wm_storage_bulk_import`,
    code: 'wm_storage_bulk_import',
    weblogsAnchor: ''
  },
  // 出库 - 批量导入
  outListUpload: {
    title: '批量导入出库',
    uploadUrl: `${baseUrl}/saas-boss/excel/upload?businessType=wm_outbound_bulk_import`,
    code: 'wm_outbound_bulk_import',
    weblogsAnchor: ''
  },
}

export const routerPath = {
  // projectImport:
}
