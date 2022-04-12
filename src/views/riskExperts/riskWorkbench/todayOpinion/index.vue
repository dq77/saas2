<template lang="pug">
Card2(title='今日舆情' :noWrap='true' :loading='loading')
  template(v-slot:title)
    span 今日舆情
    i.p-hot
  template(v-slot:headRight)
    router-link.p-read-more-btn(
      :to='{name: "journalism"}'
      v-weblogs.click='"风险工作台-今日舆情-查看全部"'
    ) 查看全部 &gt;
  el-scrollbar(style="height: 100%; width: 100%;")
    .p-list.p-height(v-if='opinionList.length > 0')
      .p-list-item(v-for='item in opinionList')
        a.u-title(
          target='_blank'
          :href='item.url'
          v-weblogs.click='"风险工作台-今日舆情-标题跳转"'
          @click='clickNews(item.id)'
        ) {{ item.title }}
    EmptyData.p-height(v-else)
</template>

<script>
import { reactive, toRefs } from '@vue/composition-api'
import useAsync from 'hooks/useAsync'
import EmptyData from '@/components/EmptyData'
import ajaxStore from '@/apis'
import Card2 from './../card2'

export default {
  components: {
    Card2,
    EmptyData,
  },
  setup() {
    const state = reactive({
      opinionList: []
    })
    const { loading } = useAsync({
      request: ajaxStore.riskExperts.workbench.getPagedNews,
      params: { pageSize: 10, pageNo: 1, isRead: 'N' },
      init: true,
      successCallBack: (res) => {
        if (res?.code === '0') {
          const data = res?.data?.pagedRecords || []
          const opinionList = []
          data.forEach(item => {
            opinionList.push({
              id: item?.id ?? '',
              title: item?.title ?? '--',
              url: item?.url ?? ''
            })
          })
          state.opinionList = opinionList
        }
      }
    })

    const { doResult: setNewsRead } = useAsync({
      request: ajaxStore.riskExperts.workbench.setNewsRead,
      init: false
    })

    const clickNews = (id) => setNewsRead({ ids: [id] })

    return {
      loading,
      ...toRefs(state),
      clickNews,
    }
  }
}
</script>

<style lang="stylus" scoped>
.p-height
  height 240px
.p-hot
  margin-left 9px
  width 13px
  height 13px
  background url(https://cdn.qjdchina.com/static-online/saas/riskExperts/workbench/icon-hot.png) no-repeat
  background-size 100%
.p-list
  padding 0 20px
.p-list-item
  padding 14px 0
  border-bottom 1px solid #EAEBEE
  font-size 12px
  cursor pointer
  &:last-child
    border-bottom 0
  &:hover
    color #3B68F0
  .u-title
    overflow hidden
    text-overflow ellipsis
    display -webkit-box
    color #494949
    -webkit-line-clamp 2
    -webkit-box-orient vertical
    &:hover
      color #3b68f0
</style>
