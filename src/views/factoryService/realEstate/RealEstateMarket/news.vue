<template lang="pug">
Card.p-card(title='新闻资讯' noWrap v-loading='topNewsListLoading')
  .p-module-content.p-scroll-content
    template(v-if='topNewsListResult && topNewsListResult.length')
      el-scrollbar.p-seamless-content
        span
          a.u-warning-item(v-for='item in topNewsListResult' :href='item.titleUrl' target='_blank')
            .u-warning-item-name
              span.u-warning-item-companyName.p-news-title(:title='item.titleName') {{item.titleName}}
            span.u-warning-item-detail 详情
              i.el-icon-arrow-right.u-arrow
    .u-empty-tips(v-else) 暂无信息
</template>

<script>
import { watch } from '@vue/composition-api'
import Card from '@/components/Card'
import useFollow from '../hooks/useFollow'
import useApis from './api'
import { getCompanyList } from './utils'
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
  setup(props) {
    const {
      followCompanyList,
      getFollowCompanyList
    } = useFollow()

    const {
      getTopNewsList,
      topNewsListLoading,
      topNewsListResult
    } = useApis({})

    const loadData = async () => {
      await getFollowCompanyList({cache: true})
      if (props.mode === 'follow' && !followCompanyList.value.length) {
        topNewsListResult.value = []
        return
      }
      getTopNewsList({
        companyList: getCompanyList(followCompanyList.value, props.mode)
      })
    }

    watch(
      () => props.refresh,
      (value) => {
        loadData()
      }
    )

    return {
      topNewsListLoading,
      topNewsListResult
    }
  }
}
</script>

<style lang="stylus" scoped>
@import './index.styl'
.u-warning-item-detail
  min-width 40px
</style>
