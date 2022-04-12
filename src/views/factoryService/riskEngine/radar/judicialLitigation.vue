<template lang="pug">
div
  card(noTitle marginBottom='10px' v-if='blocksData.length>0')
    GrayBlocks(:data='blocksData')
  list-page(
    ref='listPage'
    :config='listPageConfig'
    @initSearchParams='initSearchParams'
    @privateSearchParams='privateSearchParams'
  )
    template(slot='searchDealerNameName' slot-scope='{searchForm}')
      search-auto-company-name(:companyName='searchForm.dealerName' @change='changeDealerName' useNew)
    template(slot='searchCaseReason' slot-scope='{searchForm}')
      el-cascader.width-100(
        clearable
        placeholder='请选择案由'
        :options='caseReasonTree'
        :props='{value: "label"}'
        v-model='searchForm.caseReason'
      )
    template(slot='searchProvinceCity' slot-scope='{searchForm}')
      search-province-city(
        placeholder='请选择所在地'
        :provinceName='searchForm.province'
        :cityName='searchForm.city'
        @change='changeProvinceCity'
      )
    template(slot='title' slot-scope='{row}')
      a(target='_blank' :href='row.url') {{ row.title}}
    template(slot='identity' slot-scope='{row}') {{ enums.identity[row.identity ] || '' }}
    template(slot='caseReason' slot-scope='{row}')
      span(v-if='row.firstCaseReason && row.secondCaseReason') {{row.firstCaseReason}}-{{row.secondCaseReason}}
      span(v-else-if='row.firstCaseReason') {{row.firstCaseReason}}
      span(v-else) -
    template(slot='location' slot-scope='{row}')
      template(v-if='row.city') {{ row.province + '-' + row.city}}
      template(v-else-if='row.province') {{ row.province }}
      template(v-else) -
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
  components: { ListPage, Card, GrayBlocks, SearchAutoCompanyName, SearchProvinceCity },
  data() {
    return {
      enums: {
        identity: {
          0: '全部',
          1: '原告',
          2: '被告',
          3: '其他'
        }
      },
      blocksData: []
    }
  },
  computed: {
    caseReasonTree() {
      return [
        {
          label: '合同纠纷',
          children: [
            { label: '买卖合同纠纷' },
            { label: '工程合同纠纷' },
            { label: '知识产权合同纠纷' },
            { label: '其他' },
          ]
        },
        {
          label: '借贷纠纷',
          children: [
            { label: '借款合同纠纷' },
            { label: '民间借贷纠纷' },
          ]
        },
        {
          label: '劳务纠纷',
          children: [
            { label: '劳务合同纠纷' },
            { label: '劳动争议纠纷' },
            { label: '劳动报酬纠纷' },
            { label: '其他' },
          ]
        },
        {
          label: '侵权责任纠纷',
          children: [
            { label: '不正当竞争纠纷' },
            { label: '物权保护纠纷' },
            { label: '不当得利纠纷' },
            { label: '知识产权侵权纠纷' },
            { label: '追偿权纠纷' },
            { label: '事故责任纠纷' },
            { label: '其他' },
          ]
        },
        {
          label: '保全、执行',
          children: [
            { label: '保全' },
            { label: '执行' },
          ]
        },
        {
          label: '其他',
          children: [
            { label: '行政案件' },
            { label: '破产纠纷' },
            { label: '工伤认定纠纷' },
            { label: '其他' },
          ]
        }
      ]
    },
    listPageConfig() {
      return {
        searchParams: [
          [
            {
              type: 'slot',
              label: '经销商名称',
              placeholder: '请输入经销商名称',
              slotName: 'searchDealerNameName',
              col: 6,
            },
            {
              type: 'slot',
              label: '案由',
              slotName: 'searchCaseReason',
              col: 6,
            },
            {
              type: 'slot',
              label: '经销商所在地',
              slotName: 'searchProvinceCity',
              col: 6,
            },
            {
              type: 'select',
              label: '身份',
              formItemName: 'identity',
              placeholder: '请选择身份',
              enum: this.enums.identity,
              col: 6,
            },
          ],
          [
            {
              type: 'daterange',
              label: '判决日期',
              formItemName_start: 'judgeStartTime',
              formItemName_end: 'judgeEndTime',
              placeholder_start: '起始日期',
              placeholder_end: '结束日期',
              col: 6
            },
          ]
        ],
        tableHeader: [
          { name: '诉讼标题', property: 'title', tdSlotName: 'title', minWidth: '180'},
          { name: '经销商名称', property: 'dealerName', minWidth: '120'},
          { name: '身份', property: 'identity', tdSlotName: 'identity', minWidth: '50' },
          { name: '案由', property: 'caseReason', tdSlotName: 'caseReason', minWidth: '90' },
          { name: '判决时间', property: 'judgeDate', minWidth: '90', sortable: 'custom', align: 'right' },
          { name: '经销商所在地区', property: 'location', tdSlotName: 'location', minWidth: '100' },
          { name: '法院层级', property: 'level', minWidth: '70' },
          { name: '执行法院', property: 'courtName', minWidth: '120' },
          { name: '发布时间', property: 'publishTime', minWidth: '90' },
        ],
        getTableList: {
          type: 'component',
          fn: ajaxStore.factoryService.riskEngine.getRadarList
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
      const { firstCaseReason, secondCaseReason, province, city, descs, ascs } = this.$route.query
      params.firstCaseReason = firstCaseReason
      params.secondCaseReason = secondCaseReason
      params.caseReason = []
      firstCaseReason && (params.caseReason[0] = firstCaseReason)
      secondCaseReason && (params.caseReason[1] = secondCaseReason)
      params.province = province
      params.city = city
      params.descs = descs
      params.ascs = ascs
    },
    privateSearchParams(params) {
      if (params.caseReason && params.caseReason.length) {
        params.firstCaseReason = params.caseReason[0]
        params.firstCaseReason = params.caseReason[0]
        params.secondCaseReason = params.caseReason[1]
        delete params.caseReason
      } else {
        delete params.firstCaseReason
        delete params.secondCaseReason
        delete params.caseReason
      }
    },
    async createBlocksData() {
      const res = await this.$store.dispatch('getConsensusStatistics')
      this.blocksData = [
        { label: '司法诉讼数', number: res.sfssTotalCount, iconName: '12.png' },
        { label: '涉诉经销商数（个）', number: res.sfssDealerCount, iconName: '14.png' },
        { label: '涉诉省份（个）', number: res.sfssProvinceCount, iconName: '16.png' }
      ]
    }
  },
  mounted() {
    this.createBlocksData()
  }
}
</script>

<style lang="stylus" scoped>

</style>
