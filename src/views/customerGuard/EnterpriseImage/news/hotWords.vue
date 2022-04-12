<template lang="pug">
.hotWords(v-loading='loading')
  template(v-if='result && result.length')
    .home-title
      span 舆情热词
    #hotWords
    // .empty-content(v-else) 暂时没有找到相关数据
</template>

<script>
import 'echarts-wordcloud'
import useCharts from 'hooks/useCharts'
import useTimeout from 'hooks/useTimeout'
import { watch, inject } from '@vue/composition-api'
import useAsync from 'hooks/useAsync'
import ajaxStore from '@/apis'
import { hotWordsOption } from './config'
export default {
  setup(props) {
    const { getHotWords } = ajaxStore.customer.enterprise
    const { perTimeout } = useTimeout()
    const {
      chartInit,
      setDataSource,
      chartClear
    } = useCharts({
      option: hotWordsOption,
      id: 'hotWords',
      isInit: false
    })

    const { loading, result, doResult } = useAsync({
      request: getHotWords,
      init: false,
      callback: res => {
        let { data: {data, code} } = res
        if (code === '0') {
          data = data ? JSON.parse(data) : {}
          const dataSource = []
          for (const key in data) {
            dataSource.push({
              name: key,
              value: data[key]
            })
          }
          return {
            data: dataSource.length ? dataSource.slice(0, 49) : [], // 最多显示50个热词
          }
        }
      }
    })

    doResult({
      companyName: inject('companyName')
    })

    watch(
      () => result.value,
      (value) => {
        value && perTimeout(() => {
          setDataSource(value)
          chartInit()
        })
        !value && chartClear()
      }
    )

    return {
      result,
      loading
    }
  }
}
</script>

<style lang="stylus" scoped>
#hotWords
  height 250px
.empty-content
  background url('//cdn.qjdchina.com/static-online/saas/factoryService/realEstate/hot-word-emnty.png') center 20px no-repeat
  background-size 300px
  padding 0px 0 40px 0
  color #A9AFB8
  text-align center
  min-height 300px
.home-title
  font-size 16px
  color #494949
  margin-bottom 20px
  display flex
  justify-content space-between
</style>
