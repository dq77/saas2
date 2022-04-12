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
    template(slot='location' slot-scope='{row}')
      template(v-if='row.city') {{ row.province + '-' + row.city}}
      template(v-else-if='row.province') {{ row.province }}
      template(v-else) -
    template(slot='searchProvinceCity' slot-scope='{searchForm}')
      search-province-city(
        placeholder='请选择所在地'
        :provinceName='searchForm.province'
        :cityName='searchForm.city'
        @change='changeProvinceCity'
      )
    template(slot='decisionNo' slot-scope='{row}')
      .p-link(@click='toDetail(row.decisionNo)') {{ row.decisionNo }}
    template(slot='content' slot-scope='{row}')
      el-popover(
        placement='top-start'
        trigger='hover'
        width='200'
        :content='filterHtml(row.content)'
      )
        .p-overflow(slot='reference') {{ filterHtml(row.content) }}
</template>

<script>
import ListPage from '@/components/ListPage'
import Card from '@/components/Card'
import GrayBlocks from '@/components/GrayBlocks'
import SearchAutoCompanyName from '@/components/SearchAutoCompanyName'
import SearchProvinceCity from '@/components/SearchProvinceCity'
import { humpToLine, lineToHump } from '@/utils/util'
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
              col: 6
            },
            {
              type: 'daterange',
              label: '处罚日期',
              formItemName_start: 'judgeStartDate',
              formItemName_end: 'judgeEndDate',
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
          { name: '决定文书号', property: 'decisionNo', tdSlotName: 'decisionNo', minWidth: '140'},
          { name: '经销商名称', property: 'companyName', minWidth: '120'},
          { name: '经销商所在地区', property: 'location', tdSlotName: 'location', minWidth: '100' },
          { name: '处罚事由/违法行为类型', property: 'illegalType', minWidth: '120' },
          { name: '行政处罚内容', property: 'content', tdSlotName: 'content', minWidth: '120' },
          { name: '处罚单位', property: 'authOrg', minWidth: '100' },
          { name: '处罚日期', property: 'judgeDate', minWidth: '90', sortable: 'custom', align: 'right' }
        ],
        getTableList: {
          type: 'component',
          fn: ajaxStore.factoryService.riskEngine.getAdministrativeSanctionList
        },
        sortMethod: humpToLine,
        reSortMethod: lineToHump
      }
    }
  },
  methods: {
    filterHtml(content) {
      return content.replace(/<\/?[^>]*>/g, '')
    },
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
      const { judgeStartDate, judgeEndDate, province, city, descs, ascs } = this.$route.query
      params.judgeStartDate = judgeStartDate
      params.judgeEndDate = judgeEndDate
      params.province = province
      params.city = city
      params.descs = descs
      params.ascs = ascs
    },
    toDetail(decisionNo) {
      decisionNo = encodeURIComponent(decisionNo)
      window.open(`https://${process.env.VUE_APP_WEBTOOLS_HOST}/sentiment/administrativeSanction/detail?decisionNo=${decisionNo}`)
    },
    async createBlocksData() {
      const res = await this.$store.dispatch('getConsensusStatistics')
      this.blocksData = [
        { label: '案件总数（个）', number: res.xzcfTotalCount, iconName: '17.png' },
        { label: '被行政处罚经销商数（个）', number: res.xzcfDealerCount, iconName: '11.png' },
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
.p-overflow
  overflow : hidden;
  text-overflow: ellipsis;
  display: -webkit-box;
  -webkit-line-clamp: 2;      /* 可以显示的行数，超出部分用...表示*/
  -webkit-box-orient: vertical;
</style>
