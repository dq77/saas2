<template lang="pug">
.page-main
  .p-module-title
    span 开发商风险榜单
    .p-search
      SearchCompany(width='330px' type='riskCompanyList' @select='selectCompanyName' @change='changeCompanyName')
  Card.p-card(noTitle noWrap v-loading='loading')
    .p-title 风险榜单
      span.p-num {{pagination.total}}
    .p-module-content.p-scroll-content
      template(v-if='dataSource && dataSource.length')
        .u-warning-item(v-for='item in dataSource' :key='item.id' :class='{"p-disabled" : item.top100 !== "1"}')
          router-link(:to='{ name: "realEstateDetail", query: { companyName: item.name } }' v-if='item.top100 === "1"')
            .u-warning-item-name
              span.u-warning-item-companyName {{item.name}}
          span.u-warning-item-companyName(v-else) {{item.name}}
          span.p-warning-level(:style='getIconColor(item.level)') {{item.level}}
      .u-empty-tips(v-else) 暂无信息
      Pagination(:pagination="pagination")
</template>

<script>
import Card from '@/components/Card'
import useFollow from '../hooks/useFollow'
import { developerRiskListColor } from '../RealEstateMarket/config'
import SearchCompany from '../components/searchCompany'
import Pagination from '@/components/qjd/pagination'
import useTable from 'hooks/useTable'
import ajaxStore from '@/apis'
import { reactive, toRefs } from '@vue/composition-api'
export default {
  components: {
    Card,
    SearchCompany,
    Pagination
  },
  setup(props, { root }) {
    const state = reactive({
      company: ''
    })
    const getIconColor = (type) => {
      return {
        background: developerRiskListColor[type].bgColor,
        color: developerRiskListColor[type].color
      }
    }

    const {
      followCompanyList,
      getFollowCompanyList
    } = useFollow()

    const { getCompanyRiskLevel } = ajaxStore.factoryService.realEstate

    // table & page
    const {
      loading,
      dataSource,
      pagination,
      searchHandle,
    } = useTable({
      request: getCompanyRiskLevel,
      callback: (res) => {
        return {
          totalCount: res.total,
          dataSource: res.records
        }
      }
    })

    const selectCompanyName = (company) => {
      state.company = company.value
      loadData()
    }
    const changeCompanyName = (company) => {
      if (company.value) return
      state.company = company.value
      loadData()
    }

    const loadData = async () => {
      await getFollowCompanyList({cache: true})
      if (props.mode === 'follow' && !followCompanyList.value.length) {
        dataSource.value = []
        return
      }
      searchHandle({ pageNo: 1, pageSize: 10, name: state.company })
    }

    loadData()

    return {
      getIconColor,
      loading,
      dataSource,
      pagination,
      selectCompanyName,
      changeCompanyName,
      ...toRefs(state)
    }
  }
}
</script>

<style lang="stylus" scoped>
@import '../RealEstateMarket/index.styl'
.p-title
  color #494949
  font-size 18px
  margin 15px 20px 0 20px
  font-weight bold
  .p-num
    margin-left 5px
    color #3B68F0
.p-module-title
  color #494949
  font-size 14px
  padding 15px 20px
  background #ffffff
  border 1px solid #EAEBEE
  border-bottom none
  display flex
  justify-content space-between
  align-items center
.p-module-content
  padding 5px 0
.u-warning-item-companyName
  max-width inherit
  margin-right 10px
.p-warning-level
  padding 0 5px
  line-height 20px
.p-seamless-content
  height 242px
.u-warning-item
  justify-content flex-start
  line-height inherit
  margin-bottom 0
  padding 15px 0 15px 20px
  a
    color #494949
.u-warning-item:hover
  background #F3F4F8
  a
    color #3C5DA4
.p-disabled
  cursor not-allowed
.u-title-more
  padding-right 18px
  text-indent 0
  cursor pointer
  color #25BECD
  line-height 50px
  font-size 12px
  .txt
    margin-right 2px
</style>
