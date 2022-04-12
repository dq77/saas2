import ajaxStore from '@/apis'

export const collapseItems = [
  { key: 'customerInfo', label: '客户信息' },
  { key: 'priceInfo', label: '产品和价格信息' },
]

export const defaultActiveCollapse = ['customerInfo', 'priceInfo']

export const formData = {
  customerId: undefined
}

export const getFormConfig = (routeType, opts = {}) => {
  if (routeType === 'create') {
    return [{
      type: 'select',
      key: 'customerId',
      label: '客户名称',
      span: 12,
      filterable: true,
      clearable: true,
      remote: true,
      remoteMethod: opts.getOptions,
      options: []
    }]
  } else {
    return [{
      type: 'select',
      key: 'customerId',
      label: '客户名称',
      span: 12,
      disabled: true,
      options: opts.defaultOptions
    }]
  }
}

const getProductNameOptions = async (query, key, row, tableData) => {
  row.productNameLoading = true
  const added = tableData.map(row => row.goodsId)
  const res = await ajaxStore.factory.getProductList({ name: query || '' })
  row.productNameLoading = false
  if (res.data && res.data.code === '0') {
    row.productNameOptions = res.data.data.pagedRecords.map(item => {
      return {
        value: JSON.stringify(item),
        label: `${item.name}(${item.productSn})`,
        disabled: added.indexOf(item.id) > -1
      }
    })
  } else {
    row.productNameOptions = []
  }
}

const getProductSnOptions = async (query, key, row, tableData) => {
  row.productSnLoading = true
  const added = tableData.map(row => row.goodsId)
  const res = await ajaxStore.factory.getProductList({ productSn: query || '' })
  row.productSnLoading = false
  if (res.data && res.data.code === '0') {
    row.productSnOptions = res.data.data.pagedRecords.map(item => {
      return {
        value: JSON.stringify(item),
        label: `${item.productSn}(${item.name})`,
        disabled: added.indexOf(item.id) > -1
      }
    })
  } else {
    row.productSnOptions = []
  }
}

export const getTableColumns = (routeType) => {
  if (routeType === 'detail') {
    return [
      { label: '图片', key: 'mainPicPath', minWidth: 80 },
      { label: '产品名称', key: 'name', type: 'input', minWidth: 140, disabled: true },
      { label: '产品型号', key: 'productSn', type: 'input', minWidth: 140, disabled: true },
      { label: '产品分类', key: 'categoryName', minWidth: 100 },
      { label: '销售单位', key: 'unitName', minWidth: 80 },
      { label: '产品规格', key: 'specification', minWidth: 100 },
      { label: '基础单价（元）', key: 'basePrice', minWidth: 120 },
      { label: '客户单价（元）', key: 'price', type: 'input', minWidth: 120, disabled: true },
    ]
  } else {
    return [
      { label: '图片', key: 'mainPicPath', minWidth: 80 },
      {
        label: '产品名称',
        key: 'name',
        type: 'select',
        minWidth: 140,
        filterable: true,
        clearable: true,
        remote: true,
        customOption: true,
        optionSpecifier: 'productNameOptions',
        remoteMethod: getProductNameOptions,
        loadingSpecifier: 'productNameLoading',
      },
      {
        label: '产品型号',
        key: 'productSn',
        type: 'select',
        minWidth: 140,
        filterable: true,
        clearable: true,
        remote: true,
        customOption: true,
        optionSpecifier: 'productSnOptions',
        remoteMethod: getProductSnOptions,
        loadingSpecifier: 'productSnLoading',
      },
      { label: '产品分类', key: 'categoryName', minWidth: 100 },
      { label: '销售单位', key: 'unitName', minWidth: 80 },
      { label: '产品规格', key: 'specification', minWidth: 100 },
      { label: '基础单价（元）', key: 'basePrice', minWidth: 120 },
      { label: '客户单价（元）', key: 'price', type: 'inputNumber', minWidth: 120, min: 0, precision: 4 },
    ]
  }
}

// 根据路由获取页面各块显示、隐藏、禁用、可用的配置
export const getRouteConfig = (routeName) => {
  const status = {
    customerPriceCreate: 'create',
    customerPriceEdit: 'edit',
    customerPriceDetail: 'detail'
  }
  return status[routeName]
}
