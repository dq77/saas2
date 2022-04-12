<template lang="pug">
div
  card(noTitle marginBottom='10px' v-if='blocksData.length>0')
    GrayBlocks(:data='blocksData')
  list-page(
    ref='listPage'
    :config='listPageConfig'
    @initSearchParams='initSearchParams'
  )
    template(slot='searchDealerNameName' slot-scope='{searchForm}')
      search-auto-company-name(:companyName='searchForm.dealerName' @change='changeDealerName')
    template(slot='searchProvinceCity' slot-scope='{searchForm}')
      search-province-city(
        placeholder='请选择所在地'
        :provinceName='searchForm.province'
        :cityName='searchForm.city'
        @change='changeProvinceCity'
      )
    template(slot='caseId' slot-scope='{row}')
      .p-link(@click='toDetail(row.caseId)') {{ row.caseId }}
</template>

<script>
import ListPage from '@/components/ListPage'
import Card from '@/components/Card'
import GrayBlocks from '@/components/GrayBlocks'
import SearchAutoCompanyName from '@/components/SearchAutoCompanyName'
import SearchProvinceCity from '@/components/SearchProvinceCity'
import { humpToLine, lineToHump, toAmountStr } from '@/utils/util'
import ajaxStore from '@/apis'
export default {
  components: { ListPage, SearchAutoCompanyName, SearchProvinceCity, Card, GrayBlocks },
  data() {
    return {
      blocksData: [],
      enums: {
        performance: {
          全部未履行: '全部未履行',
          全部已履行: '全部已履行',
          部分未履行: '部分未履行'
        }
      }
    }
  },
  computed: {
    listPageConfig() {
      return {
        searchParams: [
          [
            {
              type: 'slot',
              label: '经销商名称',
              slotName: 'searchDealerNameName',
              col: 6,
            },
            {
              type: 'daterange',
              label: '立案日期',
              formItemName_start: 'regStartTime',
              formItemName_end: 'regEndTime',
              placeholder_start: '起始日期',
              placeholder_end: '结束日期',
              col: 6
            },
            {
              type: 'slot',
              label: '经销商所在地',
              slotName: 'searchProvinceCity',
              col: 6,
            },
            {
              type: 'select',
              label: '履行情况',
              formItemName: 'performance',
              placeholder: '请选择履行情况',
              enum: this.enums.performance,
              col: 6,
            }
            // {
            //   type: 'daterange',
            //   label: '发布日期',
            //   formItemName_start: 'publishStartDate',
            //   formItemName_end: 'publishEndDate',
            //   placeholder_start: '请选择开始日期',
            //   placeholder_end: '请选择结束日期',
            //   col: 8
            // },
          ]
        ],
        tableHeader: [
          { name: '经销商名称', property: 'companyName', minWidth: '120'},
          { name: '案号', property: 'caseId', tdSlotName: 'caseId', minWidth: '100'},
          { name: '经销商所在地区', property: 'companyLocation', minWidth: '85' },
          { name: '执行法院', property: 'court', minWidth: '120' },
          { name: '执行依据文号', property: 'zxDocId', minWidth: '100' },
          { name: '履行情况', property: 'performance', minWidth: '90' },
          { name: '失信行为', property: 'disruptTypeName', minWidth: '70' },
          { name: '立案日期', property: 'regDate', minWidth: '85', sortable: 'custom', align: 'right' },
        ],
        getTableList: {
          type: 'component',
          fn: ajaxStore.factoryService.riskEngine.getBreakPromiseList
        },
        sortMethod: humpToLine,
        reSortMethod: lineToHump
      }
    }
  },
  methods: {
    changeDealerName({ companyName }) {
      this.$refs.listPage.changeSearch({ dealerName: companyName })
    },
    changeProvinceCity(v) {
      const params = {}
      if (v) {
        params.province = v[0] ? v[0] : null
        params.city = v[1] ? v[1] : null
        this.$refs.listPage.changeSearch(params)
      }
    },
    initSearchParams(params) {
      const { regStartTime, regEndTime, publishStartDate, publishEndDate, province, city, descs, ascs } = this.$route.query
      params.regStartTime = regStartTime
      params.regEndTime = regEndTime
      params.publishStartDate = publishStartDate
      params.publishEndDate = publishEndDate
      params.province = province
      params.city = city
      params.descs = descs
      params.ascs = ascs
    },
    toDetail(caseId) {
      caseId = encodeURIComponent(caseId)
      window.open(`https://${process.env.VUE_APP_WEBTOOLS_HOST}/sentiment/brokenPromise/detail?caseId=${caseId}`)
    },
    async createBlocksData() {
      const res = await this.$store.dispatch('getConsensusStatistics')
      this.blocksData = [
        { label: '案件总数（个）', number: res.sxTotalCount, iconName: '17.png' },
        { label: '失信经销商数（个）', number: res.sxDealerCount, iconName: '14.png' },
        { label: '失信总金额（万）', number: toAmountStr(res.sxTotalAmount, 2, true, true), iconName: '16.png' }
      ]
    }
  },
  mounted() {
    this.createBlocksData()
  }
}
</script>

<style lang="stylus" scoped>
.p-link
  color #409eff
  cursor pointer
</style>
