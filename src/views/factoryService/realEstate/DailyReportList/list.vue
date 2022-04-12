<template lang="pug">
Card(title='行业舆情预警日报' v-loading='loading')
  .p-content
    .p-title {{currentDate}}行业舆情预警日报
    .p-item(v-for='(item, index) in dataSource')
      .p-item-title(v-html='renderKeyWords(`${(pagination.current - 1)* pagination.pageSize + index+1}.${item.title}`, item.label)')
      .p-item-info
        span.p-item-source 来源：{{item.source}}
        span.p-item-time 发表于{{item.publishTime}}
      .p-item-summary(v-html='renderKeyWords(item.content, item.label)')
  Pagination(:pagination="pagination")
</template>

<script>
import Card from '@/components/Card'
import Pagination from '@/components/qjd/pagination'
import useTable from 'hooks/useTable'
import { ref, watch } from '@vue/composition-api'
import ajaxStore from '@/apis'
import { renderKeyWords } from '@/utils/util'
import useEventBus from '@/hooks/useEventBus'
import busStore from '@/utils/busStore'
export default {
  props: {
    date: {
      type: String,
    }
  },
  components: {
    Card,
    Pagination
  },
  setup(props) {
    const currentDate = ref('')

    const { getDailyReportList } = ajaxStore.factoryService.realEstate

    const {
      loading,
      dataSource,
      pagination,
      searchHandle,
    } = useTable({
      request: getDailyReportList,
      isInit: false,
      callback: data => {
        const { total = 0, records = [] } = data || {}
        return {
          totalCount: total,
          dataSource: records
        }
      }
    })

    const { initEvent } = useEventBus({
      event: busStore.changeDailyDate
    })
    initEvent((date) => {
      currentDate.value = date
      searchHandle({
        createTime: date
      })
    })

    watch(
      () => props.date,
      (value) => {
        searchHandle({
          time: value
        })
      }
    )

    return {
      loading,
      dataSource,
      pagination,
      renderKeyWords,
      currentDate
    }
  }

}
</script>

<style lang="stylus" scoped>
.p-content
  min-height 430px
  .p-title
    color #494949
    font-size 18px
    font-weight bold
    margin-bottom 20px
  .p-item
    margin-bottom 40px
    .p-item-title
      color #494949
      font-size 14px
      font-weight bold
      margin-bottom 5px
    .p-item-info
      color #A9AFB8
      margin-bottom 5px
      .p-item-source
        margin-right 5px
    .p-item-summary
      color #494949
      font-size 12px
      line-height 18px
</style>
