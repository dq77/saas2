const customProject = [
  {id: 11, label: '客户管理', menuTag: 'customer_manage', name: 'customerList'},
  {id: 12, label: '项目管理', menuTag: 'supply_chain_project', name: 'projectManage'}
]
const attrClassifyProduct = [
  {id: 21, label: '属性管理', menuTag: 'supply_chain_product_attribute', name: 'ProductAttribute'},
  {id: 22, label: '分类管理', menuTag: 'supply_chain_product_classify', name: 'ProductClassify'},
  {id: 23, label: '产品管理', menuTag: 'supply_chain_product', name: 'productManage'}
]
const productCoustomPrice = [
  {id: 31, label: '项目价格', menuTag: 'supply_chain_project_price', name: 'projectPriceList'},
  {id: 32, label: '客户价格', menuTag: 'supply_chain_customer_price', name: 'customerPriceList'},
  {id: 33, label: '价格策略', menuTag: 'supply_chain_price_strategy', name: 'PriceStrategy'}
]

export const dataSource = [
  { id: 1, name: 'customProject', menuTag: undefined, oprateBtnObj: customProject, title: '第一步，客户和项目资料管理', content: '在开始供应链协同产品使用前，您需要先在系统中录入您当前的客户和项目信息，这些信息将作为客户下单时的依据。'},
  { id: 2, name: 'attrClassifyProduct', menuTag: undefined, oprateBtnObj: attrClassifyProduct, title: '第二步，产品资料设置', content: '在产品管理中，您需要对您的产品进行配置，以供您的客户进行在线下单。产品管理包括了对产品属性、分类以及产品基础信息的管理。' },
  { id: 3, name: 'productCoustomPrice', menuTag: undefined, oprateBtnObj: productCoustomPrice, operationModule: 'CREDIT_ACCOUNT', title: '第三步，产品价格设置', content: '供应链协同系统支持多维度的产品定价，包括以项目、客户或基础价格进行定价，您可以根据具体业务需求自由配置。' },
  { id: 4, name: 'orderManage', menuTag: 'supply_chain_order', title: '第四步，代客下单', content: '您的客户不仅可以通过仟金顶App进行自主下单，同时，您也可以帮助您的客户代客下单。' },
  { id: 5, name: 'deliveryManage', menuTag: 'supply_chain_deliver', title: '第五步，订单发货', content: '若已审核排产的订单，需要进行发货，您可以在发货管理菜单中，根据具体订单进行发货，并生成新的发货单。创建发货后，您的客户也可以通过仟金顶App查看这笔订单的发货详情。' },
  { id: 6, name: 'reverseOrderList', menuTag: 'supply_chain_reverse', title: '第六步，管理退货', content: '若在实际的业务中，需要进行退货时，您的客户可以通过仟金顶App申请退货，您需要在客户管理菜单中，对您客户的退货申请进行审核和管理。' },
  { id: 7, name: 'billingManage', menuTag: 'supply_chain_billing', title: '第七步，管理开票', content: '供应链协同系统支持您的客户通过仟金顶App在线申请开票，你可以在开票管理菜单中，对客户的开票申请进行审核和管理。' }
]

export const tempData = [ // 测试数据
  {
    steps: 1,
    children: [
      {
        steps: 1,
        code: '客户管理',
        desc: 'customer_management',
        flag: true
      },
      {
        steps: 1,
        code: '项目管理',
        desc: 'project_management',
        flag: true
      }
    ],
    status: true
  },
  {
    steps: 2,
    children: [
      {
        steps: 2,
        code: '属性管理',
        desc: 'attribute_management',
        flag: true
      },
      {
        steps: 2,
        code: '分类管理',
        desc: 'classified_management',
        flag: true
      },
      {
        steps: 2,
        code: '产品管理',
        desc: 'product_management',
        flag: true
      }
    ],
    status: true
  },
  {
    steps: 3,
    children: [
      {
        steps: 3,
        code: '项目价格',
        desc: 'project_price',
        flag: true
      },
      {
        steps: 3,
        code: '客户价格',
        desc: 'customer_price',
        flag: false
      },
      {
        steps: 3,
        code: '价格策略',
        desc: 'price_strategy',
        flag: false
      }
    ],
    status: false
  },
  {
    steps: 4,
    children: [
      {
        steps: 4,
        code: '代客下单',
        desc: 'valet_order',
        flag: false
      }
    ],
    status: false
  },
  {
    steps: 5,
    children: [
      {
        steps: 5,
        code: '订单发货',
        desc: 'order_deliver',
        flag: false
      }
    ],
    status: false
  },
  {
    steps: 6,
    children: [
      {
        steps: 6,
        code: '退货管理',
        desc: 'reverse_management',
        flag: false
      }
    ],
    status: false
  },
  {
    steps: 7,
    children: [
      {
        steps: 7,
        code: '管理开票',
        desc: 'invoice_management',
        flag: false
      }
    ],
    status: false
  }
]
