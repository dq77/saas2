import { assetsBaseUrl } from '@/utils/config'
export const configBOne = [
  {
    title: '新建客户',
    content: '去新建一个客户信息，您的客户可以通过订货大师进行下单',
    menuTag: 'PTN:SUPPLIER:CUSTOMER:MANAGE',
    name: 'customerCreate',
    query: {
      type: 'create'
    },
    url: `${assetsBaseUrl}/SupplyChain/orderMaster/config-project.png`
  },
  {
    title: '新建项目',
    content: '去新建一个项目信息',
    menuTag: 'PTN:SUPPLIER:CHAIN_PROJECT:MANAGE',
    name: 'projectCreate',
    url: `${assetsBaseUrl}/SupplyChain/orderMaster/config-customer.png`
  }
]
export const configBTwo = [
  {
    title: '新建产品属性',
    content: '去新建一个产品属性，产品属性用于您的产品维护',
    menuTag: 'PTN:SUPPLIER:CHAIN_PRODUCT:ATTRIBUTE',
    name: 'ProductAttribute',
    url: `${assetsBaseUrl}/SupplyChain/orderMaster/config-productAttr.png`
  },
  {
    title: '新建产品分类',
    content: '去新建一个分类，这样就可以对您的产品进行分类了',
    menuTag: 'PTN:SUPPLIER:CHAIN_PRODUCT:CLASSIFY',
    name: 'ProductClassify',
    url: `${assetsBaseUrl}/SupplyChain/orderMaster/config-productClassify.png`
  },
  {
    title: '新建产品',
    content: '去新建一个产品，您的客户可以看到您上架的产品，并进行下单',
    menuTag: 'PTN:SUPPLIER:CHAIN_PRODUCT:MANAGE',
    name: 'ProductCreate',
    url: `${assetsBaseUrl}/SupplyChain/orderMaster/config-product.png`
  },
  {
    title: '新建产品标签',
    content: '去新建一个产品标签，您可以根据产品标签配置对应的优先扣款账户，当然，产品标签的配置是不必须的',
    menuTag: 'PTN:SUPPLIER:CHAIN_SET_BASE',
    name: 'setBase',
    query: {
      moduleTab: 'supplyChain',
      functionTab: 'productSign'
    },
    url: `${assetsBaseUrl}/SupplyChain/orderMaster/config-productSign.png`
  },
]
export const configBThree = [
  {
    title: '新建项目价格',
    content: '去新建一个项目价格，您可对不同项目新建不同的项目价格',
    menuTag: 'PTN:SUPPLIER:CHAIN_PROJECT:PRICE',
    name: 'projectPriceList',
    url: `${assetsBaseUrl}/SupplyChain/orderMaster/config-price.png`
  },
  {
    title: '新建客户价格',
    content: '去新建一个客户价格，您可对不同客户新建不同的项目价格',
    menuTag: 'PTN:SUPPLIER:CHAIN_CUSTOMER:PRICE',
    name: 'customerPriceList',
    url: `${assetsBaseUrl}/SupplyChain/orderMaster/config-price.png`
  },
  {
    title: '新建价格策略',
    content: '针对项目价格、客户价格及基础价格设施一个价格策略',
    menuTag: 'PTN:SUPPLIER:CHAIN_PRICE:STRATEGY',
    name: 'PriceStrategy',
    url: `${assetsBaseUrl}/SupplyChain/orderMaster/config-priceStrigy.png`
  },
]
export const configBFour = [
  {
    title: '新建账户类型',
    content: '如果您需要为您的客户开通订货大师现金账户，那么您需要先去新建账户类型',
    menuTag: 'PTN:SUPPLIER:CHAIN_SET_BASE',
    name: 'setBase',
    query: {
      moduleTab: 'supplyChain',
      functionTab: 'accountType'
    },
    url: `${assetsBaseUrl}/SupplyChain/orderMaster/config-accountType.png`
  },
]
export const configBFive = [
  {
    title: '新建仓库',
    content: '如果您需要使用订货大师库存管理功能，您就需要先去添加您的仓库',
    menuTag: 'PTN:SUPPLIER:CHAIN_SET_BASE',
    name: 'setBase',
    query: {
      moduleTab: 'supplyChain',
      functionTab: 'warehouseConfig'
    },
    url: `${assetsBaseUrl}/SupplyChain/orderMaster/config-warehouseConfig.png`
  },
  {
    title: '配置库存',
    content: '在配置库存页面中，您可以根据您实际库存管理方案，自定义设置您的库存选项',
    menuTag: 'PTN:SUPPLIER:CHAIN_SET_BASE',
    name: 'setBase',
    query: {
      moduleTab: 'supplyChain',
      functionTab: 'stockConfig'
    },
    url: `${assetsBaseUrl}/SupplyChain/orderMaster/config-stockConfig.png`
  },
]
export const promptInfoTitle = '在您通过订货大师开展业务之前，您需要在系统中录入如下几部分基础信息，完成这些信息维护后，您的客户便可以通过订货大师进行在线采购，并开展后续业务。'
