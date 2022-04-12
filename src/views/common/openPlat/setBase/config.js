export const moduleTabConfig = [
  {
    label: '订货大师',
    name: 'supplyChain',
    children: [
      {
        label: '账户类型',
        name: 'accountType'
      },
      {
        label: '产品标签',
        name: 'productSign'
      },
      {
        label: '仓库设置',
        name: 'warehouseConfig'
      },
      {
        label: '库存设置',
        name: 'stockConfig'
      },
    ]
  },
]

export const defaultModuleTab = 'supplyChain'
