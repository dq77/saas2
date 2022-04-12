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
    template(slot='regNumber' slot-scope='{row}')
      .p-link(@click='toDetail(row.regNumber)') {{ row.regNumber }}
    template(slot='secAm' slot-scope='{row}')
      .p-clear-margin(v-if='isNumber(row.secAm)') ￥{{ row.secAm  |  toAmountStr(2, true)}}
      .p-clear-margin(v-else) -
</template>

<script>
import ListPage from '@/components/ListPage'
import Card from '@/components/Card'
import GrayBlocks from '@/components/GrayBlocks'
import SearchAutoCompanyName from '@/components/SearchAutoCompanyName'
import SearchProvinceCity from '@/components/SearchProvinceCity'
import { humpToLine, lineToHump, isNumber } from '@/utils/util'
import ajaxStore from '@/apis'
export default {
  components: { ListPage, SearchAutoCompanyName, SearchProvinceCity, Card, GrayBlocks },
  data() {
    return {
      blocksData: []
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
              label: '登记日期',
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
              col: 6
            },
          ]
        ],
        tableHeader: [
          { name: '经销商名称', property: 'companyName', minWidth: '120'},
          { name: '经销商所在地区', property: 'companyLocation', minWidth: '100' },
          { name: '登记编号', property: 'regNumber', tdSlotName: 'regNumber', minWidth: '120'},
          { name: '状态', property: 'status', minWidth: '50' },
          { name: '登记机关', property: 'regOrg', minWidth: '80' },
          { name: '被担保主债权数额', property: 'secAm', tdSlotName: 'secAm', minWidth: '80', align: 'right' },
          { name: '登记日期', property: 'regDate', minWidth: '80', sortable: 'custom', align: 'right' },
        ],
        getTableList: {
          type: 'component',
          fn: ajaxStore.factoryService.riskEngine.getChattelMortgageList
        },
        sortMethod: humpToLine,
        reSortMethod: lineToHump
      }
    }
  },
  methods: {
    isNumber,
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
      const { regStartTime, regEndTime, province, city, descs, ascs } = this.$route.query
      params.regStartTime = regStartTime
      params.regEndTime = regEndTime
      params.province = province
      params.city = city
      params.descs = descs
      params.ascs = ascs
    },
    toDetail(regNumber) {
      regNumber = encodeURIComponent(regNumber)
      window.open(`https://${process.env.VUE_APP_WEBTOOLS_HOST}/sentiment/chattelMortgage/detail?regNumber=${regNumber}`)
    },
    async createBlocksData() {
      const res = await this.$store.dispatch('getConsensusStatistics')
      this.blocksData = [
        { label: '案件总数（个）', number: res.dcdyTotalCount, iconName: '13.png' },
        { label: '动产抵押经销商数（个）', number: res.dcdyDealerCount, iconName: '15.png' },
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
.p-clear-margin
  // margin-right -20px
</style>
