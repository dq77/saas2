const RealEstateMarket = () => import(/* webpackChunkName: "group-risk" */ '@/views/factoryService/realEstate/RealEstateMarket/index')
const RealEstateDetail = () => import(/* webpackChunkName: "group-risk" */ '@/views/factoryService/realEstate/RealEstateDetail/index')
const MyRealEstateReport = () => import(/* webpackChunkName: "group-risk" */ '@/views/factoryService/realEstate/MyRealEstateReport/index')
const RelatedRealEstate = () => import(/* webpackChunkName: "group-risk" */ '@/views/factoryService/realEstate/RelatedRealEstate/index')
const DailyReportList = () => import(/* webpackChunkName: "group-risk" */ '@/views/factoryService/realEstate/DailyReportList/index')
const DeveloperRiskList = () => import(/* webpackChunkName: "group-risk" */ '@/views/factoryService/realEstate/DeveloperRiskList/index')
const CommercialPaperList = () => import(/* webpackChunkName: "group-risk" */ '@/views/factoryService/realEstate/CommercialPaperList/index')
const MySubscription = () => import(/* webpackChunkName: "group-risk" */ '@/views/factoryService/realEstate/MySubscription/index')
const ScoreExplain = () => import(/* webpackChunkName: "group-risk" */ '@/views/factoryService/realEstate/ScoreExplain/index')
const pages = [
  // 行业舆情日报列表
  { path: 'dailyReportList', name: 'dailyReportList', components: { default: DailyReportList }, meta: { menuTag: 'real_estate', hasMenuTag: true, crumbs: ['开发商评估', '行业舆情日报详情'] } },
  // 风险榜单列表
  { path: 'developerRiskList', name: 'developerRiskList', components: { default: DeveloperRiskList }, meta: { menuTag: 'real_estate', hasMenuTag: true, crumbs: ['开发商评估', '开发商风险榜单'] } },
  // 开发商大盘
  { path: 'home', name: 'realEstateMarket', components: { default: RealEstateMarket }, meta: { menuTag: 'real_estate', hasMenuTag: true, crumbs: ['开发商评估', '开发商大盘'] } },
  // 我的关注
  { path: 'myFollow', name: 'realEstateMyFollow', components: { default: RealEstateMarket }, meta: { menuTag: 'real_estate_detail', hasMenuTag: true, crumbs: ['开发商评估', '我的关注'] } },
  // 我的报告
  { path: 'myRealEstateReport', name: 'myRealEstateReport', components: { default: MyRealEstateReport }, meta: { menuTag: 'real_estate_detail', hasMenuTag: true, crumbs: ['开发商评估', '我的报告'] } },
  // 评分等级解释
  { path: 'scoreExplain', name: 'scoreExplain', components: { default: ScoreExplain }, meta: { menuTag: 'real_estate_detail', hasMenuTag: true, crumbs: ['开发商评估', '等级说明及定义'] } },
  // 开发商详情
  { path: 'company', name: 'realEstateDetail', components: { default: RealEstateDetail }, meta: { menuTag: 'real_estate_detail', hasMenuTag: true, crumbs: ['开发商评估', '开发商详情'] } },
  // 关联公司
  { path: 'relatedRealEstate', name: 'relatedRealEstate', components: { default: RelatedRealEstate }, meta: { menuTag: 'relation_real_estate_detail', hasMenuTag: true, crumbs: ['开发商评估', '关联公司'] } },
  // 商票查询
  { path: 'commercialPaperList', name: 'commercialPaperList', components: { default: CommercialPaperList }, meta: { menuTag: 'commercial_paper_list', hasMenuTag: true, crumbs: ['开发商评估', '债券商票'] } },
  // 我的订阅
  { path: 'mySubscription', name: 'mySubscription', components: { default: MySubscription }, meta: { menuTag: 'real_my_subscription', hasMenuTag: true, crumbs: ['开发商评估', '我的订阅'] } },
]

export default pages
