import parseRoutes from './parse'
const CustomerGuardMain = () => import(/* webpackChunkName: "group-index" */ '@/views/customerGuard/index.vue')
// const EnterpriseImage = () => import(/* webpackChunkName: "group-market" */ '@/views/customerGuard/EnterpriseImage/index')
const EnterpriseImage = () => import(/* webpackChunkName: "group-market" */ '@/views/customerGuard/EnterpriseImage/index')
const EnterpriseImageFinance = () => import(/* webpackChunkName: "group-market" */ '@/views/customerGuard/EnterpriseImageFinance/index')
const EnterpriseSearchList = () => import(/* webpackChunkName: "group-market" */ '@/views/customerGuard/EnterpriseSearchList/index')
const EnterpriseHome = () => import(/* webpackChunkName: "group-market" */ '@/views/customerGuard/EnterpriseHome/index')
const ValueStratification = () => import(/* webpackChunkName: "group-market" */ '@/views/customerGuard/ValueStratification/index')
const ValueDetail = () => import(/* webpackChunkName: "group-market" */ '@/views/customerGuard/ValueDetail/index')
const RiskDetails = () => import(/* webpackChunkName: "group-market" */ '@/views/customerGuard/RiskDetails/index')
const WatchList = () => import(/* webpackChunkName: "group-market" */ '@/views/customerGuard/WatchList/index')
const MySubscription = () => import(/* webpackChunkName: "group-market" */ '@/views/customerGuard/MySubscription/index')
const PreciseStratification = () => import(/* webpackChunkName: "group-market" */ '@/views/customerGuard/PreciseStratification/List/index')
const PreciseStratificationEdit = () => import(/* webpackChunkName: "group-market" */ '@/views/customerGuard/PreciseStratification/Edit/index')
const PreciseStratificationDetail = () => import(/* webpackChunkName: "group-market" */ '@/views/customerGuard/PreciseStratification/Detail/index')
const pages = [
  ...parseRoutes, // 解析报告
  // 企业画像
  {
    path: 'enterpriseImage',
    name: 'enterpriseImage',
    components: { default: EnterpriseImage },
    meta: {
      menuTag: 'customer_portrait_2',
      hasMenuTag: false,
      crumbs: ['客户卫士', '客户画像']
    }
  },
  // 企业搜索列表
  {
    path: 'enterpriseSearchList',
    name: 'enterpriseSearchList',
    components: { default: EnterpriseSearchList },
    meta: {
      menuTag: 'customer_portrait_2',
      hasMenuTag: false,
      crumbs: ['客户卫士', '客户画像']
    }
  },
  // 企业搜索主页
  {
    path: 'enterpriseHome',
    name: 'enterpriseHome',
    components: { default: EnterpriseHome },
    meta: {
      menuTag: 'customer_portrait_2',
      hasMenuTag: true,
      crumbs: ['客户卫士', '客户画像']
    }
  },
  // 财务分析详情
  {
    path: 'enterpriseImageFinance',
    name: 'enterpriseImageFinance',
    components: { default: EnterpriseImageFinance },
    meta: {
      menuTag: 'customer_portrait_2',
      hasMenuTag: false,
      crumbs: ['客户卫士', '客户画像']
    }
  },
  // 价值分层
  {
    path: 'valueStratification',
    name: 'valueStratification',
    components: { default: ValueStratification },
    meta: {
      menuTag: 'value_stratification',
      hasMenuTag: true,
      crumbs: ['客户画像', '价值分层', '价值列表']
    }
  },
  // 价值分层
  {
    path: 'valueDetail',
    name: 'valueDetail',
    components: { default: ValueDetail },
    meta: {
      menuTag: 'value_stratification',
      hasMenuTag: false,
      crumbs: ['客户画像', '价值分层', '价值详情']
    }
  },
  /** 风险管理 */
  // 风险明细
  {
    path: 'riskDetails',
    name: 'riskDetails',
    components: { default: RiskDetails },
    meta: {
      menuTag: 'risk_details',
      hasMenuTag: true,
      crumbs: ['客户卫士', '风险管理']
    }
  },
  {
    path: 'watchList',
    name: 'watchList',
    components: { default: WatchList },
    meta: {
      menuTag: 'watch_list',
      hasMenuTag: true,
      crumbs: ['客户卫士', '关注列表']
    }
  },
  // 我的订阅
  {
    path: 'enterpriseMySubscription',
    name: 'enterpriseMySubscription',
    components: { default: MySubscription },
    meta: {
      menuTag: 'enterprise_my_subscription',
      hasMenuTag: true,
      crumbs: ['客户卫士', '我的订阅']
    }
  },
  // 精准分层
  {
    path: 'preciseStratification',
    name: 'preciseStratification',
    components: { default: PreciseStratification },
    meta: {
      menuTag: 'customer_preciseStratification',
      hasMenuTag: true,
      crumbs: ['客户卫士', '精准分层']
    }
  },
  {
    path: 'preciseStratificationEdit',
    name: 'preciseStratificationEdit',
    components: { default: PreciseStratificationEdit },
    meta: {
      menuTag: 'customer_preciseStratification',
      hasMenuTag: false,
      crumbs: ['客户卫士', '精准分层', '编辑资料']
    }
  },
  {
    path: 'preciseStratificationDetail',
    name: 'preciseStratificationDetail',
    components: { default: PreciseStratificationDetail },
    meta: {
      menuTag: 'customer_preciseStratification',
      hasMenuTag: false,
      crumbs: ['客户卫士', '精准分层', '查看详情']
    }
  },
]

export default {
  module: 'customerGuard',
  children: [{
    name: 'customerGuard',
    path: 'customerGuard',
    redirect: { name: 'enterpriseHome' },
    component: CustomerGuardMain,
    children: pages
  }]
}
