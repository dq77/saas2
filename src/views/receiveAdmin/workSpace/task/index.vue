<template lang='pug'>
.task
  Header(title='应收任务' :left='20')
  ul.task-ul(v-loading='loading')
    li.task-li(v-for='item in list' :key='item.name')
      .task-li__name {{ item.name }}
      .task-li__value {{ item.value }}
</template>

<script>
import { reactive, toRefs } from '@vue/composition-api'
import Header from '@/components/qjd/header'
import ajaxStore from '@/apis'
import useAsync from 'hooks/useAsync'
import { nullCallback } from '../../utils'

export default {
  components: {
    Header
  },
  setup (props) {
    // state
    const state = reactive({
      list: [
        { name: '今日应收计划数', value: 0 },
        { name: '本周应收计划数', value: 0 },
        { name: '本月应收计划数', value: 0 },
        { name: '超期未收计划数', value: 0 },
      ]
    })
    // ajaxStore
    const { receive: { getReceivableTaskDataView } } = ajaxStore
    // async
    const { loading } = useAsync({
      init: true,
      isLoading: true,
      request: getReceivableTaskDataView,
      callback: res => nullCallback(res, 'object'),
      successCallBack: ({ data, code }) => {
        if (code === '0') {
          const arr = ['todayReceivableCount', 'weekReceivableCount', 'monthReceivableCount', 'notReceivableCount']
          state.list.forEach((item, index) => {
            data[arr[index]] && (item.value = data[arr[index]])
          })
        }
      }
    })
    return {
      loading,
      ...toRefs(state)
    }
  }
}
</script>

<style lang='stylus' scoped>
.task
  background #fff
  margin-top var(--smallSpace)
.task-ul
  display flex
  flex-wrap wrap
.task-li
  width 50%
  height 82px
  display flex
  flex-direction column
  justify-content center
  align-items center
  &:nth-child(2n+1)
    border-right 1px solid #EAEBEE
  &:nth-child(1)
    border-bottom 1px solid #EAEBEE
  &:nth-child(2)
    border-bottom 1px solid #EAEBEE
  &__name
    margin-bottom 11px
    font-size 12px
    color #494949
    line-height 17px
  &__value
    font-size 20px
    color #3B68F0
    line-height 28px
</style>
