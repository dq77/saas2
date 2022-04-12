<template lang="pug">
Card.p-card(title='开发商风险榜单' noWrap v-loading='companyRiskLevelLoading')
  template(slot='headRight')
    .u-title-more(@click='goMore')
      span.txt 查看更多 &gt;
  .p-module-content.p-scroll-content
    template(v-if='companyRiskLevelResult && companyRiskLevelResult.length')
      .p-seamless-content
        .u-warning-item(v-for='item in companyRiskLevelResult' :key='item.id' :class='{"p-disabled" : item.top100 !== "1"}')
          router-link(:to='{ name: "realEstateDetail", query: { companyName: item.name } }' v-if='item.top100 === "1"')
            .u-warning-item-name
              span.u-warning-item-companyName {{item.name}}
          span.u-warning-item-companyName(v-else) {{item.name}}
          span.p-warning-level(:style='getIconColor(item.level)') {{item.level}}
    .u-empty-tips(v-else) 暂无信息
</template>

<script>
import { watch } from '@vue/composition-api'
import Card from '@/components/Card'
import useFollow from '../hooks/useFollow'
import useApis from './api'
import { developerRiskListColor } from './config'
export default {
  props: {
    mode: {
      type: String,
    },
    refresh: {
      type: Boolean,
      default: false
    }
  },
  components: {
    Card
  },
  setup(props, { root }) {
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

    const {
      getCompanyRiskLevelTop,
      companyRiskLevelLoading,
      companyRiskLevelResult,
    } = useApis({})

    const loadData = async () => {
      await getFollowCompanyList({cache: true})
      if (props.mode === 'follow' && !followCompanyList.value.length) {
        companyRiskLevelResult.value = []
        return
      }
      getCompanyRiskLevelTop({ pageNo: 1, pageSize: 10 })
    }

    const goMore = () => {
      root.$router.push({
        name: 'developerRiskList'
      })
    }

    watch(
      () => props.refresh,
      (value) => {
        loadData()
      }
    )

    return {
      goMore,
      getIconColor,
      companyRiskLevelLoading,
      companyRiskLevelResult,
    }
  }
}
</script>

<style lang="stylus" scoped>
@import './index.styl'
.p-module-content
  padding 5px 0
.p-warning-level
  padding 0 5px
  line-height 20px
.p-seamless-content
  height 242px
.u-warning-item
  line-height inherit
  margin-bottom 0
  padding 10px 0 10px 20px
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
