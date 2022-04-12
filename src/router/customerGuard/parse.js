// 报告解析
const ParsePerson = () => import(/* webpackChunkName: "group-market" */ '@/views/customerGuard/PreciseStratification/ParsePerson/index')
const ParseCompany = () => import(/* webpackChunkName: "group-market" */ '@/views/customerGuard/PreciseStratification/ParseCompany/index')
const ParseBank = () => import(/* webpackChunkName: "group-market" */ '@/views/customerGuard/PreciseStratification/ParseBank/index')

const pages = [
  {
    path: 'parsePerson',
    name: 'parsePerson',
    components: { default: ParsePerson },
    meta: {
      menuTag: 'customer_preciseStratification',
      hasMenuTag: false,
      crumbs: ['客户卫士', '精准分层', '查看详情', '个人征信报告解析结果查看']
    }
  },
  {
    path: 'parseCompany',
    name: 'parseCompany',
    components: { default: ParseCompany },
    meta: {
      menuTag: 'customer_preciseStratification',
      hasMenuTag: false,
      crumbs: ['客户卫士', '精准分层', '查看详情', '企业征信报告解析结果查看']
    }
  },
  {
    path: 'parseBank',
    name: 'parseBank',
    components: { default: ParseBank },
    meta: {
      menuTag: 'customer_preciseStratification',
      hasMenuTag: false,
      crumbs: ['客户卫士', '精准分层', '查看详情', '银行流水解析结果查看']
    }
  },
]
export default pages
