<template lang="pug">
Card.p-card(title='舆情预警' noWrap v-loading='sentimentWarningTopLoading')
  .p-module-content.p-scroll-content
    template(v-if='sentimentWarningTopResult && sentimentWarningTopResult.length')
      el-scrollbar.p-seamless-content
        span
          a.u-warning-item(v-for='item in sentimentWarningTopResult' :href='item.url' target='_blank')
            .u-warning-item-name
              span.u-warning-item-companyName(:title='item.cmpanyName') {{item.cmpanyName}}
              .u-warning-icon(:style='getIconColor(item.rolesName)')
                span {{item.rolesName}}
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
import { sentimentColor } from './config'
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
    const getIconColor = (type) => {
      return {
        background: sentimentColor[type]
      }
    }

    const {
      followCompanyList,
      getFollowCompanyList
    } = useFollow()

    const {
      getSentimentWarningTop,
      sentimentWarningTopLoading,
      sentimentWarningTopResult,
    } = useApis({})

    const loadData = async () => {
      await getFollowCompanyList({cache: true})
      if (props.mode === 'follow' && !followCompanyList.value.length) {
        sentimentWarningTopResult.value = []
        return
      }
      getSentimentWarningTop({
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
      getIconColor,
      sentimentWarningTopLoading,
      sentimentWarningTopResult,
    }
  }
}
</script>

<style lang="stylus" scoped>
@import './index.styl'
.u-warning-item-detail
  min-width 40px
</style>
